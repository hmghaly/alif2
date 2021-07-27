
function makeHighScorePage(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    //STYLE = {font:theme.font, size:50};

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)
    .on("mousedown", function () {pages.go(page_nav.main_menu, "right"); });


    new Label({color:purple, text:"High Scores", size:45,variant:true}).pos(0,70,CENTER,TOP,page);

    page.deploy=function(){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);

        //response='{"status":"success","success":true,"rank":1",score_status":"New Personal High Score!","message":"ok","highscore":true,"rank_status":"Added Personal Rank!","top_scores":[{"user_avatar":"002-girl-9.png","user_key":"km1ojcfh","app":"alif-laam","score":651,"time":1627353430.315025,"user_name":"hgh1","user_email":"hmghaly@gmail.com"},{"user_avatar":"user.png","user_key":"krmbza9f","app":"alif-laam","score":160,"time":1627406919.369873,"user_name":"test","user_email":"hm@gg.cc"}]}'
        //res='{"status":"success","prev_score":651,"success":true,"prev_rank":0,"rank":1,"raw":"{\"user_key\":\"km1ojcfh\",\"user_name\":\"hgh1\",\"user_email\":\"hmghaly@gmail.com\",\"user_avatar\":\"002-girl-9.png\",\"score\":452,\"app\":\"alif-laam\"}","score_status":"No New Score","message":"ok","highscore":false,"rank_status":"No New Rank","top_scores":[{"user_avatar":"002-girl-9.png","user_key":"km1ojcfh","app":"alif-laam","score":651,"time":1627353430.315025,"user_name":"hgh1","user_email":"hmghaly@gmail.com"},{"user_avatar":"user.png","user_key":"krmbza9f","app":"alif-laam","score":160,"time":1627406919.369873,"user_name":"test","user_email":"hm@gg.cc"}]}'

        var win = new Window({
            width:stageW*0.9,
            height:600,
            interactive:true,
            padding:10,
            corner:10,
            scrollBarDrag:true,
            backgroundColor:purple.darken(.5),
            borderColor:purple
        }).pos(0,50,CENTER,CENTER,page.main_cont);

        const wrapper = new Wrapper({
            spacingH:20,
            spacingV:20
        });        
        //win.removeAllChildren()
        const objects = []; //[new Circle(20, red), new Rectangle(30,30,red).rot(20).sca(2).reg(30,150), new Rectangle(30,30,orange), new Rectangle(30,30,blue), new Rectangle(30,30,green), new Rectangle(30,30,purple)];
        const colors = series(green.darken(0.5),blue.darken(0.5),pink.darken(0.5),orange.darken(0.5))
        //const letters = series("WRAPPER".split(""));

        // res='{"status":"success","prev_score":651,"success":true,"prev_rank":0,"rank":1,"score_status":"No New Score","message":"ok","highscore":false,"rank_status":"No New Rank","top_scores":[{"user_avatar":"002-girl-9.png","user_key":"km1ojcfh","app":"alif-laam","score":651,"time":1627353430.315025,"user_name":"hgh1","user_email":"hmghaly@gmail.com"},{"user_avatar":"user.png","user_key":"krmbza9f","app":"alif-laam","score":160,"time":1627406919.369873,"user_name":"test","user_email":"hm@gg.cc"}]}'
        // res_dict=JSON.parse(res)
        // top_scores=res_dict.top_scores
        // zog(top_scores)

        //now getting the topscores from the server
	    highscore_upload_obj={}
	    highscore_upload_obj["user_key"]=assigned_user_key
	    highscore_upload_obj["user_name"]=user.username
	    highscore_upload_obj["user_email"]=user.email
	    highscore_upload_obj["user_avatar"]=user.avatar
	    highscore_upload_obj["score"]=0
	    highscore_upload_obj["app"]=game_name

	    // console.log(highscore_upload_obj)
	    // console.log(JSON.stringify(highscore_upload_obj))

	    link="../get_score.py"
	    post_data(link,highscore_upload_obj,function(obj1){
	    	res_dict=obj1
	    	top_scores=res_dict.top_scores
	        console.log(obj1)
	        console.log(JSON.stringify(obj1))
	        zim.loop(top_scores, function (item,i) {
	        	user_name=item.user_name
	        	user_score=item.score
	        	user_avatar=item.user_avatar
	        	user_key=item.user_key


	            let rect0 = new Rectangle(stageW*0.85,50,purple)
	            let circle = new Circle({min:20, max:20}, pink);
	            rank_str=""+(i+1)
	            username_label=new Label({color:yellow, text:rank_str, size:20,variant:true}).centerReg(circle)
	            circle.pos(5,0,LEFT,CENTER,rect0);

	            // let rect1 = new Rectangle(stageW*0.25,50,purple)
	            // let rect2 = new Rectangle(stageW*0.25,50,purple)
	            
	        	cur_img=asset(item.user_avatar).clone()
	        	cur_img.height=40;
	        	cur_img.pos(50,0,LEFT,CENTER,rect0);//.centerReg(rect2);//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);
	            objects.push(rect0);
	         //    username_label=new Label({color:yellow, text:user_name, size:45,variant:true}).centerReg(rect0);//.pos(0,30,CENTER,TOP,page);
	        	// score_label= new Label({color:yellow, text:user_score, size:25,variant:true}).centerReg(rect1);//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);
	            username_label=new Label({color:yellow, text:user_name, size:45,variant:false}).pos(100,0,LEFT,CENTER,rect0);
	        	score_label= new Label({color:yellow, text:user_score, size:25,variant:true}).pos(10,0,RIGHT,CENTER,rect0);//.centerReg(rect1);//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);


	 
	            
	        });
	        wrapper.add(objects)
	        win.add(wrapper).addTo(page);



	    }) 



        // zim.loop(top_scores, function (item,i) {
        // 	user_name=item.user_name
        // 	user_score=item.score
        // 	user_avatar=item.user_avatar
        // 	user_key=item.user_key


        //     let rect0 = new Rectangle(stageW*0.85,50,purple)
        //     let circle = new Circle({min:20, max:20}, pink);
        //     rank_str=""+(i+1)
        //     username_label=new Label({color:yellow, text:rank_str, size:20,variant:true}).centerReg(circle)
        //     circle.pos(5,0,LEFT,CENTER,rect0);

        //     // let rect1 = new Rectangle(stageW*0.25,50,purple)
        //     // let rect2 = new Rectangle(stageW*0.25,50,purple)
            
        // 	cur_img=asset(item.user_avatar).clone()
        // 	cur_img.height=40;
        // 	cur_img.pos(50,0,LEFT,CENTER,rect0);//.centerReg(rect2);//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);
        //     objects.push(rect0);
        //  //    username_label=new Label({color:yellow, text:user_name, size:45,variant:true}).centerReg(rect0);//.pos(0,30,CENTER,TOP,page);
        // 	// score_label= new Label({color:yellow, text:user_score, size:25,variant:true}).centerReg(rect1);//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);
        //     username_label=new Label({color:yellow, text:user_name, size:45,variant:false}).pos(100,0,LEFT,CENTER,rect0);
        // 	score_label= new Label({color:yellow, text:user_score, size:25,variant:true}).pos(10,0,RIGHT,CENTER,rect0);//.centerReg(rect1);//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);


 
            
        // });
        // wrapper.add(objects)
        // win.add(wrapper).addTo(page);

    }   

