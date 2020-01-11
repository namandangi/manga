var express = require('express'),
    rp      = require("request-promise"),
    axios   = require('axios'),
    cheerio = require('cheerio'),
    app     = express();   
    var mangaUrl;
    var chapterNumber = 1;
    var mangaNameList = [];
    var chapterLink = [{id : Number , name : String , title : String , url : String}];
    // var mangaSearchList = [];
    // var mangaSearch = [{title : String , name : String , url : String}];
    var mangaList = [{title : String , name : String , url : String}];
//     let urlD = "https://www.mangazuki.online/manga/springtime-for-blossom-comic/chapter-28/";
//    // let surl = "https://www.mangazuki.online/?s=spring&post_type=wp-manga";
//     let url = "https://www.mangazuki.online/manga/winner-takes-all/";
    var imgs = [];

    app.get('/mangas',(req,res)=>{
        axios.get("https://www.mangazuki.online/").then(response=>{
            let $ = cheerio.load(response.data);
            $('.h5').children().each(function(i,manga){
                mangaNameList[i] = $(manga).text().toString().replace(/\s+/g, '-').toLowerCase();
                mangaList[i] = {title : $(manga).text() , name : mangaNameList[i], url : $(manga).attr('href')};
                    console.log(mangaList[i]);
            })
        })
        res.render("home.ejs",{list:mangaList});
    })


    app.get('/mangas/:name',(req,res)=>{
        //console.log(req.body);
        //mangaName = req.params.name;
        let id;
        for(var i=0;i<mangaList.length;i++)
            {
                if(req.params.name == mangaList[i].name)
                {   
                    mangaUrl = mangaList[i].url;
                    id = i;
                }
            }
            console.log(mangaUrl);
        axios.get(mangaUrl).then(response=>{
            let $ = cheerio.load(response.data);
            $('.wp-manga-chapter').each((i,name)=>{
                chapterLink[i] ={id : i , name : mangaList[id].name , title: $(name).text() , url : $(name).children().first().attr('href')};
                console.log(chapterLink[i]);
            })
        })
        res.render("chapters.ejs",{allChaps:chapterLink});
    })

    app.get("/mangas/:name/:id",(req,res)=>{
        let id1,id2;
        console.log(req.params.name + " "+ req.params.id);
        chapterNumber = req.params.id;
        for(var i=0;i<mangaList.length;i++)
            {
                // if(req.params.name == mangaList[i].name)
                // id1 = i;
                if(mangaList[i].name==chapterLink[0].name)
                id2 = i;
            }
            //console.log(id1+" "+id2);

        //var url = mangaList[id].url+mangaList[id].url.slice(35,-1)+"-chapter-"+chapterNumber;
        var url = chapterLink[req.params.id].url;
        console.log(url);
        axios.get(url).then(response=>{
        let $ = cheerio.load(response.data);
        //    let img = $('#image-0').attr('src');
        $('.wp-manga-chapter-img').each(function(i,img){
            imgs[i] = $(this).attr('src');
          //  console.log(imgs[i]+"  ");
        })
        //console.log(imgs);
        res.render("index.ejs",{images:imgs,name:mangaList[id2].title,number:chapterNumber});
    });
});

    app.get('/search',(req,res)=>{
        console.log(req.query.search);
        let surl = "https://www.mangazuki.online/?s="+req.query.search.toString().split(' ').join('&')+"&post_type=wp-manga"        
        axios.get(surl).then(response=>{
            let $ = cheerio.load(response.data);
            $('.h4').children().each(function(i,manga){
                mangaNameList[i] = $(manga).text().toString().replace(/\s+/g, '-').toLowerCase();
              mangaList[i]    = {title : $(manga).text() , name : mangaNameList[i], url : $(manga).attr('href')};
                //console.log(mangaSearch[i]);
        });
    });
    res.render("search.ejs",{list:mangaList});
});

    app.get('/anime',(req,res)=>{
        axios.get('https://kissanime.ac').then(response=>{
            let $ = cheerio.load(response.data);
        })
    })



     
   

 
// app.get("/manga-search/:name/:id",(req,res)=>{
//     let id;
//     //console.log(req.params.name);
//     chapterNumber = req.params.id;
//     for(var i=0;i<mangaSearch.length;i++)
//         {
//             if(req.params.name == mangaSearch[i].name)
//             id = i;
//         }

//     //var url = mangaList[id].url+"/chapter-"+chapterNumber;
//     var url = mangaSearch[id].url+"/chapter-"+chapterNumber;
//     axios.get(url).then(response=>{
//     let $ = cheerio.load(response.data);
//     //    let img = $('#image-0').attr('src');
//     $('.wp-manga-chapter-img').each(function(i,img){
//         imgs[i] = $(this).attr('src');
//     })
//     res.render("index.ejs",{images:imgs,name:mangaSearch[id].name,number:chapterNumber});
// });
// });

    app.listen(process.env.PORT||3000,process.env.IP,()=>{
        console.log(`server running on port 3000`);
    });