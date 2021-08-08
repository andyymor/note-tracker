const express = require("express");
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlroutes");
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use('/api',apiRoutes);
app.use('/',htmlRoutes );

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });