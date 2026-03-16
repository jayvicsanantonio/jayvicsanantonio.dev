import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function ProjectsOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #0f172a 0%, #1d4ed8 55%, #0f172a 100%)",
          color: "#f8fafc",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2, color: "#bfdbfe" }}>PROJECTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            Production Web Applications
          </div>
          <div style={{ fontSize: 34, color: "#dbeafe" }}>Case studies by Jayvic San Antonio</div>
        </div>
      </div>
    ),
    size,
  );
}
