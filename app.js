var express = require('express'),
    rp      = require("request-promise"),
    axios   = require('axios'),
    cheerio = require('cheerio'),
    mongoose = require('mongoose'),
    app     = express();   


    mongoose.connect("mongodb://localhost:27017/comic_test",{ useNewUrlParser : true });
    app.set("view engine","ejs");
    //app.set('views', './views');
    app.use(express.static(__dirname + "/public"));

    var favManga = [];
    var mangaUrl;
    var chapterNumber = 1;
    var mangaNameList = [];
    var chapterLink = [{id : Number , name : String , title : String , url : String}];
    // var mangaSearchList = [];
    // var mangaSearch = [{title : String , name : String , url : String}];
    var mangaList = [{title : String , name : String , url : String , imgurl : String}];
//     let urlD = "https://www.mangazuki.online/manga/springtime-for-blossom-comic/chapter-28/";
//     let surl = "https://www.mangazuki.online/?s=spring&post_type=wp-manga";
//     let url = "https://www.mangazuki.online/manga/winner-takes-all/";
    var imgs = [];

    app.get('/mangas',async (req,res)=>{
        await axios.get("https://www.mangazuki.online/").then(response=>{
            let $ = cheerio.load(response.data);
            
            /***  Only gives chapter-urls ***/

            // $('.h5').children().each(function(i,manga){
            //     mangaNameList[i] = $(manga).text().toString().replace(/\s+/g, '-').toLowerCase();
            //     mangaList[i] = {title : $(manga).text() , name : mangaNameList[i], url : $(manga).attr('href')};
            //         console.log(mangaList[i]);
            // })

            /*The code below is used to get image-urls along with chapter-urls*/             
            $('.item-thumb').children().each(function(i,manga){
                mangaNameList[i] = $(manga).attr('title').toString().replace(/\s+/g, '-').toLowerCase();
                mangaList[i] = {title : $(manga).attr('title') , name : mangaNameList[i], url : $(manga).attr('href') , imgurl : $(manga).find('.img-responsive').attr('src')};
                console.log(mangaList[i]);
            })
        })
        res.render("home.ejs",{list:mangaList});
    })


    app.get('/mangas/:name',async (req,res)=>{
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
        await axios.get(mangaUrl).then(response=>{
            let $ = cheerio.load(response.data);
            $('.wp-manga-chapter').each((i,name)=>{
                //chapterLink[i] ={id : i , name : mangaList[id].name , title: $(name).text() , url : $(name).children().first().attr('href')};
                chapterLink[i] ={id : i , name : mangaList[id].name , title: $(name).text() , url : $(name).find('a').attr('href')};
                console.log(chapterLink[i]);
            })
        })
        if(chapterLink.length<=1)
        await axios.get(chapterLink[0].url).then(response=>{
            let $ = cheerio.load(response.data);
            $('.wp-manga-chapter').each((i,name)=>{
                //chapterLink[i] ={id : i , name : mangaList[id].name , title: $(name).text() , url : $(name).children().first().attr('href')};
                chapterLink[i] ={id : i , name : mangaList[id].name , title: $(name).text() , url : $(name).find('a').attr('href')};
                console.log(chapterLink[i]);
            })
        })
        res.render("chapters",{allChaps:chapterLink});
    })

    app.get("/mangas/:name/:id",async (req,res)=>{
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
        await axios.get(url).then(response=>{
        let $ = cheerio.load(response.data);
        //    let img = $('#image-0').attr('src');
        $('.wp-manga-chapter-img').each(function(i,img){
            imgs[i] = $(this).attr('src');
          //  console.log(imgs[i]+"  ");
        })
        //console.log(imgs);
        res.render("index",{images:imgs,name:mangaList[id2].title,number:chapterNumber});
    });
});

    app.get('/search',async (req,res)=>{
        console.log(req.query.search);
        let surl = "https://www.mangazuki.online/?s="+req.query.search.toString().split(' ').join('+')+"&post_type=wp-manga"        
        console.log(surl);
        await axios.get(surl).then(response=>{
            let $ = cheerio.load(response.data);
        //     $('.h4').children().each(function(i,manga){
        //         mangaNameList[i] = $(manga).text().toString().replace(/\s+/g, '-').toLowerCase();
        //       mangaList[i]    = {title : $(manga).text() , name : mangaNameList[i], url : $(manga).attr('href')};
        //         console.log(mangaList[i]);
        // });
        $('.tab -thumb').children().each(function(i,manga){
            mangaNameList[i] = $(manga).attr('title').toString().replace(/\s+/g, '-').toLowerCase();
            mangaList[i] = {title : $(manga).attr('title') , name : mangaNameList[i], url : $(manga).attr('href') , imgurl : $(manga).find('.img-responsive').attr('src')};
            console.log(mangaList[i]);
        })
    });
    res.render("search",{list:mangaList});
});

    app.get('/anime',(req,res)=>{
        axios.get('https://kissanime.ac').then(response=>{
            let $ = cheerio.load(response.data);
        })
    })


    app.get('/favourites',(req,res)=>{
        favManga.push(req.query.value);
        console.log(favManga);
       res.render("favourite",{list:favManga});
    });
     
   

 
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