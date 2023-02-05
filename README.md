# Todo app
This is simple todo app that uses SurrealDB database
## Setup
1. Clone repository  
`git clone https://github.com/DrigsterI/todo`
2. Install dependencies  
`npm i`
3. Install database  
Mac: 
`brew install surrealdb/tap/surreal`  
Linux: 
`curl -sSf https://install.surrealdb.com | sh`  
Windows: 
`iwr https://windows.surrealdb.com -useb | iex`  
4. Start database  
`npm run db`
5. Start server  
`npm run dev`

### Additional tools
1. Tailwind - server updates tailwind.css  
`npm run tailwind`
1. LiveReload - reloads browser page for you  
`npm run livereload`
