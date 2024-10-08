const express= require("express");
const colors= require("colors");
const morgan =require("morgan");
const dotenv=require("dotenv");
const cors = require('cors');
const connectDB = require("./config/db");
const path=require("path")

dotenv.config();
//rest object
const app=express();

//mongodb connection
connectDB();

//middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(morgan("dev"));

//static files
app.use(express.static(path.join(__dirname,'./frontend/dist')));

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/dist/index.html'));
})

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

//routes
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));
app.use("/api/v1/doctor",require("./routes/doctorRoutes"));

app.get("/",async (req,res)=>{
    res.status(200).send({
        message:"server running"
    });
});

const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
});
