const serverApp = require("./app");

const server = serverApp.listen(8081, () => {
  //   const host = server.address().address;
  const port = server.address().port;
  console.log(`Server listening at http://${port}`);
});
