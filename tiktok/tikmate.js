const puppeteer = require('puppeteer')

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  await page.goto('https://tikmate.app/id/')
  await page.waitForSelector('input[placeholder="Tempel tautan disini"]')
  await page.$eval('input[placeholder="Tempel tautan disini"', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('button[type="submit"]')
  await page.waitForSelector('.grid.grid-cols-1.mb-2.bg-blue-50')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.grid.grid-cols-1.mb-2.bg-blue-50 a').getAttribute('href')
  })
  await browser.close()
  return `https://tikmate.app${resultUrl}`
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