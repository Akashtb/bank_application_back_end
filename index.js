//First we have to import express
const express = require('express') 
//import data service
const dataService = require('./services/data.service')

//jsonwebtoken import
const jwt = require('jsonwebtoken')

//using express create serve app
const app = express()

//to parse json data
app.use(express.json())

//application middleware
const appmiddleware=(req,res,next)=>{
    console.log('inside application middleware');
    next()
}
app.use(appmiddleware)

//router specific middleware
const jwtmiddleware = (req,res,next)=>{
    console.log('inside jwtmiddleware');
    //to fetch token 
    const token =req.headers['access-token']
    //verify token - verify
    try{
        const data = jwt.verify(token,'super4')
        console.log(data);
        next()
    }
    catch{
        res.status(404).json({
            statusCode:404,
            status:false,
            message:'Please Log in'
        })
    }
}
//http 
//get method:- to read data from server
app.get('/',(req,res)=>{
    res.send('GET METHOD')
})
//post-create serve
app.post('/',(req,res)=>{
res.send('POST METHOD')
}) 
//put-modify
app.put('/',(req,res)=>{
    res.send('PUT METHOD')
})   
//patch-partial modification
app.patch('/',(req,res)=>{
    res.send('PATCH METHOD')
})
//delete-delete
app.delete('/',(req,res)=>{
    res.send('DELETE METHOD')
})

//bank app 

//register API
app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataService.register(req.body.acno,req.body.username,req.body.password)
    res.status(result.statusCode).json(result)
})
//login API
app.post('/login',(req,res)=>{
    console.log(req.body);
    const result = dataService.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
})
app.post('/deposit',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result = dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statusCode).json(result)
})

//withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result = dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statusCode).json(result)
})
app.post('/gettransaction',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result = dataService.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})

//set port number
app.listen(3000,()=>{
    console.log('serve loaded at 3000');
})

