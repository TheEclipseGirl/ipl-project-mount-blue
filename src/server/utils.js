const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

module.exports.newFile = (filename, content) => {
    fs.writeFile(path.join(__dirname + '/../public/output/' + filename), content, (err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('file created successfully');
        return;
    });
}

module.exports.convertCsvToJson = async (filename) => {
    const file_path= path.join(__dirname + `/../data/${filename}`);
    // csv()
    // .fromFile(file_path)
    // .then((jsonObj)=>{
    //     return jsonObj;
    // });
    const jsonArray=await csv().fromFile(file_path);
    return jsonArray;
}