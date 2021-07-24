
function makeReadWords(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    //STYLE = {font:"reuben", size:50};

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)
    page.go2menu.on("mousedown", function () {
      pages.go(page_nav.main_menu, "right"); 
        console.log("back to menu")
        //zgo("https://www.youtube.com/watch?v=DddX_IdZxOg")
    });  


    //new Label({color:purple, text:"Read Words", size:45,variant:true}).pos(0,70,CENTER,TOP,page);

    page.deploy=function(){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);
      page.timer=new Label({color:purple, text:"Timer", size:48,variant:true}).pos(0,30,CENTER,TOP,page.main_cont);
      page.accuracy=new Label({color:purple, text:"100%", size:48,variant:true, align:RIGHT}).pos(30,30,RIGHT,TOP,page.main_cont);
      page.prompt=new Label({color:purple, text:"What are the letters?", size:24,variant:true, align:CENTER}).pos(0,100,CENTER,TOP,page.main_cont);
      page.item=new Label({color:purple, text:"word", size:64, align:CENTER}).pos(0,120,CENTER,TOP,page.main_cont);
      
      page.image_cont = new Container(stageW*0.5, stageH*0.2).pos(0,180,CENTER,TOP,page.main_cont);
      //let rect0 = new Rectangle(stageW*0.5, stageH*0.2,green).center(page.image_cont)
      page.question_image=frame.asset("idea.png").clone().sca(1.5).center(page.image_cont)
      page.english=new Label({color:purple, text:"english", size:30, align:CENTER}).pos(0,-5,CENTER,BOTTOM,page.image_cont);
      //page.item=new Label({color:purple, text:"word", size:64, align:CENTER})
    //   page.question_image=frame.asset("idea.png").clone().sca(1)
    //   page.english=new Label({color:purple, text:"english", size:24, align:CENTER})


    //  new Tile({
    //     obj:[page.question_image, page.english], 
    //     rows:2,
    //     spacingV:10, 
    //     unique:true,
    //     align:CENTER
    // }).pos(0,0,CENTER,CENTER,page.main_cont);



      page.answer=new Label({color:purple, text:"answer", size:48, align:CENTER}).pos(0,0,CENTER,CENTER,page.main_cont);
      
      n_coins_str=""+n_coins
      page.coin_icon=frame.asset("coin.png").pos(-30,25,CENTER,BOTTOM,page.main_cont);
      page.coin_count=new Label({color:purple, text:n_coins_str, size:30, align:LEFT}).pos(30,30,CENTER,BOTTOM,page.main_cont);
      n_hints_str=""+user.n_hints
      page.hint_icon=frame.asset("idea.png").clone().sca(0.75).pos(40,25,RIGHT,BOTTOM,page.main_cont);
      page.hint_count=new Label({color:purple, text:n_hints_str, size:30, align:LEFT}).pos(25,30,RIGHT,BOTTOM,page.main_cont);
      page.wrapper= new Wrapper({
            spacingH: 20,
            spacingV: 20
        });

      page.options_cont = new Container(stageW*0.8, stageH*0.3).pos(0, stageH*0.5, CENTER, TOP, page.main_cont);
    var options_win = new Window({
        width: stageW * 0.8,
        height: 220,
        interactive: true,
        padding: 10,
        corner: 10,
        scrollBarDrag: true,
        backgroundColor: purple.darken(.5),
        borderColor: purple
    }).pos(0, 50, CENTER, TOP, page.options_cont);
    objects=[]
    objects.push(frame.asset("idea.png").clone())
    // objects.push(frame.asset("idea.png").clone())
    page.wrapper.add(objects)
    options_win.add(page.wrapper)

	page.game_timer = setInterval(page.run_timer, 1000);
    quiz.duration=300
    //if (settings.duration!=null) quiz.duration=settings.duration*60;
    if (settings.quiz_dur_min!=null) quiz.duration=settings.quiz_dur_min*60;
    quiz.remaining_time=quiz.duration

        
        //Setup accuracy tracking
    quiz.accuracy=0
    quiz.n_attempts=0
    quiz.n_correct=0
    accuracy_100=Math.round(100*quiz.accuracy)
    page.accuracy.text=""+accuracy_100+"%"


    gen_word_questions()
    page.deploy_question()




    }
    //page.deploy()
    page.run_timer=function(obj1){
    // function myTimer() {
        quiz.remaining_time-=1
        n_seconds=quiz.remaining_time%60
        n_minutes=(quiz.remaining_time-n_seconds)/60
        n_minutes_str=""+n_minutes
        n_seconds_str=""+n_seconds
        if (n_seconds_str.length==1) n_seconds_str="0"+n_seconds_str
        timer_str=n_minutes_str+":"+n_seconds_str
        page.timer.text=timer_str
        if (quiz.remaining_time<=0) {
            pages.go(after_game, "right");
            console.log("where is this?")
            game_ended2()
//                accuracy_100=Math.round(100*quiz.accuracy)
//                after_game.accuracy_label.text=""+accuracy_100+"%"
            clearInterval(page.game_timer)
        } 
    }    

    page.answer_is_correct=function(obj1){
    	console.log("answer is correct")
    	quiz.n_correct+=1
    	obj1.backgroundColor=green
    	quiz.accuracy=quiz.n_correct/quiz.n_attempts
	    accuracy_100=Math.round(100*quiz.accuracy)
	    page.accuracy.text=""+accuracy_100+"%"
	    console.log(obj1.id)
	    frame.asset(obj1.id).play()


    	question.answered.push(obj1.value)
    	obj1.addTo(page)
        obj1.animate({
            wait:0, // wait one second before starting
            props:{x:page.answer.x,y:page.answer.y},
            time:.5,
            rewind:false,
            loop:false,
            call:function(){
                //page.coin_count.text=""+n_coins
                page.answer.text+=obj1.value
                stageX=page.answer.stageX
                stageY=page.answer.stageY+5
                remove_el(obj1)
                wait_interval=0.3

                if (question.answered.length==question.correct.length) {
                	for (var i=1;i<question.answered.length+1;i++){
                		
			            coin_clone = page.coin_icon.clone().pos(0,40,CENTER,CENTER,page.main_cont);//.pos(page.main_cont)//.pos(stageX,stageY,LEFT,TOP,page.main_cont);
			            coin_clone.animate({
			                wait:i*wait_interval, // increment wait time for each coin
			                props:{x:page.coin_icon.x,y:page.coin_icon.y},
			                time:.5,
			                rewind:false,
			                loop:false,
			                call:function(){
			                	n_coins+=1
			                	update_coins()
			                    page.coin_count.text=""+n_coins
			                }
			                //loopCall:()=>{next_q()} // also call, rewindCall, and more
			            });


                	}
                	page.coin_icon.animate({
			                wait:question.answered.length*wait_interval, // increment wait time for each coin
			                props:{alpha:0.5},
			                time:.5,
			                rewind:true,
			                loop:false,
			                call:function(){
			                	page.next_q()
			                }
			                //loopCall:()=>{next_q()} // also call, rewindCall, and more
			            });
                	
                } //end of word completion condition
            }
            //loopCall:()=>{next_q()} // also call, rewindCall, and more
        });
    }

    page.answer_is_wrong=function(obj1){
    	console.log("answer is wrong")
    	quiz.accuracy=quiz.n_correct/quiz.n_attempts
	    accuracy_100=Math.round(100*quiz.accuracy)
	    page.accuracy.text=""+accuracy_100+"%"


    }

    page.check_answer=function(evt){
        if (quiz.n_attempts==null) quiz.n_attempts=0;
        if (quiz.n_correct==null) quiz.n_correct=0;

        quiz.n_attempts+=1
        
        trg=evt.currentTarget
        selected_value=trg.value
        answer_i=question.answered.length
        expected_answer=question.correct[answer_i]
        if (expected_answer==selected_value) page.answer_is_correct(trg)
        else page.answer_is_wrong(trg)
        // console.log("target:", trg)   
        // page.answer_is_correct(trg) 	
        // console.log(question)
        //alert("why?")
    }

    page.deploy_question=function(){
    	cur_q_obj=quiz.questions[quiz.i]
    	question={}
    	question.correct=cur_q_obj.correct
    	question.answered=[]
    	quiz_i_str=""+(quiz.i+1)+"- "

    	page.prompt.text=quiz_i_str +cur_q_obj.prompt //"What are the sounds of this word?"
    	page.item.text=cur_q_obj.item.label //"kelmah"
    	page.answer.text=""
    	page.english.text=cur_q_obj.english
    	remove_el(page.question_image)
    	fname=cur_q_obj.english.toLowerCase()+".png"
    	//page.question_image=frame.asset(fname).clone().sca(1.5).center(page.image_cont)
    	page.question_image=frame.asset(fname).clone()
    	page.question_image.height=100
    	page.question_image.center(page.image_cont)
    	console.log(page.question_image)
    	//page.question_image.heightOnly=100
    	page.wrapper.removeAllChildren()
    	//options=["ka","li","ma","h","g","DHDHa"]
    	options=shuffle(copy(cur_q_obj.options))
    	const colors = [pink, blue, green, yellow];

    	options_objects=[]
    	for (const op of options){
    		let circle = new Circle(40, colors[0])
    		circle.label = new Label({text:op.label, size:30, color:"white"}).centerReg(circle);
    		circle.value=op.label
    		circle.id=op.id
    		circle.on("mousedown",page.check_answer) //page.check_answer

    		options_objects.push(circle)
    		//console.log(circle)
    	}
    	page.wrapper.add(options_objects)
    	stage.update()

    }
    //page.deploy_question()

    page.next_q=function(){
    	quiz.i+=1
    	page.deploy_question()
    	console.log("going to next question")
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

