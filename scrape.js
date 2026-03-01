const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let grandTotal = 0;

  const seeds = [4,5,6,7,8,9,10,11,12,13];
  
  for (const seed of seeds) {
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);
    await page.waitForSelector('table'); // Wait for tables to load
    
    // Find all table cells with numbers, extract and sum
    const numbers = await page.$$eval('table td, table th', cells => 
      cells.flatMap(cell => 
        Array.from(cell.children).map(child => 
          parseFloat(child.textContent)
        ).filter(n => !isNaN(n))
      )
    );
    
    const seedSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += seedSum;
    console.log(`Seed ${seed} sum: ${seedSum.toFixed(2)}`);
  }
  
  console.log(`GRAND TOTAL: ${grandTotal.toFixed(2)}`);
  await browser.close();
})();
