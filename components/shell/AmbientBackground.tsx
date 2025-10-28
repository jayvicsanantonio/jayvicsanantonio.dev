export default function AmbientBackground() {
  return (
    <div className="ambient-background pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(168,85,247,0.12),transparent_60%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.04] mix-blend-overlay" />

      {/* Grain */}
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.06] mix-blend-soft-light" />
    </div>
  );
}
