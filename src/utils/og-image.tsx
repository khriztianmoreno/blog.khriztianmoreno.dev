import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { AUTHOR } from "@/config";
import fs from "node:fs";
import path from "node:path";

interface OgImageOptions {
  title: string;
  date: string;
  tags?: string[];
}

// Load images as base64
function getImageBase64(filename: string): string {
  const imagePath = path.join(process.cwd(), "public", filename);
  const imageBuffer = fs.readFileSync(imagePath);
  return `data:image/png;base64,${imageBuffer.toString("base64")}`;
}

// Dracula theme colors
const colors = {
  background: "#0d1117",
  darker: "#161b22",
  purple: "#bd93f9",
  pink: "#ff79c6",
  cyan: "#8be9fd",
  green: "#50fa7b",
  orange: "#ffb86c",
  light: "#f8f8f2",
  comment: "#6272a4",
};

export async function generateOgImage(
  options: OgImageOptions
): Promise<Buffer> {
  const { title, date, tags = [] } = options;

  // Load images
  const logoBase64 = getImageBase64("logo.png");
  const nameBase64 = getImageBase64("name.png");

  // Load fonts
  const fontData = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff"
  ).then((res) => res.arrayBuffer());

  const fontDataBold = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-900-normal.woff"
  ).then((res) => res.arrayBuffer());

  const displayTags = tags.slice(0, 3);
  const titleFontSize = title.length > 60 ? 42 : title.length > 40 ? 48 : 56;

  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        background: `linear-gradient(145deg, ${colors.background} 0%, #1e1e3f 35%, ${colors.darker} 65%, #1a1a2e 100%)`,
        fontFamily: "Inter",
      }}
    >
      {/* Top section with name/brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={nameBase64}
          alt="khriztianmoreno"
          width={400}
          height={50}
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      {/* Main content - Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 1,
          justifyContent: "center",
          paddingRight: "40px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: `${titleFontSize}px`,
            fontWeight: 900,
            color: colors.light,
            lineHeight: 1.2,
            letterSpacing: "-1px",
            textShadow: `0 4px 30px ${colors.purple}40`,
          }}
        >
          {title}
        </div>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {displayTags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${colors.purple}30, ${colors.pink}20)`,
                  border: `1px solid ${colors.purple}60`,
                  color: colors.purple,
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom section - Author and date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${colors.comment}40`,
          paddingTop: "24px",
        }}
      >
        <img
          src={logoBase64}
          alt="Logo"
          width={200}
          height={60}
          style={{
            objectFit: "contain",
            marginLeft: "-12px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${colors.orange}20, ${colors.pink}15)`,
            border: `1px solid ${colors.orange}40`,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              fontWeight: 700,
              color: colors.orange,
            }}
          >
            📅 {date}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontDataBold,
          weight: 900,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}

export function formatDateForOg(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
