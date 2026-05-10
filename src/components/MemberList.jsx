import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Api } from "../api";
import "../styles/member-list.css";
import VisibleScroll from "./VisibleScroll";
import ExternalLink from "./ExternalLink";

function MemberListInternal({ members }) {
  const [activeMember, setActiveMember] = useState(null);

  // колбэк на выбор нового просматриваемого участника
  const handleMemberClick = (member) => {
    if (activeMember === member) {
      setActiveMember(null);
      return;
    }
    setActiveMember(member);
  };

  useEffect(() => {
    setActiveMember(members[0] || null);
  }, [members]);

  return (
    <>
      <VisibleScroll>
        {members.map((member) => {
          const isActive = activeMember === member;
          return (
            <div
              key={member.key ?? `${member.name}-${member.activity}`}
              className={`team-member${isActive ? " active" : ""}`}
              onClick={() => handleMemberClick(member)}
            >
              <div className="member-image">
                <img
                  src={Api.normalizeURL(member.smallImage)}
                  alt={member.name}
                />
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.activity}</p>
            </div>
          );
        })}
      </VisibleScroll>

      <div className="main-width">
        {activeMember && (
          <div className="member-info-expanded">
            <div className="member-expanded-image">
              <img
                src={Api.normalizeURL(activeMember.bigImage)}
                alt={activeMember.name}
              />
            </div>
            <div className="member-expanded-info">
              <h3>{activeMember.name}</h3>
              <p>
                <span className="member-expanded-role">
                  {activeMember.role}
                </span>
              </p>
              <p className="member-expanded-description">
                {activeMember.description}
              </p>
              {activeMember.links?.length > 0 && (
                <div className="member-expanded-links">
                  {activeMember.links.map((item, i) => (
                    <ExternalLink key={i} href={item.link} text={item.text} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function MemberList() {
  const [activeFilter, setActiveFilter] = useState("responsible");

  // получить данные с API (или из кэша)
  const organizers = useQuery({
    queryKey: ["organizers"],
    queryFn: Api.getOrganizers,
    initialData: [],
  }).data;

  const responsible = useQuery({
    queryKey: ["responsible"],
    queryFn: Api.getResponsible,
    initialData: [],
  }).data;

  return (
    <>
      <div className="team-filters">
        <div
          className="team-toggle"
          data-filter={activeFilter}
        >
          <div className="toggle-slider" />
          <button
            className={`toggle-btn${activeFilter === "responsible" ? " active" : ""}`}
            type="button"
            onClick={() => setActiveFilter("responsible")}
          >
            Ответственные
          </button>
          <button
            className={`toggle-btn${activeFilter === "organizers" ? " active" : ""}`}
            type="button"
            onClick={() => setActiveFilter("organizers")}
          >
            Организаторы
          </button>
        </div>
      </div>

      <div hidden={activeFilter !== "organizers"}>
        <MemberListInternal members={organizers} />
      </div>

      {/* todo: У нас на экране по ширине помещается примерно 4 человека,
      то есть последний пятый мегаответственный - ЛОХ так как почти всегда будет
      за границей экрана  */}
      <div hidden={activeFilter !== "responsible"}>
        <MemberListInternal members={responsible} />
      </div>
    </>
  );
}
