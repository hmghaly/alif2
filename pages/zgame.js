
function makeGame(stage) {
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    STYLE = {font:"reuben", size:50};
    
    page.timer=new Label({color:purple, text:"Game", size:48,variant:true}).pos(0,30,CENTER,TOP,page);
    page.accuracy=new Label({color:purple, text:"100%", size:48,variant:true, align:RIGHT}).pos(30,30,RIGHT,TOP,page);
    
    menu_label=new Label({color:yellow, text:"Menu", size:25, align:CENTER})
    page.go2menu = new Button({width:140,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:menu_label,corner:20})
    .pos(30,30,LEFT,TOP,page)   

    game_ended_label=new Label({color:yellow, text:"After Game", size:25, align:CENTER})
    page.go2after_game = new Button({width:140,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:game_ended_label,corner:20})
    .pos(0,30,CENTER,BOTTOM,page).alp(0)
    
    var emitter = new Emitter({
        obj:new Poly([10,20,30], 5, .6, [pink, purple, dark, purple]),
        num:5,
        gravity:0,
        force:{min:3, max:5},
        startPaused:true
    }).addTo(page).bot().ord(1); // put under the animals but above the page backing
    

    
    q_obj1={}
    q_obj1.deploy_fn=page.deploy_q
    q_obj1.prompt="What is the name of this letter?"
    q_obj1.item={label:"أ",id:"alif"}
    q_obj1.correct=["alif"]
    q_obj1.options=[{label:"alif",id:"alif"},
                   {label:"hamzah 3ala nabrah",id:"hamzah_3ala_nabrah"},
                   {label:"seen",id:"seen"},
                   {label:"kaaf",id:"kaaf"}
                  ]
    q_obj2={}
    q_obj2.deploy_fn=page.deploy_q
    q_obj2.prompt="Which letter os this?"
    q_obj2.item={label:"kaaf",id:"kaaf"}
    q_obj2.correct=["kaaf"]
    q_obj2.options=[{label:"أ",id:"alif"},
                   {label:"ع",id:"3ayn"},
                   {label:"س",id:"seen"},
                   {label:"ك",id:"kaaf"}
                  ]
    quiz.questions=[q_obj1,q_obj2]
    quiz.i=0;
    //function deploy_q(q_obj)
    page.deploy_q=function(q_obj){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);
        q_n=quiz.i+1
        tmp_prompt=""+q_n+"- "+ q_obj.prompt
        prompt_txt=multiline(tmp_prompt,20)
        page.prompt=new Label({color:purple, text:prompt_txt, size:36,variant:true, align:CENTER}).pos(0,100,CENTER,TOP,page.main_cont);
        
        item_text=multiline(q_obj.item.label,5)
        if (item_text.length>3) item_font_size=60
        else item_font_size=120
        page.item=new Label({color:purple, text:item_text, size:item_font_size, align:CENTER}).center(page.main_cont);
        page.item.id=q_obj.item.id
//        page.item.tap(function(evt){
//            trg=evt.currentTarget;
//            console.log(trg.id)
//            //main_cont.parent.removeChild(main_cont)
//        })

        var options_tile = page.options_tile = new Tile({
            obj:new Container(200,200).centerReg({add:false}),
            cols:2,
            rows:2,
            spacingH:200,
            spacingV:150,
            valign:CENTER
        })
            .sca(1)
            //.ble("multiply")
            .center(page.main_cont)
            .mov(0,50);
        shuffle(q_obj.options)
        options_tile.loop(function (op, i){
            //console.log(op)
            cur_option_obj=q_obj.options[i]
            //console.log(cur_option_obj)
            option_txt=cur_option_obj.label
            option_txt_ml=multiline(option_txt,7)
            if (option_txt.length>10) font_size=25
            else font_size=40
            op_btn_label=new Label({color:white, text:option_txt_ml, size:font_size, align:CENTER})//.pos(0,-100,CENTER,CENTER,page1);
            var cur_op_btn = new Button({width:150,height:140,backgroundColor:blue,rollBackgroundColor:orange,label:op_btn_label,corner:10})
            .center(op);
            cur_op_btn.id=cur_option_obj.id
            cur_op_btn.on("mousedown",check_answer)
        })  
        
        n_coins_str=""+n_coins
        page.coin_icon=frame.asset("coin.png").pos(-30,25,CENTER,BOTTOM,page.main_cont);
        page.coin_count=new Label({color:purple, text:n_coins_str, size:30, align:LEFT}).pos(30,30,CENTER,BOTTOM,page.main_cont);


    }
    cur_q_obj=quiz.questions[quiz.i]
    page.deploy_q(cur_q_obj)

