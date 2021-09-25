function  Start_Up(){
  navigation_hub("nav_hub_page_two");
  var result_key_tables=document.getElementById("result_key");
  result_key_table(result_key_tables,csv_json);
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);
  /*----------------------------------------------------SETTING UP THE BENCHMARK DROPDOWN----------------------------------------------------------------*/
  BenchmarkOptions("choice",csv_json);
  /*----------------------------------------------------SETTING UP THE BENCHMARK DROPDOWN----------------------------------------------------------------*/
}

var table_row_one=document.getElementById("row_one");
var table_row_two=document.getElementById("row_two");
var table_row_three=document.getElementById("row_three");
var table_row_four=document.getElementById("row_four");
/*----------------------------------------------------------BENCHMARK SELECTION-----------------------------------------------------------------------------------*/
function choice(){
  var project_name=document.getElementById("project_name");
  project_name.innerText="(NAME)";
  var ch=document.getElementById("Benchmark_Selection").value;
  localStorage.setItem("Benchmark_choice",ch);
  project_name.innerHTML=ch;
 
  var benchmark_json=csv_json;
  var new_benchmark_json=[];
  for(var bj=0;bj<benchmark_json.length;bj++){
    if(benchmark_json[bj].TOPIC_GROUP=="BENCHMARK"){
      new_benchmark_json.push(benchmark_json[bj]);
    }
  }

  var benchmark_array=[];
  var outccome_text_array=[];
  var table_array=csv_json;
  var new_table=[];
  for(ta=0;ta<table_array.length;ta++){
    if(table_array[ta].TOPIC_GROUP=="Customer Culture TG PARTICIPNATS QUESTIONS"){
      new_table.push(table_array[ta]);
    }
  }
  // console.log(table_array,new_table);

  var new_table_array=[];
  for(var t=3;t>=0;t--){
    new_table_array.push(new_table[t]);
  }
  // console.log(new_table_array);

  var required_headings=["COMPONENT_GROUP","COMPONENT","PERC_ONE_DEC_PLACE","BENCHMARK_PERCENTILE"];
  var participants,questions_answered,project_name_result,benchmark,net_variance;
  var row_flag=0;
  var progs=0;
  var bench_flag=0;
  
  for(var r=1;r<=7;r++){
    if(table_row_one.children[1]){
      table_row_one.children[1].remove();
    }
    if(table_row_two.children[1]){
      table_row_two.children[1].remove();
    }
    if(table_row_three.children[1]){
      table_row_three.children[1].remove();
    }
    if(table_row_four.children[1]){
      table_row_four.children[1].remove();
    }
  }

  for(b=0;b<new_benchmark_json.length;b++){
    if(new_benchmark_json[b].PROJECT_NAME==ch){
      bench_flag++;
      if(bench_flag<=4){
        benchmark_array.push(new_benchmark_json[b].PERC_ONE_DEC_PLACE);
        outccome_text_array.push(new_benchmark_json[b].RECOMMENDATION_TEXT);
      }
    }  
  }
    
  var j=3;
  for(var i=0;i<=new_table_array.length-1;i++){
    console.log(new_table_array[i]);
    progs++;
    row_flag++;

    participants=new_table_array[i][required_headings[0]];
    questions_answered=new_table_array[i][required_headings[1]];
    project_name_result=new_table_array[i][required_headings[2]];
    benchmark=benchmark_array[j];
    net_variance=project_name_result-benchmark;
    net_variance=net_variance.toFixed(2);
    j--;

    insert_table_cell(csv_json,participants,questions_answered,project_name_result,benchmark,net_variance,progs,row_flag,table_row_one,table_row_two,table_row_three,table_row_four);
  }

  /*---------------------------------------------------------TO APPEND OUTCOME TEXTS INTO TABLE-----------------------------------------------------------------------------------------*/
  outcome(outccome_text_array);
  /*---------------------------------------------------------TO APPEND OUTCOME TEXTS INTO TABLE-----------------------------------------------------------------------------------------*/
 
  /*---------------------------------------------------------TO APPEND IMAGES INTO TABLE-----------------------------------------------------------------------------------------*/
  // images();
  /*---------------------------------------------------------TO APPEND IMAGES INTO TABLE-----------------------------------------------------------------------------------------*/

  /*---------------------------------------------------------TO APPEND PROGRESS BARS INTO TABLE-----------------------------------------------------------------------------------------*/
  progressbars(csv_json);
  /*---------------------------------------------------------TO APPEND PROGRESS BARS INTO TABLE-----------------------------------------------------------------------------------------*/
}
/*---------------------------------------------------------BENCHMARK SELECTION-----------------------------------------------------------------------------------*/

function outcome(outcome_array){
  var outcome_one=document.createElement("td");
  outcome_one.setAttribute("width","2%");
  var outcome_one_string=outcome_array[3];
  append_outcome_text(outcome_one,outcome_one_string,"outcome_cell",table_row_one);
  
  var outcome_two=document.createElement("td");
  outcome_two.setAttribute("width","7%");
  var outcome_two_string=outcome_array[2];
  append_outcome_text(outcome_two,outcome_two_string,"outcome_cell",table_row_two);

  var outcome_three=document.createElement("td");
  outcome_three.setAttribute("width","7%");
  var outcome_three_string=outcome_array[1];
  append_outcome_text(outcome_three,outcome_three_string,"outcome_cell",table_row_three);

  var outcome_four=document.createElement("td");
  outcome_four.setAttribute("width","7%");
  var outcome_four_string=outcome_array[0];
  append_outcome_text(outcome_four,outcome_four_string,"outcome_cell",table_row_four); 
}

// function images(){
//   var image_row_one=document.createElement("td");
//   var image_one=document.createElement("img");
//   append_image(image_one,image_row_one,"./assets/listen to customer.svg",table_row_one,"Listen.html");

//   var image_row_two=document.createElement("td");
//   var image_two=document.createElement("img");
//   append_image(image_two,image_row_two,"./assets/knowledege of customers.svg",table_row_two,"Knowledge.html");
  
//   var image_row_three=document.createElement("td");
//   var image_three=document.createElement("img");
//   append_image(image_three,image_row_three,"./assets/interactive with customer.svg",table_row_three,"Interaction.html")

//   var image_row_four=document.createElement("td");
//   var image_four=document.createElement("img");
//   append_image(image_four,image_row_four,"./assets/customer culture.svg",table_row_four,"Culture.html");
// }

function progressbars(main_data){
  var prog_bar_one=document.getElementById("prog1");
  append_progress_bar(prog_bar_one,main_data);
  var prog_bar_two=document.getElementById("prog2");
  append_progress_bar(prog_bar_two,main_data);
  var prog_bar_three=document.getElementById("prog3");
  append_progress_bar(prog_bar_three,main_data);
  var prog_bar_four=document.getElementById("prog4");
  append_progress_bar(prog_bar_four,main_data);
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
