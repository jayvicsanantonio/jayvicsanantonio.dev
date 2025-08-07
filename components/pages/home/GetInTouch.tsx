import ContactMeForm from '@/components/pages/home/ContactMeForm';
import Link from 'next/link';

const socialLinks = [
  { name: 'Email', href: 'mailto:hi@jayvicsanantonio.dev' },
  { name: 'Github', href: 'https://github.com/jayvicsanantonio' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jayvicsanantonio/' },
  { name: 'Bluesky', href: 'https://bsky.app/profile/jayvicsanantonio.dev' },
];

export default function GetInTouch({
  getInTouchRef,
}: {
  getInTouchRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section
      ref={getInTouchRef}
      id="get-in-touch"
      className="max-w-3xl mx-auto py-24 px-8 text-center fade-in-section"
    >
      <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4">
        Let's Connect
      </h2>
      <p className="font-sans text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        I am currently available for new opportunities. If you have a project
        in mind or would like to discuss a collaboration, please feel free to
        get in touch.
      </p>
      <ContactMeForm />
      <div className="mt-16">
        <ul className="flex justify-center space-x-8 font-sans text-lg">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
