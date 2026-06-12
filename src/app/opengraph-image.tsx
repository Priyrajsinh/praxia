// Colour values are hard-coded because next/og ImageResponse cannot resolve
// CSS custom properties. Keep in sync with :root tokens in globals.css.
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Praxia â€” The route from first principles to the frontier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "64px",
        background: "#f4efe4",
        position: "relative",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Route line â€” decorative vertical squiggle */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 80,
          height: "100%",
          width: 60,
          opacity: 0.18,
        }}
        viewBox="0 0 60 630"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 30 20 C 38 80 22 140 32 200 C 42 260 20 320 30 380 C 40 440 22 500 30 590"
          stroke="#b4452f"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand + eyebrow */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <span
          style={{
            fontSize: 22,
            color: "#b4452f",
            marginBottom: 16,
            letterSpacing: "0.06em",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          A field guide, not a roadmap clone
        </span>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1f1b16",
            lineHeight: 1.05,
            margin: 0,
            maxWidth: 900,
            letterSpacing: "-0.02em",
            fontFamily: "Georgia, serif",
          }}
        >
          The route from first principles to the frontier.
        </h1>

        <p
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#6b5f4f",
            lineHeight: 1.5,
            maxWidth: 780,
            margin: "24px 0 0 0",
            fontFamily: "Georgia, serif",
          }}
        >
          One map. Five stages. Foundations â†’ AI Engineer + Research track.
          Curated, ranked, sequenced.
        </p>

        {/* Brand name */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#6b5f4f",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "Georgia, serif",
            }}
          >
            Praxia
          </span>
          <span style={{ color: "#b8ab95", fontSize: 22 }}>Â·</span>
          <span
            style={{
              fontSize: 18,
              color: "#b8ab95",
              fontFamily: "Georgia, serif",
            }}
          >
            praxia.vercel.app
          </span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
