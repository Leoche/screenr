const puppeteer = require('puppeteer');
const jimp = require('jimp');
const fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

let url = argv.url || "https://google.fr";
let name = argv.name || "screenshot";
let desktop_width = argv.desktop_width || 1066;
let desktop_height = argv.desktop_height || 543;
let mobile_width = argv.mobile_width || 194;
let mobile_height = argv.mobile_height || 345;
let grid_width = argv.grid_width || 333;
let grid_height = argv.grid_height || 180;

(async () => {
  const browser = await puppeteer.launch({
      defaultViewport: {
          width: 1400,
          height: 1400,
          isLandscape: true
      }
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(1000);
  await page.screenshot({path: name+'_screenshot_' + desktop_width + 'x' + desktop_height + '_large.png'});
  await browser.close();
    async function main() {
        let image = await jimp.read(name+'_screenshot_' + desktop_width + 'x' + desktop_height + '_large.png');
        await image.resize(desktop_width, jimp.AUTO);
        await image.crop(0, 0, desktop_width, desktop_height);
        await image.writeAsync(name+'_screenshot_' + desktop_width + 'x' + desktop_height + '.png').then(async () => {
            image = await jimp.read(name+'_screenshot_' + desktop_width + 'x' + desktop_height + '_large.png');
            await image.resize(grid_width, jimp.AUTO);
            await image.crop(0, 0, grid_width, grid_height);
            await image.writeAsync(name+'_screenshot_' + grid_width + 'x' + grid_height + '.png').then(() => {
                fs.unlink(name+'_screenshot_' + desktop_width + 'x' + desktop_height + '_large.png', (err) => {})
            })
        })
    }
    main();
})();


(async () => {
  const browser = await puppeteer.launch({
      defaultViewport: {
          width: 370,
          height: 1220,
          isLandscape: true
      }
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(1000);
  await page.screenshot({path: name+'_screenshot_' + mobile_width + 'x' + mobile_height + '_large.png'});
  await browser.close();
    async function main() {
        const image = await jimp.read(name+'_screenshot_' + mobile_width + 'x' + mobile_height + '_large.png');
        await image.resize(mobile_width, jimp.AUTO);
        await image.crop(0, 0, mobile_width, mobile_height);
        await image.writeAsync(name+'_screenshot_' + mobile_width + 'x' + mobile_height + '.png').then(() => {
            fs.unlink(name+'_screenshot_' + mobile_width + 'x' + mobile_height + '_large.png', (err) => {})
        })
    }
    main();
})();