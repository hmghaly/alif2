function display_mistakes(){
	$('#generic_modal').modal('show');
	$$("generic_modal_title").innerHTML="Mistakes"
	content_div=$$("generic_modal_content_div")
	content_div.innerHTML=""
	//mistakes_table=create_el_basic("table",content_div)
	cur_array=[]
	cur_array.push(["Question Prompt","Question About","Answer"])
	for (const mst of quiz.mistakes) cur_array.push([mst.prompt,mst.item, mst.answer])

	table1=create_table(content_div,cur_array)
	table1.id="mistakes_table"
	table1.border=1

	

	
}

function makeAfterGame(stage) {
    
    var stageW = stage.width;
    var stageH = stage.height;
    var page = new Page(stageW, stageH, theme.bg1,theme.bg2);

    page.deploy=function(q_obj){
        remove_el(page.main_cont)
        page.main_cont = new Container(stageW, stageH).addTo(page);

     //    page.title_label=new Label({color:purple, text:"ALIF LAAM", size:45,variant:true})//.pos(0,30,CENTER,TOP,page);
     //    welcome_txt="Welcome, "+user.username
     //    page.welcome_label= new Label({color:purple, text:welcome_txt, size:25,variant:true})//.pos(-stageW*0.4,80,CENTER,TOP,page.main_cont);

	    // new Tile({
	    //     obj:[page.title_label,page.welcome_label], 
	    //     rows:2,
	    //     spacingV:5, 
	    //     unique:true,
	    //     align:CENTER
	    // }).pos(0,25,CENTER,TOP,page.main_cont);
	    menu_label=new Label({color:yellow, text:"Menu", size:25, align:CENTER})
	    page.go2menu = new Button({width:stageW*.8,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:menu_label,corner:20})
	    .pos(0,20,CENTER,BOTTOM,page.main_cont)
	    .on("mousedown", go2menu) 

	    title_label=new Label({color:purple, text:"Game Ended", size:60, variant:true, align:CENTER}).pos(0,100,CENTER,TOP,page.main_cont);
	    //page.completion_label=new Label({color:purple, text:"Completion", size:40, variant:true, align:CENTER}).pos(0,200,CENTER,TOP,page.main_cont);
	    page.accuracy_label=new Label({color:purple, text:"Accuracy", size:40, variant:true, align:CENTER}).pos(0,200,CENTER,TOP,page.main_cont);
	    page.score_label=new Label({color:purple, text:"Score", size:40, variant:true, align:CENTER}).pos(0,400,CENTER,TOP,page.main_cont);
	    page.score_explanation_label=new Label({color:purple, text:"Score reflects both\nhow many questions answered\nand the answer accuracy", size:24, align:CENTER}).pos(0,450,CENTER,TOP,page.main_cont);

	    page.heading_completed_label=new Label({color:purple, text:"Completed", size:30, variant:true, align:CENTER})
	    page.heading_correct_label=new Label({color:purple, text:"Correct", size:30, variant:true, align:CENTER})
	    page.heading_wrong_label=new Label({color:purple, text:"Incorrect", size:30, variant:true, align:CENTER})
	    page.correct_icon=asset("check.png").clone().sca(0.5)
	    page.incorrect_icon=asset("wrong.png").clone().sca(0.5)


	    page.n_completed_label=new Label({color:purple, text:"15", size:30, variant:true, align:CENTER})
	    page.n_correct_label=new Label({color:purple, text:"12", size:30, variant:true, align:CENTER})
	    page.n_wrong_label=new Label({color:purple, text:"3", size:30, variant:true, align:CENTER})
	    page.mistakes_label=new Label({color:yellow, text:"Mistakes", size:18, variant:true, align:CENTER})
	    page.go2mistakes = new Button({width:100,height:30,backgroundColor:purple,rollBackgroundColor:orange,label:page.mistakes_label,corner:5})
		page.go2mistakes.on("mousedown", display_mistakes);
	    

  
		completion_tile=new Tile({
		    obj:[page.heading_completed_label,page.correct_icon,page.incorrect_icon,null,
		    page.n_completed_label,page.n_correct_label,page.n_wrong_label,
		    page.go2mistakes], 
		    rows:2,
		    cols:4,
		    spacingV:5, 
		    spacingH:25, 
		    unique:true,
		    align:CENTER
		}).pos(0,300,CENTER,TOP,page.main_cont);


	    page.today_score_label=new Label({color:purple, text:"Today's Score", size:30, variant:true, align:CENTER})
	    page.today_score_value_label=new Label({color:purple, text:"0", size:30, variant:true, align:CENTER})
	    page.score_icon=asset("star.png").clone().sca(0.5).alp(0)
	    page.high_score_label=new Label({color:yellow, text:"High Score!", size:30, variant:true, align:CENTER})
	    page.go2highscore = new Button({width:250,height:60,backgroundColor:purple,rollBackgroundColor:orange,label:page.high_score_label,corner:20})
	    page.go2highscore.alp(0) //page.score_icon, page.go2highscore.alp(0) 
	    page.go2highscore.on("mousedown", function () {go_deploy(page_nav.high_score_page); }); 

		daily_score_tile=new Tile({
		    obj:[page.today_score_label,page.today_score_value_label,page.go2highscore,page.score_icon], 
		    rows:2,
		    cols:2,
		    spacingV:5, 
		    spacingH:50, 
		    unique:true,
		    align:CENTER
		}).pos(0,550,CENTER,TOP,page.main_cont);


    accuracy_100=Math.round(100*quiz.accuracy)
    n_wrong=quiz.n_attempts-quiz.n_correct
      
    multiplier=quiz.score_multiplier
    if (multiplier==null || multiplier==undefined) multiplier=10
    cur_score=Math.round(multiplier*quiz.n_correct*quiz.accuracy) 
    
    page.accuracy_label.text="Accuracy: "+accuracy_100+"%" 
    //page.completion_label.text="Completed: "+quiz.n_correct+" questions" 
    page.score_label.text="Score: "+cur_score 

    page.n_completed_label.text=""+quiz.n_attempts
    page.n_correct_label.text=""+quiz.n_correct
    page.n_wrong_label.text=""+n_wrong
    

    

    console.log("game ended - from after game!!!!")
    history_obj={}
    history_obj["n_correct"]=quiz.n_correct
    history_obj["n_wrong"]=n_wrong
    history_obj["accuracy"]=quiz.accuracy
    history_obj["score"]=cur_score
    history_obj["duration"]=quiz.duration
    history_obj["type"]=quiz.type
    history_obj["date"]=Date()
    
    console.log(history_obj)

    progress_history.push(history_obj)
    set_local_strorage(storage_name,"progress_history",progress_history)

    //this is where we add the session upload

    //updating streak
    today_str=today()
    today_streak=streak[today_str]
    if (today_streak==null) today_streak=0
    today_streak+=settings.quiz_dur_min
    streak[today_str]=today_streak
    if (today_streak>=settings.streak_dur_min) streak.days[today_str]=true
    set_local_strorage(storage_name,"streak",streak)

    //updating high score
    today_score=daily_score[today_str]
    if (today_score==null || isNaN(today_score)) today_score=0
    today_score+=cur_score
    daily_score[today_str]=today_score
    //if (today_streak>=settings.streak_dur_min) streak.days[today_str]=true
    set_local_strorage(storage_name,"daily_score",daily_score)
    page.today_score_value_label.text=""+today_score


    highscore_upload_obj={}
    highscore_upload_obj["user_key"]=assigned_user_key
    highscore_upload_obj["user_name"]=user.username
    highscore_upload_obj["user_email"]=user.email
    highscore_upload_obj["user_avatar"]=user.avatar
    highscore_upload_obj["score"]=today_score
    highscore_upload_obj["app"]=game_name

    console.log(highscore_upload_obj)
    console.log(JSON.stringify(highscore_upload_obj))

    link="../get_score.py"
    post_data(link,highscore_upload_obj,function(obj1){
        console.log(obj1)
        console.log(JSON.stringify(obj1))
        if (obj1.highscore==true){
			page.score_icon.alp(1)
			page.go2highscore.alp(1) 
        }
    })    




	}
	return page
}