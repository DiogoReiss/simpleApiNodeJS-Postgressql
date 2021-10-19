import User from "../../models/userModel";
import db from "../../utils/db";

const findAllUsers = async (): Promise<User[]> => {
  try {
    const query = `SELECT uuid, username FROM application_user`
    const result = await db.query<User>(query)
    const rows = result.rows
    return rows || []
  } catch (error) {
    throw console.info(`Error -> ${error}`)
  }
}

export default findAllUsers