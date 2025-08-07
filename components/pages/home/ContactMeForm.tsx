"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function ContactMeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      setIsSubmitting(true);
      
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
        toast.error("Action Required", {
          description: `Please fill in the following fields: ${misssingFields.join(
            ", "
          )}`,
        });
        setIsSubmitting(false);
        return;
      }

      try {
        const result = await fetch("/api/send", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        });

        const data = await result.json();

        if (result.ok) {
          toast.success("Message Sent Successfully! 🎉", {
            description: "Thank you for reaching out. I'll get back to you soon!",
          });

          // Reset form
          setName("");
          setEmail("");
          setMessage("");
        } else {
          throw new Error(data.error || "Failed to send message");
        }
      } catch (error) {
        toast.error("Failed to Send Message", {
          description: "Please try again or contact me directly via email.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, email, message]
  );

  return (
    <form action={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label 
            htmlFor="name" 
            className="text-pearl font-medium"
          >
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-charcoal/50 border-pewter/30 text-pearl placeholder:text-silver/50 focus:border-amber/50 focus:ring-amber/20 transition-colors duration-300"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label 
            htmlFor="email" 
            className="text-pearl font-medium"
          >
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-charcoal/50 border-pewter/30 text-pearl placeholder:text-silver/50 focus:border-amber/50 focus:ring-amber/20 transition-colors duration-300"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label 
          htmlFor="message" 
          className="text-pearl font-medium"
        >
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or idea..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-charcoal/50 border-pewter/30 text-pearl placeholder:text-silver/50 focus:border-amber/50 focus:ring-amber/20 transition-colors duration-300 min-h-[120px] resize-none"
          required
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full group text-lg py-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
      
      <p className="text-silver/60 text-sm text-center">
        Your information is secure and will never be shared with third parties.
      </p>
    </form>
  );
}
