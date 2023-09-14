const puppeteer = require("puppeteer")

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://ssstik.io/id/snaptik-tiktok-downloader')
  await page.waitForSelector('#main_page_text')
  await page.$eval('#main_page_text', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await wait(500)
  await page.click('#submit')
  await page.waitForSelector('.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active.notranslate')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active.notranslate').getAttribute('href')
  })
  await browser.close()
  return resultUrl
}

async function wait (time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

(async () => {
  const URL = 'https://www.tiktok.com/@funnyclub90/video/7277035169469435178'
  const result = await download(URL)
  console.log(result)
})()