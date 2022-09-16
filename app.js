const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { post } = require("request");
const { STATUS_CODES } = require("http");
const app = express();



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
    const url = "https://us14.api.mailchimp.com/3.0/lists/7d485f264c"
    const options ={
        method:"POST",
        auth:"haris:e34f1cb1dbbb6f8565ddf8c8a8ea4a4c-us14"

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












app.listen(process.env.PORT || 3000, function(){
    console.log("ok ki report");
});



// e34f1cb1dbbb6f8565ddf8c8a8ea4a4c-us14


// 7d485f264c