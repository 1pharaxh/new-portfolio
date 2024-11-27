"server only";

import { revalidatePath } from "next/cache";

export async function getAccessToken() {
  try {
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
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
}

export async function getLastPlayedTrack() {
  try {
    const { access_token } = await getAccessToken().catch((error) => {
      throw new Error(`An error occurred: ${error}`);
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
    revalidatePath("/");
    return data.items[0];
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
}
