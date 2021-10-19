import User from "../../models/userModel"
import db from "../../utils/db"

const findUserByID = async (uuid: string): Promise<User> => {
  try {
    const query = `SELECT uuid, username FROM application_user WHERE uuid = $1`
    const values = [uuid]
    const { rows } = await db.query<User>(query, values)
    const [ user ] = rows
    
    return user
  } catch (error) {
    throw console.info(`Error -> ${error}`)
  }
}

export default findUserByID