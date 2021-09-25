/*--------------------------------------------------FOR BENCHMARK DROPDOWN-----------------------------------------------------------------------*/
function BenchmarkOptions(choice_name,json){
  console.log("one");
  var benchmark_options_array=[];
  var benchmark_selection_dropdown=document.getElementById("Benchmark_Selection");
  var benchmark_json=json;
  var benchmark_json_array=[];
  // benchmark_json=benchmark_json.slice(59,77);
  // benchmark_json=benchmark_json.slice(60,78);
  for(var bj=0;bj<benchmark_json.length;bj++){
    if(benchmark_json[bj].TOPIC_GROUP=="BENCHMARK"){
      benchmark_json_array.push(benchmark_json[bj]);
    }
  }
  console.log(benchmark_json,benchmark_json_array);

  for(var b=0;b<=0;b++){
    if(b!=0){
      if(benchmark_json_array[b].PROJECT_NAME!=benchmark_json_array[b-1].PROJECT_NAME){
        benchmark_options_array.push(benchmark_json_array[b].PROJECT_NAME);
      }
    }
    else{benchmark_options_array.push(benchmark_json_array[b].PROJECT_NAME);}
  }

  for(var b=0;b<benchmark_options_array.length;b++){
    var bench_choices=document.createElement("option");
    bench_choices.setAttribute("value",benchmark_options_array[b]);
    bench_choices.innerText=benchmark_options_array[b];
    if(localStorage.getItem("Benchmark_choice")){
      console.log(localStorage.getItem("Benchmark_choice"));
      if(benchmark_options_array[b]==localStorage.getItem("Benchmark_choice")){
        bench_choices.setAttribute("selected","true");
      }
    }
    else{
      if(benchmark_options_array[b]=="Benchmark"){
        bench_choices.setAttribute("selected","true");
        sessionStorage.setItem("Benchmark_choice","Benchmark");
      }
    }
    benchmark_selection_dropdown.appendChild(bench_choices);
  }

  var func_code=choice_name + "();" ;
  console.log(func_code);
  eval(func_code);

}
/*--------------------------------------------------FOR BENCHMARK DROPDOWN-----------------------------------------------------------------------*/

