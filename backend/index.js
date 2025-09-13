const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require('./routes/userRoutes')

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}))

app.get('/',(req,res)=>{
    res.status(200).send({message:"API Working..."})
})
const {ConnectDB}= require('./utils/dbConnector');
ConnectDB();
app.use('/api/user',userRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
})