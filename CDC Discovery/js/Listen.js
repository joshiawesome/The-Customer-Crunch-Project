function Start_Up(){
  // console.log(csv_json);
  navigation_hub("nav_hub_page_three");
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);
  // console.log("hey");
  BenchmarkOptions("Listen",csv_json);
}

function Listen(){
  // console.log(Listen.caller);
  // console.log(csv_json);
  var project_name=document.getElementById("project_name");
  project_name.innerText="(NAME)";
  var ch=document.getElementById("Benchmark_Selection").value;
  console.log(ch);
  project_name.innerHTML=ch;
  var listen_to_customer_table_row=document.getElementById("listen_to_cutomer_row");
  
  localStorage.setItem("Benchmark_choice",ch);
  var color=["#b4c7e7","#2f5597","#203864"];
  change_benchmarks_in_table(csv_json,ch,3,4,listen_to_customer_table_row,"Listen to Customer",720,80,300,color,2);
}


