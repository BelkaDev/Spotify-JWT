#! /usr/bin/env node

const tokenValidator = require('../src/tokenValidator')
status()

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  if (hrs > 0) {
  return hrs + ':' + mins + ':' + secs    
  }
  return mins + ':' + secs
}

async function getToken(session) {
    await session.checkTokenValidity();
    if (!session.isAlive) {
        await session.generate()
    }
    return session.accessToken;
}
async function status() {

    const session = new tokenValidator();
    const token = await getToken(session);
    result = await session.sendRequest('/v1/me/player/');
    if (!result) return false
    console.log(msToTime(result.progress_ms))
}