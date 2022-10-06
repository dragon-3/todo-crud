const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('./db.json');
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
    })
)

server.use(router);
server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});