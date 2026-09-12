const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const crypto = require('crypto')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')
require('dotenv').config()
const MongoClient = new mongodb.MongoClient(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 7500, connectTimeoutMS: 7500
})

async function connectDB(){
    try{
        await MongoClient.connect()

        const db = MongoClient.db("Feedback")
        const fb = db.collection("feedback")
        const sb = MongoClient.db("Notes")
        const cb = sb.collection("notes")
        
        const adb = MongoClient.db("Analytics")
        const ab = adb.collection("analytics")
        // setting up the TTL index and the index based on clipboard ID
        await cb.createIndex({expiresAt: 1}, {expireAfterSeconds: 0})
        await cb.createIndex({clipBoardID: 1}, {unique: true})
        http.createServer((req, res)=>{
            // Basic routing to load all the HTML, CSS and the JS pages
            // Using ReadStream to increase the speed of the operations.
            const url = req.url
            const method = req.method

            if(url === '/'){
                res.statusCode = 301 // Redirection to welcome page
                res.setHeader('Location','/welcome')
                res.end()
                return
            }
            else if(url==='/welcome'){
                res.writeHead(200, {"content-type": 'text/html'})
                fs.createReadStream('./welcome.html').pipe(res)
            }
            else if(url === '/home'){
                res.writeHead(200, {"content-type": 'text/html'})
                fs.createReadStream('./index.html').pipe(res)
            }
            else if(url === '/style.css'){
                res.writeHead(200, {'content-type':'text/css'})
                fs.createReadStream('./style.css').pipe(res)
            }
            else if(url === '/script.js'){
                res.writeHead(200,{'content-type':'application/javascript'})
                fs.createReadStream('./script.js').pipe(res)
            }
            else if(url === '/help'){
                res.writeHead(200,{'content-type':'text/html'})
                fs.createReadStream('./help.html').pipe(res)
            }
            else if(url === '/feedback'){
                res.writeHead(200,{'content-type':'text/html'})
                fs.createReadStream('./feedback.html').pipe(res)
            }
            else if(method === 'POST' && url === '/sendFeedback'){
                try{
                    let body = ""
                    req.on('data',(chunk)=>{
                        body+=chunk
                    })
                    req.on('end', async()=>{
                        let data = querystring.parse(body)
                        let fdb = data.feedback
                        if(fdb.length>1000){
                            res.writeHead(413,{'content-type':'text/plain'})
                            res.end()
                            return
                        }
                        else if(fdb.trim().length<=0){
                            res.writeHead(400,{'content-type':'text/plain'})
                            res.end()
                            return
                        }
                        else{
                            await fb.insertOne({
                                message: fdb
                            })
                            res.writeHead(200, {"Content-Type":"text/plain"})
                            res.end()
                            return
                        }
                    })
                }
                catch(err){

                }
            }
            else{
                res.writeHead(404, {"content-type": 'text/html'})
                fs.createReadStream('./pageNotFound.html').pipe(res)
            }
        }).listen(process.env.PORT, '0.0.0.0', ()=>{
        
        })
    }
    catch(err){
      
    }
}

connectDB()