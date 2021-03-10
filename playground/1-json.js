const fs = require('fs');

const dataBuffer = fs.readFileSync('data.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = "tomas";
data.age = 22;

const stringifyData = JSON.stringify(data);
fs.writeFileSync('data.json', stringifyData);