
const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static('/dist/AnnouncementWebsite'));
// app.get('/*',(req,res)=>{'index.html',{root:'dist/AnnouncementWebsite/'}});
// app.listen(port)


app.use(express.static('./dist/AnnouncementWebsite'));
app.get('/*', (req, res) =>
      res.sendFile('index.html', {root: 'dist/AnnouncementWebsite/'}),
);
app.listen(process.env.PORT || 5000);