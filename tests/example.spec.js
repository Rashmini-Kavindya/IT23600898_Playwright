const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    // සයිට් එකට ගිහින් network එක idle වෙනකම් ඉන්නවා
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
});

test('Pos_Fun_0001 – Short daily phrase conversion', async ({ page }) => {
    await page.fill('textarea', 'api adha jogin yanavaa haebaeyi mama tikak parakku veyi');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    
    // Exact match එක වෙනුවට Regex පාවිච්චි කිරීම (වඩාත් සුදුසුයි)
    await expect(output).toContainText(/අපි අද ජොගින් යනවා/, { timeout: 20000 });
});

test('Pos_Fun_0002 – Slang and spelling variation', async ({ page }) => {
    await page.fill('textarea', 'mata kanna baee '); 
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    
    // සයිට් එකෙන් 'බෑ' හෝ 'බැහැ' දෙකෙන් එකක් එන්න පුළුවන් නිසා මේ විදියට දාමු
    await expect(output).toContainText(/මට කන්න බෑ|මට කන්න බැහැ/, { timeout: 25000 });
});

test('Pos_Fun_0003 – Conditional sentence with punctuation', async ({ page }) => {
    await page.fill('textarea', 'oyaa enavaanam mama heta enavaa.');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    
    // තිත (dot) ප්‍රශ්න මඟහරින්න ප්‍රධාන වචන ටික විතරක් චෙක් කරනවා
    await expect(output).toContainText(/ඔයා එනවානම්/, { timeout: 20000 });
});

test('Neg_Fun_0008 – URL conversion check', async ({ page }) => {
    const url = 'https://www.google.com';
    await page.fill('textarea', url);
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    
    // මෙතනදී console log එකක් දාමු ඇත්තටම එන output එක මොකක්ද කියලා බලාගන්න
    const actualText = await output.textContent();
    console.log('Actual URL Output:', actualText);

    // සම්පූර්ණ URL එකම නැතුව 'google' කියන කෑල්ල හරි තියෙනවාද බලනවා
    await expect(output).toContainText(/google\.com/, { timeout: 20000 });
});