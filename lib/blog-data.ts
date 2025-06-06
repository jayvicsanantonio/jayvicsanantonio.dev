export interface BlogPost {
  title: string;
  description: string;
  image: string; // Path to the image, e.g., /images/blog/building-my-developer-playground.webp
  keywords: string[];
  date: string; // ISO 8601 format e.g., "2024-05-01"
}

export const blogPostsData: Map<string, BlogPost> = new Map([
  [
    'building-my-developer-playground',
    {
      title: 'Building My Developer Playground',
      description: "Dive into the code behind the scenes! Explore the decisions and thought process behind building my personal website with Next.js, React, Tailwind CSS, and TypeScript.",
      image: '/images/blog/building-my-developer-playground.webp',
      keywords: ['Web Development', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      date: '2024-05-01',
    },
  ],
  [
    'css-has-explained',
    {
      title: 'CSS :has() Explained',
      description: 'The CSS :has() pseudo-class styles elements based on their relatives, like children or siblings. This gives you powerful control over your styles by selecting elements based on what they contain.',
      image: '/images/blog/has-pseudo-class.webp',
      keywords: ['Advent Calendar', 'CSS', 'Web Development'],
      date: '2024-12-02',
    },
  ],
  [
    'css-user-valid-user-invalid-explained',
    {
      title: 'CSS :user-valid and :user-invalid Explained',
      description: 'The :user-valid and :user-invalid CSS pseudo-classes give instant visual feedback on form input, improving usability and accessibility by highlighting correct and incorrect entries.',
      image: '/images/blog/css-user-valid-user-invalid-explained.webp',
      keywords: ['Advent Calendar', 'CSS', 'Web Development'],
      date: '2024-12-05',
    },
  ],
  [
    'from-ember-to-next',
    {
      title: 'From Ember.js to Next.js: A Tale of Two Frameworks',
      description: 'Explore the differences and surprising similarities between Ember.js and Next.js, two powerful contenders in the web development world.',
      image: '/images/blog/from-ember-to-next.webp',
      keywords: ['EmberJS', 'NextJS', 'Lessons Learned'],
      date: '2024-05-07',
    },
  ],
  [
    'goodbye-twitter-x-hello-bluesky',
    {
      title: 'Goodbye Twitter, Hello Bluesky!',
      description: "I finally said 'goodbye' to Twitter/X and found my happy place on Bluesky! This post explores why I made the switch and what I'm loving about my new online home.",
      image: '/images/blog/goodbye-twitter-x-hello-bluesky.webp',
      keywords: ['Others'],
      date: '2024-11-22',
    },
  ],
  [
    'html-autofocus-explained',
    {
      title: 'HTML autofocus Explained',
      description: 'Autofocus in HTML automatically places the cursor in a form field, making user interaction smoother. Use it wisely, though, as overuse can be annoying and even cause accessibility issues.',
      image: '/images/blog/html-autofocus-explained.webp',
      keywords: ['Advent Calendar', 'HTML', 'Web Development'],
      date: '2024-12-03',
    },
  ],
  [
    'my-coding-christmas-four-advent-calendars',
    {
      title: 'My Coding Christmas: Four Advent Calendars!',
      description: "This December, I'm diving into four coding Advent calendars to learn more about HTML, CSS, Svelte, and TypeScript.",
      image: '/images/blog/advent-calendars.webp',
      keywords: ['Advent Calendar', 'Web Development'],
      date: '2024-12-02',
    },
  ],
  [
    'own-your-bluesky-identity',
    {
      title: 'Own Your Bluesky Identity',
      description: 'Ditch the default ".bsky.social" and claim your own domain as your Bluesky username! This easy guide shows you how to get verified and own your online identity.',
      image: '/images/blog/account-change-handle-bluesky.webp',
      keywords: ['Others'],
      date: '2024-11-23',
    },
  ],
  [
    'popover-api-explained',
    {
      title: 'Popover API Explained',
      description: 'The Popover API lets you easily create and control those handy content bubbles that pop up on webpages, offering improved accessibility and standardization for a smoother user experience.',
      image: '/images/blog/popover-api-explained.webp',
      keywords: ['Advent Calendar', 'HTML', 'JS', 'CSS', 'Web Development'],
      date: '2024-12-06',
    },
  ],
  [
    'the-typescript-tightrope',
    {
      title: 'The Typescript Tightrope: A Love-Hate Journey',
      description: "My journey from TypeScript skeptic to enthusiast - how static typing transformed my code and why I believe it's the future.",
      image: '/images/blog/the-typescript-tightrope.webp',
      keywords: ['Web Development', 'TypeScript', 'Lessons Learned'],
      date: '2024-05-04',
    },
  ],
]);
