'use client';

export default function InitialPillOverlay() {
  return (
    <div
      className="pointer-events-none fixed left-1/2 z-[60] -translate-x-1/2 -translate-y-1/2"
      style={{ top: '46%' }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 'var(--nav-row-w, calc(96vw - 2 * var(--closeMaxX)))',
          height: 'var(--pill-h, calc(86vh - 2 * var(--closeMaxY)))',
          borderRadius: '384px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.14)',
        }}
      >
        <span
          className="font-semibold tracking-wide"
          style={{
            color: 'black',
            fontSize: 'clamp(14px, 2.1vw, 22px)',
            whiteSpace: 'nowrap',
          }}
        >
          Hi, I'm Jayvic 👋
        </span>
      </div>
    </div>
  );
}
