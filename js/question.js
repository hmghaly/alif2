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
    return 
    
    //test=game_data.alphabet_lessons.map(a => a.id)
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
        
        quiz.questions.push(tmp_q_obj)        
        console.log(tmp_q_obj)
    }
    quiz.n=quiz.questions.length;
}