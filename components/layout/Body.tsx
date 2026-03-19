import ClientAppShell from "@/components/layout/ClientAppShell";
import ScrollProvider from "@/components/layout/ScrollProvider";

export default function Body({
  children,
  fontVars,
}: {
  children: React.ReactNode;
  fontVars?: string;
}) {
  return (
    <body
      className={`dark ${
        fontVars ?? ""
      } relative flex min-h-screen flex-col bg-black text-gray-200 touch-manipulation`}
    >
      <ScrollProvider>
        <ClientAppShell>{children}</ClientAppShell>
      </ScrollProvider>
    </body>
  );
}
