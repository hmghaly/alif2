
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

        
        page.clock_icon=asset("clock.png").sca(0.75)
        page.trophy_icon=asset("trophy.png").sca(0.75) //page.trophy_icon -page.clock_icon
	    new Tile({
	        obj:[page.trophy_icon, page.clock_icon, page.x_days_streak_label,page.x_min_today_label], 
	        rows:2,
	        cols:2,
	        spacingV:10, 
	        spacingH:100, 
	        unique:true,
	        align:CENTER
	    }).pos(0,150,CENTER,TOP,page.main_cont);

	    page.user_avatar=frame.asset(user.avatar).clone().sca(0.1)
	    page.profile_btn_label=new Label({color:purple, text:"Profile", size:25,variant:true})

	    page.profile_tile=new Tile({
	        obj:[page.user_avatar,page.profile_btn_label], 
	        rows:2,
	        spacingV:5, 
	        unique:true,
	        align:CENTER
	    }).pos(10,10,RIGHT,TOP,page.main_cont)
	    .on("mousedown", function () {
            //go_deploy(page_nav.profile_page)
            //$('#profile_modal').modal('show');
            deploy_modal_profile()

        })

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
    page.feedback_icon=asset("feedback.png").sca(0.8)
    feedback_tile=new Tile({
        obj:[page.feedback_icon,feedback_label], rows:2, spacingV:0, unique:true,align:CENTER})
    .pos(10,10,LEFT,TOP,page)
    feedback_tile.on("mousedown", function () {
        //go_deploy(page_nav.high_score_page); 
        console.log("feedback form")
        $('#feedback_modal').modal('show');   
        //get_vals("feedback")
        //post_data(link,obj2upload,callback_fn)     
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
    page.settings_icon=asset("settings.png").sca(0.75)
    settings_tile=new Tile({
        obj:[page.settings_icon,settings_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    settings_tile.on("mousedown", function () {go_deploy(page_nav.settings); }); 

    //.pos(stageW*0.25,stageH*0.25,CENTER,CENTER,page) //page.shop_icon, page.progress_icon, page.star_icon
    score_label=new Label({color:purple, text:"Score", size:25, align:CENTER})
    page.star_icon=asset("star.png").sca(0.8)
    score_tile=new Tile({
        obj:[page.star_icon,score_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    score_tile.on("mousedown", function () {go_deploy(page_nav.high_score_page); }); 


    progress_label=new Label({color:purple, text:"Progress", size:25, align:CENTER})
    page.progress_icon=asset("rocket.png").sca(0.8)
    progress_tile=new Tile({
        obj:[page.progress_icon,progress_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    progress_tile.on("mousedown", function () { go_deploy(page_nav.progress_dashboard)}); //page_nav.progress_dashboard

    shop_label=new Label({color:purple, text:"Shop", size:25, align:CENTER})
    page.shop_icon=asset("shopping.png").sca(0.8)
    shop_tile=new Tile({obj:[page.shop_icon,shop_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    shop_tile.on("mousedown", function () { go_deploy(page_nav.shop_page)});

    help_label=new Label({color:purple, text:"Help", size:25, align:CENTER})
    help_tile=new Tile({obj:[asset("question.png").sca(0.8),help_label], rows:2, spacingV:0, unique:true,align:CENTER})//.center(page) //pos(0,100,CENTER,TOP,page.main_cont);
    help_tile.on("mousedown", function () { 
    	page.help_i=0
    	page.help_items=[
    		{item:page.go2tutorials,text:"Start By Looking into Tutorials",x:stageW/2-50,y:20},
    		{item:page.go2alphabet_game,text:"Now do the alphabet quiz to learn names and shapes of letters",x:stageW/2,y:stageH/2},
    		{item:page.go2sound_game,text:"and the letter sound quiz to learn the sounds of letters and diacritics",x:stageW/2,y:stageH/2},
    		{item:page.go2read_words_game,text:"and then you can read words",x:stageW/2,y:stageH/2},
    		{item:page.go2write_words_game,text:"and also write words by typing on the keyboard",x:stageW/2,y:stageH/2},
    		{item:page.user_avatar,text:"Go to profile to choose username and avatar",x:stageW/2,y:stageH/2},
    		{item:page.clock_icon,text:"how many minutes today to reach daily goal",x:stageW/2,y:stageH/2},
    		{item:page.trophy_icon,text:"how many days streak of completing daily goal",x:stageW/2,y:stageH/2},
    		{item:page.settings_icon,text:"Adjust settings for daily goal, quiz time, sound ... etc",x:stageW/2,y:stageH/2},
    		{item:page.star_icon,text:"check high scores leaderboard",x:stageW/2,y:stageH/2},
    		{item:page.progress_icon,text:"check your progress and accuracy",x:stageW/2,y:stageH/2},
    		{item:page.shop_icon,text:"and you can buy items from the shop with the coins you get from correct answers",x:stageW/2,y:stageH/2},
    		{item:page.feedback_icon,text:"send feedback to us",x:stageW/2,y:stageH/2}
    	]
    	//remove_el(page.main_cont) 
    	//page.shop_icon, page.progress_icon, page.star_icon page.feedback_icon
    	//page.trophy_icon -page.clock_icon
    	//page.go2alphabet_game, page.go2sound_game, page.go2read_words_game, page.go2write_words_game
        page.help_cont = new Container(stageW, stageH).addTo(page);
        

        //page.go2tutorials_clone=page.go2tutorials.clone().addTo(page.help_cont)
        page.bg_rect = new Rectangle(stageW,stageH,black).alp(0.6).center(page.help_cont)
        //page.msg_label=new Label({color:yellow, text:"Help", size:25, align:CENTER}).center(page.help_cont)
	    page.msg_label2=new Label({color:yellow, text:"Help2", size:25, align:CENTER})
	    page.help_btn = new Button({width:stageW*0.5,height:120,backgroundColor:green.darken(0.4),rollBackgroundColor:orange,label:page.msg_label2,corner:20})
	    .pos(0,0,CENTER,TOP,page.help_cont) 

        //page.msg_rect =new Button({width:stageW/2,height:100,backgroundColor:green.darken(0.3),rollBackgroundColor:orange,label:page.msg_label,corner:20}).pos(10,0,TOP,CENTER,page.help_cont)

        page.bg_rect.on("mousedown", function (evt) { 
        	trg=evt.currentTarget
        	console.log(trg)
        	//trg.parent.removeChild(trg)
        	cur_parent=trg.parent
        	page.help_cont.removeChild(page.tmp_clone)
        	page.help_i+=1
        	if (page.help_i>=page.help_items.length) {
        		page.help_cont.removeAllChildren()
        		return
        	} 
        	cur_help_item=page.help_items[page.help_i]

        	page.tmp_clone=cur_help_item.item.clone().addTo(page.help_cont)
        	tmp_parent=cur_help_item.item.parent
        	tmp_parent2=tmp_parent.parent
        	page.tmp_clone.x=cur_help_item.item.x+tmp_parent.x+tmp_parent2.x
        	page.tmp_clone.y=cur_help_item.item.y+tmp_parent.y+tmp_parent2.y
        	// page.msg_rect.x=cur_help_item.x
        	// page.msg_rect.y=cur_help_item.y
        	ml_text=multiline(cur_help_item.text,20)
        	page.msg_label2.text=ml_text//cur_help_item.text
        	page.msg_label2.center(page.help_btn)

        	// console.log(cur_help_item.text,page.help_i)
        	// console.log("original:", cur_help_item.item)
        	// console.log("original parent:", cur_help_item.item.parent)
        	// console.log("clone:", page.tmp_clone)
        	//cur_parent.removeAllChildren()
        })
        cur_help_item=page.help_items[page.help_i]
        page.tmp_clone=cur_help_item.item.clone().addTo(page.help_cont)
    	// page.msg_rect.x=cur_help_item.x
    	// page.msg_rect.y=cur_help_item.y
    	ml_text=multiline(cur_help_item.text,20)
    	page.msg_label2.text=ml_text//cur_help_item.text   
    	page.msg_label2.center(page.help_btn)     

    });

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
    .pos(0,stageH*0.2,CENTER,CENTER,page)   

    about_label=new Label({color:yellow, text:"About", size:25, align:CENTER})
    page.go2about = new Button({width:stageW*0.3,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:about_label,corner:20})
    .pos(0,stageH*0.3,CENTER,CENTER,page) 
    .on("mousedown",function(){
        $('#about_modal').modal('show');  
    })
    

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

