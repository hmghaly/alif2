
function makeMainMenu(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    //STYLE = {font:theme.font, size:50};



    new Label({color:purple, text:"Main Menu", size:45,variant:true}).pos(0,30,CENTER,TOP,page);

    page.deploy=function(q_obj){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);

        page.welcome_label= new Label({color:purple, text:"Welcome,\n"+user.username, size:25,variant:true}).pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);
        page.user_avatar=frame.asset(user.avatar).clone().sca(0.1).pos(-stageW*0.4,145,CENTER,TOP,page.main_cont);

        new Label({color:purple, text:"Streak Today:", size:25,variant:true}).pos(0,80,CENTER,TOP,page.main_cont);
        page.streak_status_label= new Label({color:purple, text:"0/10", size:25,variant:true}).pos(0,145,CENTER,TOP,page.main_cont);

        page.days_streak= new Label({color:purple, text:"Streak:\n7 days", size:25,variant:true}).pos(stageW*0.4,80,CENTER,TOP,page.main_cont);

        new_streak_val=update_streak(0)
        new_streak_val_minutes= Math.floor( new_streak_val/60 );
        page.streak_status_label.text=""+new_streak_val_minutes+"/10"      

    }
    page.deploy()





    profile_btn_label=new Label({color:yellow, text:"Profile", size:25,variant:true})
    page.go2profile = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:profile_btn_label,corner:20})
    .pos(0,0,RIGHT,TOP,page)

    feedback_btn_label=new Label({color:yellow, text:"Feedback", size:25,variant:true})
    page.go2feedback = new Button({width:120,height:60,backgroundColor:orange.darken(0.5),rollBackgroundColor:orange,label:feedback_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)
    page.go2feedback.on("mousedown", function () {
        console.log("feedback form")
        $('#feedback_modal').modal('show');
        //pages.go(page_nav.alpha_game, "down");
    });

    


    alphabet_btn_label=new Label({color:yellow, text:"Alphabet Letters", size:25, align:CENTER})
    page.go2alphabet_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:alphabet_btn_label,corner:20})
    .pos(-stageW*0.25,-stageH*0.2,CENTER,CENTER,page)   

    // page.go2alphabet.on("mousedown", function () {
    //     console.log("go to alphabet")
    //     pages.go(page_nav.alpha_game, "down");
    // });


    sound_btn_label=new Label({color:yellow, text:"Letter Sounds", size:25, align:CENTER})
    page.go2sound_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:sound_btn_label,corner:20})
    .pos(stageW*0.25,-stageH*0.2,CENTER,CENTER,page)   
    
    read_words_btn_label=new Label({color:yellow, text:"Read Words", size:25, align:CENTER})
    page.go2read_words_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:read_words_btn_label,corner:20})
    .pos(-stageW*0.25,stageH*0,CENTER,CENTER,page)   
    
    write_words_btn_label=new Label({color:yellow, text:"Write Words", size:25, align:CENTER})
    page.go2write_words_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:write_words_btn_label,corner:20})
    .pos(stageW*0.25,stageH*0,CENTER,CENTER,page)       

    //new Label({color:black, text:"Click the play button below to listen to tutorial.\nClick the alphabet button for the list of all letters", size:25}).pos(0,150,CENTER,CENTER,page);

    
    
    //new Label({color:purple, text:"GO", size:30,variant:true})
//    font_size=35
//    test_label=new Label({color:yellow, text:"Play", size:font_size, align:CENTER})//.pos(0,-100,CENTER,CENTER,page1);
//    page.go2menu = new Button({width:140,height:140,backgroundColor:purple,rollBackgroundColor:orange,label:test_label,corner:70})
//    .pos(0,30,CENTER,BOTTOM,main_cont)    
    // var play = page.play = new Button({
    //     backgroundColor:purple,
    //     rollBackgroundColor:orange,
    //     width:100,
    //     height:100,
    //     corner:50,
    //     icon:pizzazz.makeIcon("play", white, 1.5)
    // })
    // .pos(0,90,CENTER,BOTTOM,page) 
     


    tutorials_label=new Label({color:yellow, text:"Tutorials and Practice", size:25, align:CENTER})
    page.go2tutorials = new Button({width:stageW*0.75,height:60,backgroundColor:yellow.darken(0.6),rollBackgroundColor:orange,label:tutorials_label,corner:20})
    .pos(0,100,CENTER,BOTTOM,page)   


    

    shop_label=new Label({color:yellow, text:"Shop", size:25, align:CENTER})
    page.go2shop = new Button({width:stageW*0.2,height:60,backgroundColor:red,rollBackgroundColor:orange,label:shop_label,corner:20})
    .pos(70,20,CENTER,BOTTOM,page) 
    .on("mousedown", function () {
        page_nav.shop_page.deploy()
        pages.go(page_nav.shop_page, "right"); 
    });
	

    scores_label=new Label({color:yellow, text:"Scores", size:25, align:CENTER})
    page.go2scores = new Button({width:stageW*0.2,height:60,backgroundColor:red,rollBackgroundColor:orange,label:scores_label,corner:20})
    .pos(200,20,CENTER,BOTTOM,page)   
    .on("mousedown", function () {pages.go(page_nav.high_score_page, "right"); });  

    
    settings_label=new Label({color:yellow, text:"Settings", size:25, align:CENTER})
    page.go2settings = new Button({width:stageW*0.2,height:60,backgroundColor:red,rollBackgroundColor:orange,label:settings_label,corner:20})
    .pos(-70,20,CENTER,BOTTOM,page)   

    progress_label=new Label({color:yellow, text:"Progress", size:25, align:CENTER})
    page.go2progress = new Button({width:stageW*0.2,height:60,backgroundColor:blue.darken(0.5),rollBackgroundColor:orange,label:progress_label,corner:20})
    .pos(-200,20,CENTER,BOTTOM,page) 


    
    // frame.asset("youtube.png")
    //     .sca(.6)
    //     .alp(.8)
    //     .centerReg()
    //     // .animate({
    //     //     props:{rotation:720, scale:0},
    //     //     from:true,
    //     //     wait:animateTime*4,
    //     //     time:animateTime,
    //     //     ease:"backOut"
    //     // })
    //     .hov(1) // will bring alpha to 1 when hovered
    //     .tap(function () {
    //         zgo("https://zimjs.com");
    //     });



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

