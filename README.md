
```
npm create hono@latest

> npx
> create-hono

create-hono version 0.14.3
? Target directory hono-001-nodejs
? Which template do you want to use? nodejs
? Do you want to install project dependencies? yes
? Which package manager do you want to use? npm
√ Cloning the template
√ Installing project dependencies
🎉 Copied project files
Get started with: cd hono-001-nodejs
```


```
npm install
npm run dev
```

```
open http://localhost:3000
```

```
"dev-js": "node src/index.js"
```

```
npm run dev-js

> dev-js
> node src/index.js

Server is running on http://localhost:3000
```

The order of routes matters in Hono
Can be tested on browser or with curl tool : 
```
curl "http://localhost:3000/users/search?q=john&by=name"
curl "http://localhost:3000/users/1"
curl -X DELETE "http://localhost:3000/users/1"
```