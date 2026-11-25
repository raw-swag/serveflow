import { loginSchema, GSTIN_REGEX, FSSAI_REGEX } from './index';

function testValidation() {
  // Test valid login
  const validLogin = loginSchema.safeParse({
    email: 'owner@serveflow.in',
    password: 'Password123!',
  });
  if (!validLogin.success) {
    throw new Error('Valid login failed validation');
  }

  // Test invalid email
  const invalidLogin = loginSchema.safeParse({
    email: 'not-an-email',
    password: 'Password123!',
  });
  if (invalidLogin.success) {
    throw new Error('Invalid email unexpectedly passed validation');
  }

  // Test Indian GSTIN regex
  const validGstin = '29AABCS1429B1Z8';
  if (!GSTIN_REGEX.test(validGstin)) {
    throw new Error('Valid GSTIN failed regex');
  }

  // Test Indian FSSAI regex
  const validFssai = '11223344556677';
  if (!FSSAI_REGEX.test(validFssai)) {
    throw new Error('Valid FSSAI failed regex');
  }

  console.log('✅ @serveflow/validation unit tests passed.');
}

testValidation();
