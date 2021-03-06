
function makeTutorialsMenu(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    STYLE = {font:"reuben", size:50};

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)


    new Label({color:purple, text:"Tutorials", size:45,variant:true}).pos(0,70,CENTER,TOP,page);

//     new Label({color:purple, text:"minutes to complete daily streak:", size:25,variant:true}).pos(0,120,CENTER,TOP,page);
//     page.streak_status_label= new Label({color:purple, text:"0/10", size:25,variant:true}).pos(0,145,CENTER,TOP,page);

//     new_streak_val=update_streak(0)
//     new_streak_val_minutes= Math.floor( new_streak_val/60 );
//     page.streak_status_label.text=""+new_streak_val_minutes+"/10"


//     profile_btn_label=new Label({color:yellow, text:"Profile", size:25,variant:true})
//     page.go2profile = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:profile_btn_label,corner:20})
//     .pos(0,0,RIGHT,TOP,page)

    main_tutorial_btn_label=new Label({color:yellow, text:"Alphabet and Sound Tutorial", size:25, align:CENTER})
    page.go2alphabet_tutorial = new Button({width:stageW*0.8,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:main_tutorial_btn_label,corner:20})
    .pos(0,150,CENTER,TOP,page)  
    .on("mousedown", function (evt) {
        $('#tutorial_modal').modal('show'); 
        // console.log("Youtube2")
        // //console.log(evt.currentTarget.id)
        // zgo("https://www.youtube.com/watch?v=ycLezw26Whk")
    });  


    alphabet_btn_label=new Label({color:yellow, text:"Alphabet List", size:25, align:CENTER})
    page.go2alphabet_tutorial = new Button({width:stageW*0.5,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:alphabet_btn_label,corner:20})
    .pos(0,250,CENTER,TOP,page)  
    .on("mousedown", function (evt) {go_deploy(page_nav.alphabet_list)})

    sound_btn_label=new Label({color:yellow, text:"Letter Sounds List", size:25, align:CENTER})
    page.go2sound_tutorial = new Button({width:stageW*0.5,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:sound_btn_label,corner:20})
    .pos(0,350,CENTER,TOP,page)  
    .on("mousedown", function (evt) {go_deploy(page_nav.sound_list)})

    //sound_page
    //alphabet 

    // youtube_img=frame.asset("youtube.png")
    // image1 = youtube_img.clone()
    // image2 = youtube_img.clone()
    // image1.id="youtube_image1"
    // image2.id="youtube_image2"
    // image1.pos(stageW*0.25,-stageH*0.2,CENTER,CENTER,page).on("mousedown", function (evt) {
    //     console.log("Youtube")
    //     //console.log(evt.currentTarget.id)
    //     zgo("https://www.youtube.com/watch?v=DddX_IdZxOg")
    // });  
    // //console.log(image1)

    // image2.pos(stageW*0.25,-stageH*0.1,CENTER,CENTER,page).on("mousedown", function (evt) {
    //     console.log("Youtube2")
    //     //console.log(evt.currentTarget.id)
    //     zgo("https://www.youtube.com/watch?v=ycLezw26Whk")
    // });  

    handwriting_btn_label=new Label({color:yellow, text:"Handwriting \nPractice", size:25, align:CENTER})
    page.go2handwriting_game = new Button({width:stageW*0.4,height:60,backgroundColor:yellow.darken(0.5),rollBackgroundColor:orange,label:handwriting_btn_label,corner:20})
    .pos(-stageW*0.25,stageH*0.2,CENTER,CENTER,page)  
    .on("mousedown", function () {pages.go(page_nav.handwriting_practice, "right");});

    
    typing_btn_label=new Label({color:yellow, text:"Typing \nPractice", size:25, align:CENTER})
    page.go2typing_game = new Button({width:stageW*0.4,height:60,backgroundColor:yellow.darken(0.5),rollBackgroundColor:orange,label:typing_btn_label,corner:20})
    .pos(stageW*0.25,stageH*0.2,CENTER,CENTER,page)  
    .on("mousedown", function () {pages.go(page_nav.keyboard_practice, "right");});

    //console.log(image2)
    stage.update();

    // //img4=frame.asset("youtube.png").clone().center(page);
    // img4=asset("youtube.png").clone().center(page);
    // img5=asset("youtube.png").clone().pos(stageW*0.25,-stageH*0.2,CENTER,CENTER,page);
    // stage.update();


    //img1=createjs.Bitmap("youtube.png")
    //var bitmap = new createjs.Bitmap("img/youtube.png");


//     // page.go2alphabet.on("mousedown", function () {
//     //     console.log("go to alphabet")
//     //     pages.go(page_nav.alpha_game, "down");
//     // });






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

