import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "@/components/icons/check";

export default function Work() {
  return (
    <section className="w-full  bg-gray-950 text-gray-200">
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Work Experience
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-200 md:text-3xl/tight lg:text-4xl">
            Crafting Impactful Solutions
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore my diverse work history and the innovative projects I've
            been a part of.
          </p>
        </div>
        <div className="col-span-2 grid gap-6">
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Software Dev Engineer II
                </h3>
                <p className="text-gray-400">Yahoo Inc.</p>
              </div>
              <span className="text-gray-400">2019 - 2023</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Rebuilt the App Marketing business of the Yahoo Demand Side
                Platform as a core developer using Ember, Java and MySQL and
                generating over $140M in advertising spend since it launched
                while successfully overcoming challenges posed by Apple’s iOS
                14.5 IDFA opt-out feature
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Optimized Yahoo DSP Email Audience Builder Upload feature by
                transforming its capacity from 2M to 25M records, a 1150%
                improvement, inspiring other UI performance initiatives, and
                preventing potential revenue impact, executed single-handedly
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Designed and built a wide range of Yahoo DSP features, from
                UI/UX improvements to revenue-generating initiatives,
                demonstrating software engineering skills through consistent use
                of reusable components, proper end-to-end testing, and gaining
                the trust of senior peers to build the foundational frameworks
                and complex Ember components
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Fostered a culture of collaboration and growth by mentoring
                junior engineers and new hires, creating a positive environment
                where they could feel comfortable discussing technical concepts,
                and asking questions
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Contributed to an Ember open source project
                (https://github.com/ember-learn/upgrade-guide) and was
                recognized in Ember Times - Issue No. 166, streamlining app
                upgrades with detailed insights on new features, deprecations,
                and breaking changes across Ember core, Ember Data, and Ember
                CLI from older versions to newer ones
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                React
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Ember
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Express
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Node
              </Badge>
              <Badge className="text-sm" variant="secondary">
                JS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                HTML
              </Badge>
              <Badge className="text-sm" variant="secondary">
                CSS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                AWS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Java
              </Badge>
              <Badge className="text-sm" variant="secondary">
                MySQL
              </Badge>
              <Badge className="text-sm" variant="secondary">
                AdTech
              </Badge>
            </div>
          </div>
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Software Dev Engineer
                </h3>
                <p className="text-sm text-gray-400">Yahoo Inc.</p>
              </div>
              <span className="text-sm text-gray-400">2016 - 2019</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Built the Yahoo DSP Replay tool autonomously with React,
                enabling streamlined testing and validation of legitimate bid
                requests, significantly improving the productivity of the
                Product Support Team, and helping identify and debug issues
                quickly, a critical component of the DSP Serving’s Real Time
                Bidding System
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Contributed to front-end and back-end development of DMP (Data
                Management Platform), a key component of the Yahoo DSP utilizing
                Ember, Java, and MySQL, generating several millions of dollars
                in revenue
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Explored the adoption of Cypress.io to address the pain points
                of flaky end-to-end tests in Selenium, facilitated meetings to
                share insights on how to write simple reliable tests in
                JavaScript, resulting in increased team interest and engagement,
                with multiple team members integrating Cypress.io into our build
                pipeline successfully
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Contributed to upgrading Yahoo DSP’s Ember framework, enhancing
                performance, security, and developer experience, unlocking new
                capabilities and ecosystem of add-ons, ensuring compatibility
                with future updates, and resulting in a better product and
                increased customer satisfaction, as a key maintenance
                contributor
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                React
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Ember
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Express
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Node
              </Badge>
              <Badge className="text-sm" variant="secondary">
                JS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                HTML
              </Badge>
              <Badge className="text-sm" variant="secondary">
                CSS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Java
              </Badge>
              <Badge className="text-sm" variant="secondary">
                MySQL
              </Badge>
              <Badge className="text-sm" variant="secondary">
                AdTech
              </Badge>
            </div>
          </div>
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Co-Founder
                </h3>
                <p className="text-sm text-gray-400">
                  Saffron Technologies Inc.
                </p>
              </div>
              <span className="text-sm text-gray-400">2015 - 2016</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Represented the company and pitched at local and international
                events, including the RISE Conference 2015 in Hong Kong and
                National Science and Technology Week 2015 in the Philippines,
                resulting in potential business partnerships and increased brand
                awareness.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Achieved recognition in the Philippine tech industry, having
                been featured in a number of top tech blogs and news websites
                such as Deal Street Asia, Enterprise Innovation, KabayanTech,
                The Philippine Star and BusinessMirror for winning the IdeaSpace
                2015 Startup Competition, which resulted in increased media
                coverage and brand visibility.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Supported our CEO for the research, design and implementation of
                Bluetooth Low Energy technology in a wearable device (Croo),
                resulting in significant cost savings and improved product
                reliability.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Collaborated with our COO and CTO in architecting and
                implementing a scalable and reliable AWS infrastructure to
                support the Croo Android application that complements our IoT
                Croo wearable, delivering a seamless user experience.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Created and configured automated deployment processes using
                Puppet, resulting in streamlined and efficient updates and
                reduced deployment errors.
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                AWS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Express
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Node
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Internet of Things
              </Badge>
            </div>
          </div>
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Senior Software Engineer
                </h3>
                <p className="text-sm text-gray-400">
                  Voyager Innovations Inc.
                </p>
              </div>
              <span className="text-sm text-gray-400">2016</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Demonstrated technical expertise and ability to thrive under
                pressure by leading my team to victory in several hackathons,
                including 1st Place finishes at Hack the Climate 2015 and HERE
                Hackathon Manila 2014, as well as a Semi-finalist ranking in the
                Google Cloud Developer Challenge 2013
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Authored an editorial titled "All I really need to know, I
                learned from Pinoy Hackathons," featured on GMA News Online, a
                highly regarded platform among the top news websites in the
                Philippines.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Developed and delivered the back-end of Lendr, the Philippines’
                first fully digital, end-to-end consumer loan platform, using
                Node and Express, collaborating with the team to ensure seamless
                project execution and timely delivery
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Implemented a scalable back-end system for a digital-media
                mobile application, Eat Bulaga! Mobile, leading a team of 3
                junior engineers and utilizing Sails.js, MongoDB, and Redis to
                handle multiple thousands of concurrent requests from 700K+
                active users
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Pioneered a culture of active participation in programming
                competitions and hackathons among Voyager engineers, resulting
                in increased creativity, knowledge and awareness of new tools
                and technologies
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                AWS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Express
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Node
              </Badge>
              <Badge className="text-sm" variant="secondary">
                SailsJS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Redis
              </Badge>
              <Badge className="text-sm" variant="secondary">
                MongoDB
              </Badge>
              <Badge className="text-sm" variant="secondary">
                FinTech
              </Badge>
            </div>
          </div>
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Software Engineering Analyst
                </h3>
                <p className="text-sm text-gray-400">
                  Voyager Innovations Inc.
                </p>
              </div>
              <span className="text-sm text-gray-400">2013 - 2015</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Developed the redesign of the existing stand-alone application,
                SmartNet, by participating in planning and initiation stages,
                implementing object-oriented design and JavaScript best
                practices, taking ownership of specific tasks, and delivering
                work with tight deadlines using Node, Sails.js, HTML, CSS,
                MongoDB, and Redis
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Refactored and optimized the codebase of Pinoy Hoops, a digital
                sports platform, using Express, jQuery, CSS, Pug, MongoDB and
                Redis
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                Express
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Node
              </Badge>
              <Badge className="text-sm" variant="secondary">
                SailsJS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                Redis
              </Badge>
              <Badge className="text-sm" variant="secondary">
                MongoDB
              </Badge>
              <Badge className="text-sm" variant="secondary">
                JS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                HTML
              </Badge>
              <Badge className="text-sm" variant="secondary">
                CSS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                jQuery
              </Badge>
            </div>
          </div>
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Intern
                </h3>
                <p className="text-sm text-gray-400">
                  University of the Philippines Diliman CRS
                </p>
              </div>
              <span className="text-sm text-gray-400">2012</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Collaborated with a team of interns to design and implement a
                new module that streamlined the registration process for
                thousands of students, leveraging PostgreSQL, PHP, CSS,
                JavaScript, and HTML, and optimized the database schema for
                improved data retrieval
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Applied theoretical knowledge to practice, demonstrating
                problem-solving and critical thinking skills in a real-world
                setting, and producing high-quality and maintainable code using
                CodeIgniter, contributing to the University's modern and
                efficient registration system
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                PostgreSQL
              </Badge>
              <Badge className="text-sm" variant="secondary">
                PHP
              </Badge>
              <Badge className="text-sm" variant="secondary">
                JS
              </Badge>
              <Badge className="text-sm" variant="secondary">
                HTML
              </Badge>
              <Badge className="text-sm" variant="secondary">
                CSS
              </Badge>
            </div>
          </div>
          <div className="group rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-oswald text-2xl group-hover:text-gray-200">
                  Helpdesk Trainee
                </h3>
                <p className="text-sm text-gray-400">
                  University of the Philippines Diliman Network
                </p>
              </div>
              <span className="text-sm text-gray-400">2011 - 2012</span>
            </div>
            <ul className="mt-4 space-y-3 text-base/relaxed">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Provided timely technical support to students, faculty, and
                staff of the University of the Philippines troubleshooting and
                resolving network-related issues to ensure uninterrupted access
                to essential resources in the Diliman campus
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Gained valuable experience working with Linux systems and
                developed a deep appreciation for open source projects
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-2000 dark:text-gray-400" />
                Collaborated effectively with a team of full-time Computer
                Center employees to maintain a high standard of service, earning
                recognition from supervisors and clients for exceptional
                customer service skills
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="text-sm" variant="secondary">
                Linux
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
