const { test, expect } = require('@playwright/test');

// හැම ටෙස්ට් එකකටම කලින් සයිට් එකට යන එක common නිසා මේක පාවිච්චි කරන්න පුළුවන්
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
});

test('Pos_Fun_0001 – Short daily phrase conversion', async ({ page }) => {
    await page.fill('textarea', 'api adha jogin yanavaa haebaeyi mama tikak parakku veyi');
    
    // Output එක එනකම් පොඩ්ඩක් ඉවසන්න ඕනේ (Wait for selector)
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toBeVisible({ timeout: 15000 });
    await expect(output).toContainText('අපි අද ජොගින් යනවා හැබැයි මම ටිකක් පරක්කු වෙයි');
});

test('Pos_Fun_0002 – Slang and spelling variation', async ({ page }) => {
    await page.fill('textarea', 'mata kanna baee '); 
    
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    // waitForTimeout වෙනුවට locator assertion පාවිච්චි කිරීම වඩා හොඳයි
    await expect(output).toContainText('මට කන්න බෑ', { timeout: 20000 });
});

test('Pos_Fun_0003 – Conditional sentence with punctuation', async ({ page }) => {
    await page.fill('textarea', 'oyaa enavaanam mama heta enavaa.');
    
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText('ඔයා එනවානම් මම හෙට එනවා.', { timeout: 15000 });
});

test('Pos_Fun_0004 – Interrogative sentence', async ({ page }) => {
    await page.fill('textarea', 'oyaalaa hodhin innavaadha?');
    
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    await expect(output).toContainText('ඔයාලා හොදින් ඉන්නවාද?', { timeout: 15000 });
});

test('Neg_Fun_0008 – URL conversion check', async ({ page }) => {
    // Link එකක් දුන්නම ඒක සිංහල අකුරු වලට පෙරලෙන්න ගියොත් ඒක වැරදියි
    await page.fill('textarea', 'https://www.google.com');
    const output = page.locator('.card:has-text("Sinhala") .whitespace-pre-wrap');
    
    // URL එක වෙනස් නොවී තිබිය යුතුයි
    await expect(output).toHaveText('https://www.google.com', { timeout: 15000 });
});