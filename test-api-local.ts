import http from "http";

const data = JSON.stringify({
  name: "Leo",
  age: 6,
  interests: "trains",
  style: "calming bedtime",
  length: "short"
});

const req = http.request(
  {
    hostname: "127.0.0.1",
    port: 3000,
    path: "/api/generate-story",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  },
  (res) => {
    console.log(`STATUS CODE: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log(`BODY: ${body}`);
    });
  }
);

req.on("error", (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
