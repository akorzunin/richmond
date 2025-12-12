const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../cats.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS cats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    weight REAL NOT NULL,
    breed TEXT NOT NULL,
    description TEXT NOT NULL,
    logo_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS cat_habits (
    cat_id INTEGER,
    habit_id INTEGER,
    FOREIGN KEY (cat_id) REFERENCES cats (id) ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE CASCADE,
    PRIMARY KEY (cat_id, habit_id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS cat_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cat_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (cat_id) REFERENCES cats (id) ON DELETE CASCADE
  )
`);

db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_cats_timestamp 
  AFTER UPDATE ON cats 
  BEGIN
    UPDATE cats SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END
`);

const defaultHabits = [
  'Кусать за ноги', 'Ловить лучики солнца', 'Мурчать по утрам',
  'Выпрашивать вкусняшки', 'Спать на клавиатуре', 'Гонять мячик',
  'Ловить мыши', 'Пить воду из-под крана', 'Тереться об ноги',
  'Играть с коробками'
];

const habitStmt = db.prepare('INSERT OR IGNORE INTO habits (name) VALUES (?)');
defaultHabits.forEach(habit => habitStmt.run(habit));

console.log('✅ База данных инициализирована:', dbPath);
console.log('Таблицы созданы: cats, habits, cat_habits, cat_photos');

db.close();