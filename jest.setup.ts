import dotenv from 'dotenv';

// 🧠 Load test environment variables before anything else
dotenv.config({ path: '.env.test' });

// Safety check
console.log('🧪 Using test database:', process.env.DATABASE_URL);
