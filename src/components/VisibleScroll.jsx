import { useRef, useState, useEffect, useCallback } from "react";
import "../styles/visible-scroll.css";

export default function VisibleScroll({ children }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

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

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="visible-scroll-wrapper">
      <div className="visible-scroll-container" ref={scrollRef}>
        {children}
      </div>
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
    </div>
  );
}
