const e = require("express");
const express = require("express");
const apiRoutes = require("./apiRoutes");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// These routs are used by the webpage to manipulate data.
app.use(apiRoutes);
// These routes are used by the webpage or user to navigate to new web pages.
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
