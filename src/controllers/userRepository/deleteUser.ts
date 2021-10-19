import User from "../../models/userModel";
import db from "../../utils/db";

const deleteUser = async (userID: string) => {
    try {
      const query = `
        DELETE FROM application_user
        WHERE uuid = $1
      `
      const values = [userID]
      await db.query<User>(query, values)
  } catch (error) {
    throw console.info(`Error -> ${error}`)
  }
}

export default deleteUser 