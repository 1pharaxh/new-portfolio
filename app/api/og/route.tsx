// Import required modules and constants
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
// Route segment config
export const runtime = "nodejs";

// Define a timeout function
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await timeout(4000);

    const screenshot = await page.screenshot({ type: "png", fullPage: true });

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
