
function makeProgressDashboard(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, green,yellow);
    page.i=0;
    STYLE = {font:"reuben", size:50};

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)

    new Label({color:purple, text:"Progress", size:45,variant:true}).pos(0,70,CENTER,TOP,page);




    // const wrapper = new Wrapper({
    //     spacingH:20,
    //     spacingV:20
    // });
    //wrapper.wrapperType = "column"
    //wrapper.cols = 2
    //console.log(wrapper)
    // const objects = [];
    // const colors = series(green,blue,pink,yellow,orange)
    // let circle1 = new Circle({min:20, max:40}, colors);
    // objects.push(circle1);
    // wrapper.add(objects)
    page.display_progress_dashboard=function(){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);

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
        const letters = series("WRAPPER".split(""));
        zim.loop(progress_history, function (item,i) {
            //let circle = new Circle({min:50, max:50}, colors);
            let rect0 = new Rectangle(stageW*0.25,50,colors)
            date_str=""
            if (item.date!=null && item.date!=undefined) date_str=item.date.slice(4,15)
            new Label({text:date_str, color:color, align:CENTER, size:25}).centerReg(rect0);
            objects.push(rect0);
            let rect1 = new Rectangle(stageW*0.15,50,colors)
            accuracy_str=""
            if (item.accuracy!=null && item.accuracy!=undefined) {
                accuracy_percent_int=Math.ceil(item.accuracy*100)
                accuracy_str="" +(accuracy_percent_int)+"%"
            } 
            new Label({text:accuracy_str, color:color, align:CENTER, size:25}).centerReg(rect1);
            objects.push(rect1);
            
            let rect2 = new Rectangle(stageW*0.15,50,colors)
            n_correct_str="Correct:\n"
            if (item.n_correct!=null && item.n_correct!=undefined) {
                n_correct_str+=item.n_correct
            } 
            new Label({text:n_correct_str, color:color, align:CENTER, size:25}).centerReg(rect2);
            objects.push(rect2);

            let rect3 = new Rectangle(stageW*0.15,50,colors)
            item_type_str=""
            if (item.type!=null && item.type!=undefined) {
                item_type_str+=item.type
            } 
            new Label({text:item_type_str, color:color, align:CENTER, size:25}).centerReg(rect3);
            objects.push(rect3);

            //new Label({text:date_str, color:color, align:CENTER, size:25}).rot(rand(-10,10)).centerReg(rect0);
            // circle.on("mousedown", function () {
            //     alert("Hello!")
            // });   
            
        });
        wrapper.add(objects)
        win.add(wrapper).addTo(page);

    }
    //page.display_progress_dashboard()

    



// page.deploy_list=function(){
//         const objects = []; //[new Circle(20, red), new Rectangle(30,30,red).rot(20).sca(2).reg(30,150), new Rectangle(30,30,orange), new Rectangle(30,30,blue), new Rectangle(30,30,green), new Rectangle(30,30,purple)];
// //        for (const let0 of game_data.letter_ids){
// //            console.log(let0)
// //        }
//         console.log(progress_history)
//         const colors = series(green,blue,pink,yellow,orange)
//         y0=0
//         y_offset=30
//         zim.loop(game_data.letter_ids,function(item,i){
//             //console.log(item,i)
//             shapes=game_data.shape_dict[item]
//             shapes.reverse();
//             name=game_data.name_dict[item]
//             //console.log(name,shapes)
//             let rect0 = new Rectangle(stageW*0.8,100,colors)
//             rect0.id=item
//             name_ml=multiline(name,5)
//             //new Label({text:name_ml, color:black,  size:30}).center(rect0)
//             new Label({text:name_ml, color:black,  size:30}).pos(30,0, LEFT,CENTER,rect0)
            
//             //circle.pos(30,y0,page.win)
//             x0=stageW*0.3
//             objects.push(rect0);
//             for (const sh of shapes){
//                 let circle = new Circle(30, purple);
//                 new Label({text:sh, color:color, align:CENTER, size:circle.radius}).centerReg(circle);
//                 circle.pos(x0,0,LEFT,CENTER,rect0)
//                 x0+=70
//                 //objects.push(circle);
//             }
//             rect0.tap(function(evt){
//                 trg=evt.currentTarget
//                 console.log(trg)
//                 frame.asset(trg.id).play()
//             })
            
//             //y0+=y_offset
//         })
//         //new Label({text:"", color:color, align:CENTER, size:circle.radius}).rot(rand(-10,10)).centerReg(circle);
//         let rect0 = new Rectangle(stageW*0.8,50,white).alp(0)
//         objects.push(rect0);
        
//         //const letters = series("WRAPPER".split(""));
//         //const letters = game_data.letter_ids.map(x => game_data.shape_dict[x][0])
// //        zim.loop(letters.array.length*7, function (item, i) {
// //            console.log(item,i)
// //            let circle = new Circle({min:20, max:40}, colors);
// //            new Label({text:letters(), color:color, align:CENTER, size:circle.radius}).rot(rand(-10,10)).centerReg(circle);
// //            objects.push(circle);
// //        });
//         wrapper.add(objects)
//         win.add(wrapper).addTo(page);        
//     }
    //page.deploy_list()

//     new Label({color:purple, text:"minutes to complete daily streak:", size:25,variant:true}).pos(0,120,CENTER,TOP,page);
//     page.streak_status_label= new Label({color:purple, text:"0/10", size:25,variant:true}).pos(0,145,CENTER,TOP,page);

//     new_streak_val=update_streak(0)
//     new_streak_val_minutes= Math.floor( new_streak_val/60 );
//     page.streak_status_label.text=""+new_streak_val_minutes+"/10"


//     profile_btn_label=new Label({color:yellow, text:"Profile", size:25,variant:true})
//     page.go2profile = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:profile_btn_label,corner:20})
//     .pos(0,0,RIGHT,TOP,page)

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


//    page.sound_toggle = new Toggle({label:"Sound", color:green.darken(.5), startToggled:true})
//        .sca(.8)
//        .pos(0,80,CENTER,BOTTOM,page)
//        .alp(0)
//        .animate({
//            props:{alpha:.1},
//            wait:3
//        });

    return page;
}

