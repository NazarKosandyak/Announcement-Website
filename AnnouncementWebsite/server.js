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
app.get('/*',(req,res)=>{res.sendFile(path.join(__dirname))});

const server = jsonServer.create()
const router = jsonServer.router('db.json')
server.listen(port,()=>console.log('Running...'))
