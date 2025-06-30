import { test, expect } from '@playwright/test';

test.describe('Chatbot UI Tests', () => {
  test('should open chatbot and receive a welcome message', async ({ page }) => {
    await page.goto('/'); // Uses baseURL from playwright.config.ts

    // Click on the chatbot icon/button to open it
    await page.click('#chatbot-open-button'); // Replace with your actual selector

    // Wait for chatbot UI to appear
    await expect(page.locator('.chatbot-window')).toBeVisible(); // Replace with your actual selector

    // Expect a welcome message from the bot
    await expect(page.locator('.chatbot-message.bot').first()).toContainText('Hello! How can I help you today?');
  });

  test('should send a query and get a relevant response', async ({ page }) => {
    await page.goto('/');
    await page.click('#chatbot-open-button');
    await expect(page.locator('.chatbot-window')).toBeVisible();

    // Type a message into the chatbot input
    await page.fill('.chatbot-input', 'What is your return policy?'); // Replace with your actual selector
    await page.press('.chatbot-input', 'Enter');

    // Wait for the bot's response
    await expect(page.locator('.chatbot-message.bot').last()).toContainText('Our return policy allows returns within 30 days of purchase.');
  });
});
