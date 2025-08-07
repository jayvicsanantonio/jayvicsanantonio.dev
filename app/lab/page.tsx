import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function Page() {
  return (
    <section className="mx-auto w-full  dark:bg-gray-950 dark:text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Laboratory
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-950 dark:text-gray-200 md:text-3xl/tight lg:text-4xl">
            Experimenting with Code
          </h2>
          <p className="max-w-[600px] text-gray-950/70 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to the Lab! This is where I share my coding
            experiments. Dive into a collection of code snippets from
            my CodeSandbox and CodePen accounts.
          </p>
        </div>
        <div className="flex flex-col gap-8 py-12  dark:bg-gray-950 text-gray-200">
          <Card className="group flex flex-col h-full border-transparent dark:bg-gray-950 rounded-lg overflow-hidden shadow-md will-change-transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:transform-none">
            <CardContent className="relative flex-1 -p-6">
              <iframe
                src="https://codesandbox.io/embed/c894q8?view=preview&hidenavigation=1"
                style={{
                  width: '100%',
                  height: '500px',
                  border: 0,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                title="Christmas Countdown using Popover and Anchor Positioning APIs"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 to-transparent" />
              <div className="pointer-events-none absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs rounded-full px-2 py-1 bg-white/20 backdrop-blur text-white">
                Peek
              </div>
            </CardContent>
            <CardFooter className="dark:bg-gray-950 text-gray-2000 bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="space-y-2">
                <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight">
                  Christmas Countdown
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    HTML
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    JS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    CSS
                  </Badge>
                </div>
                <p className="dark:text-gray-200 pt-4">
                  This snippet playfully blends holiday spirit with
                  modern web APIs, featuring a dynamic countdown timer
                  and an interactive "Santa's Mail" popover built
                  using the widely supported Popover API. Distinct
                  from the popover, a div element positioned next to
                  the mailbox(anchor) demonstrates the precise element
                  placement achieved through the CSS Anchor
                  Positioning API (currently supported in Chrome and
                  Edge, with Firefox and Safari support forthcoming),
                  offering a glimpse into the future of web layout.
                  This festive experiment provides a fun way to track
                  the time until Christmas while exploring the
                  capabilities of these cutting-edge web APIs.
                </p>
              </div>
            </CardFooter>
          </Card>
          <Card className="group flex flex-col h-full border-transparent dark:bg-gray-950 rounded-lg overflow-hidden shadow-md will-change-transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:transform-none">
            <CardContent className="relative flex-1 -p-6">
              <iframe
                src="https://codesandbox.io/embed/23lnhc?view=preview&module=%2Fstyles.css&hidenavigation=1"
                style={{
                  width: '100%',
                  height: '500px',
                  border: 0,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                title="Aurora Borealis"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 to-transparent" />
              <div className="pointer-events-none absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs rounded-full px-2 py-1 bg-white/20 backdrop-blur text-white">
                Peek
              </div>
            </CardContent>
            <CardFooter className="dark:bg-gray-950 text-gray-2000 bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="space-y-2">
                <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight">
                  Aurora Borealis
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    HTML
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    CSS
                  </Badge>
                </div>
                <p className="dark:text-gray-200 pt-4">
                  This HTML and CSS code snippet creates a realistic
                  aurora borealis animation with a starry night sky.
                  The HTML structure includes a container with layers
                  for stars, and the aurora itself. The CSS uses
                  background images, gradient effects, and keyframe
                  animations to simulate twinkling stars, and the
                  flowing, colorful lights of the aurora borealis.
                  Inspired by the rare occurrence in May 2024, when
                  the auroras, also known as northern lights or the
                  aurora borealis, were visible throughout the San
                  Francisco Bay Area and reported as far south as San
                  Diego due to a solar storm.
                </p>
              </div>
            </CardFooter>
          </Card>
          <Card className="group flex flex-col h-full border-transparent dark:bg-gray-950 rounded-lg overflow-hidden shadow-md will-change-transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:transform-none">
            <CardContent className="relative flex-1 -p-6">
              <iframe
                src="https://codesandbox.io/embed/qlnxgn?view=preview&module=%2Fstyles.css&hidenavigation=1"
                style={{
                  width: '100%',
                  height: '500px',
                  border: 0,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                title="Total Solar Eclipse"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 to-transparent" />
              <div className="pointer-events-none absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs rounded-full px-2 py-1 bg-white/20 backdrop-blur text-white">
                Peek
              </div>
            </CardContent>
            <CardFooter className="dark:bg-gray-950 text-gray-2000 bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="space-y-2">
                <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight">
                  Total Solar Eclipse
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    HTML
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    CSS
                  </Badge>
                </div>
                <p className="dark:text-gray-200 pt-4">
                  This HTML and CSS code snippet creates a total solar
                  eclipse animation. The HTML defines a div structure
                  for the sun and moon within a centered container.
                  The CSS uses radial gradients to style the sun, a
                  solid color for the moon, and keyframe animations to
                  move the moon across the sun, simulating an eclipse
                  effect. This snippet was inspired by the recent
                  total solar eclipse that happened on April 8, 2024,
                  which moved across North America, passing over
                  Mexico, the United States, and Canada.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
