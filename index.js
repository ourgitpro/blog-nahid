const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const postRoute = require("./route/posts/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const categoryRoute = require("./route/category/categoryRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());
//cors
app.use(cors());
// app.use(cors()); // allows all origins

//Users route
app.use("/api/users", userRoutes);
//Post route
app.use("/api/posts", postRoute);
//comment routes
app.use("/api/comments", commentRoutes);
//email msg
app.use("/api/email", emailMsgRoute);
//category route
app.use("/api/category", categoryRoute);
//err handler
app.use(notFound);
app.use(errorHandler);

//server
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is running ${port}`));
/*
    mongoose.connect('mongodb+srv://user:user123456@cluster0.ld9e4.mongodb.net/blog?retryWrites=true&w=majority',()=>{
  console.log("DB Connected")
});

 */
