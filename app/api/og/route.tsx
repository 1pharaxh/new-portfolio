// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Route segment config
export const runtime = "edge";

// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  // Extract title from query parameters
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");

  // // Fetch the Outfit font from the specified URL
  // const font = fetch(
  //   new URL("../../../fonts/GeistVF.woff", import.meta.url)
  // ).then((res) => res.arrayBuffer());
  // const fontData = await font;

  // Create an ImageResponse with dynamic content
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
            backgroundSize: "100rem 80rem",
          }}
          tw="absolute inset-0 -z-10 h-full w-full bg-white flex justify-center p-32   items-start"
        >
          <h2 tw="text-center text-6xl font-medium">
            {`${postTitle} | Akarshan Mishra`}
          </h2>
          <div
            style={{
              backgroundImage:
                "radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)",
            }}
            tw="absolute bottom-0 left-0 right-0 top-0 "
          ></div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      width: 1920,
      height: 1080,
      // fonts: [
      //   {
      //     name: "Outfit",
      //     data: fontData,
      //     style: "normal",
      //   },
      // ],
    }
  );
}
