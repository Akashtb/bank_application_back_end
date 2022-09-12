//jsonwebtoken import

const jwt = require('jsonwebtoken')

database={

    1000:{acno:1000,username:'Neer',password:1000,balance:5000 ,transaction:[]},
    1001:{acno:1001,username:'Laisha',password:1001,balance:5000 ,transaction:[]},
    1002:{acno:1002,username:'Vyom',password:1002,balance:5000 ,transaction:[]}
    
    
    }
    

//register

const register=(acno,username,password)=>{

   if(acno in database){
      return {
        statusCode:404,
        status:false,
        message:'User already exist!! Please Log in'
      }
    }
   else{
      database[acno]={
         acno,
         username,
         password,
         balance:0,
         transaction:[]
      }
    
       return {
        statusCode:200,
        status:true,
        message:'register successfull'
       }
    }
  }


  //login
 const login = (acno,pswd)=>{
    
    if(acno in database){
      if(pswd==database[acno]['password']){
       
       currentuser = database[acno]['username']
       currentacno=acno
       
        //token generation - sign()
        const token = jwt.sign({
          currentacno:acno
        },'super4')
    
      return {
        statusCode:200,
        status:true,
        message:'register successfull',
        currentuser,
        currentacno,
        token


      }

    }
else{
  
      return {
        statusCode:404,
        status:false,
        message:'incorrect password'
      }
    }
    }
    else{    
      return {
        statusCode:404,
        status:false,
        message:'User does not exist'
      }
  }
  
 }



    //deposit
  const  deposit = (acno,pswd,amt)=> {

        const amount = parseInt(amt)
        if (acno in database) {
          if (pswd == database[acno]['password']) {
            database[acno]['balance']+=amount
            database[acno]['transaction'].push({
              type:'credit',
              amount
  
            })
            return{
                statusCode:200,
                status:true,
                message:`${amount} depositted successfully and new balance is ${database[acno]['balance']}`
            } 
            
          }
          else {
        
            return {
                statusCode:404,
                status:false,
                message:'incorrect password'
            }
          }
        }
        else {
          
          return {
            
            statusCode:404,
            status:false,
            message:'User does not exist'
          }
        }
      }
    

      //transaction


     const withdraw = (acno,pswd,amt)=>{

        const amount = parseInt(amt)
        if (acno in database) {
          if (pswd == database[acno]['password']) {
  
            if( database[acno]['balance']>amount){
            database[acno]['balance']-=amount
           
            database[acno]['transaction'].push({
              type:'debit',
              amount
              
            })
            
            return {
              statusCode:200,
              status:true,
              message:`${amount} debitted successfully and new balance is ${database[acno]['balance']}`
            }
    
          }
          else{
          
            return {
              statusCode:404,
              status:false,
              message:'Insufficient Balance'
            }
          }
        }
          else {
            
            return {
              statusCode:404,
              status:false,
              message:'Incorrect Password'
            }
            
          }
        }
        else {
          
          return {
            statusCode:404,
              status:false,
              message:'User does not exist'
          }
        }
      }
     const gettransaction=(acno)=>{
      if (acno in database) {
        return {statusCode:200,
        status:true,
        transaction:database[acno].transaction
      }      
    }
    else{
      return{
      statusCode:404,
      status:false,
      message:'User does not exist'}
    }
        
      
      }
    


    module.exports={
        register,
        login,
        deposit,
        withdraw,
        gettransaction
      }