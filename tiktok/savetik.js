const puppeteer = require('puppeteer')

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  await page.goto('https://savetik.co/id')
  await page.waitForSelector('#s_input')
  await page.$eval('#s_input', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('button[class="btn-red"][type="button"]')
  await page.waitForSelector('.dl-action')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.dl-action p a').getAttribute('href')
  })
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