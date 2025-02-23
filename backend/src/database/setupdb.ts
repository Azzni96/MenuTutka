import fs from 'fs';
import path from 'path';
import pool from "./DB";

const runSQL = async (file: string) => {
    try {
        const sql = fs.readFileSync(file, 'utf-8');
        const commands = sql.split(';').filter((cmd) => cmd.trim() !== "");
        const conn = await pool.getConnection();
        for (const command of commands) {
            await conn.query(command);
        }
        console.log('Successfully ran:');
        conn.release();
    } catch (err) {
        console.error(err);
    }
};

const setupDB = async () => {
    console.log('Starting database setup...');
    const file = path.join(__dirname, '../../setup.sql');
    await runSQL(file);
    console.log('Database setup completed.');
};

setupDB();