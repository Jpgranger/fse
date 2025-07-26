import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

db.query('SELECT NOW()')
  .then((res) => {
    console.log('✅ Connected successfully at', res.rows[0]);
    db.end();
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
