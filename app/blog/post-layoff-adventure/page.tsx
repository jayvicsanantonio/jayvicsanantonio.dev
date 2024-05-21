import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import CalendarIcon from "@/components/icons/calendar";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8">
      <BlogBreadcrumb title='From Yahoo Y! to "Yahoo, New Opportunities!"' />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight">
          From Yahoo Y! to "Yahoo, New Opportunities!": My Post-Layoff Adventure
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4" />
          <span>May 19, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="The Typescript Tightrope: A Love-Hate Journey Image"
          className="rounded-lg object-cover border border-gray-800"
          height={250}
          src="/images/blog/post-layoff-adventure.png"
          style={{
            aspectRatio: "400/250",
            objectFit: "cover",
          }}
          width={400}
        />
      </div>

      <p>
        It's been almost a year since the world seemed to tilt on its axis. That
        innocuous Monday morning in June 2023 started like any other, but a
        calendar invite titled "Company Restructuring Update" shattered the
        normalcy. Walking into that meeting, a knot of dread formed in my
        stomach. The news that hit us – a large portion of the team, myself
        included, were being impacted by a company restructuring – was a blow.
        For 7 years, Yahoo had been my web development haven, a place where I
        thrived alongside incredible colleagues and felt a deep sense of purpose
        in the ever-evolving tech world. Suddenly, that familiar world dissolved
        around me.
      </p>
      <p>
        Let's be frank, a layoff is a sucker punch. It disrupts routines you've
        built, throws your identity into question, and leaves you staring down a
        future shrouded in uncertainty. The initial wave of denial, anger, and
        maybe even a desperate attempt to bargain with the universe is real. For
        a few days, I won't deny it, I indulged in some questionable dance moves
        fueled by questionable pizza choices (hey, self-care takes many forms!).
      </p>
      <p>
        But dwelling on the "what ifs" wasn't going to change the situation.
        Instead, I took a deep breath and decided to view this as an unexpected
        opportunity for a strategic pivot. It was time to channel my inner web
        developer and approach this new challenge with the same problem-solving
        mindset I applied to my code.
      </p>
      <h3 className="font-oswald text-2xl">
        The Job Market Maze: A Developer's Quest
      </h3>
      <p>
        The job search landscape can feel like a labyrinth, a confusing maze of
        Applicant Tracking Systems (ATS) and fierce competition for skilled
        positions. But here's the thing, I'm not just any developer – I'm a
        resourceful one with a knack for cracking complex problems. So, I
        started applying my coding skills to this new quest. I meticulously
        crafted my resume to resonate with the ever-evolving preferences of the
        ATS gods, all while ensuring it showcased my unique skillset and the
        value I bring to the table.
      </p>
      <p>
        Let's not sugarcoat it – rejections sting. But with each one, I learned
        a valuable lesson. Maybe the resume needed a tweak, or perhaps the cover
        letter didn't quite capture the essence of my experience. Every "thanks,
        but no thanks" email provided crucial feedback, allowing me to refine my
        approach and become a more strategic job seeker.
      </p>
      <h3 className="font-oswald text-2xl">
        Continuous Learning: Fueling the Fire
      </h3>
      <p>
        This unexpected break has opened doors I might have otherwise
        overlooked. Suddenly, I have the time and headspace to delve into
        exciting online courses, workshops, and certifications that further
        enhance my skillset. Right now, I'm particularly interested in exploring
        [New Skill]. It's an area that complements my existing expertise and
        broadens my career horizons, making me a more well-rounded developer.
      </p>
      <h3 className="font-oswald text-2xl">
        The Network Effect: Building Bridges and Opportunities
      </h3>
      <p>
        Building strong professional relationships has always been a priority
        for me, and that's even more true now. I'm actively reconnecting with
        former colleagues, reaching out to industry contacts, and participating
        in online developer communities. This strategic networking not only
        strengthens existing bonds, but it also opens doors to potential
        opportunities I might not have discovered on my own. Who knows, maybe
        that connection on LinkedIn will lead to the perfect job, or perhaps it
        will simply offer valuable insights into the current tech landscape.
      </p>
      <h3 className="font-oswald text-2xl">
        The Road Ahead: Optimism with Open Eyes
      </h3>
      <p>
        Look, a layoff isn't a walk on the beach. It's a challenging experience
        that can test your resilience and leave you questioning your path.
        However, there's also a silver lining. It can be a catalyst for growth,
        exploration, and maybe even the discovery of new passions. While the
        immediate future might be a bit uncertain, I'm approaching this
        challenge with a spirit of optimism and a commitment to continuous
        learning and professional development.
      </p>
      <p>
        To my fellow job seekers out there, you're not alone. We're in this
        together. Let's leverage our skills, adapt to the changing landscape,
        and keep moving forward. Feel free to reach out if you need a
        motivational pep talk, some coding advice, or simply want to connect.
        Here's to a bright future, and remember, even a sunset in Sunnyvale can
        lead to a beautiful new sunrise, filled with exciting possibilities.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge className="text-sm" variant="secondary">
          Career
        </Badge>
        <Badge className="text-sm" variant="secondary">
          Opinion
        </Badge>
        <Badge className="text-sm" variant="secondary">
          Lessons Learned
        </Badge>
      </div>
    </article>
  );
}
