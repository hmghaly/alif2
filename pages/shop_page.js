function make_img_price_container(img_price_obj,cont_w,cont_h){
  cur_container = new Container(cont_w, cont_h)
  img_name=img_price_obj.fname
  img0=frame.asset(img_name).clone().sca(0.1).center(cur_container)
  price_str=img_price_obj.price
  price_label_color=yellow
  //if (n_coins != null && n_coins != undefined && n_coins<img_price_obj.price) img_price_obj.above_price==true //price_label_color=red
  if (img_price_obj.above_price==true) price_label_color=red
    //console.log("function: check acquired",img_price_obj.acquired)
  if (img_price_obj.acquired==true) {
    price_label_color=green
    //price_str="acquired"
  } 
  price_label=new Label({color:price_label_color, text:price_str, size:18,variant:true}).pos(0,35,CENTER,CENTER,cur_container);
  cur_container.price=img_price_obj.price
  cur_container.fname=img_price_obj.fname
  cur_container.acquired=img_price_obj.acquired
  cur_container.above_price=img_price_obj.above_price
  return cur_container
}


function makeShopPage(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    STYLE = {font:"reuben", size:50};

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)
    .on("mousedown", function () {pages.go(page_nav.main_menu, "right"); });

    new Label({color:purple, text:"Item Shop", size:45,variant:true}).pos(0,20,CENTER,TOP,page);



    page.deploy=function(q_obj){
      remove_el(page.main_cont)
      page.main_cont = new Container(stageW, stageH).addTo(page);

      coin_container = new Container(100, 30)
      n_coins_str=""+n_coins
      //n_coins_str="123123"
      page.coin_icon=frame.asset("coin.png").clone().sca(0.5).pos(-20,0,CENTER,CENTER,coin_container);
      page.coin_count=new Label({color:purple, text:n_coins_str, size:25, align:LEFT}).pos(50,0,LEFT,TOP,coin_container);
      coin_container.pos(0,80,CENTER,TOP,page.main_cont);



      new Label({color:purple, text:"Buy Avatars", size:30,variant:true}).pos(0,110,CENTER,TOP,page.main_cont);
      const wrapper = new Wrapper({
        spacingH:20,
        spacingV:20
      });
      var win = new Window({
        width:stageW*0.8,
        height:250,
        interactive:true,
        padding:10,
        corner:10,
        scrollBarDrag:true,
        backgroundColor:purple.darken(.5),
        borderColor:purple
      }).pos(0,150,CENTER,TOP,page.main_cont);
      objects=[]
      // img0=frame.asset("youtube.png").clone()
      // objects.push(img0);
      for (const av of avatars){
        img0=frame.asset(av.fname).clone().sca(0.1)
        //console.log(img0)
        price=av.price
        img_price_obj=av
        img_price_obj.acquired=false
        if (n_coins != null && n_coins != undefined && n_coins<price) img_price_obj.above_price=true
        if (user.available_avatars.indexOf(av.fname)>-1) img_price_obj.acquired=true

        tmp_container=make_img_price_container(img_price_obj,60,60)

        //console.log("acquired",av.fname, tmp_container.acquired)

        tmp_container.on("mousedown", function (evt) {
          console.log(evt.currentTarget) 
          trg=evt.currentTarget
          price=trg.price
          if (trg.acquired){
            alert("You already have this item")
            return
          }

          if (n_coins<price){
            alert("You need more coins!")
            return
          }
          var confirmation = confirm("Are you sure you want to buy this item for "+price+" coins?");
          if (confirmation == true) {
            n_coins-=price
            user.available_avatars.push(trg.fname)
            update_coins()
            update_user()
            page.deploy()
            console.log("item bought")
          } else {
            console.log("transaction cancelled")
          }


        });

        objects.push(tmp_container);        
      }


      
      wrapper.add(objects)
      win.add(wrapper).addTo(page.main_cont); 

      new Label({color:purple, text:"Buy Themes", size:30,variant:true}).pos(0,410,CENTER,TOP,page.main_cont);

      var win = new Window({
        width:stageW*0.8,
        height:100,
        interactive:true,
        padding:10,
        corner:10,
        scrollBarDrag:true,
        backgroundColor:purple.darken(.5),
        borderColor:purple
    }).pos(0,450,CENTER,TOP,page);

      new Label({color:purple, text:"Buy Power-Ups", size:30,variant:true}).pos(0,560,CENTER,TOP,page.main_cont);


    }
    page.deploy()


    

    











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

