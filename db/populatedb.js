#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO usernames(username)
VALUES
  ('Amando'),
  ('Charles');

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES usernames(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (user_id, content)
VALUES
  ((SELECT id FROM usernames WHERE username = 'Amando'), 'Hi there!'),
  ((SELECT id FROM usernames WHERE username = 'Charles'), 'Hello world!');
`;

async function main() {
  try {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://ryuji:@localhost:5432/mini_messageboard",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  } catch (err) {
    console.log('Something went wrong', err);
    process.exit(1);
  }
}

main();