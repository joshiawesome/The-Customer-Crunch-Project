function Start_Up(){
  navigation_hub("nav_hub_page_four");
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);

  // var project_name=document.getElementById("project_name");
  // project_name.innerText="(NAME)";

  // var knowledge_of_customer_table_row=document.getElementById("knowledge_of_cutomer_row");

  BenchmarkOptions("Knowledge",csv_json);

}

function Knowledge(){
  var project_name=document.getElementById("project_name");
  project_name.innerText="(NAME)";
  var ch=document.getElementById("Benchmark_Selection").value;
  project_name.innerHTML=ch;

  var knowledge_of_customer_table_row=document.getElementById("knowledge_of_cutomer_row");
  
  localStorage.setItem("Benchmark_choice",ch);
  var color=["#b4c7e7","#2f5597","#203864"];
  change_benchmarks_in_table(csv_json,ch,2,3,knowledge_of_customer_table_row,"Knowledge of Customer",720,100,300,color,2);
}