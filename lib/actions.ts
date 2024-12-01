"server only";

import { revalidatePath } from "next/cache";

export async function getAccessToken(
  type: "last_played" | "currently_playing"
): Promise<any> {
  try {
    let refresh_token;
    if (type === "last_played") {
      refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
    }
    if (type === "currently_playing") {
      refresh_token = process.env.SPOTIFY_CURR_REFRESH_TOKEN;
    }
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
    const { access_token } = await getAccessToken("last_played").catch(
      (error) => {
        throw new Error(`An error occurred: ${error}`);
      }
    );
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
    if (!data.items || data.items.length === 0) {
      return [400, {}];
    } else {
      return [res.status, data.items[0]];
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return [400, {}];
  }
}

export async function getCurrentlyPlaying() {
  try {
    const { access_token } = await getAccessToken("currently_playing").catch(
      (error) => {
        throw new Error(`An error occurred: ${error}`);
      }
    );
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await res.json();
    revalidatePath("/");
    if (data === undefined || (data.error && data.error.status !== 200)) {
      return [400, {}];
    } else {
      return [res.status, data.item];
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return [400, {}];
  }
}
