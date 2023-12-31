const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async(res) => {
    
    // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
  });

  try {
    // Launch the browser with specific arguments and executable path
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });
    const page = await browser.newPage();

    // Navigate to the specified page
    await page.goto('https://b.gfn.cainiao.com/dist/orderFrame#/abnor/outbound', { waitUntil: 'networkidle2' });

    // Log waiting action
    console.log("Waiting 5 seconds for the page to load...");
    await page.waitForTimeout(5000); // wait for 5 seconds for page load

    // Interact with the login form
    await page.type('input[placeholder="Email / Phone"]', '17609048951');
    await page.type('input[placeholder="Password"]', 'linghang123456');
    await page.click('button[type="submit"]');

    // Wait for navigation after login
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Wait for an additional 5 seconds after successful interaction
    console.log("Waiting an additional 5 seconds...");
    await page.waitForTimeout(5000);

    // Get the page content and send it
    const pageContent = await page.content();
    console.log(pageContent);
    res.send(pageContent);

} catch (e) {
    console.log(`Error: ${e}`);
    const pageContent = await page.content();
    res.send(pageContent);
} finally {
    await browser.close();

};

module.exports = { scrapeLogic };    