/*---------------------------------------------INSERTING TABLE DATA FOR VARYING BENCHMARK VALUES-----------------------------------------------------------------------*/
function change_benchmarks_in_table(json,ch,lower_limit,upper_limit,row,filter_name,just_width,just_height,just_left,just_colour,just_trans){
  var benchmark_json=json;
  var new_benchmark_json=[];
  for(var bj=0;bj<benchmark_json.length;bj++){
    if(benchmark_json[bj].TOPIC_GROUP=="BENCHMARK"){
      new_benchmark_json.push(benchmark_json[bj]);
    }
  }
  // benchmark_json=benchmark_json.slice(59,77);
  // benchmark_json=benchmark_json.slice(60,78);
  console.log(benchmark_json,new_benchmark_json);
  var benchmark_array=[];
  var outccome_text_array=[];

  var table_array_two=json;
  var new_table=[];
  for(ta=0;ta<table_array_two.length;ta++){
    if(table_array_two[ta].TOPIC_GROUP=="Customer Culture TG PARTICIPNATS QUESTIONS"){
      new_table.push(table_array_two[ta]);
    }
  }
  // table_array_two=table_array_two.slice(21,27);
  // console.log(table_array_two,new_table);
  new_table=new_table.slice(lower_limit,upper_limit);
  console.log(new_table);

  var required_headings=["COMPONENT_GROUP","COMPONENT","PERC_ONE_DEC_PLACE","BENCHMARK_PERCENTILE"];
  var participants,questions_answered,project_name_result,benchmark,net_variance;
  var row_flag=0;
  var progs=0;
  var bench_flag=0;

  for(var r=0;r<=5;r++){
    if(row.children[0]){
      row.children[0].remove();
    }
  }

  for(b=0;b<new_benchmark_json.length;b++){
    if(new_benchmark_json[b].PROJECT_NAME==ch){
      bench_flag++;
      if(new_benchmark_json[b].TOPIC==filter_name){
        console.log(new_benchmark_json[b].TOPIC,new_benchmark_json[b].RECOMMENDATION_TEXT);
        benchmark_array.push(new_benchmark_json[b].PERC_ONE_DEC_PLACE);
        outccome_text_array.push(new_benchmark_json[b].RECOMMENDATION_TEXT);
      }
    }  
  }

  /*-----------------------------------------------------TABLE CELLS--------------------------------------------------------------*/
  var j=0;
  for(var i=0;i<new_table.length;i++){
    row_flag++;
    progs++;

    participants=new_table[i][required_headings[0]];
    questions_answered=new_table[i][required_headings[1]];
    project_name_result=new_table[i][required_headings[2]];
    benchmark=benchmark_array[j];
    net_variance=project_name_result-benchmark;
    net_variance=net_variance.toFixed(2);
    
    insert_table_cell(json,participants,questions_answered,project_name_result,benchmark,net_variance,progs,row_flag,row);
  }
  /*-----------------------------------------------------TABLE CELLS--------------------------------------------------------------*/

  /*-----------------------------------------------------FOR OUTCOME TEXTS AND PROGRESS BARS--------------------------------------------------------------*/
  outcome(outccome_text_array);
  progressbars();

  function outcome(outcome_array){
    var outcome_one=document.createElement("td");
    outcome_one.setAttribute("width","7%");
    var outcome_one_string=outcome_array[0];
    append_outcome_text(outcome_one,outcome_one_string,"outcome_cell",row);
  }

  function progressbars(){
    var prog_bar_one=document.getElementById("prog1");
    append_progress_bar(prog_bar_one,json);
  }
  /*----------------------------------------------------FOR OUTCOME TEXTS AND PROGRESS BARS--------------------------------------------------------------*/

  /*-------------------------------------------------------HORIZONTAL STACKED BAR CHART--------------------------------------------------------------*/
  var svg_id=document.getElementById("HorizontalStackedBarChart");
  if(svg_id){
    svg_id.remove();
  }

  // var stacked_bar_json=json.Neat;
  var stacked_bar_json=json;
  var stacked_bar_json_array=[];
  var stacked_bar_json_data=[];
  var total_responses,depreciating_responses,positive_responses;
  var depreciating_response_percentage,neutral_responses_percentage,positive_responses_percentage;

  for(var i=0;i<stacked_bar_json.length;i++){
    if(stacked_bar_json[i].TOPIC_GROUP=="TYPE OF RESPONSE DISTRIBUTION"){
      stacked_bar_json_array.push(stacked_bar_json[i]);
    }
  }
  for(var i=0;i<stacked_bar_json_array.length;i++){
    if(stacked_bar_json_array[i].TOPIC==filter_name){

      total_responses=parseFloat(stacked_bar_json_array[i].COMPONENT_GROUP);
      depreciating_responses=parseFloat(stacked_bar_json_array[i].RECOMMENDATION_TEXT);
      neutral_responses=parseFloat(stacked_bar_json_array[i].OUTCOME);
      positive_responses=parseFloat(stacked_bar_json_array[i].PERC_ONE_DEC_PLACE);

      depreciating_response_percentage=((depreciating_responses/total_responses)*100);
      neutral_responses_percentage=((neutral_responses/total_responses)*100);
      positive_responses_percentage=((positive_responses/total_responses)*100);

      console.log(depreciating_response_percentage,neutral_responses_percentage,positive_responses_percentage);

      //here PROJECT_NAME can be replaced with ch i.e benchmark dropdown choices
      var obj={'type':stacked_bar_json_array[i].PROJECT_NAME,'Depreciating':depreciating_response_percentage,'Neutral':neutral_responses_percentage,'Positive':positive_responses_percentage};
      stacked_bar_json_data.push(obj);
    }
  }
  console.log(stacked_bar_json_data);
  var keys=['Depreciating','Neutral','Positive'];
  var color=["#44546a","#adb9ca","#2f5597"];

  horizontal_stacked_bar(stacked_bar_json_data,"horizontal-stacked-bar",keys,500,40,'y-axis',0.1,50,color,0,'x-axis',0);
  /*--------------------------------------------------------HORIZONTAL STACKED BAR CHART-----------------------------------------------------------*/

  /*-------------------------------------------------------TABLE LEGEND FOR HORIZONTAL STACKED BAR CHART-----------------------------------------------------------------------------------------*/
  var row_one=document.getElementById("stack_one_row_1");
  var row_two=document.getElementById("stack_one_row_2");
  var row_three=document.getElementById("stack_one_row_3");

  for(r=1;r<=2;r++){
    if(row_one.children[1]){row_one.children[1].remove();}
    if(row_two.children[1]){row_two.children[1].remove();}
    if(row_three.children[1]){row_three.children[1].remove();}
  }

  var stack_table_flag=0;
  var stack_table_array_project=[];
  var stack_table_array_benchmark=[];
  var stack_row_one=document.getElementById("stack_one_row_1");
  var stack_row_two=document.getElementById("stack_one_row_2");
  var stack_row_three=document.getElementById("stack_one_row_3");

  stack_table_array_project.push(stacked_bar_json_data[1].Depreciating,stacked_bar_json_data[1].Neutral,stacked_bar_json_data[1].Positive);
  stack_table_array_benchmark.push(stacked_bar_json_data[0].Depreciating,stacked_bar_json_data[0].Neutral,stacked_bar_json_data[0].Positive);
  stack_table_legend(stack_table_array_project,stack_table_flag,stack_row_one,stack_row_two,stack_row_three);
  stack_table_legend(stack_table_array_benchmark,stack_table_flag,stack_row_one,stack_row_two,stack_row_three);
  /*---------------------------------------------------------TABLE LEGEND FOR HORIZONTAL STACKED BAR CHART-----------------------------------------------------------------------------------------*/

  /*-------------------------------------------------------------HORIZONTAL BAR CHART & QUESTION TEXT------------------------------------------------------------------------------------------------------------------------------------*/
  var question_id=document.getElementById("question");
  if(question_id.children[0]){
    question_id.children[0].remove();
  }
  var underline_tag=document.createElement("u");
  var italics_tag=document.createElement("i");
  underline_tag.appendChild(italics_tag);

  var question_bank=[];

  // var just_bar_json=json.Neat;
  var just_bar_json=json;
  var just_bar_array=[];
  var just_bar_data=[];

  var svg_id_two=document.getElementById("JustBarChart");
  if(svg_id_two){
    svg_id_two.remove();
  }
  
  for(var q=0;q<just_bar_json.length;q++){
    if(just_bar_json[q].TOPIC_GROUP=="Question_Text"){
      just_bar_array.push(just_bar_json[q]);
    }
  }
  for(var i=0;i<just_bar_array.length;i++){
    if(just_bar_array[i].TOPIC==filter_name){
      question_bank.push(just_bar_array[i].OUTCOME);
      //here PROJECT_NAME can be replaced with ch i.e benchmark dropdown choices
      var obj={'text':just_bar_array[i].RECOMMENDATION_TEXT,'percentage':just_bar_array[i].PERC_ONE_DEC_PLACE};
      just_bar_data.push(obj);
    }
  }

  italics_tag.innerText=question_bank[0];
  underline_tag.appendChild(italics_tag);
  question_id.appendChild(underline_tag);

  // var color=["#b4c7e7","#2f5597","#203864"];
  horizontal_bar_chart(just_bar_data,"horizontal-bar",just_width,just_height,just_left,just_colour,just_trans);
  // horizontal_bar_chart(just_bar_data,"horizontal-bar",720,100,410,color,2);
  /*-------------------------------------------------------------HORIZONTAL BAR CHART & QUESTION TEXT------------------------------------------------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------- ACTIONS AND RECOMMENDATIONS---------------------------------------------------------------------------------------------------*/
  var recommend = document.getElementById("recommendation");
  var act=document.getElementById("action");
  // console.log(act.childElementCount);
  var count=act.childElementCount;
  if(act.childElementCount>1){
    for(var r=1;r<count;r++){
      // console.log(r);
      // console.log(act.children[1]);
      act.children[1].remove();
    }
  }

  var act_rec=json;
  var actions=[];
  var recommendations=[];

  for(var ar=0;ar<act_rec.length;ar++){
    if(act_rec[ar].TOPIC_GROUP=="Customer Culture TG-Actionsteps" && act_rec[ar].TOPIC==filter_name){
      actions.push(act_rec[ar].RECOMMENDATION_TEXT);
    }
    if(act_rec[ar].TOPIC_GROUP=="Customer Culture TG-Recommendation" && act_rec[ar].TOPIC==filter_name){
      recommendations.push(act_rec[ar].RECOMMENDATION_TEXT);
    }
  }

  var detect=[];
  for(var sa=0;sa<actions[0].length;sa++){
    // console.log(actions[0][sa]);
    if(actions[0][sa]=="1" || actions[0][sa]=="2" || actions[0][sa]=="3" || actions[0][sa]=="4" || actions[0][sa]=="5" || actions[0][sa]=="6" || actions[0][sa]=="7" || actions[0][sa]=="8" || actions[0][sa]=="9" ){
      // console.log(actions[0][sa],sa);
      detect.push(sa);
    }
  }
  detect.push(actions[0].length-1);
  // console.log(actions[0].length-1,detect);
  var t=0;
  for(var d=0;d<detect.length;d++){
    // console.log(t);
    if(t<detect.length-1){
      var s
      if(t+1==detect.length-1){
        s = actions[0].substring(detect[t],detect[t+1]+1);
      }
      else{
        s = actions[0].substring(detect[t],detect[t+1]);
      }
      // console.log(s);
      var ptag=document.createElement("p");
      ptag.style.fontSize="13px";
      ptag.style.fontWeight="bold";
      ptag.innerText=s;
      act.appendChild(ptag);
    }
    t++;
  }

  var new_ptag=document.createElement("p");
  new_ptag.style.color="blue";
  new_ptag.style.fontSize="13px";
  new_ptag.style.fontWeight="bold";
  new_ptag.style.fontStyle="italic";
  new_ptag.style.textDecoration="underline";
  new_ptag.innerText="Review the Customer Crunch white paper on alternative data sources.";
  act.appendChild(new_ptag);
 
  recommend.innerText=recommendations[0];
  recommend.style.fontSize="13px"
  recommend.style.fontWeight="bold";
  // console.log(actions,recommendations);
  /*------------------------------------------------------------- ACTIONS AND RECOMMENDATIONS---------------------------------------------------------------------------------------------------*/
}
/*---------------------------------------------INSERTING TABLE DATA FOR VARYING BENCHMARK VALUES-----------------------------------------------------------------------*/