import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import mysql from 'mysql2/promise';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const schemaPath = join(rootDir, 'database', 'schema.sql');

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'stratedge_db',
  multipleStatements: false,
};

export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

const adminPasswordHash = (password, salt = randomBytes(16).toString('hex')) => {
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
  const [salt, hash] = storedHash.split(':');
  return adminPasswordHash(password, salt) === `${salt}:${hash}`;
};

const runSchema = async () => {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    multipleStatements: true,
  });

  await connection.query(readFileSync(schemaPath, 'utf8'));
  await connection.end();
};

export const initDatabase = async () => {
  await runSchema();
  const [admins] = await pool.query('SELECT id FROM admins WHERE username = ?', ['admin']);
  if (admins.length === 0) {
    await pool.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [
      'admin',
      adminPasswordHash('Admin123!'),
    ]);
  }
};
