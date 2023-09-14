// https://www.tiktok.com/@funnyclub90/video/7277035169469435178

// https://ssstik.io/id/snaptik-tiktok-downloader

const puppeteer = require("puppeteer");

async function download (tiktokUrl) {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://ssstik.io/id/snaptik-tiktok-downloader');

  await page.waitForSelector('#main_page_text');

  await page.$eval('#main_page_text', (el, tiktokUrl) => (el.value = tiktokUrl), tiktokUrl);

  await wait(500)

  await page.click('#submit');

  console.log('masuk')

  // await page.waitForSelector('.table.is-fullwidth')
  // const resultUrl = await page.evaluate(() => {
  //   return document.querySelector('.table.is-fullwidth tbody tr td:nth-child(3) a').getAttribute('href');
  // });
  // await browser.close();
  // return resultUrl
}

async function wait (time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

async function run () {
  const URL = 'https://www.tiktok.com/@funnyclub90/video/7277035169469435178'
  const result = await download(URL)
  console.log(result)
}

run()