// set up express and nodejs stuff etc idk
const express = require('express');
const app = express();

app.use(express.json());


// rn it's all just stored locally. umm. in a data variable. actually this could probably be a json file or something
var data = {}


// website landing page (?????)
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
// i don't know why i need both get and post but like it breaks if you don't soooo
app.post('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// request to update battery status
app.post('/battery', (req, res) => {
	const { username, battery, is_plugin, timestamp } = req.body;

	// update data entry
	data[username] = {
		"battery": battery,
		"is_plugin": is_plugin,
		"timestamp": timestamp,
	}
	res.send( data );
});


// request to get battery status
app.get('/battery', (req, res) => {
	res.send( data );
});



app.listen(3000, () => {
	console.log('Server is running on port 3000!');
});
