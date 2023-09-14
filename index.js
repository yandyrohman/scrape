const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://snapsave.app/id/facebook-reels-download');

  await page.waitForSelector('#url');

  await page.$eval('#url', el => el.value = 'https://www.facebook.com/reel/329697729430224?mibextid=yc9BiX');

  await page.click('#send');

  // await page.waitForNetworkIdle()

  // await page.waitForRequest(req => req.url() === 'https://snapsave.app/id/action.php?lang=id')

  await page.waitForSelector('.table.is-fullwidth')

  // await page.click('.table.is-fullwidth tbody tr td')

  const html = await page.evaluate(() => {
    // return document.querySelector('.table.is-fullwidth tbody tr td:nth-child(3)').outerHTML;
    return document.querySelector('.table.is-fullwidth tbody tr td:nth-child(3) a').getAttribute('href');
    // return document.querySelector('#url').value;
  });

  console.log(html);

  await browser.close();
})()