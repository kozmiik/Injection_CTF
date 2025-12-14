import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export async function getDB() {
const db = await open({
filename: ':memory:',
driver: sqlite3.Database,
});


await db.exec(`
CREATE TABLE users (
id INTEGER PRIMARY KEY,
username TEXT,
password TEXT
);


INSERT INTO users VALUES (1, 'admin', 'admin123');
INSERT INTO users VALUES (2, 'user', 'password');
`);


return db;
}