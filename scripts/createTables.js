import pool from '../config/dbConfig.js';

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      otp VARCHAR(10),
      status VARCHAR(10) DEFAULT 'pending',
      role VARCHAR(10) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS debts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      amount DECIMAL NOT NULL,
      description TEXT,
      due_date DATE NOT NULL,
      status VARCHAR(20) DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export default createTables;