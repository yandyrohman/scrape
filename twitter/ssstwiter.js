const puppeteer = require('puppeteer')

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  await page.goto('https://ssstwitter.com/')
  await page.waitForSelector('#main_page_text')
  await page.$eval('#main_page_text', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('#submit')
  await page.waitForSelector('.result_overlay a')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.result_overlay a').getAttribute('href')
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