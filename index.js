const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const database = require('./query')
const port = 3000

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)

app.get('/', (request, response) => {
	response.json({ info: 'Nothing here :O try /users/'})
})


app.get('/users', database.getUsers)
app.get('/users/:user_id', database.getUserByID)
app.post('/users', database.createUser)
app.put('/users/:user_id', database.editUser)
app.delete('/users/:user_id', database.deleteUser)

app.listen(port, () => {
	console.log(`API successfully started on port ${port}.`)
})