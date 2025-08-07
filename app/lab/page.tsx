const experiments = [
  {
    title: 'Christmas Countdown',
    description: 'A festive countdown timer using the Popover and CSS Anchor Positioning APIs.',
    src: 'https://codesandbox.io/embed/c894q8?view=preview&hidenavigation=1',
  },
  {
    title: 'Aurora Borealis',
    description: 'A realistic aurora borealis animation with a starry night sky, created with CSS.',
    src: 'https://codesandbox.io/embed/23lnhc?view=preview&module=%2Fstyles.css&hidenavigation=1',
  },
  {
    title: 'Total Solar Eclipse',
    description: 'An animation of a total solar eclipse, created with HTML and CSS.',
    src: 'https://codesandbox.io/embed/qlnxgn?view=preview&module=%2Fstyles.css&hidenavigation=1',
  },
];

export default function Page() {
  return (
    <section
      className="max-w-4xl mx-auto py-24 px-8 fade-in-section"
    >
      <div className="text-center mb-16">
        <h1 className="font-serif text-6xl md:text-8xl font-bold">
          The Lab
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-4 text-primary">
          A collection of coding experiments.
        </p>
      </div>

      <div className="space-y-20">
        {experiments.map((exp) => (
          <div
            key={exp.title}
          >
            <h2 className="font-serif text-4xl font-bold text-center">{exp.title}</h2>
            <p className="font-sans text-lg text-center mt-2 mb-8">{exp.description}</p>
            <div className="aspect-video bg-background-secondary rounded-lg overflow-hidden border border-border shadow-lg">
              <iframe
                src={exp.src}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                title={exp.title}
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
