# untitled battery thing!

sigh.

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

is_plugin determines whether the action is a plug in or plug out action. battery is battery percentage. username is whatever. timestamp is in iso8601 format, but it doesn't have anything to enforce that yet.

yay!
