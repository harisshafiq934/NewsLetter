const dotenv = require ("dotenv")
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { post } = require("request");
const { STATUS_CODES } = require("http");
const { Console } = require("console");
const app = express();

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT
const URL = process.env.URL
const KEY  = process.env.KEY
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req , res){
    res.sendFile(__dirname + "/signup.html");

   
});
app.post("/", function(req, res){
    const first = req.body.fName;
    const last = req.body.sName;
    const email = req.body.email;


    const data = {
        members:[
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }
            }
        ]

        

    };
    const jasonData = JSON.stringify(data);
    const url = URL
    const options ={
        method:"POST",
        auth: KEY

    }

    const request =https.request(url, options, function(response){
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data) );
        });

    });
    request.write(jasonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

// app.listen(process.env.PORT || PORT, function(){
//     console.log("ok ki report");
// });

app.listen (PORT, ()=> {
    console.log(`ok ki report  ${PORT}`);
})