//     new Label({color:purple, text:"minutes to complete daily streak:", size:25,variant:true}).pos(0,120,CENTER,TOP,page);
//     page.streak_status_label= new Label({color:purple, text:"0/10", size:25,variant:true}).pos(0,145,CENTER,TOP,page);

//     new_streak_val=update_streak(0)
//     new_streak_val_minutes= Math.floor( new_streak_val/60 );
//     page.streak_status_label.text=""+new_streak_val_minutes+"/10"


//     profile_btn_label=new Label({color:yellow, text:"Profile", size:25,variant:true})
//     page.go2profile = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:profile_btn_label,corner:20})
//     .pos(0,0,RIGHT,TOP,page)

//     alphabet_btn_label=new Label({color:yellow, text:"Alphabet Tutorials", size:25, align:CENTER})
//     page.go2alphabet_tutorial = new Button({width:stageW*0.5,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:alphabet_btn_label,corner:20})
//     .pos(-stageW*0.2,-stageH*0.2,CENTER,CENTER,page)   

//     youtube_img=frame.asset("youtube.png")
//     image1 = youtube_img.clone()
//     image2 = youtube_img.clone()
//     image1.pos(stageW*0.25,-stageH*0.2,CENTER,CENTER,page).on("mousedown", function () {
//         console.log("Youtube")
//         //zgo("https://www.youtube.com/watch?v=DddX_IdZxOg")
//     });  

//     image2.pos(stageW*0.25,-stageH*0.1,CENTER,CENTER,page).on("mousedown", function () {
//         console.log("Youtube2")
//         //zgo("https://www.youtube.com/watch?v=ycLezw26Whk")
//     });  

