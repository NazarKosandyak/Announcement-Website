//Install express server
const express = require('express');
const path = require('path');
const app = express();

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.listen(port);
// server.listen(port)

app.use(express.static('./dist/AnnouncementWebsite'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/AnnouncementWebsite/'}),
);
app.listen(process.env.PORT || 5000);



