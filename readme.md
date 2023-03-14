# untitled battery thing!

by bucketfish and fern.

## setup and stuff

i don't actually know how to run npm. umm. start the terminal and do `npm start`?

## testing
open `http://localhost:3000` after it starts running.

to post data, run a post method to `http://localhost:3000/battery` in json format:
```
{
  "username": "whatever name you want here",
  "battery": 100,
  "is_plugin": true,
  "timestamp": time_in_iso8601_format
}
```

is_plugin determines whether the action is a plug in or plug out action. battery is battery percentage. username is whatever. timestamp is in unix timestamp, but it doesn't have anything to enforce that yet.

quick curl command to send a post to localhost:

```
curl -d '{"username": "Test User", "battery": "100", "is_plugin": "true", "timestamp": '"$(date +%s)"' }' -H 'Content-Type: application/json' -X POST http://localhost:3000/battery
```

quick curl command to send a caption to localhost:
```
curl -d '{"username": "Test User", "caption": "test caption!" }' -H 'Content-Type: application/json' -X POST http://localhost:3000/caption
```

yay!
