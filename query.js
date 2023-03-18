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

const createUser = (request, response) => {
	const { username, email } = request.body
	const creation_datetime = dayjs().utc().format('YYYY-MM-DD HH:mm:ss')

	pool.query('INSERT INTO users (username, creation_datetime, email) VALUES ($1, $2, $3) RETURNING *', [username, creation_datetime,email], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send(`User added. User's ID is ${results.rows[0].user_id}`)
	})
}

//TODO: this should probably be 1. not avaiable to everyone 2. made to be done on a connected pool client rather than from a query I think.
const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY creation_datetime DESC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
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

const editUser = (request, response) => {
	const user_id = request.params.user_id
	const { username, email } = request.body
	console.log(user_id)

	pool.query('UPDATE users SET username = $1, email = $2 WHERE user_id = $3::text', [username, email, user_id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`User with ID ${user_id} edited successfully.`)
	})
}

const deleteUser = (request, response) => {
	const user_id = request.params.user_id

	pool.query('DELETE FROM users WHERE user_id = $1::text', [user_id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`User with ID: ${user_id} deleted successfully.`)
	})
}

module.exports = {
	createUser,
	getUsers,
	getUserByID,
	editUser,
	deleteUser
}