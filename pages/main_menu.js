
function makeMainMenu(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    //STYLE = {font:theme.font, size:50};



    

    page.deploy=function(q_obj){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);

        page.title_label=new Label({color:purple, text:"ALIF LAAM", size:45,variant:true})//.pos(0,30,CENTER,TOP,page);
        welcome_txt="Welcome, "+user.username
        page.welcome_label= new Label({color:purple, text:welcome_txt, size:25,variant:true})//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);

	    new Tile({
	        obj:[page.title_label,page.welcome_label], 
	        rows:2,
	        spacingV:5, 
	        unique:true,
	        align:CENTER
	    }).pos(0,25,CENTER,TOP,page.main_cont);

	    //get_nday_streak()

        //n_days_streak=5
        n_days_streak=get_nday_streak()
        x_days_streak_label_txt=""+n_days_streak+" day streak"
        page.x_days_streak_label=new Label({color:purple, text:x_days_streak_label_txt, size:25,variant:true})

        // n_min_goal=10
        // n_min_completed=5
        n_min_goal=settings.streak_dur_min
        n_min_completed=streak[today()]
        if (n_min_completed==null) n_min_completed=0
        //x_min_today_label_txt=""+n_min_completed+ " minutes today\n"+n_min_goal+ " minutes daily goal"
        x_min_today_label_txt=""+n_min_completed+ "/"+n_min_goal+ " minutes today"
        page.x_min_today_label=new Label({color:purple, text:x_min_today_label_txt, size:25,variant:true})

        

	    new Tile({
	        obj:[asset("trophy.png").sca(0.75), asset("clock.png").sca(0.75), page.x_days_streak_label,page.x_min_today_label], 
	        rows:2,
	        cols:2,
	        spacingV:10, 
	        spacingH:100, 
	        unique:true,
	        align:CENTER
	    }).pos(0,150,CENTER,TOP,page.main_cont);

	    page.user_avatar=frame.asset(user.avatar).clone().sca(0.1)
	    page.profile_btn_label=new Label({color:purple, text:"Profile", size:25,variant:true})

	    profile_tile=new Tile({
	        obj:[page.user_avatar,page.profile_btn_label], 
	        rows:2,
	        spacingV:5, 
	        unique:true,
	        align:CENTER
	    }).pos(10,10,RIGHT,TOP,page.main_cont)
	    .on("mousedown", function () {go_deploy(page_nav.profile_page)})

	    //go_deploy

        
        //page.user_avatar=frame.asset(user.avatar).clone().sca(0.1).pos(-stageW*0.4,145,CENTER,TOP,page.main_cont);

        //new Label({color:purple, text:"Streak Today:", size:25,variant:true}).pos(0,80,CENTER,TOP,page.main_cont);
        //page.streak_status_label= new Label({color:purple, text:"0/10", size:25,variant:true}).pos(0,145,CENTER,TOP,page.main_cont);

        //page.days_streak= new Label({color:purple, text:"Streak:\n7 days", size:25,variant:true}).pos(stageW*0.4,80,CENTER,TOP,page.main_cont);

        //new_streak_val=update_streak(0)
        //new_streak_val_minutes= Math.floor( new_streak_val/60 );
        //page.streak_status_label.text=""+new_streak_val_minutes+"/10"      

    }
    page.deploy()





    // profile_btn_label=new Label({color:yellow, text:"Profile", size:25,variant:true})
    // page.go2profile = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:profile_btn_label,corner:20})
    // .pos(0,0,RIGHT,TOP,page)

    // feedback_btn_label=new Label({color:yellow, text:"Feedback", size:25,variant:true})
    // page.go2feedback = new Button({width:120,height:60,backgroundColor:orange.darken(0.5),rollBackgroundColor:orange,label:feedback_btn_label,corner:20})
    // .pos(0,0,LEFT,TOP,page)
    // page.go2feedback.on("mousedown", function () {
    //     console.log("feedback form")
    //     $('#feedback_modal').modal('show');
    //     //pages.go(page_nav.alpha_game, "down");
    // });

    feedback_label=new Label({color:purple, text:"Feedback", size:25, align:CENTER})
    feedback_tile=new Tile({
        obj:[asset("feedback.png").sca(0.8),feedback_label], rows:2, spacingV:0, unique:true,align:CENTER})
    .pos(10,10,LEFT,TOP,page)
    feedback_tile.on("mousedown", function () {
        //go_deploy(page_nav.high_score_page); 
        console.log("feedback form")
        $('#feedback_modal').modal('show');        
    });


    


    alphabet_btn_label=new Label({color:yellow, text:"Alphabet Letters", size:25, align:CENTER})
    page.go2alphabet_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:alphabet_btn_label,corner:20})
    .alp(0).animate({props:{alpha:1},wait:2});  

    //.pos(-stageW*0.25,-stageH*0.2,CENTER,CENTER,page)   

    sound_btn_label=new Label({color:yellow, text:"Letter Sounds", size:25, align:CENTER})
    page.go2sound_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:sound_btn_label,corner:20})
    .alp(0).animate({props:{alpha:1},wait:3});  
    //.pos(stageW*0.25,-stageH*0.2,CENTER,CENTER,page)   
    
    read_words_btn_label=new Label({color:yellow, text:"Read Words", size:25, align:CENTER})
    page.go2read_words_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:read_words_btn_label,corner:20})
    .alp(0).animate({props:{alpha:1},wait:4});  
    //.pos(-stageW*0.25,stageH*0,CENTER,CENTER,page)   
    
    write_words_btn_label=new Label({color:yellow, text:"Write Words", size:25, align:CENTER})
    page.go2write_words_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:write_words_btn_label,corner:20})
    .alp(0).animate({props:{alpha:1},wait:5});  
    //.pos(stageW*0.25,stageH*0,CENTER,CENTER,page)    

    game_buttons_tile=new Tile({
            obj:[page.go2alphabet_game, page.go2sound_game, page.go2read_words_game,page.go2write_words_game], 
            rows:2,
            cols:2,
            spacingV:50, 
            spacingH:50, 
            unique:true,
            align:CENTER
        }).center(page) //pos(0,100,CENTER,TOP,page.main_cont);

    settings_label=new Label({color:purple, text:"Settings", size:25, align:CENTER})
    settings_tile=new Tile({
        obj:[asset("settings.png").sca(0.75),settings_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    settings_tile.on("mousedown", function () {go_deploy(page_nav.settings); }); 

    //.pos(stageW*0.25,stageH*0.25,CENTER,CENTER,page)
    score_label=new Label({color:purple, text:"Score", size:25, align:CENTER})
    score_tile=new Tile({
        obj:[asset("star.png").sca(0.8),score_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    score_tile.on("mousedown", function () {go_deploy(page_nav.high_score_page); }); 


    progress_label=new Label({color:purple, text:"Progress", size:25, align:CENTER})
    progress_tile=new Tile({
        obj:[asset("rocket.png").sca(0.8),progress_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    progress_tile.on("mousedown", function () { go_deploy(page_nav.progress_dashboard)}); //page_nav.progress_dashboard

    shop_label=new Label({color:purple, text:"Shop", size:25, align:CENTER})
    shop_tile=new Tile({obj:[asset("shopping.png").sca(0.8),shop_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    shop_tile.on("mousedown", function () { go_deploy(page_nav.shop_page)});

    help_label=new Label({color:purple, text:"Help", size:25, align:CENTER})
    help_tile=new Tile({obj:[asset("question.png").sca(0.8),help_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    help_tile.on("mousedown", function () { });

    bottom_menu_tile=new Tile({
            obj:[settings_tile,score_tile,progress_tile,shop_tile,help_tile], 
            cols:5,
            spacingH:50, 
            unique:true,
            align:CENTER
        })//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    .pos(0,20,CENTER,BOTTOM,page)


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
    page.go2tutorials = new Button({width:stageW*0.75,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:tutorials_label,corner:20})
    .pos(0,stageH*0.25,CENTER,CENTER,page)   


    

    // shop_label=new Label({color:yellow, text:"Shop", size:25, align:CENTER})
    // page.go2shop = new Button({width:stageW*0.2,height:60,backgroundColor:red,rollBackgroundColor:orange,label:shop_label,corner:20})
    // .pos(70,20,CENTER,BOTTOM,page) 
    // .on("mousedown", function () {
    //     page_nav.shop_page.deploy()
    //     pages.go(page_nav.shop_page, "right"); 
    // });
	

    // scores_label=new Label({color:yellow, text:"Scores", size:25, align:CENTER})
    // page.go2scores = new Button({width:stageW*0.2,height:60,backgroundColor:red,rollBackgroundColor:orange,label:scores_label,corner:20})
    // .pos(200,20,CENTER,BOTTOM,page)   
    // .on("mousedown", function () {pages.go(page_nav.high_score_page, "right"); });  

    
    // settings_label=new Label({color:yellow, text:"Settings", size:25, align:CENTER})
    // page.go2settings = new Button({width:stageW*0.2,height:60,backgroundColor:red,rollBackgroundColor:orange,label:settings_label,corner:20})
    // .pos(-70,20,CENTER,BOTTOM,page)   

    // progress_label=new Label({color:yellow, text:"Progress", size:25, align:CENTER})
    // page.go2progress = new Button({width:stageW*0.2,height:60,backgroundColor:blue.darken(0.5),rollBackgroundColor:orange,label:progress_label,corner:20})
    // .pos(-200,20,CENTER,BOTTOM,page) 


    
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

