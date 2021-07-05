//Install express server
const express = require('express');
const path = require('path');
const server = jsonServer.create()
const router = jsonServer.router("./db.json")
const middlelewares = jsonServer.defaults({
    static:'./dist/AnnouncementWebsite'
})
server.use(middlelewares)
server.use(jsonServer.rewriter({
    '/api/*':'/$1',
}))
server.use(router)
server.use(process.env.PORT || 3000)

const app = express();

// Serve only the static files form the dist directoryget
app.use(express.static('./dist/AnnouncementWebsite'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/AnnouncementWebsite/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);