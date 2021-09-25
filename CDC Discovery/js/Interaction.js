function Start_Up(){
  navigation_hub("nav_hub_page_five");
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);

  // var project_name=document.getElementById("project_name");
  // project_name.innerText="(NAME)";

  // var interaction_with_customer_table_row=document.getElementById("interaction_with_cutomer_row");

  BenchmarkOptions("Interaction",csv_json);
}

function Interaction(){
  var project_name=document.getElementById("project_name");
  project_name.innerText="(NAME)";
  var ch=document.getElementById("Benchmark_Selection").value;
  project_name.innerHTML=ch;

  var interaction_with_customer_table_row=document.getElementById("interaction_with_cutomer_row");
  
  localStorage.setItem("Benchmark_choice",ch);
  var color=["#b4c7e7","#2f5597","#203864"];
  change_benchmarks_in_table(csv_json,ch,1,2,interaction_with_customer_table_row,"Interaction with Customer",720,100,300,color,2);
}
