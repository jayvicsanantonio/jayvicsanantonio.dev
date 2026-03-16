import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function WorkOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #052e16 0%, #15803d 58%, #14532d 100%)",
          color: "#f0fdf4",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2, color: "#bbf7d0" }}>EXPERIENCE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05 }}>
            Enterprise Platform Engineering
          </div>
          <div style={{ fontSize: 34, color: "#dcfce7" }}>Career timeline of Jayvic San Antonio</div>
        </div>
      </div>
    ),
    size,
  );
}
