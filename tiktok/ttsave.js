const puppeteer = require('puppeteer')

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  await page.goto('https://ttsave.app/id')
  await page.waitForSelector('#input-query')
  await page.$eval('#input-query', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('#btn-download')
  await page.waitForSelector('a[type="no-watermark"]')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('a[type="no-watermark"]').getAttribute('href')
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