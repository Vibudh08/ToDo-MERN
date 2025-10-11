import express from 'express'

const app = express()

app.get("/",(req,res)=>{
    res.send("node start")
})

app.listen(3400)