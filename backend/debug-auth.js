#!/usr/bin/env node

/**
 * Debug script to test authentication flow
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

async function testAuthFlow() {
  try {
    console.log('🧪 Testing Authentication Flow...\n');

    // Test 1: Health check
    console.log('1️⃣  Testing server health...');
    const health = await axios.get('http://localhost:5001/health');
    console.log('✅ Server is healthy:', health.data.data.status);
    console.log('');

    // Test 2: Register a new user
    console.log('2️⃣  Testing user registration...');
    const registrationData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'TestPassword123!',
      gender: 'Male',
      birthYear: 1990,
      birthMonth: 1,
      birthDay: 1
    };

    console.log('   Registration data:', { ...registrationData, password: '[HIDDEN]' });
    
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, registrationData);
    console.log('✅ Registration successful');
    console.log('   User ID:', registerResponse.data.data.user._id);
    console.log('   Token received:', registerResponse.data.data.token ? 'Yes' : 'No');
    console.log('');

    // Test 3: Fetch user profile with token
    console.log('3️⃣  Testing profile fetch...');
    const token = registerResponse.data.data.token;
    const profileResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Profile fetch successful');
    console.log('   User data:', {
      id: profileResponse.data.data.user._id,
      email: profileResponse.data.data.user.email,
      name: profileResponse.data.data.user.firstName + ' ' + profileResponse.data.data.user.lastName
    });
    console.log('');

    // Test 4: Test with a delay (simulating frontend behavior)
    console.log('4️⃣  Testing profile fetch with delay...');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const delayedProfileResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Delayed profile fetch successful');
    console.log('   User data:', {
      id: delayedProfileResponse.data.data.user._id,
      email: delayedProfileResponse.data.data.user.email
    });
    console.log('');

    console.log('🎉 All tests passed! Authentication flow is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run the test
testAuthFlow();
