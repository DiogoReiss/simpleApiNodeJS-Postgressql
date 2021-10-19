import User from "../../models/userModel";
import db from "../../utils/db";

const createUser = async (user: User): Promise<string> => {
  try {
    const query = `
      INSERT INTO application_user (
        username, password
      ) VALUES (
        $1, crypt($2, 'my_salt')
      ) RETURNING uuid
    `
    const values = [user.username, user.password]
    const { rows } = await db.query<{ uuid: string}>(query, values)
    const [ newUser ] = rows
    return newUser.uuid
  } catch (error) {
    throw console.info(`Error -> ${error}`)
  }
}

export default createUser