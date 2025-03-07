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

    // Fonts
    const interBold = await fetch(
      new URL("../../../public/fonts/Inter-Bold.otf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const interRegular = await fetch(
      new URL("../../../public/fonts/Inter-Regular.otf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter",
            position: "relative",
            padding: "40px",
          }}
        >
          {/* Background gradient with subtle pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(circle at 10% 10%, rgba(0,0,0,0.02) 0%, transparent 60%)",
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
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#3b82f6" />
              <path
                d="M7 8h10M7 12h10M7 16h6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p style={{ fontSize: 24, fontWeight: "bold", color: "#334155" }}>
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
            }}
          >
            {tool && (
              <div
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#3b82f680",
                  borderRadius: "99px",
                  color: "#1e3a8a",
                  fontSize: 20,
                  display: "inline-block",
                  alignSelf: "center",
                  marginBottom: "4px",
                  fontWeight: "bold",
                }}
              >
                {tool}
              </div>
            )}

            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: "#0f172a",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: 32,
                color: "#475569",
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
            }}
          >
            <p
              style={{
                fontSize: 24,
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontWeight: "normal" }}>www.textstash.com</span>
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            weight: 700,
            style: "normal",
          },
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
