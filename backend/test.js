require('dotenv').config();
const mongoose = require('mongoose');
const assert = require('assert');
const Member = require('./models/Member');

const runTests = async () => {
  console.log('--- Starting Backend Integration Tests ---');
  
  let connStr = process.env.MONGO_URI;
  if (!connStr || connStr.includes('xxxxx')) {
    connStr = 'mongodb://127.0.0.1:27017/membership_db';
  }
  console.log(`Connecting to: ${connStr}`);
  
  try {
    await mongoose.connect(connStr);
    console.log('✔ Connected to database.');
    
    // Clean test member if exists
    await Member.deleteOne({ email: 'test.intern@example.com' });
    
    // Test 1: Create Member
    console.log('Test 1: Creating member...');
    const member = new Member({
      name: 'Test Intern',
      email: 'test.intern@example.com',
      membershipType: 'Premium',
      status: 'Active'
    });
    
    const savedMember = await member.save();
    assert.strictEqual(savedMember.name, 'Test Intern');
    assert.strictEqual(savedMember.email, 'test.intern@example.com');
    assert.strictEqual(savedMember.membershipType, 'Premium');
    assert.strictEqual(savedMember.status, 'Active');
    console.log('✔ Test 1 passed: Member created and verified.');
    
    // Test 2: Validation Check (Invalid Email)
    console.log('Test 2: Validation check (invalid email)...');
    try {
      const invalidMember = new Member({
        name: 'Invalid Email Member',
        email: 'bad-email-format',
        membershipType: 'VIP',
        status: 'Active'
      });
      await invalidMember.save();
      assert.fail('Should have failed on email validation');
    } catch (err) {
      assert.ok(err.errors.email, 'Validation error should be triggered on email');
      console.log('✔ Test 2 passed: Invalid email rejected successfully.');
    }
    
    // Test 3: Validation Check (Invalid Membership Type)
    console.log('Test 3: Validation check (invalid membership type)...');
    try {
      const invalidType = new Member({
        name: 'Invalid Type Member',
        email: 'invalid.type@example.com',
        membershipType: 'SuperVIP', // Invalid
        status: 'Active'
      });
      await invalidType.save();
      assert.fail('Should have failed on membershipType validation');
    } catch (err) {
      assert.ok(err.errors.membershipType, 'Validation error should be triggered on membershipType');
      console.log('✔ Test 3 passed: Invalid membership type rejected successfully.');
    }

    // Clean up
    await Member.deleteOne({ _id: savedMember._id });
    console.log('✔ Cleaned up test data.');
    
    console.log('\nAll backend tests completed successfully! 🎉');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

runTests();
