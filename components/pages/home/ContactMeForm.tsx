"use client";

import { useCallback, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ContactMeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const misssingFields = [];

      if (formData.get("name") === "") {
        misssingFields.push("name");
      }

      if (formData.get("email") === "") {
        misssingFields.push("email");
      }

      if (formData.get("message") === "") {
        misssingFields.push("message");
      }

      if (misssingFields.length > 0) {
        toast({
          variant: "destructive",
          title: "Action Required",
          description: `Please fill in the following fields: ${misssingFields.join(
            ", "
          )}`,
        });

        return;
      }

      const result = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await result.json();

      if (data.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        // Clear form fields after submitting successfully
        setName("");
        setEmail("");
        setMessage("");

        toast({
          title: "Message Sent",
          description: "Thank you for your message!",
        });
      }
    },
    [name, email, message]
  );

  return (
    <form action={handleSubmit} className="grid gap-6 text-black">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-4">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button
        className="justify-self-end rounded-md border border-gray-700 px-6 py-3 text-sm font-medium hover:border-violet-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 transition ease-in-out   hover:-translate-y-1 hover:scale-110"
        type="submit"
      >
        Send Message
      </Button>
    </form>
  );
}
