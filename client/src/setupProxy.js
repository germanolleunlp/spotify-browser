const proxy = require("http-proxy-middleware");

// Only for development mode
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://localhost:3001/",
    })
  );
};
