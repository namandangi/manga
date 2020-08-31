const express = require('express');
const rp      = require("request-promise");
const axios   = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
    app = express();   

    mongoose.connect("mongodb://localhost:27017/comic_test",{ useNewUrlParser : true });
    app.set("view engine","ejs");
    app.use(express.static(__dirname + "/public"));

    const mangaRouter  = require('./routes/mangas');

    app.use('',mangaRouter);

    app.listen(process.env.PORT||3000,process.env.IP,()=>{
        console.log(`server running on port 3000`);
    })