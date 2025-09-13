const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connectDB = async () =>{
    try{
        await prisma.$connect();
        console.log("MongoDB Connected");
    }
    catch(error){
        console.log(error.message);
    }
};

module.exports = { prisma, connectDB };