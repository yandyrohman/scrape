const puppeteer = require('puppeteer')

async function download (contentUrl) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  await page.goto('https://www.y2mate.com/id764')
  await page.waitForSelector('#txt-url')
  await page.$eval('#txt-url', (el, contentUrl) => (el.value = contentUrl), contentUrl)
  await page.click('#btn-submit')
  await page.waitForSelector('.table.table-bordered')
  await page.click('.table.table-bordered tbody tr td[class="txt-center"] button')
  await page.waitForSelector('.btn.btn-success.btn-file')
  const resultUrl = await page.evaluate(() => {
    return document.querySelector('.btn.btn-success.btn-file').getAttribute('href')
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