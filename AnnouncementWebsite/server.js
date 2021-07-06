//Install express server
// const express = require('express');
// const path = require('path');
// const app = express();


// app.use(express.static('./dist/AnnouncementWebsite'));
// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/AnnouncementWebsite/'}),
    
// );
// app.listen(process.env.PORT || 5000);
  

const express = require('express');
const path = require('path');
const http = require('http')
const app = express();

const port = process.env.PORT || 5000
app.use(express.static(__dirname + '/dist/AnnouncementWebsite'));
app.get('/*',(req,res)=>{'index.html',{root:'dist/AnnouncementWebsite/'}});
app.listen(port)

const jsonServer = require('json-server');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();
server.use(middlewares)
server.use(router)
const serverPort = process.env.PORT || 3000
server.listen(serverPort,()=>console.log('Running...'))
