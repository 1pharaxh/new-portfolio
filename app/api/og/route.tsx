// Import required modules and constants
import { NextRequest, NextResponse } from "next/server";
import * as puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

const viewPort = { width: 650, height: 500 };

// Route segment config
export const runtime = "nodejs";

// Define a timeout function
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  let browser;

  // Github cdn for minified chromium
  const browserPath = await chromium.executablePath(
    "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
  );
  try {
    if (process.env.NODE_ENV === "development") {
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: viewPort,
        headless: true,
      });
    }
    if (process.env.NODE_ENV === "production") {
      browser = await puppeteerCore.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: viewPort,
        executablePath: browserPath,
      });
    }
    if (!browser) {
      return new NextResponse("Fail to initialise browser", { status: 500 });
    }
    const page = await browser.newPage();
    const baseUrl = req.nextUrl.origin;
    await page.goto(`${baseUrl}/?hideDock=true`);
    await timeout(500);

    const screenshot = await page.screenshot({ type: "png", fullPage: false });

    return new NextResponse(screenshot, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return new NextResponse("An error occurred", { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
