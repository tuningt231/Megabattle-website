import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Api } from "../api";
import "../styles/member-list.css";

function MemberListInternal({ members, hidden }) {
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
    <div className="team-members-container" hidden={hidden}>
      <div className="team-members-scroll">
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
      </div>

      {activeMember && (
        <div className="member-info-expanded active">
          <div className="member-expanded-image">
            <img
              src={Api.normalizeURL(activeMember.bigImage)}
              alt={activeMember.name}
            />
          </div>
          <div className="member-expanded-info">
            <h3>{activeMember.name}</h3>
            <p>
              <span className="member-expanded-role">{activeMember.role}</span>
            </p>
            <p className="member-expanded-description">
              {activeMember.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MemberList() {
  const [activeFilter, setActiveFilter] = useState("organizers");

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
        <button
          className={`button team-filter${activeFilter === "organizers" ? " active" : ""}`}
          type="button"
          onClick={() => {
            setActiveFilter("organizers");
          }}
        >
          Мегаорганизаторы
        </button>
        <button
          className={`button team-filter${activeFilter === "responsible" ? " active" : ""}`}
          type="button"
          onClick={() => {
            setActiveFilter("responsible");
          }}
        >
          Мегаответственные
        </button>
      </div>

      <MemberListInternal members={organizers} hidden={activeFilter !== "organizers"}/>

      <MemberListInternal members={responsible} hidden={activeFilter !== "responsible"}/>

    </>
  );
}
