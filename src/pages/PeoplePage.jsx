import MemberList from "../components/MemberList";
import StoriesList from "../components/StoriesList";

export default function PeoplePage() {
  return (
    <main>
      <span id="organizers"></span>
      <span id="responsible"></span>

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
