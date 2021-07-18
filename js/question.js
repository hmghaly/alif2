
    

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


function gen_shape_questions(){
    quiz.questions=[]
    quiz.i=0;
    all_ids=game_data.letter_ids
    shape_dict=game_data.shape_dict
    name_dict=game_data.name_dict
    
    new_all_ids=all_ids.concat(all_ids);
    new_all_ids=new_all_ids.concat(all_ids);
    new_all_ids=shuffle(new_all_ids)
    
    all_q_options=[]
    for (lt in new_all_ids){
        cur_id=new_all_ids[lt]
        cur_shape=shape_dict[cur_id]
        options=gen_options(cur_id,all_ids,n_options=4)
        all_q_options.push(options)  
        tmp_q_obj={}
//        tmp_q_obj.deploy_fn=deploy_q
//        tmp_q_obj.check_fn=check_answer
        //q_types=["name2shape","shape2name","word2name"]
        q_types=["name2shape","shape2name"]
        cur_q_type=shuffle(q_types)[0]
        tmp_q_obj.type=cur_q_type
        if (cur_q_type=="name2shape"){
            tmp_q_obj.prompt="Which letter is this?"
            tmp_q_obj.item={label:name_dict[cur_id], id:cur_id}  
            tmp_q_obj.options=[]
            tmp_q_obj.correct=options[0]
            for (op in options){
                op_obj={}
                op_id=options[op]
                op_shape=shuffle(shape_dict[op_id])[0] 
                op_obj.id=op_id
                op_obj.label=op_shape
                op_obj.name=op_shape
                tmp_q_obj.options.push(op_obj)
            }
                        
        }
        else if (cur_q_type=="shape2name"){
            tmp_q_obj.prompt="What is the name of this letter?"
            cur_item_label=shuffle(shape_dict[cur_id])[0]
            tmp_q_obj.item={label:cur_item_label,id:cur_id} //name_dict[cur_id]  
            tmp_q_obj.options=[]
            tmp_q_obj.correct=options[0]
            for (op in options){
                op_obj={}
                op_id=options[op]
                op_name=name_dict[op_id] //shuffle(shape_dict[op_id])[0] 
                op_obj.id=op_id
                op_obj.label=op_name
                op_obj.name=op_name
                
                tmp_q_obj.options.push(op_obj)
            }            
            
        }
        else if (cur_q_type=="word2name"){
            tmp_q_obj.prompt="What is the name of this letter?"
            cur_item_label=shuffle(shape_dict[cur_id])[0]
            tmp_q_obj.item={label:cur_item_label,id:cur_id} //name_dict[cur_id]  
            tmp_q_obj.options=[]
            tmp_q_obj.correct=options[0]
            for (op in options){
                op_obj={}
                op_id=options[op]
                op_name=name_dict[op_id] //shuffle(shape_dict[op_id])[0] 
                op_obj.id=op_id
                op_obj.label=op_name
                op_obj.name=op_name
                
                tmp_q_obj.options.push(op_obj)
            }            
            
        }

        quiz.questions.push(tmp_q_obj)        
        //console.log(tmp_q_obj)
    }
    quiz.n=quiz.questions.length;
}



function gen_sound_questions(){
    quiz.questions=[]
    quiz.i=0;
    sound_ids=game_data.sound_ids
    sound_dict=game_data.sound_dict
    sound_ids_copy=shuffle(copy(sound_ids))
    //console.log(sound_ids_copy)
    for (const sid of sound_ids_copy){
        cur_obj=sound_dict[sid]
        //console.log(sid,cur_obj)
        options=gen_options(sid,sound_ids,n_options=4)
        tmp_q_obj={}
        tmp_q_obj.prompt="What sound does this letter make?"
        tmp_q_obj.item={label:cur_obj.arabic, id:sid}  
        tmp_q_obj.options=[]
        tmp_q_obj.correct=options[0]
        for (op in options){
            op_id=options[op]
            op_tmp_obj=sound_dict[op_id]
            op_obj={}
            
            //op_shape=shuffle(shape_dict[op_id])[0] 
            op_obj.id=op_id
            op_obj.label=op_tmp_obj.sound
            op_obj.name=op_tmp_obj.sound
            tmp_q_obj.options.push(op_obj)
        }   
        //zog(tmp_q_obj)
        quiz.questions.push(tmp_q_obj)
    }
    quiz.n=quiz.questions.length;
}

function gen_sound_questions2(){
    quiz.questions=[]
    quiz.i=0;
    sound_ids=game_data.sound_ids
    sound_dict=game_data.sound_dict
    sound_ids_copy=shuffle(copy(sound_ids))
    //console.log(sound_ids_copy)
    for (const sid of sound_ids_copy){
        cur_obj=sound_dict[sid]
        //console.log(sid,cur_obj)
        //options=gen_options(sid,sound_ids,n_options=4)
        sound_ids_copy2=shuffle(copy(sound_ids))
        used_labels=[]
        options_str_list=[sid]
        for (const snd_id2 of sound_ids_copy2){
            if (snd_id2==sid) continue
            op_tmp_obj=sound_dict[snd_id2]
            cur_label=op_tmp_obj.sound
            if (used_labels.indexOf(cur_label)>-1) continue
            used_labels.push(cur_label) 
            options_str_list.push(snd_id2)   
            if  (options_str_list.length==4) break   
        }

        tmp_q_obj={}
        tmp_q_obj.options=[]
        

        q_types=["letter2sound","sound2letter"]
        cur_q_type=shuffle(q_types)[0]
        tmp_q_obj.type=cur_q_type
        tmp_q_obj.correct=sid

        if (cur_q_type=="letter2sound"){
            tmp_q_obj.prompt="What sound does this letter make?"
            tmp_q_obj.item={label:cur_obj.arabic, id:sid} 

            for (op_id of options_str_list){
                op_tmp_obj=sound_dict[op_id]
                op_obj={}
                op_obj.label=op_tmp_obj.sound
                op_obj.name=op_tmp_obj.sound
                op_obj.id=op_id
                tmp_q_obj.options.push(op_obj)            
            }            
        }
        else if (cur_q_type=="sound2letter"){
            tmp_q_obj.prompt="What letter makes this sound?"
            tmp_q_obj.item={label:cur_obj.sound, id:sid} 

            for (op_id of options_str_list){
                op_tmp_obj=sound_dict[op_id]
                op_obj={}
                op_obj.label=op_tmp_obj.arabic
                op_obj.name=op_tmp_obj.arabic
                op_obj.id=op_id
                tmp_q_obj.options.push(op_obj)            
            }            
        }

        // for (op in options){
        //     op_id=options[op]
        //     op_tmp_obj=sound_dict[op_id]
        //     op_obj={}
            
        //     //op_shape=shuffle(shape_dict[op_id])[0] 
        //     op_obj.id=op_id
        //     op_obj.label=op_tmp_obj.sound
        //     op_obj.name=op_tmp_obj.sound
        //     tmp_q_obj.options.push(op_obj)
        // }   
        zog(tmp_q_obj)
        quiz.questions.push(tmp_q_obj)
    }
    quiz.n=quiz.questions.length;
}