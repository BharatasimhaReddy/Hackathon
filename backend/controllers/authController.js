const { prisma } = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

exports.userRegister = async (req,res) =>{
    const {name,email,password,role} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const UserData = await prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword,
                role: "USER"
            }
        });
        res.status(201).send({message:"Created user",status:true})
    } catch (error) {
        console.log("User Register Error:",error.message);
        res.status(500).send({message:error.message,status:false})
    }
}

exports.userLogin = async (req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    try{
        const validUser = await prisma.user.findFirst({where:{email:email,role:'USER'}});
        if(!validUser) return res.status(400).send({message:`User Does'nt exist`});
        const validPass =await bcrypt.compare(password,validUser.password);
        if(!validPass) return res.status(400).send({message:`Wrong Password`});
        const token = jwt.sign(
                {id:validUser.id,email:email,role:'USER'},
                process.env.JWT_SECRET_TOKEN,
                {expiresIn: '6h'}
        )
        res.status(200).send({message:`Login Successful`,token:token});
    }
    catch(err){
        res.status(500).send({message:err});
    }
}

