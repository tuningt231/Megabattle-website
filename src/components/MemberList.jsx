import React, { useEffect, useState } from 'react';
import { Api } from '../api';

export default function MemberList() {
  const [organizers, setOrganizers] = useState([]);
  const [responsible, setResponsible] = useState([]);
  const [activeFilter, setActiveFilter] = useState('organizers');
  const [activeMember, setActiveMember] = useState(null);

  // получить данные с API
  useEffect(() => {
    Promise.all([Api.getOrganizers(), Api.getResponsible()])
      .then(([organizersResult, responsibleResult]) => {
        setOrganizers(organizersResult);
        setResponsible(responsibleResult);
      })
      .catch(console.error);
  }, []);

  // разделы #responsible и #organizers объединены в один.
  // сделать так, чтобы работали якорные ссылки на оба
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#responsible') {
        setActiveFilter('responsible');
      } else if (window.location.hash === '#organizers') {
        setActiveFilter('organizers');
      }
    };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const visibleMembers = activeFilter === 'organizers' ? organizers : responsible;

  // колбэк на выбор нового просматриваемого участника
  const handleMemberClick = (member) => {
    if (activeMember === member) {
      setActiveMember(null);
      return;
    }
    setActiveMember(member);
  };

  return (
    <>
      <div className="team-filters">
        <button
          className={`button team-filter${activeFilter === 'organizers' ? ' active' : ''}`}
          type="button"
          onClick={() => {
            window.location.hash = 'organizers';
            setActiveFilter('organizers');
          }}
        >
          Мегаорганизаторы
        </button>
        <button
          className={`button team-filter${activeFilter === 'responsible' ? ' active' : ''}`}
          type="button"
          onClick={() => {
            window.location.hash = 'responsible';
            setActiveFilter('responsible');
          }}
        >
          Мегаответственные
        </button>
      </div>

      <div className="team-members-container">
        <div className="team-members-scroll">
        {visibleMembers.map((member) => {
          const isActive = activeMember === member;
          return (
            <div
              key={member.key ?? `${member.name}-${member.activity}`}
              className={`team-member${isActive ? ' active' : ''}`}
              onClick={() => handleMemberClick(member)}
            >
              <div className="member-image">
                <img src={member.smallImage} alt={member.name} />
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
              <img src={activeMember.bigImage} alt={activeMember.name} />
            </div>
            <div className="member-expanded-info">
              <h2 className="member-expanded-name">{activeMember.name}</h2>
              <span className="member-expanded-role">{activeMember.role}</span>
              <p className="member-expanded-description">{activeMember.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
