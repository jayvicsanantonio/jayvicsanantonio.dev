import ClientAppShell from '@/components/shell/ClientAppShell.client';
import PerformanceAuditor from '@/components/PerformanceAuditor.client';

export default function Body({
  children,
  fontVars,
}: {
  children: React.ReactNode;
  fontVars?: string;
}) {
  return (
    <body
      className={`dark ${fontVars ?? ''} flex min-h-screen flex-col text-gray-200 dark:bg-gray-950 touch-manipulation overscroll-y-contain`}
    >
      <PerformanceAuditor />
      <ClientAppShell>{children}</ClientAppShell>
    </body>
  );
}
