import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";

import winstonLogger from "./utils/logger.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js"
import tasksRouter from "./routes/tasks.js"

const app = express();
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const morganFormat = process.env.NODE_ENV === "production" ? "dev" : "combined";
app.use(logger(morganFormat, { stream: winstonLogger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth",authRouter)
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error message and status
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
  // res.render('error');
});

export { app };
