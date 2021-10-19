import User from "../../models/userModel";
import db from "../../utils/db";

const updateUser = async (user: User) => {
  try {
    const query = `
      UPDATE application_user
      SET 
        username = $1, 
        password = crypt($2, 'my_salt')
      WHERE uuid = $3
    `
    const values = [user.username, user.password, user.uuid]
    await db.query<User>(query, values)
  } catch (error) {
    throw console.info(`Error -> ${error}`)
  }
}

export default updateUser