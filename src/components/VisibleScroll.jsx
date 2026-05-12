import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import "../styles/visible-scroll.css";

export default function VisibleScroll({
  children,
  autoScroll = false,
  showArrows = true,
  autoScrollSpeed = 0.08,
  mobileAutoScrollSpeed = 0.03,
}) {
  const scrollRef = useRef(null);
  const loopGroupRef = useRef(null);
  const dragStateRef = useRef(null);
  const draggedRef = useRef(false);
  const isAutoPausedRef = useRef(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const autoSpeed = isMobile ? mobileAutoScrollSpeed : autoScrollSpeed;
  const childItems = Children.toArray(children);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (autoScroll) {
      const loopWidth = loopGroupRef.current?.scrollWidth ?? 0;
      if (loopWidth > 0) {
        if (el.scrollLeft < loopWidth * 0.5) {
          el.scrollLeft += loopWidth;
        } else if (el.scrollLeft >= loopWidth * 1.5) {
          el.scrollLeft -= loopWidth;
        }
      }
    }

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, [autoScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  useEffect(() => {
    if (!autoScroll) return undefined;

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, [autoScroll]);

  useEffect(() => {
    if (!autoScroll) return undefined;

    const el = scrollRef.current;
    const loopGroup = loopGroupRef.current;
    if (!el || !loopGroup) return undefined;

    let interval = 0;
    let previousTime = performance.now();

    const normalizeScroll = () => {
      const loopWidth = loopGroup.scrollWidth;
      if (loopWidth <= 0) return;

      if (el.scrollLeft < loopWidth * 0.5) {
        el.scrollLeft += loopWidth;
      } else if (el.scrollLeft >= loopWidth * 1.5) {
        el.scrollLeft -= loopWidth;
      }
    };

    const setInitialScroll = () => {
      const loopWidth = loopGroup.scrollWidth;
      if (loopWidth > 0 && el.scrollLeft === 0) {
        el.scrollLeft = loopWidth;
      }
    };

    const tick = () => {
      const time = performance.now();
      const delta = Math.min(time - previousTime, 80);
      previousTime = time;

      setInitialScroll();
      if (!isAutoPausedRef.current) {
        el.scrollLeft += delta * autoSpeed;
      }

      normalizeScroll();
    };

    setInitialScroll();
    const ro = new ResizeObserver(() => {
      setInitialScroll();
      normalizeScroll();
    });
    ro.observe(loopGroup);
    interval = window.setInterval(tick, isMobile ? 32 : 16);

    return () => {
      window.clearInterval(interval);
      ro.disconnect();
    };
  }, [autoScroll, autoSpeed, childItems.length, isMobile]);

  const pauseAutoScroll = () => {
    if (!autoScroll) return;
    isAutoPausedRef.current = true;
    setIsAutoPaused(true);
  };

  const resumeAutoScroll = () => {
    if (!autoScroll) return;
    isAutoPausedRef.current = false;
    setIsAutoPaused(false);
  };

  const beginDrag = ({ pointerId = null, clientX, clientY }) => {
    const el = scrollRef.current;
    if (!el) return;

    draggedRef.current = false;
    dragStateRef.current = {
      pointerId,
      startX: clientX,
      startY: clientY,
      scrollLeft: el.scrollLeft,
      isDragging: false,
    };
  };

  const moveDrag = ({ pointerId = null, clientX, clientY, preventDefault }) => {
    const dragState = dragStateRef.current;
    const el = scrollRef.current;
    if (!autoScroll || !dragState || !el) return;
    if (dragState.pointerId != null && pointerId !== dragState.pointerId) return;

    const delta = clientX - dragState.startX;
    const verticalDelta = clientY - dragState.startY;
    if (!dragState.isDragging) {
      if (Math.abs(delta) <= 8) return;
      if (Math.abs(verticalDelta) > Math.abs(delta)) return;

      pauseAutoScroll();
      dragState.isDragging = true;
      if (pointerId != null) {
        el.setPointerCapture?.(pointerId);
      }
    }

    preventDefault?.();
    if (Math.abs(delta) > 14) draggedRef.current = true;
    el.scrollLeft = dragState.scrollLeft - delta;
  };

  const endDrag = (pointerId = null) => {
    const el = scrollRef.current;
    if (el && pointerId != null && el.hasPointerCapture?.(pointerId)) {
      el.releasePointerCapture?.(pointerId);
    }
    dragStateRef.current = null;
    if (isMobile) resumeAutoScroll();
  };

  const handlePointerDown = (event) => {
    if (!autoScroll || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }
    if (isMobile && event.pointerType === "touch") {
      pauseAutoScroll();
      return;
    }

    beginDrag({
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const handlePointerMove = (event) => {
    if (isMobile && event.pointerType === "touch") return;

    moveDrag({
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      preventDefault: () => event.preventDefault(),
    });
  };

  const handlePointerEnd = (event) => {
    if (isMobile && event.pointerType === "touch") {
      resumeAutoScroll();
      return;
    }

    endDrag(event.pointerId);
  };

  const handleTouchStart = (event) => {
    if (!autoScroll || event.touches.length !== 1) return;
    if (isMobile) {
      pauseAutoScroll();
      return;
    }

    const touch = event.touches[0];
    beginDrag({
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
  };

  const handleTouchMove = (event) => {
    if (!autoScroll || event.touches.length !== 1) return;
    if (isMobile) return;

    const touch = event.touches[0];
    moveDrag({
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => event.preventDefault(),
    });
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      resumeAutoScroll();
      return;
    }

    endDrag();
  };

  const handleWheel = (event) => {
    if (!autoScroll) return;

    pauseAutoScroll();
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
      event.preventDefault();
      scrollRef.current?.scrollBy({ left: event.deltaX || event.deltaY });
    }
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const renderLoopGroup = (copyIndex, props = {}) => (
    <div className="visible-scroll-loop-group" {...props}>
      {childItems.map((child, childIndex) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child, {
          key: `${copyIndex}-${child.key ?? childIndex}`,
          onClick: (event) => {
            if (draggedRef.current) {
              draggedRef.current = false;
              event.preventDefault();
              event.stopPropagation();
              return;
            }

            child.props.onClick?.(event);
          },
        });
      })}
    </div>
  );

  return (
    <div
      className={`visible-scroll-wrapper${autoScroll ? " visible-scroll-wrapper--loop" : ""}${isAutoPaused ? " visible-scroll-wrapper--paused" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") pauseAutoScroll();
      }}
      onPointerLeave={() => {
        if (!dragStateRef.current) resumeAutoScroll();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div
        className={`visible-scroll-container${autoScroll ? " visible-scroll-container--loop" : ""}`}
        ref={scrollRef}
      >
        {autoScroll ? (
          <div className="visible-scroll-loop-track">
            {renderLoopGroup("before", { "aria-hidden": "true" })}
            {renderLoopGroup("main", { ref: loopGroupRef })}
            {renderLoopGroup("after", { "aria-hidden": "true" })}
          </div>
        ) : (
          children
        )}
      </div>
      {showArrows && !autoScroll && (
        <>
          <button
            className={`visible-scroll-arrow visible-scroll-arrow--left${canScrollLeft ? " visible-scroll-arrow--visible" : ""}`}
            onClick={() => scroll(-1)}
            aria-label="Прокрутить влево"
          >
            ‹
          </button>
          <button
            className={`visible-scroll-arrow visible-scroll-arrow--right${canScrollRight ? " visible-scroll-arrow--visible" : ""}`}
            onClick={() => scroll(1)}
            aria-label="Прокрутить вправо"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
