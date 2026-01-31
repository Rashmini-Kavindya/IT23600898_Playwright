const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
});

// --- POSITIVE TEST CASES (සාර්ථක විය යුතු අවස්ථා) ---

test('Pos_Fun_0001 – Short daily phrase conversion', async ({ page }) => {
    await page.fill('textarea', 'api adha jogin yanavaa haebaeyi mama tikak parakku veyi');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/අපි අද ජොගින් යනවා/, { timeout: 20000 });
});

test('Pos_Fun_0002 – Slang and spelling variation', async ({ page }) => {
    await page.fill('textarea', 'mata kanna baee '); 
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/මට කන්න බෑ|මට කන්න බැහැ/, { timeout: 25000 });
});

test('Pos_Fun_0003 – Conditional sentence with punctuation', async ({ page }) => {
    await page.fill('textarea', 'oyaa enavaanam mama heta enavaa.');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ඔයා එනවානම්/, { timeout: 20000 });
});

test('Pos_Fun_0004 – Question sentence conversion', async ({ page }) => {
    await page.fill('textarea', 'oyata kohomadha?');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ඔයාට කොහොමද/, { timeout: 15000 });
});

test('Pos_Fun_0005 – Respectful address conversion', async ({ page }) => {
    await page.fill('textarea', 'obata sthuthiyi');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ඔබට ස්තුතියි/, { timeout: 15000 });
});

test('Pos_Fun_0006 – Time related sentence', async ({ page }) => {
    await page.fill('textarea', 'dan velava kiyadha?');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/දැන් වේලාව කීයද/, { timeout: 15000 });
});

// --- NEGATIVE / VALIDATION TEST CASES (වැරදි හෝ විශේෂ අවස්ථා) ---

test('Neg_Fun_0007 – Empty input handling', async ({ page }) => {
    await page.fill('textarea', '');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    const text = await output.textContent();
    expect(text.trim()).toBe(''); 
});

test('Neg_Fun_0008 – URL conversion check', async ({ page }) => {
    const url = 'https://www.google.com';
    await page.fill('textarea', url);
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    const actualText = await output.textContent();
    console.log('Actual URL Output:', actualText);
    await expect(output).toContainText(/google\.com/, { timeout: 20000 });
});

test('Neg_Fun_0009 – Numbers and Special characters', async ({ page }) => {
    await page.fill('textarea', '12345 @#!');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    // ඉලක්කම් සහ ලකුණු වෙනස් නොවී තිබිය යුතුය
    await expect(output).toContainText(/12345 @#!/, { timeout: 15000 });
});

test('Neg_Fun_0010 – Long random string performance', async ({ page }) => {
    const longText = 'qwertyuiopasdfghjklzxcvbnm';
    await page.fill('textarea', longText);
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    // පද්ධතිය ක්‍රැෂ් නොවී ප්‍රතිදානයක් ලබා දිය යුතුය
    await expect(output).toBeVisible({ timeout: 20000 });
});