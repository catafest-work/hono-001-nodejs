// JavaScript source code I don't see types on this source code
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  // return c.text('Hello Hono!')
  return c.html('<div>Hello Hono!</div>');
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})