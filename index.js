// const http = require("http");
// const app = require("./api/server");
// require("dotenv").config();

// const server = http.createServer(app);
// const PORT = process.env.PORT || 5000;

// // server.on("error", (e) => console.log(e.message));

// server.listen(Number(PORT), () =>
//   console.log(`Server listening on port ${PORT}`)
// );

require("dotenv").config();
const server = require("./api/server");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n  *** Server running on port ${port} ***`);
});
