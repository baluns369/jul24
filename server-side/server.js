const http =require("http");
const fs =require("fs");
const url =require("url");

const queryString = require("querystring");
const {MongoClient} = require("mongodb")

//CONNECT MONGODB//
const client = new MongoClient("mongodb://127.0.0.1:27017/")

const app = http.createServer((req,res)=>{

    //CREATE DATABASE//
    const db = client.db("datas");

    //CREATE COLLECTION//
    const collection =db.collection("studends");

    const path = url.parse(req.url);
    console.log(req.method);
    console.log(path);
    if (path.pathname == "/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"));
    }
    else if (path.pathname == "/js/index.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../client-side/js/index.js"));
    }
    else if (path.pathname == "/js/add.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../client-side/js/add.js"));
    }
    else if (path.pathname == "/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/index.css"));
    }
    else if (path.pathname == "/css/add.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/add.css"));
    }
    else if (path.pathname == "/add"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/pages/add.html"));
    }
    if(req.method == "POST" && path.pathname == "/submit"){
        let body = "";
        req.on("data",(details)=>{
            console.log(details);
            body+=details.toString()
            console.log(body)
        })
    }
    // req.on("end",async()=>{
    //     if (body !=null){
    //         //convert to object//
    //         const formData=queryString.parse(body);
    //         console.log(formData)
    //         //insert data//
    //         collection.insertOne(formData).then(()=>{
    //             console.log("success");

    //         })
    //         .catch((error)=>{
    //             console.log(error);
    //         });
    //     }
    // });
    // res.writeHead(200,{"Content-Type":"text/html"});
    // res.end(fs.readFileSync("../client-side/index.html"));
});
app.listen(3000);