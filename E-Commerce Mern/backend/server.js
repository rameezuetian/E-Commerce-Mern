const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
// handling uncaught Exception 
process.on("uncaughtException" , (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);


})



// config 
dotenv.config({path :"config/config.env"})

//  connecting database
connectDatabase();



const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


//  unhandled promise rejection 

process.on("unhandledRejection" , err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});