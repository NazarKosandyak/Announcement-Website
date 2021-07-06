
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000
app.use(express.static(__dirname + '/dist/AnnouncementWebsite'));
app.get('/*',(req,res)=>{'index.html',{root:'dist/AnnouncementWebsite/'}});
app.listen(port)


