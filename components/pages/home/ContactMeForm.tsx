'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactMeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const misssingFields = [];

      if (formData.get('name') === '') {
        misssingFields.push('name');
      }

      if (formData.get('email') === '') {
        misssingFields.push('email');
      }

      if (formData.get('message') === '') {
        misssingFields.push('message');
      }

      if (misssingFields.length > 0) {
        toast('Action Required', {
          description: `Please fill in the following fields: ${misssingFields.join(
            ', '
          )}`,
        });

        return;
      }

      setIsSubmitting(true);
      const result = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await result.json();

      if (data.error) {
        toast('Uh oh! Something went wrong.', {
          description: 'There was a problem with your request.',
        });
      } else {
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
        toast('Message Sent', {
          description: 'Thank you for your message!',
        });
      }
      setIsSubmitting(false);
    },
    [name, email, message]
  );

  if (sent) {
    return (
      <div className="rounded-xl border-2 border-transparent [border-image:linear-gradient(90deg,rgba(59,130,246,0.6),rgba(34,211,238,0.5),rgba(168,85,247,0.6))_1] p-6 dark:bg-gray-950">
        <h3 className="font-oswald text-xl mb-2">Message sent</h3>
        <p className="dark:text-gray-400">
          Thanks for reaching out. I’ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="grid gap-6 text-black content-visibility-auto"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label htmlFor="name" className="dark:text-gray-400">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="email" className="dark:text-gray-400">
            Email
          </Label>
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
        <Label htmlFor="message" className="dark:text-gray-400">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button
        className="justify-self-end text-gray-950 bg-white dark:text-white dark:bg-gray-950 rounded-md border border-gray-700 m-1 px-6 py-3 text-sm font-medium hover:border-t-purple-500 hover:border-r-purple-500 hover:border-b-blue-400 hover:border-l-blue-400 focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:hover:bg-gray-950 hover:bg-white"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
