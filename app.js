var express = require('express'),
    rp      = require("request-promise"),
    axios   = require('axios'),
    cheerio = require('cheerio'),
    app     = express();   
    var mangaName;
    var chapterNumber = 1;
    var mangaNameList = [];
    var mangaList = [{title : String , name : String , url : String}];
    let urlD = "https://www.mangazuki.online/manga/springtime-for-blossom-comic/chapter-28/";
    var imgs = [];

    app.get('/mangas',(req,res)=>{
        axios.get("https://www.mangazuki.online/").then(response=>{
            let $ = cheerio.load(response.data);
            $('.h5').children().each(function(i,manga){
                mangaNameList[i] = $(manga).text().toString().replace(/\s+/g, '-').toLowerCase();
                mangaList[i] = {title : $(manga).text() , name : mangaNameList[i], url : $(manga).attr('href')};
                //console.log(mangaList[i]);
            })
        })
        res.render("home.ejs",{list:mangaList});
    })



    
        app.get("/mangas/:name/:id",(req,res)=>{
            let id;
            //console.log(req.params.name);
            chapterNumber = req.params.id;
            for(var i=0;i<mangaList.length;i++)
                {
                    if(req.params.name == mangaList[i].name)
                    id = i;
                }

            var url = mangaList[id].url+"/chapter-"+chapterNumber;
            axios.get(url).then(response=>{
            let $ = cheerio.load(response.data);
            //    let img = $('#image-0').attr('src');
            $('.wp-manga-chapter-img').each(function(i,img){
                imgs[i] = $(this).attr('src');
            })
            res.render("index.ejs",{images:imgs,name:mangaList[id].name,number:chapterNumber});
    });
});

    app.listen(process.env.PORT||3000,process.env.IP,()=>{
        console.log(`server running on port 3000`);
    });