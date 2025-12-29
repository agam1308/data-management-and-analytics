
const http = require('http');

const data = JSON.stringify({
  name: 'API Test User',
  email: 'apitest' + Date.now() + '@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('BODY:', body);
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error);
});

req.write(data);
req.end();
