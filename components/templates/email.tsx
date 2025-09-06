import { FC } from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({ name, email, message }) => (
  <div className="bg-gray-100 p-4">
    <table className="w-full">
      <thead>
        <tr>
          <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-gray-700">
            Message from Your Website
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b border-gray-200 px-4 py-4">
            <p className="text-gray-700">Hi there,</p>
            <p className="text-gray-700">
              You have a new message from {name} ({email}) on your website.
            </p>
            <h2 className="mt-4 text-xl font-bold text-gray-700">Message:</h2>
            <p className="text-gray-700">{message}</p>
            <p className="mt-4 text-gray-700">Thank you,</p>
            <p className="text-gray-700">Your Website</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
