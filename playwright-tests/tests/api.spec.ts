import { test, expect } from '@playwright/test';

test.describe('Backend API Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/api'; // Set via CI/CD output

  test('should get a 200 status from the health endpoint', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/health`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('should create a new user via API', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: `testuser-${Date.now()}@example.com`,
      password: 'securepassword123',
    };

    const response = await request.post(`${API_BASE_URL}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201); // Assuming 201 Created for new resource
    const responseBody = await response.json();
    expect(responseBody.id).toBeDefined();
    expect(responseBody.email).toEqual(newUser.email);

    // Optional: Clean up the created user (e.g., via another API call or DB assertion)
  });
});
