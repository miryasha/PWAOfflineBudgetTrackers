const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
const MONGODB_URI = "mongodb://blog:lsdkf679ktYh@test-shard-00-00.iffsj.mongodb.net:27017,test-shard-00-01.iffsj.mongodb.net:27017,test-shard-00-02.iffsj.mongodb.net:27017/OfflineBudgetTrackers?ssl=true&replicaSet=atlas-pl2ua8-shard-0&authSource=admin&retryWrites=true&w=majority"  ;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
.then((result) =>{
      ///listener
app.listen(PORT, (err) =>{
      console.log(err);
  })
})
.catch((err) => console.log(err))

//routes
require("./routes/api")(app);
require("./routes/html")(app);

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});