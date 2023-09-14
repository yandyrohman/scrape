const puppeteer = require("puppeteer")

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('https://snaptik.app/ID')
  await page.waitForSelector('#url')
  await page.$eval('#url', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('.button.button-go.is-link.transition-all')
  await page.waitForSelector('.video-links')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.video-links a[data-event="cdn_snaptik"]').getAttribute('href')
  })
  await browser.close()
  return resultUrl
}

(async () => {
  const url = process.argv[2]
  if (url) {
    const result = await download(url)
    console.log(result)
  } else {
    console.log('url cannot be empty!')
  }
})()