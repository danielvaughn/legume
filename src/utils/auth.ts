import { createHmac } from 'crypto'

/*

For the odd traveler who happens to see this code...these are not API keys.
I'm not stupid enough to store secrets in source.
This is a very very lightweight authentication system I set up to prevent easy access to my GCS bucket.

The value here is actually a sha256 hash of my API key,
and it will be rotated regularly.
Eventually I'll replace this system with a real authentication system,
but this does the trick for now.

*/
const USER_TABLE: {[key:string]: string} = {
  '6dda4b7af390106480aafd768c4059f608791e237869cc7760970cde5077a1b1': 'danielvaughn',
}

export function createAPIKey(username: string) {
  const randValue = [...Array(30)].map((e) => ((Math.random() * 36) | 0).toString(36)).join('')

  const key = createHmac('sha256', 'secret')
    .update(`${username}_${randValue}`)
    .digest('hex')

  return key
}

export function getUser(apiKey: string) {
  const keyHash = createHmac('sha256', 'secret')
    .update(apiKey)
    .digest('hex')

  for (const key in USER_TABLE) {
    if (keyHash === key) {
      return USER_TABLE[key]
    }
  }

  return null
}
