### Hono test with nodejs 

Create the application from template :

```aiignore
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
Use these commands:

```aiignore
npm install
npm run dev
```

Open browser to see the result 

```aiignore
open http://localhost:3000
```

Create a javascript source code named index.js , because the template comes with typescript example, even I set nodejs ...

```aiignore
"dev-js": "node src/index.js"
```

I used same source code from intex.ts and I renamed into no_index.ts, because is javascript source code.
I change into package.json script area to run the index.js with dev-js 

```aiignore
npm run dev-js

> dev-js
> node src/index.js

Server is running on http://localhost:3000
```

The example source code works and I add some changes and I tested.
The order of routes matters in Hono
Can be tested on browser or with curl tool : 

```aiignore
curl "http://localhost:3000/users/search?q=john&by=name"
curl "http://localhost:3000/users/1"
curl -X DELETE "http://localhost:3000/users/1"
```

Use the cypress to test the application :

```aiignore
\hono-001-nodejs>npm install cypress --save-dev   

up to date, audited 177 packages in 2s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

\hono-001-nodejs>npm install cypress --save-dev --foreground-scripts

up to date, audited 177 packages in 1s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

\hono-001-nodejs>>npx cypress open   
```