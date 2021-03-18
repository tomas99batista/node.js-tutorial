const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=e29a0fe05006951d5ec2fd2bb25aec94&query=40,-7`;

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    // console.log(chunk);
    data += chunk;
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log(`ERROR: ${error}`);
});

request.end();
