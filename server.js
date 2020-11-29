const e = require("express");
const express = require("express");
const apiRoutes = require("./apiRoutes");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiRoutes);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
