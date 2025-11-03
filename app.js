const express = require("express");

const healthcheckRoutes = require("./routes/healthcheck.route");
const userRoutes = require("./routes/user.route");
const usersRoutes = require("./routes/users.route");
const categoryRoutes = require("./routes/category.route");
const recordRoutes = require("./routes/record.route");

const app = express();

app.use(express.json());

app.use("/healthcheck", healthcheckRoutes);

app.use("/user", userRoutes);
app.use("/users", usersRoutes);
app.use("/category", categoryRoutes);
app.use("/record", recordRoutes);

module.exports = app;
