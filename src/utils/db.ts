import { Pool } from 'pg'
import { config } from 'dotenv'

config()

const connectionString = process.env.CONNECTION_STRING
const db = new Pool({ connectionString })

export default db