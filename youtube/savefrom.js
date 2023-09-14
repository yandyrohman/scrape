const puppeteer = require('puppeteer')

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  await page.goto('https://id.savefrom.net/16-youtube-downloader-app-100.html')
  await page.waitForSelector('input[name="sf_url"]')
  await page.$eval('input[name="sf_url"]', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('button[type="submit"]')
  await page.waitForSelector('a[title="video format: 720"]')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('a[title="video format: 720"]').getAttribute('href')
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