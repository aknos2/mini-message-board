import pool from "./pool.js";

export async function getMessagesByUsername(username) {
  const { rows } = await pool.query(`
    SELECT 
      messages.content AS text,
      messages.created_at AS added,
      COALESCE(usernames.username, 'Deleted user') AS user
    FROM messages
    LEFT JOIN usernames ON messages.user_id = usernames.id
    WHERE usernames.username = $1
    ORDER BY messages.created_at DESC
  `, [username]);

  return rows;
}

export async function displayAllMessages() {
  const { rows } = await pool.query(`
    SELECT 
      messages.content AS text,
      messages.created_at AS added,
      COALESCE(usernames.username, 'Deleted user') AS user
    FROM messages
    LEFT JOIN usernames ON messages.user_id = usernames.id
    ORDER BY messages.created_at ASC
  `);
  return rows;
}


export async function sendMessage(username, content) {
  let {
    rows: [user],
  } = await pool.query(`SELECT id FROM usernames WHERE username = $1`, [username]);

  // Step 2: If user doesn't exist, create it
  if (!user) {
    const result = await pool.query(
      `INSERT INTO usernames (username) VALUES ($1) RETURNING id`,
      [username]
    );
    user = { id: result.rows[0].id };
  }

  await pool.query(
    `INSERT INTO messages (user_id, content) VALUES ($1, $2)`,
    [user.id, content]
  );
}

