
function makeSettings(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, green,yellow);
    page.i=0;
    STYLE = {font:"reuben", size:50};

    

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)

    new Label({color:purple, text:"Settings", size:45,variant:true}).pos(0,70,CENTER,TOP,page);

    new Label({color:purple, text:"Game duration (minutes)", size:25,variant:true}).pos(0,130,CENTER,TOP,page);

    // var stepper = new Stepper({continuous:true, stepperType:"number", min:1, max:9})
    //     .pos(500, 155, page).sca(.5);
    // stepper.on("change", function() {
    //     pad.selectedIndex = stepper.selectedIndex;
    //     stage.update();
    // });
    page.dur_stepper = new Stepper({continuous:true, stepperType:"number", min:1, max:9})
      .sca(.4)
       .pos(0,180,CENTER,TOP,page)
       .alp(0)
       .animate({
           props:{alpha:1},
           wait:3
       });    

   page.sound_toggle = new Toggle({label:"Sound", color:green.darken(.5), startToggled:true})
       .sca(.8)
       .pos(0,250,CENTER,TOP,page)
       .alp(0)
       .animate({
           props:{alpha:1},
           wait:3
       });    

    update_settings_label=new Label({color:yellow, text:"Update Settings", size:45, align:CENTER})
    page.update_settings = new Button({width:stageW*0.6,height:80,backgroundColor:red,rollBackgroundColor:orange,label:update_settings_label,corner:20})
    .pos(0,50,CENTER,BOTTOM,page)   
    page.update_settings.on("mousedown", function () {
        console.log("updaing settings")
        stepper_duration=page.dur_stepper.selectedIndex+1
        selected_duration=Number(stepper_duration)
        sound_on=true
        if (page.sound_toggle.text=="off") sound_on=false;
        settings["sound_on"]=sound_on
        settings["duration"]=selected_duration
        console.log(settings)
        pages.go(page_nav.main_menu, "down");
    });


   // page.sound_toggle = new Toggle({label:"Sound", color:green.darken(.5), startToggled:true})
   //     .sca(.8)
   //     .pos(0,80,CENTER,BOTTOM,page)
   //     .alp(0)
   //     .animate({
   //         props:{alpha:1},
   //         wait:3
   //     });


//     alphabet_btn_label=new Label({color:yellow, text:"Alphabet Letters", size:25, align:CENTER})
//     page.go2alphabet_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:alphabet_btn_label,corner:20})
//     .pos(-stageW*0.25,-stageH*0.2,CENTER,CENTER,page)   

//     // page.go2alphabet.on("mousedown", function () {
//     //     console.log("go to alphabet")
//     //     pages.go(page_nav.alpha_game, "down");
//     // });


//     sound_btn_label=new Label({color:yellow, text:"Letter Sounds", size:25, align:CENTER})
//     page.go2sound_game = new Button({width:stageW*0.4,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:sound_btn_label,corner:20})
//     .pos(stageW*0.25,-stageH*0.2,CENTER,CENTER,page)   
    
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




    return page;
}

