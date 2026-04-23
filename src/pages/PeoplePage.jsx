import Megabattle from "../components/Megabattle";
import MemberList from "../components/MemberList";
import StoriesList from "../components/StoriesList";
import "../styles/page-people.css";

export default function PeoplePage() {
  return (
    <main>
      <div className="section">
        {/* todo: скучновато */}
        <Megabattle className="people-title" />
      </div>

      <section className="team" id="team">
        <h1>КОМАНДА</h1>
        <MemberList />
      </section>

      <section id="stories" className="stories">
        <h1>ИСТОРИИ УЧАСТНИКОВ</h1>
        <StoriesList />
      </section>
    </main>
  );
}
