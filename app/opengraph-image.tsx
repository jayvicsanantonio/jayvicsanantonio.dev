import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(150deg, #030712 0%, #111827 45%, #1f2937 100%)",
          color: "#f9fafb",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 3, color: "#93c5fd" }}>JAYVICSANANTONIO.DEV</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>Jayvic San Antonio</div>
          <div style={{ fontSize: 36, color: "#e5e7eb" }}>Full-Stack Software Engineer</div>
        </div>
      </div>
    ),
    size,
  );
}