//        quiz.accuracy=0
//        quiz.n_attempts=0
//        quiz.n_correct=0
//        game.accuracy.text=""+quiz.accuracy+"%"
    
    function check_answer(evt){
        if (quiz.n_attempts==null) quiz.n_attempts=0;
        if (quiz.n_correct==null) quiz.n_correct=0;
        
        trg=evt.currentTarget
        console.log(trg.id)
        //console.log(frame.asset(trg.id))
        frame.asset(trg.id).play()
        quiz.n_attempts+=1
        if (trg.id==page.item.id){
            console.log("correct!")
            //console.log("still ok")
            quiz.n_correct+=1
            trg.backgroundColor=green
            console.log("changed color")

            emitter.loc(trg, null, page).spurt(100);
            console.log("emitter works")

            trg.animate({
                wait:0.2, // wait one second before starting
                props:{scale:1.5},
                time:.5,
                rewind:true,
                loop:false,
                call:next_q
                //loopCall:()=>{next_q()} // also call, rewindCall, and more
            });
            console.log(evt)
            stageX=evt.stageX
            stageY=evt.stageY
            n_coins+=1
            update_coins()
            coin_clone = page.coin_icon.clone().pos(stageX,stageY,LEFT,TOP,page.main_cont);
            coin_clone.animate({
                wait:0, // wait one second before starting
                props:{x:page.coin_icon.x,y:page.coin_icon.y},
                time:.5,
                rewind:false,
                loop:false,
                call:function(){
                    page.coin_count.text=""+n_coins
                }
                //loopCall:()=>{next_q()} // also call, rewindCall, and more
            });

            

            
            //image1 = youtube_img.clone()

            trg.removeAllEventListeners()
            //next_q()

            
        }
        else {
            
            trg.removeAllEventListeners()
            console.log("wrong!")
            trg.backgroundColor=red
            
        }
        quiz.accuracy=quiz.n_correct/quiz.n_attempts
        accuracy_100=Math.round(100*quiz.accuracy) 
        page.accuracy.text=""+accuracy_100+"%"
        
        if (quiz.accuracy>0.75) page.accuracy.color="green"
        else if (quiz.accuracy>0.5) page.accuracy.color=orange.darken(0.5)
        else page.accuracy.color="red"
    }    
    
    function next_q(){
        //remove_el(page.main_cont)
        console.log("deploying next question")
        quiz.i+=1;
        if (quiz.i>=quiz.questions.length){
            pages.go(after_game, "down");
            game_ended2()
            return
        }
        cur_q_obj=quiz.questions[quiz.i]
        page.deploy_q(cur_q_obj)        
        zog("deploy next Q")
        
    }    

    
    return page;

}


function game_ended2(){
    after_game.completion_label.text="Completed: "+quiz.n_correct+" questions"   
    accuracy_100=Math.round(100*quiz.accuracy)
    after_game.accuracy_label.text="Accuracy: "+accuracy_100+"%"   
    score=Math.round(10*quiz.n_correct*quiz.accuracy) 
    after_game.score_label.text="Score: "+score 
    console.log("game ended!!!!")
    history_obj={}
    history_obj["n_correct"]=quiz.n_correct
    history_obj["accuracy"]=quiz.accuracy
    history_obj["score"]=score
    history_obj["duration"]=quiz.duration
    history_obj["type"]=quiz.type
    history_obj["date"]=Date()
    
    console.log(history_obj)

    progress_history.push(history_obj)
    set_local_strorage(storage_name,"progress_history",progress_history)

    new_streak_val=update_streak(quiz.duration)
    new_streak_val_minutes= Math.floor( new_streak_val/60 );
    page_nav.main_menu.streak_status_label.text=""+new_streak_val_minutes+"/10"

}

// function coin_plus(){
//     n_coins+=1

// }


