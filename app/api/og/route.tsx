// Import required modules and constants
import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

// Route segment config
export const runtime = "nodejs";

// Define a timeout function
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  let browser;
  const browserPath = await chromium.executablePath(
    "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
  );
  try {
    browser = await puppeteerCore.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: browserPath,
    });
    if (!browser) {
      return new NextResponse("Fail to initialise browser", { status: 500 });
    }
    const page = await browser.newPage();
    const baseUrl = req.nextUrl.origin;
    await page.goto(`${baseUrl}/?hideDock=true`);
    await timeout(500);

    const screenshot = await page.screenshot({ type: "png", fullPage: true });

    return new NextResponse(screenshot, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return new NextResponse(error as string, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
