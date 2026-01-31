const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    // සයිට් එකට ගිහින් network එක idle වෙනකම් ඉන්නවා
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
});

// --- POSITIVE TEST CASES ---

test('Pos_Fun_0001 – Short daily phrase conversion', async ({ page }) => {
    await page.fill('textarea', 'api adha jogin yanavaa haebaeyi mama tikak parakku veyi');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/අපි අද ජොගින් යනවා/, { timeout: 20000 });
});

test('Pos_Fun_0002 – Slang and spelling variation', async ({ page }) => {
    await page.fill('textarea', 'mata kanna baee '); 
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/මට කන්න බෑ|මට කන්න බැහැ/, { timeout: 20000 });
});

test('Pos_Fun_0003 – Conditional sentence with punctuation', async ({ page }) => {
    await page.fill('textarea', 'oyaa enavaanam mama heta enavaa.');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ඔයා එනවානම්/, { timeout: 20000 });
});

test('Pos_Fun_0004 – Question sentence', async ({ page }) => {
    await page.fill('textarea', 'oyata kohomadha?');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ඔයාට කොහොමද/, { timeout: 20000 });
});

test('Pos_Fun_0005 – Simple greeting', async ({ page }) => {
    await page.fill('textarea', 'ayubowan');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ආයුබෝවන්/, { timeout: 20000 });
});

test('Pos_Fun_0006 – Respectful greeting', async ({ page }) => {
    await page.fill('textarea', 'obata sthuthiyi');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/ඔබට ස්තුතියි/, { timeout: 20000 });
});

// --- NEGATIVE TEST CASES ---

test('Neg_Fun_0007 – Empty input', async ({ page }) => {
    await page.fill('textarea', '');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toHaveText('', { timeout: 20000 });
});

test('Neg_Fun_0008 – URL conversion check', async ({ page }) => {
    const url = 'https://www.google.com';
    await page.fill('textarea', url);
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/google\.com/, { timeout: 20000 });
});

test('Neg_Fun_0009 – Special characters', async ({ page }) => {
    await page.fill('textarea', '@#$%^&*');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/@#$%^&*/, { timeout: 20000 });
});

test('Neg_Fun_0010 – Numbers only', async ({ page }) => {
    await page.fill('textarea', '123456789');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText(/123456789/, { timeout: 20000 });
});