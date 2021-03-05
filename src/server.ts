DeviceMotionEvent.config();

const port = process.env.PORT;

const server = http.createServer((request, response) => {
  response.statusCode = "200";
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify([1, 2, 3]));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
