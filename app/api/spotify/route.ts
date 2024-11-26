// Import required modules and constants
import { NextRequest, NextResponse } from "next/server";

// Route segment config
export const runtime = "nodejs";

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refresh_token) {
    throw new Error("Missing Spotify refresh token");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  try {
    const { access_token } = await getAccessToken().catch((error) => {
      console.error("An error occurred:", error);
      return new NextResponse("An error occurred", { status: 500 });
    });
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await res.json();
    return new NextResponse(JSON.stringify(data.items[0]), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
