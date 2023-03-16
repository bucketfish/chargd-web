// set up express and nodejs stuff etc idk
const express = require('express');
const app = express();

app.use(express.json());


// rn it's all just stored locally. umm. in a data variable. actually this could probably be a json file or something
var data = {}


// request to update battery status
app.post('/battery', (req, res) => {
	var { username, battery, is_plugin, timestamp } = req.body;

	battery = Math.max(parseInt(battery), 0).toString()

	// i'm sure there's some way to make this code neater lol xd
	if (data[username]) {
		if (data[username]["timestamp"] < timestamp) {
			data[username] = {
				"battery": battery,
				"is_plugin": is_plugin,
				"timestamp": timestamp,
				"caption": ""
			}
		}
	}
	else {
		data[username] = {
			"battery": battery,
			"is_plugin": is_plugin,
			"timestamp": timestamp,
			"caption": ""
		}
	}

	res.setHeader("Access-Control-Allow-Origin", "https://app.chargd.social")
	res.send( data );
});


// request to get battery status
app.get('/battery', (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "https://app.chargd.social")
	res.send( data );
});


app.post('/caption', (req, res) => {
	const { username, caption } = req.body;

	if (data[username]) {
		data[username]["caption"] = caption
	}

	res.setHeader("Access-Control-Allow-Origin", "https://app.chargd.social")
	res.send(data);

})



app.listen(3000, () => {
	console.log('Server is running on port 3000!');
});
