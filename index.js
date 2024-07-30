const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render("index", {files: files});
    });
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.tittle.split(' ').join('_')}.txt`, req.body.details, (err) => {
       res.redirect('/'); 
    });
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, data) => {
        res.render("show", {filename: req.params.filename, filedata: data});
    });
});


app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
}); 