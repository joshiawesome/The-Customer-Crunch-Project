function Start_Up(){
  navigation_hub("nav_hub_page_seven");
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);

  BenchmarkOptions("Knowledge",csv_json);

}

function Knowledge(){
  /*------------------------------------------------------------------HORIZONTAL BAR CHART------------------------------------------------------------------------------------------------------------------------------------*/
  var svg_id_two=document.getElementById("JustBarChart");
  if(svg_id_two){
    svg_id_two.remove();
  }
  var horizontal_bar_data_source=[];
  var catgories=[];
  var category_count=[];
  var cat_flag;
  var cat_sum=0;
  for(var hb=0;hb<csv_json.length;hb++){
    if(csv_json[hb].TOPIC_GROUP=="RESULT DISTRIBUTION BY PARTICIPANT"){
      horizontal_bar_data_source.push(csv_json[hb]);
    }
  }
  for(var ds=0;ds<horizontal_bar_data_source.length;ds++){
    if(catgories.indexOf(horizontal_bar_data_source[ds].OUTCOME)==-1){
      catgories.push(horizontal_bar_data_source[ds].OUTCOME)
    }
  }

  var category_sort_array=["Commercially Sound","Advanced","Established","Competent","Immature","Undeveloped"];
  catgories.sort(function(a,b){
    return category_sort_array.indexOf(a)-category_sort_array.indexOf(b);
  })
  console.log(category_sort_array,catgories);

  for(var cat=0;cat<catgories.length;cat++){
    cat_flag=0;
    var filter_name=catgories[cat];
    for(var j=0;j<horizontal_bar_data_source.length;j++){
      if(horizontal_bar_data_source[j].OUTCOME==filter_name){
        cat_flag++;
        // console.log(horizontal_bar_data_source[j].OUTCOME);
      }
    }
    cat_sum=cat_sum+cat_flag;
    var obj={'text':filter_name,'percentage':cat_flag};
    category_count.push(obj);
  }

  var participant_array=[];
  // console.log(horizontal_bar_data_source,catgories);
  for(var i=0;i<category_count.length;i++){
    var particpant_obj={'text':category_count[i].text,'participants':category_count[i].percentage};
    participant_array.push(particpant_obj);
    var new_value=(category_count[i].percentage/cat_sum)*100;
    new_value=new_value.toFixed(2);
    category_count[i].percentage=new_value;
  }
  // console.log(category_count,cat_sum,catgories);
  var colors=["#003366","#507ad1","#458a00","#d0cece","#ff6100","#a01c20"]
  horizontal_bar_chart(category_count,"horizontal-bar",820,250,150,colors,0,catgories,participant_array,cat_sum);
  /*------------------------------------------------------------------HORIZONTAL BAR CHART------------------------------------------------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------------TABLE DATA------------------------------------------------------------------------------------------------------------------------------------*/
  var project_name=document.getElementById("project_name");
  project_name.innerText="(NAME)";
  var ch=document.getElementById("Benchmark_Selection").value;
  project_name.innerHTML=ch;

  var knowledge_of_customer_table_row=document.getElementById("knowledge_of_cutomer_row");

  localStorage.setItem("Benchmark_choice",ch);
  change_benchmarks_in_table(csv_json,ch,2,3,knowledge_of_customer_table_row,"Knowledge of Customer");
  /*------------------------------------------------------------------TABLE DATA------------------------------------------------------------------------------------------------------------------------------------*/
}
