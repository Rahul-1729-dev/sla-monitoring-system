require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const slaRoutes = require("./routes/slaRoutes");
const startMonitoring = require("./services/monitorService");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected");

})
.catch(err=>console.log(err));

app.use("/api", slaRoutes);

app.get("/",(req,res)=>{
    res.send("SLA Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});

startMonitoring();