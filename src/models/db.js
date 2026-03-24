import { pool } from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { checkServerIdentity } from "tls";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caCert = fs.readFileSync(path.join(__dirname, "../bin/", "byuicse-psql-cert.pem"));


const pool = new Pool ({
    connectionString: process.env.DB_URL,
    ssl: {
        ca: caCert,
        rejectUnauthorized: true,
        checkServerIdentity: () => { return undefined; }
    }
});

export default pool;