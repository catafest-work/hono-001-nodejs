// Same source code as src\index.ts
// JavaScript source code I don't see types on this source code
// basic source code example
// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
//
// const app = new Hono()
//
// app.get('/', (c) => {
//   return c.text('Hello Hono from JavaScript!')
// })
//
// const port = 3000
// console.log(`Server is running on http://localhost:${port}`)
//
// serve({
//   fetch: app.fetch,
//   port
// })

// see the artificial intellegence explication

// Import required modules from Hono framework and its extensions
import { serve } from '@hono/node-server'     // Server functionality
import { Hono } from 'hono'                   // Core Hono framework
import { logger } from 'hono/logger'          // Request logging
import { cors } from 'hono/cors'              // Cross-Origin Resource Sharing
import { prettyJSON } from 'hono/pretty-json' // JSON formatting

// Initialize Hono application instance
const app = new Hono()

// Sample user data array - simulating a database
const users = [
  {
    id: 1,                      // Unique identifier
    name: 'John Doe',           // User's full name
    email: 'john@example.com',  // User's email
    role: 'admin'               // User's role
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user'
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user'
  }
]

// Apply global middleware
app.use('*', logger())     // Log all incoming requests
app.use('*', cors())       // Enable CORS for all routes
app.use('*', prettyJSON()) // Format JSON responses

// Add a debug middleware to see incoming requests
app.use('*', async (c, next) => {
  console.log('Incoming request:', c.req.method, c.req.url)
  await next()
})

// 1. Root route
app.get('/', (c) => {
  return c.json({ message: 'Welcome to Users API!' })
})

// 2. Search route must come before dynamic routes
app.get('/users/search', async (c) => {
  const query = c.req.query('q')
  const searchBy = c.req.query('by') || 'name'

  console.log('Search query:', query, 'searchBy:', searchBy)

  if (!query) {
    return c.json({ error: 'Search query required' }, 400)
  }

  const filteredUsers = users.filter(user =>
      user[searchBy].toLowerCase().includes(query.toLowerCase())
  )

  return c.json({
    results: filteredUsers,
    count: filteredUsers.length,
    searchTerm: query,
    searchBy: searchBy
  })
})

// 3. Get all users
// app.get('/users', (c) => {
//   return c.json({ users })
// })
// Get all users endpoint - better version
app.get('/users', (c) => {
  return c.json({
    users,
    count: users.length
  })
})

// 4. Dynamic ID route comes last
// Get user by ID endpoint
app.get('/users/:id', (c) => {
  const userId = parseInt(c.req.param('id'))
  const user = users.find(u => u.id === userId)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(user)
})

// 5. Create new user
// Create new user endpoint
app.post('/users/create', async (c) => {
  const body = await c.req.json()
  const newUser = {
    id: users.length + 1,
    ...body
  }
  users.push(newUser)
  return c.json(newUser, 201)
})

// 6. Update user
// Get user by ID endpoint
app.get('/users/:id', (c) => {
  const userId = parseInt(c.req.param('id'))
  const user = users.find(u => u.id === userId)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(user)
})

// 7. Put user
// Update user endpoint
app.put('/users/:id', async (c) => {
  const userId = parseInt(c.req.param('id'))
  const body = await c.req.json()
  const index = users.findIndex(u => u.id === userId)

  if (index === -1) {
    return c.json({ error: 'User not found' }, 404)
  }

  users[index] = { ...users[index], ...body }
  return c.json(users[index])
})

// 8. Delete user
// Delete user endpoint
app.delete('/users/:id', (c) => {
  const userId = parseInt(c.req.param('id'))
  const index = users.findIndex(u => u.id === userId)

  if (index === -1) {
    return c.json({ error: 'User not found' }, 404)
  }

  const deletedUser = users.splice(index, 1)[0]
  return c.json({
    message: 'User deleted successfully',
    deletedUser
  })
})

// Start the server
serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})