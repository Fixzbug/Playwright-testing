import { test, expect } from '@playwright/test';

test.describe('หน้าล็อกอิน', () => {
    test.beforeEach(async ({ page }) => {
        // เปิดหน้าเว็บก่อนรันแต่ละเทสต์
        await page.goto('http://localhost:8081');
    });


    test('ทดสอบ', async ({ page }) => {

        await page.waitForSelector('//h1', { timeout: 5000 });  // like Wait Until Element Is Visible
        console.log(await page.locator('//h1').textContent()); // 

        // แบบยาว
        await page.locator('//h1').waitFor({ state: 'visible' });
        await page.locator('//h2').waitFor({ state: 'hidden' });

        // แบบรวมคำสั่งแล้ว ใช้งานเหมือนกับข้างบนแต่สั่นกว่า
        await page.waitForSelector('//h1', { state: 'visible'});
        await page.waitForSelector('//h2', { state: 'hidden'});
        // state options (similar to locator.waitFor()):
        // 'attached'
        // 'visible'
        // 'hidden'
        // 'detached'

        await page.locator('//input[@id="username"]').fill('test');
        await page.locator('//input[@id="password"]').fill('password123');
        await page.locator('//button[@type="submit"]').click();

        // locator ตามด้วย xpath แล้วใช้ คำสั่ง fill click textcontent ตามแล้วแต่จะใช้
    });


    test('ล็อกอินสำเร็จด้วยข้อมูลที่ถูกต้อง', async ({ page }) => {
        // กรอกข้อมูล
        await page.fill('#username', 'test');
        await page.fill('#password', 'password123');

        // กดปุ่มล็อกอิน
        await page.click('button[type="submit"]');

        // ตรวจสอบข้อความแจ้งเตือน
        const message = await page.locator('#message');
        await expect(message).toHaveText('เข้าสู่ระบบสำเร็จ!');
        await expect(message).toHaveClass('success');

    });

    test('ล็อกอินไม่สำเร็จเมื่อใส่รหัสผ่านผิด', async ({ page }) => {

        await page.fill('#username', 'test');
        await page.fill('#password', 'รหัสผิด');
        await page.click('button[type="submit"]');

        const message = await page.locator('#message');
        await expect(message).toHaveText('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        await expect(message).toHaveClass('error');
    });

    test('ฟอร์มต้องมีการกรอกข้อมูลครบ', async ({ page }) => {
        // ทดสอบว่ามี required attribute
        await expect(page.locator('#username')).toHaveAttribute('required', '');
        await expect(page.locator('#password')).toHaveAttribute('required', '');
    });

    test('รหัสผ่านต้องเป็นแบบ password type', async ({ page }) => {
        await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    });

});



