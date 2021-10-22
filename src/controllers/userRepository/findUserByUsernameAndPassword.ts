import User from "../../models/userModel";
import db from "../../utils/db";

const findUserByUsernameAndPassword = async (user: User): Promise<User | null> => {
  try {
    const query = `
    SELECT uuid, username
    FROM application_user
    WHERE username = $1
    AND password = crypt($2, 'my_salt')
  `
  const values = [user.username, user.password]
  const { rows } = await db.query<User>(query, values)
  const [ userSelected ] = rows
  return !userSelected ? null : userSelected
  } catch (error) {
    throw console.info(`Error -> ${error}`)
  }
}

export default findUserByUsernameAndPassword