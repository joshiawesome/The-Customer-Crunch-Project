navigation_hub("nav_hub_page_ten");
// var result_key_tables=document.getElementById("Result_key_Table");
// result_key_table(result_key_tables);

var t_row_one=document.getElementById('row_one');
var t_row_two=document.getElementById('row_two');
var t_row_three=document.getElementById('row_three');
var t_row_four=document.getElementById('row_four');


function Start_Up(){
  // console.log(csv_json);
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);
  
  var discovery_recommendations_source=[];
  for(var dc=0;dc<csv_json.length;dc++){
    if(csv_json[dc].TOPIC_GROUP=="Customer Culture TG PARTICIPNATS QUESTIONS"){
      discovery_recommendations_source.push(csv_json[dc]);
    }
  }
 
  var required_headings=["PERC_ONE_DEC_PLACE"];
  var project_name_result;
  var row_flag=0;
  var progs=0;

  /*---------------------------------------------------------TO INSERT CELLS AND DATA INTO TABLE-----------------------------------------------------------------------------------------*/
  for(var i=discovery_recommendations_source.length-2;i>=0;i--){
    progs++;
    row_flag++;
    project_name_result=discovery_recommendations_source[i][required_headings[0]];
    // console.log(project_name_result);
    discovery_recommendation_table(project_name_result,progs,row_flag,t_row_one,t_row_two,t_row_three,t_row_four,csv_json);
  }
  /*---------------------------------------------------------TO INSERT CELLS AND DATA INTO TABLE-----------------------------------------------------------------------------------------*/

  /*---------------------------------------------------------TO APPEND OUTCOME TEXTS INTO TABLE-----------------------------------------------------------------------------------------*/
  var actions=[];
  var recommendations=[];

  for(var ar=0;ar<csv_json.length;ar++){
    if(csv_json[ar].TOPIC_GROUP=="Customer Culture TG-Actionsteps"){
      // console.log(csv_json[ar].RECOMMENDATION_TEXT);
      actions.push(csv_json[ar].RECOMMENDATION_TEXT);
    }
    if(csv_json[ar].TOPIC_GROUP=="Customer Culture TG-Recommendation"){
      // console.log(csv_json[ar].RECOMMENDATION_TEXT);
      recommendations.push(csv_json[ar].RECOMMENDATION_TEXT);
    }
  }

  // console.log(actions,recommendations);

  var row_array=["one","two","three","four"];
  var ra=0;
  console.log("t_row_"+row_array[0]);
  
  for(var r=recommendations.length-1;r>=0;r--){
    var outcome=document.createElement("td");
    var outcome_string=recommendations[r];
    append_outcome_text(outcome,outcome_string,"outcome_cell_two",window["t_row_"+row_array[ra]]);
    ra++;
  }

  
  var row_array_two=["listen","knowledge","interaction","culture"];
  var listen=[];
  var knowledge=[];
  var interaction=[];
  var culture=[];
  var t;
  var track=0;
  for(var i=actions.length-1;i>=0;i--){
    t=0;
    var detect=[];
    for(var j=0;j<actions[i].length;j++){
      if(actions[i][j]=="1" || actions[i][j]=="2" || actions[i][j]=="3" || actions[i][j]=="4" || actions[i][j]=="5" || actions[i][j]=="6" || actions[i][j]=="7" || actions[i][j]=="8" || actions[i][j]=="9" ){
        detect.push(j);
      }
    }
    detect.push(actions[i].length-1);
    for(var k=0;k<detect.length;k++){
      if(t<detect.length-1){
        var s;
        if(t+1==detect.length-1){
          s = actions[i].substring(detect[t],detect[t+1]+1);
        }
        else{
          s = actions[i].substring(detect[t],detect[t+1]);
        }
        // console.log(s);
        if(i==3){
          listen.push(s);
        }
        if(i==2){
          knowledge.push(s);
        }
        if(i==1){
          interaction.push(s);
        }
        if(i==0){
          culture.push(s);
        }
      }
      t++;
    }
    // console.log(detect);
  }

  concatenate(listen,t_row_one);
  concatenate(knowledge,t_row_two);
  concatenate(interaction,t_row_three);
  concatenate(culture,t_row_four);

  function concatenate(array,rows){
   array=array.join('\n\n');
   var tds=document.createElement("td");
   append_outcome_text(tds,array,"outcome_cell_two",rows);
  }
  // console.log(listen,knowledge,interaction,culture);
  /*---------------------------------------------------------TO APPEND OUTCOME TEXTS INTO TABLE-----------------------------------------------------------------------------------------*/

  /*---------------------------------------------------------TO APPEND PROGRESS BARS INTO TABLE-----------------------------------------------------------------------------------------*/
  var prog_bar_one=document.getElementById("prog1");
  append_progress_bar(prog_bar_one,csv_json);
  var prog_bar_two=document.getElementById("prog2");
  append_progress_bar(prog_bar_two,csv_json);
  var prog_bar_three=document.getElementById("prog3");
  append_progress_bar(prog_bar_three,csv_json);
  var prog_bar_four=document.getElementById("prog4");
  append_progress_bar(prog_bar_four,csv_json);
  /*---------------------------------------------------------TO APPEND PROGRESS BARS INTO TABLE-----------------------------------------------------------------------------------------*/
}