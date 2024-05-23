import Link from "next/link";
import Image from "next/image";
import CalendarIcon from "@/components/icons/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Component() {
  return (
    <section className="mx-auto w-full  bg-gray-950 text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Laboratory
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-200 md:text-3xl/tight lg:text-4xl">
            Experimenting with Code
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to the Lab! This is where I share my coding experiments and
            projects. Dive into a collection of code snippets from my
            CodeSandbox and CodePen accounts.
          </p>
        </div>
        <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
          <CardContent className="flex-1 -p-6">
            <iframe
              src="https://codesandbox.io/embed/qlnxgn?view=preview&module=%2Fstyles.css&hidenavigation=1"
              style={{
                width: "100%",
                height: "500px",
                border: 0,
                borderRadius: "4px",
                overflow: "hidden",
              }}
              title="Total Solar Eclipse"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </CardContent>
          <CardFooter className="bg-gray-950 text-gray-2000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
            <div className="space-y-2">
              <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight">
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
              <p className="text-gray-200 pt-4">
                This HTML and CSS code snippet creates a total solar eclipse
                animation. The HTML defines a div structure for the sun and moon
                within a centered container. The CSS uses radial gradients to
                style the sun, a solid color for the moon, and keyframe
                animations to move the moon across the sun, simulating an
                eclipse effect. This snippet was inspired by the recent total
                solar eclipse that happened on April 8, 2024, which moved across
                North America, passing over Mexico, the United States, and
                Canada.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
