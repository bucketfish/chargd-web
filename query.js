const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chargd',
  password: 'postgres',
  port: 5432,
})

///////////////////////////////////////////////////////////////////////
//                                                                   //
//                          USER MANAGEMENT                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////

const createUser = (request, response) => {
  const { username, email } = request.body
  const creation_datetime = dayjs().utc().format('YYYY-MM-DD HH:mm:ss')

  pool.query('INSERT INTO users (username, creation_datetime, email) VALUES ($1, $2, $3) RETURNING *', [username, creation_datetime, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added. User's ID is ${results.rows[0].user_id}`)
  })
}

const getUserByID = (request, response) => {
  const user_id = request.params.user_id

  pool.query('SELECT * FROM users WHERE user_id = $1::text', [user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByName = (request, response) => {
  const username = request.params.username

  pool.query('SELECT * FROM users WHERE username = $1::text', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const editUser = (request, response) => {
  const user_id = request.params.user_id
  const { username, email } = request.body

  pool.query('UPDATE users SET username = $1, email = $2 WHERE user_id = $3::text', [username, email, user_id], (error, _results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User with ID ${user_id} edited successfully.`)
  })
}

const deleteUser = (request, response) => {
  const user_id = request.params.user_id

  pool.query('DELETE FROM users WHERE user_id = $1::text', [user_id], (error, _results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User with ID: ${user_id} deleted successfully.`)
  })
}

///////////////////////////////////////////////////////////////////////
//                                                                   //
//                          POST MANAGEMENT                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////

const createPost = (request, response) => {
  const { action, battery_level } = request.body

  pool.query('INSERT INTO posts (action, battery_level) VALUES ($1, $2) RETURNING *', [action, battery_level], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Post created with ID ${results.rows[0].post_id}`)
  })
}

//TODO: Should be able to choose by user and specify amount :<
const getPosts = (_request, response) => {
  pool.query('SELECT * FROM posts ORDER BY creation_datetime DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPostByID = (request, response) => {
  const post_id = request.params.post_id

  pool.query('SELECT * FROM posts WHERE post_id = $1::text', [post_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deletePost = (request, response) => {
  const post_id = request.params.post_id

  pool.query('DELETE FROM posts WHERE post_id = $1', [post_id], (error, _results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Post with ID: ${post_id} deleted successfully.`)
  })
}

const addCaption = (request, response) => {
  const post_id = request.params.post_id
  const { caption } = request.body

  pool.query('UPDATE posts SET caption = $1, WHERE post_id = $2::text', [caption, post_id], (error, _results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Caption added to post with ID ${user_id}`)
  })
}

const deleteCaption = (request, response) => {
  const post_id = request.params.post_id

  pool.query('UPDATE posts SET caption = NULL WHERE post_id = $1', [post_id], (error, _results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Caption deleted from post with ID ${post_id}`)
  })
}

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  editUser,
  deleteUser,
  createPost,
  getPosts,
  getPostByID,
  deletePost,
  addCaption,
  deleteCaption
}
