import { Pool } from 'pg'
import { config } from 'dotenv'

config()

const connectionString = process.env.CONNECTION_STRING || 'postgres://dsnbkkcb:r5fx9nWtni0NLWrqEL1d9igYX6cz5IOv@tai.db.elephantsql.com/dsnbkkcb'
const db = new Pool({ connectionString })

export default db