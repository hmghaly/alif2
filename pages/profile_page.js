
function makeProfilePage(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);
    page.i=0;
    STYLE = {font:"reuben", size:50};

    back2menu_btn_label=new Label({color:yellow, text:"Menu", size:25,variant:true})
    page.go2menu = new Button({width:120,height:60,backgroundColor:red,rollBackgroundColor:orange,label:back2menu_btn_label,corner:20})
    .pos(0,0,LEFT,TOP,page)


    new Label({color:purple, text:"Profile", size:45,variant:true}).pos(0,70,CENTER,TOP,page);



    // new Label({color:purple, text:"Avatar", size:35,variant:true}).pos(0,250,CENTER,TOP,page);


    // choose_avatar_btn_label=new Label({color:black, text:"Choose Avatar", size:25,variant:true})
    // page.go2choose_avatar = new Button({width:stageW*0.5,height:60,backgroundColor:red,rollBackgroundColor:orange,label:choose_avatar_btn_label,corner:20})
    // .pos(0,350,CENTER,TOP,page);

    // new Label({color:purple, text:"Theme", size:35,variant:true}).pos(0,420,CENTER,TOP,page);

    // choose_theme_btn_label=new Label({color:black, text:"Choose Theme", size:25,variant:true})
    // page.go2choose_theme = new Button({width:stageW*0.5,height:60,backgroundColor:red,rollBackgroundColor:orange,label:choose_theme_btn_label,corner:20})
    // .pos(0,500,CENTER,TOP,page);




     page.deploy=function(q_obj){
      	remove_el(page.main_cont)
      	page.main_cont = new Container(stageW, stageH).addTo(page);
    	page.username_textArea = new TextArea({height:60, size:25,  placeholder:"user name"}).pos(0, 120,CENTER,TOP, page);
    	page.email_textArea = new TextArea({height:60, size:25,  placeholder:"email"}).pos(0, 200,CENTER,TOP, page);

      if (user.username!="guest") page.username_textArea.text=user.username
      if (user.email!="") page.email_textArea.text=user.email

		new Label({color:purple, text:"Choose From Available Avatars", size:30,variant:true}).pos(0,260,CENTER,TOP,page.main_cont);
		shop_btn_label=new Label({color:yellow, text:"Buy More", size:25,variant:true})
    	page.go2shop = new Button({width:stageW*0.5,height:40,backgroundColor:blue.darken(.5),rollBackgroundColor:orange,label:shop_btn_label,corner:20})
    	.pos(0,300,CENTER,TOP,page.main_cont)
	      .on("mousedown", function (evt) {
	        pages.go(page_nav.shop_page, "right");
	        page_nav.shop_page.deploy()
	      })
	     console.log("What??")
		

		upd_btn_label=new Label({color:yellow, text:"Update123", size:25,variant:true})
    	page.go2upd = new Button({width:stageW*0.5,height:40,backgroundColor:blue.darken(.5),rollBackgroundColor:orange,label:upd_btn_label,corner:20})
    	.pos(0,10,CENTER,TOP,page.main_cont)
    	console.log("this is the button", page.go2upd)
    	//alert("What????")


      const wrapper2 = new Wrapper({
        spacingH:20,
        spacingV:20
      });
      var profile_win = new Window({
        width:stageW*0.8,
        height:100,
        interactive:true,
        padding:10,
        corner:10,
        scrollBarDrag:true,
        backgroundColor:purple.darken(.5),
        borderColor:purple
      }).pos(0,350,CENTER,TOP,page.main_cont);
      objects=[]
      // img0=frame.asset("youtube.png").clone()
      // objects.push(img0);
      for (const img_name of user.available_avatars){
        //img0=frame.asset(av).clone().sca(0.1)
        cur_container = new Container(60, 60)

        let rect0 = new Rectangle(60,60,green).alp(0).center(cur_container)
        if (img_name==user.avatar) rect0.alpha=1
        img0=frame.asset(img_name).clone().sca(0.1).center(cur_container)
        cur_container.fname=img_name

        objects.push(cur_container); 
        cur_container.on("mousedown", function (evt) { 

        	trg=evt.currentTarget
        	trg_parent=trg.parent
        	console.log(trg_parent)
        	for (const cont0 of trg_parent.children){
        		cont0_rect_child=cont0.children[0]
        		cont0_rect_child.alpha=0
        	}
        	user.avatar=trg.fname
        	update_user()
        	rect_child=trg.children[0]
        	// console.log(trg)
        	// console.log(rect_child)
        	//rect_child._color="000"
        	rect_child.alpha=1
        	stage.update()
        })

        update_btn_label=new Label({color:yellow, text:"Update Profile", size:25,variant:true})
        page.go2update_profile = new Button({width:stageW*0.8,height:60,backgroundColor:blue.darken(0.5),rollBackgroundColor:orange,label:update_btn_label,corner:20})
        .pos(0,480,CENTER,TOP,page.main_cont)
        .on("mousedown", function (evt) {
          username_text=page.username_textArea.text
          useremail_text=page.email_textArea.text
          if (username_text=="") {
            alert("please choose a user name")
            return
          }
          if (username_text.length>10){
            alert("please choose a user name less than 10 characters")
            return            
          }
          user.username=username_text
          if (useremail_text!="" && useremail_text.indexOf("@")>0 && useremail_text.indexOf("@")>0){
            user.email=useremail_text
          }
          update_user()
          console.log(page.username_textArea.text)
          pages.go(page_nav.main_menu, "right");
          page_nav.main_menu.deploy()
        })        
     
      }


      
      wrapper2.add(objects)
      console.log(profile_win)
      console.log(page.main_cont)
      profile_win.add(wrapper2)
      profile_win.addTo(page.main_cont); 
      //profile_win.add(wrapper2).addTo(page.main_cont); 



      }   
      page.deploy()


    return page;
}

