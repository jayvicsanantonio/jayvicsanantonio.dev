export default function AboutMe({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section
      ref={aboutRef}
      id="about-me"
      className="max-w-3xl mx-auto py-24 px-8 fade-in-section"
    >
      <div className="font-serif text-2xl md:text-3xl leading-relaxed text-center space-y-8">
        <p>
          I'm Jayvic San Antonio, a Full-Stack Web Developer with a
          passion for crafting elegant and effective digital
          experiences. Originally from the Philippines and now based in
          the San Francisco Bay Area, I have spent over nine years
          honing my skills in JavaScript and its ecosystem.
        </p>
        <p>
          My journey has taken me through diverse environments, from
          the fast-paced world of hackathons and startups to the structured
          demands of a global media and tech company. I am driven by
          the challenge of solving complex problems and the pursuit of
          writing clean, performant, and well-documented code.
        </p>
        <p>
          I believe in constant learning and the power of collaboration
          to create work that is not only innovative but also inclusive
          and impactful.
        </p>
      </div>
    </section>
  );
}
