const express=require('express')
const app=express()
const cors=require('cors')
const {Pool}=require('pg')
app.use(express.json())
app.use(cors())

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'happy@2609',
    port:5432,
    database:'worldlineemp'
})

app.post('/',async(req,res)=>{
    const{name, mailid,phonenumber,gender,qualification,year_past, year_present}=req.body;
    // const {Firstname,Lastname,email,phoneNumber,dob,gender,address,city,state,zip,country}=req.body;
    try{
        const k=await pool.query('insert into emp(name,mailid,phonenumber,gender,qualification,year_past,year_present) values($1,$2,$3,$4,$5,$6,$7) returning *',[name,mailid,phonenumber,gender,qualification,year_past,year_present])
        // console.log(k.rows);  
    }
    catch(err){
        console.error(err);
    }
    res.json({msg:"success"})
})

app.get('/',async(req,res)=>{
    try{
        const data=await pool.query('select * from emp'); 
        // const data1=await poolquery(' SELECT DATE_PART('day', year_present - ''::timestamp) AS days_diff from emp;')
        res.json(data.rows)}
        catch(err){
            console.log(err);
        } 
})
app.listen(3000,(req,res)=>{
    console.log("Server is listening to port 3000...");
})