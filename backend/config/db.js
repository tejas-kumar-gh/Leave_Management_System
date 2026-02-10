const mysql= require('mysql2')

const db=mysql.createConnection({
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASS,
  database:process.env.MYSQL_DB,
});

db.connect((err)=>{
  if(err){
    console.log("DB connection failed",err)

  }  
  else{
    console.log("MySql connected")

  }
})
module.exports=db;