const workHistory = [
  {
    role: 'Software Dev Engineer II',
    company: 'Yahoo Inc.',
    years: '2019 - 2023',
    accomplishments: [
      'Rebuilt the App Marketing business of the Yahoo Demand Side Platform, generating over $140M in advertising spend.',
      'Optimized an email audience builder, improving its capacity by 1150% from 2M to 25M records.',
      'Designed and built a wide range of Yahoo DSP features, from UI/UX improvements to revenue-generating initiatives.',
      'Fostered a culture of collaboration by mentoring junior engineers and new hires.',
      'Contributed to the open-source Ember upgrade guide, streamlining app upgrades for the community.',
    ],
  },
  {
    role: 'Software Dev Engineer',
    company: 'Yahoo Inc.',
    years: '2016 - 2019',
    accomplishments: [
      'Built the Yahoo DSP Replay tool autonomously with React, enabling streamlined testing and validation of bid requests.',
      'Contributed to the development of a key Data Management Platform, generating several millions of dollars in revenue.',
      'Pioneered the adoption of Cypress.io for more reliable end-to-end testing.',
      'Contributed to upgrading Yahoo DSP’s Ember framework, enhancing performance, security, and developer experience.',
    ],
  },
  // Add other work history items here...
];

export default function Page() {
  return (
    <section
      className="max-w-4xl mx-auto py-24 px-8 fade-in-section"
    >
      <div className="text-center mb-16">
        <h1 className="font-serif text-6xl md:text-8xl font-bold">
          Career
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-4 text-primary">
          A history of crafting digital experiences.
        </p>
      </div>

      <div className="space-y-16">
        {workHistory.map((job) => (
          <div key={job.company + job.role} className="border-b border-border pb-12">
            <div className="flex justify-between items-baseline">
              <h2 className="font-serif text-4xl font-bold">{job.role}</h2>
              <p className="font-sans text-muted-foreground">{job.years}</p>
            </div>
            <h3 className="font-sans text-2xl text-primary mt-1">{job.company}</h3>
            <ul className="mt-6 space-y-4 font-sans text-lg list-disc list-inside">
              {job.accomplishments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
