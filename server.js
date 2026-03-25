const express=require("express");
require("dotenv").config();
const cors=require("cors");
const db=require("./config/db");
const schoolRoutes = require("./routes/SchoolRoutes");

const app=express();

app.use(express.json());
app.use(cors());
app.use("/api",schoolRoutes)
const PORT=process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})