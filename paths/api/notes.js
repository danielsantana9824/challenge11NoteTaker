const router=require("express").Router();
const fs=require("fs");

router.get("/", (req,res)=>{

    fs.readFile("./db/db.json","utf-8", (err,data)=>{
        if(err){
           res.status(500).json(err)
        }
        const notes=JSON.parse(data)
        res.json(notes)

    })
})

module.exports=router;