// //     // page.go2alphabet.on("mousedown", function () {
// //     //     console.log("go to alphabet")
// //     //     pages.go(page_nav.alpha_game, "down");
// //     // });


//     sound_btn_label=new Label({color:yellow, text:"Letter Sounds Tutorial", size:25, align:CENTER})
//     page.go2sound_tutorial = new Button({width:stageW*0.5,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:sound_btn_label,corner:20})
//     .pos(-stageW*0.2,-stageH*0.1,CENTER,CENTER,page)  



    //go2menu,  go2alphabet_tutorial, go2sound_tutorial
    
//     handwriting_btn_label=new Label({color:yellow, text:"Handwriting", size:25, align:CENTER})
//     page.go2handwriting_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:handwriting_btn_label,corner:20})
//     .pos(-stageW*0.25,0,CENTER,CENTER,page)   
    
//     typing_btn_label=new Label({color:yellow, text:"Typing", size:25, align:CENTER})
//     page.go2typing_game = new Button({width:stageW*0.4,height:60,backgroundColor:red,rollBackgroundColor:orange,label:typing_btn_label,corner:20})
//     .pos(stageW*0.25,0,CENTER,CENTER,page)       

//     read_words_btn_label=new Label({color:yellow, text:"Read Words", size:25, align:CENTER})
//     page.go2read_words_game = new Button({width:stageW*0.4,height:60,backgroundColor:red,rollBackgroundColor:orange,label:read_words_btn_label,corner:20})
//     .pos(-stageW*0.25,stageH*0.2,CENTER,CENTER,page)   
    
//     listen_type_btn_label=new Label({color:yellow, text:"Listen & Type", size:25, align:CENTER})
//     page.go2listen_type_game = new Button({width:stageW*0.4,height:60,backgroundColor:red,rollBackgroundColor:orange,label:listen_type_btn_label,corner:20})
//     .pos(stageW*0.25,stageH*0.2,CENTER,CENTER,page)       

//     //new Label({color:black, text:"Click the play button below to listen to tutorial.\nClick the alphabet button for the list of all letters", size:25}).pos(0,150,CENTER,CENTER,page);

    
    
//     //new Label({color:purple, text:"GO", size:30,variant:true})
// //    font_size=35
// //    test_label=new Label({color:yellow, text:"Play", size:font_size, align:CENTER})//.pos(0,-100,CENTER,CENTER,page1);
// //    page.go2menu = new Button({width:140,height:140,backgroundColor:purple,rollBackgroundColor:orange,label:test_label,corner:70})
// //    .pos(0,30,CENTER,BOTTOM,main_cont)    
//     // var play = page.play = new Button({
//     //     backgroundColor:purple,
//     //     rollBackgroundColor:orange,
//     //     width:100,
//     //     height:100,
//     //     corner:50,
//     //     icon:pizzazz.makeIcon("play", white, 1.5)
//     // })
//     // .pos(0,90,CENTER,BOTTOM,page) 
    

//     scores_label=new Label({color:yellow, text:"Scores", size:25, align:CENTER})
//     page.go2scores = new Button({width:stageW*0.25,height:60,backgroundColor:red,rollBackgroundColor:orange,label:scores_label,corner:20})
//     .pos(0,20,CENTER,BOTTOM,page)   
    
//     settings_label=new Label({color:yellow, text:"Settings", size:25, align:CENTER})
//     page.go2settings = new Button({width:stageW*0.25,height:60,backgroundColor:red,rollBackgroundColor:orange,label:settings_label,corner:20})
//     .pos(-stageW*0.3,20,CENTER,BOTTOM,page)   

//     progress_label=new Label({color:yellow, text:"Progress", size:25, align:CENTER})
//     page.go2progress = new Button({width:stageW*0.25,height:60,backgroundColor:blue.darken(0.5),rollBackgroundColor:orange,label:progress_label,corner:20})
//     .pos(stageW*0.3,20,CENTER,BOTTOM,page)   

//     tutorials_label=new Label({color:yellow, text:"Tutorials", size:25, align:CENTER})
//     page.go2tutorials = new Button({width:stageW*0.5,height:60,backgroundColor:yellow.darken(0.6),rollBackgroundColor:orange,label:tutorials_label,corner:20})
//     .pos(0,100,CENTER,BOTTOM,page)   


   // page.sound_toggle = new Toggle({label:"Sound", color:green.darken(.5), startToggled:true})
   //     .sca(.8)
   //     .pos(0,80,CENTER,BOTTOM,page)
   //     .alp(0)
   //     .animate({
   //         props:{alpha:.1},
   //         wait:3
   //     });

    return page;
}

