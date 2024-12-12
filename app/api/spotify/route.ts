export const dynamic = "force-dynamic";

// Import required modules and constants
import { NextResponse } from "next/server";

// Route segment config
export const runtime = "edge";

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

const getLastPlayingSong = async () => {
  const { access_token } = await getAccessToken("last_played").catch(
    (error) => {
      throw new Error(`An error occurred: ${error}`);
    }
  );

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }
  return data.items[0];
};

const getCurrentSong = async () => {
  const { access_token } = await getAccessToken("currently_playing").catch(
    (error) => {
      console.error("An error occurred:", error);
      return new NextResponse("An error occurred", { status: 500 });
    }
  );

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (response.status === 204) {
    return null;
  }
  const data = await response.json();
  if (data === undefined || (data.error && data.error.status !== 200)) {
    return null;
  }

  return data.item;
};

// First define interface for consistent song data
interface SongData {
  songUrl: string;
  artistUrl: string;
  songName: string;
  artistName: string;
  isCurrentlyPlaying: boolean;
}

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      let isControllerClosed = false;
      while (!isControllerClosed) {
        try {
          // Try to get currently playing first
          const currentSong = await getCurrentSong();
          let songData: SongData;

          if (
            currentSong !== undefined &&
            currentSong !== null &&
            currentSong &&
            !currentSong.error
          ) {
            songData = {
              songUrl: currentSong.external_urls.spotify,
              artistUrl: currentSong.artists[0].external_urls.spotify,
              songName: currentSong.name,
              artistName: currentSong.artists[0].name,
              isCurrentlyPlaying: true,
            };
          } else {
            const lastPlayed = await getLastPlayingSong();

            songData = {
              songUrl: lastPlayed.track.external_urls.spotify,
              artistUrl: lastPlayed.track.artists[0].external_urls.spotify,
              songName: lastPlayed.track.name,
              artistName: lastPlayed.track.artists[0].name,
              isCurrentlyPlaying: false,
            };
          }

          const event = `data: ${JSON.stringify(songData)}\n\n`;
          controller.enqueue(new TextEncoder().encode(event));
          await new Promise((resolve) => setTimeout(resolve, 10000));
        } catch (error) {
          console.error("Stream error:", error);
          isControllerClosed = true;
          controller.error(error);
          break;
        }
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "Content-Encoding": "none",
    },
  });
}
