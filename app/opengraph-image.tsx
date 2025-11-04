import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0b1220 0%, #111827 60%, #0f172a 100%)",
          color: "#e5e7eb",
          padding: 64,
        }}
      >
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: -1.2,
          }}
        >
          Jayvic San Antonio
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#9ca3af",
            maxWidth: 960,
          }}
        >
          Full-Stack Software Engineer building high‑performance web experiences.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          jayvicsanantonio.dev
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
