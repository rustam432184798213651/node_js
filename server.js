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
      cb(null,  file.originalname + "__" + Date.now() )
    }
  })
  
  const upload = multer({storage: storage})

app.get('/', (req, res) => {
    res.send('Hello world');
});

function get_dictionary(pathToFile){
    let data_outer;
    fs.readFile(pathToFile, 'utf8', function(err, data) {
        if (err) throw err;
        result = {};
        text = data.split(";");
        for(let i = 0; i < text.length; i++)
        {
            line = text[i];
            result[line[0]] =  line[-1];
        }
        console.log(data);
        return result;
      });
}

app.post('/api/upload', upload.single('file'), (req, res) => {
    // const pathToFile = "uploads/" + req.file.filename;
    // res.setHeader('Content-Type', "application/json");
    // res.send(JSON.stringify(get_dictionary(pathToFile)));
    
    res.end();
});

// Integration with server
app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
});

