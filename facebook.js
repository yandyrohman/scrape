const puppeteer = require("puppeteer");

async function download (facebookUrl) {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('https://snapsave.app/id/facebook-reels-download');
  await page.waitForSelector('#url');

  await page.$eval('#url', (el, facebookUrl) => (el.value = facebookUrl), facebookUrl);
  await page.click('#send');
  await page.waitForSelector('.table.is-fullwidth')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.table.is-fullwidth tbody tr td:nth-child(3) a').getAttribute('href');
  });
  await browser.close();
  return resultUrl
}

async function run () {
  const URL = 'https://www.facebook.com/reel/329697729430224?mibextid=yc9BiX'
  const result = await download(URL)
  console.log(result)
}

run()