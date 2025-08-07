export default function Hero({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center fade-in-section">
      <div>
        <h1 className="font-serif text-6xl md:text-8xl font-bold">
          Jayvic San Antonio
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-4 text-primary">
          Digital Craftsman
        </p>
      </div>
    </section>
  );
}
