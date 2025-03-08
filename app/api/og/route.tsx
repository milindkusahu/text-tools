import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    // Parse URL parameters
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "TextStash";
    const description =
      searchParams.get("description") || "Free online text tools";
    const tool = searchParams.get("tool") || "";

    // Color theme - can be passed as a param or defaulted
    const theme = searchParams.get("theme") || "blue";

    // Theme colors
    const themes = {
      blue: {
        gradient: "linear-gradient(135deg, #f8fafc, #dbeafe, #bfdbfe)",
        accent: "#3b82f6",
        accentLight: "#93c5fd",
        text: "#1e3a8a",
        textSecondary: "#475569",
      },
      purple: {
        gradient: "linear-gradient(135deg, #faf5ff, #e9d5ff, #d8b4fe)",
        accent: "#8b5cf6",
        accentLight: "#c4b5fd",
        text: "#4c1d95",
        textSecondary: "#6b7280",
      },
      green: {
        gradient: "linear-gradient(135deg, #f0fdf4, #dcfce7, #bbf7d0)",
        accent: "#22c55e",
        accentLight: "#86efac",
        text: "#14532d",
        textSecondary: "#4b5563",
      },
    };

    // Select theme or default to blue
    const activeTheme = themes[theme as keyof typeof themes] || themes.blue;

    return new ImageResponse(
      (
        <div
          style={{
            background: activeTheme.gradient,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            position: "relative",
            padding: "40px",
            overflow: "hidden",
          }}
        >
          {/* Background patterns */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(circle at 10% 10%, rgba(0,0,0,0.03) 0%, transparent 50%)",
              zIndex: 1,
            }}
          />

          {/* Abstract shapes in background */}
          <div
            style={{
              position: "absolute",
              bottom: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `${activeTheme.accentLight}40`,
              filter: "blur(60px)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: -50,
              left: -50,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `${activeTheme.accentLight}30`,
              filter: "blur(60px)",
              zIndex: 0,
            }}
          />

          {/* Logo and site name */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 40,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              zIndex: 2,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill={activeTheme.accent} />
              <path
                d="M7 8h10M7 12h10M7 16h6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: activeTheme.text,
              }}
            >
              TextStash
            </p>
          </div>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "80%",
              textAlign: "center",
              gap: "24px",
              marginTop: tool ? "-20px" : "0",
              zIndex: 2,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {tool && (
              <div
                style={{
                  padding: "8px 16px",
                  backgroundColor: `${activeTheme.accent}30`,
                  borderRadius: "99px",
                  color: activeTheme.text,
                  fontSize: 20,
                  display: "inline-block",
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  border: `1px solid ${activeTheme.accent}80`,
                }}
              >
                {tool}
              </div>
            )}

            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: activeTheme.text,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: 32,
                color: activeTheme.textSecondary,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          </div>

          {/* Domain and attribution */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                borderRadius: "99px",
                padding: "8px 20px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <p
                style={{
                  fontSize: 24,
                  color: activeTheme.textSecondary,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontWeight: "normal" }}>www.textstash.com</span>
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log("An unknown error occurred");
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
