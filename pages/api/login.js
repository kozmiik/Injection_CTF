import { getDB } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username = '', password = '' } = req.body || {};
  const db = await getDB();

  const query = 
  "SELECT id, username, password FROM users WHERE username = '" +
  username +
  "' AND password = '" +
  password +
  "'";

  try {
    const rows = await db.all(query);

    // FLAG 1 — Real auth bypass
    if (rows.length > 0 && password !== 'admin123') {
      return res.json({
        success: true,
        flag: 'FLAG-1{SQL_1NJ3CT10N_AUTH_BYP4SS}'
      });
    }


    return res.status(401).json({ success: false });

  } catch (err) {
  // FLAG 2 — Error-based SQL Injection
  if (err.message.includes('ORDER BY')) {
    return res.json({
      flag: 'FLAG-2{ERR0R_BAS3D_SQL_INJECT10N_LE4K}'
    });
  }

  return res.status(500).json({ error: err.message });
}

    return res.status(500).json({ error: err.message });
  }
