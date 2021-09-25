function Start_Up(){
  navigation_hub("nav_hub_page_four");
  NextStep();
  // BenchmarkOptions("NextStep",csv_json);
}
var table_row_one=document.getElementById("row_one");
var table_row_two=document.getElementById("row_two");
var table_row_three=document.getElementById("row_three");
var table_row_four=document.getElementById("row_four");

function NextStep(){
  var benchmark_json=csv_json;
  var new_benchmark_json=[];
  for(var bj=0;bj<benchmark_json.length;bj++){
    if(benchmark_json[bj].TOPIC_GROUP=="BENCHMARK"){
      new_benchmark_json.push(benchmark_json[bj]);
    }
  }

  var project_name_result;

  var table_array=csv_json;
  var new_table=[];
  for(ta=0;ta<table_array.length;ta++){
    if(table_array[ta].TOPIC_GROUP=="Customer Culture TG PARTICIPNATS QUESTIONS"){
      new_table.push(table_array[ta]);
    }
  }
  var new_table_array=[];
  for(var t=3;t>=0;t--){
    new_table_array.push(new_table[t]);
  }

  var row_flag=0;
  var progs=0;
  var bench_flag=0;

  for(var i=0;i<=new_table_array.length-1;i++){
    progs++;
    row_flag++;
    project_name_result=new_table_array[i]['PERC_ONE_DEC_PLACE'];
    NextStepsTable(csv_json,project_name_result,progs,row_flag,table_row_one,table_row_two,table_row_three,table_row_four)
  }
 
  progressbars(csv_json);
  
}

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