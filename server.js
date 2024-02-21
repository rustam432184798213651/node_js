const express = require('express');
const fs = require('fs');
const multer = require('multer');
var path = require('path');

const app = express();
const PORT = 443;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname.split('.')[0] + "__" + Date.now() + "." + file.originalname.split('.')[1])
    }
  })
  
  const upload = multer({storage: storage})

app.get('/', (req, res) => {
    res.send('Hello world');
});

function return_response(fileName, res){
    fs.readFile("uploads\\" + fileName, 'utf8', function(err, data) {
        if (err) throw err;
        result = {};
        text = data.split(";\r\n");
        // Delete last character from last string
        text[text.length - 1] = text[text.length - 1].slice(0, text[text.length - 1].length - 1);
        for(let i = 0; i < text.length; i++)
        {
            line = text[i].split(' is ');
            result[line[0]] =  line[1];
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
        res.end();
      });
}

app.post('/api/upload', upload.single('file'), (req, res) => {
    // const pathToFile = "uploads/" + req.file.filename;
    // res.setHeader('Content-Type', "application/json");
    // res.send(JSON.stringify(get_dictionary(pathToFile)));
    return_response(req.file.filename, res);
});

// Integration with server
app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
});

