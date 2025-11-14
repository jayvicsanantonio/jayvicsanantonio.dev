import ClientAppShell from "@/components/shell/ClientAppShell.client";
import ScrollProvider from "@/components/shell/ScrollProvider.client";

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
      } relative flex min-h-screen flex-col text-gray-200 bg-black touch-manipulation overscroll-y-contain`}
    >
      <ScrollProvider>
        <ClientAppShell>{children}</ClientAppShell>
      </ScrollProvider>
    </body>
  );
}
