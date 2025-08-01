#!/usr/bin/env node

// Simple test script to verify the Lambda authentication endpoints
const https = require('https');

const BASE_URL = 'https://jxnnviamig.execute-api.ap-south-1.amazonaws.com';

async function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testAuth() {
  console.log('🧪 Testing Lambda Authentication Endpoints\n');

  try {
    // Test 1: Test verify without token
    console.log('1. Testing verify endpoint without token...');
    const verifyNoToken = await makeRequest('POST', '/verify', { token: null });
    console.log(`   Status: ${verifyNoToken.status}`);
    console.log(`   Response: ${JSON.stringify(verifyNoToken.data, null, 2)}\n`);

    // Test 2: Test login with invalid credentials
    console.log('2. Testing login with invalid credentials...');
    const loginInvalid = await makeRequest('POST', '/login', {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    });
    console.log(`   Status: ${loginInvalid.status}`);
    console.log(`   Response: ${JSON.stringify(loginInvalid.data, null, 2)}\n`);

    // Test 3: Test profile without token
    console.log('3. Testing profile endpoint without token...');
    const profileNoToken = await makeRequest('GET', '/profile');
    console.log(`   Status: ${profileNoToken.status}`);
    console.log(`   Response: ${JSON.stringify(profileNoToken.data, null, 2)}\n`);

    // Test 4: Test logout without token
    console.log('4. Testing logout endpoint without token...');
    const logoutNoToken = await makeRequest('POST', '/logout');
    console.log(`   Status: ${logoutNoToken.status}`);
    console.log(`   Response: ${JSON.stringify(logoutNoToken.data, null, 2)}\n`);

    console.log('✅ Basic endpoint tests completed!');
    console.log('ℹ️  To test with valid credentials, you\'ll need to provide actual user credentials.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuth();
