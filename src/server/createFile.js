const fs = require('fs');
const path = require('path');

module.exports.newFile = (filename, content) => {
    fs.writeFile(path.join(__dirname + '/../public/output/' + filename), content, (err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('file created successfully');
    });
}