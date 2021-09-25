function Start_Up(){
  console.log(csv_json);
  navigation_hub("nav_hub_page_twelve");
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);

  /*----------------------------------------------------VERTICAL BAR CHART------------------------------------------------------------------------------------*/
  var vertical_bar_data_source=[];
  var vertical_bar_data=[];
  for(var i=0;i<csv_json.length;i++){
    if(csv_json[i].TOPIC_GROUP=="Department_graph"){
      vertical_bar_data_source.push(csv_json[i]);
    }
  }
  for(var i=0;i<vertical_bar_data_source.length;i++){
    var obj={'type':vertical_bar_data_source[i].PROJECT_NAME,'percentage':vertical_bar_data_source[i].PERC_ONE_DEC_PLACE,'category':vertical_bar_data_source[i].OUTCOME};
    vertical_bar_data.push(obj);
  }
  console.log(vertical_bar_data_source,vertical_bar_data);

  vertical_bar_chart(csv_json,vertical_bar_data);
  /*----------------------------------------------------VERTICAL BAR CHART---------------------------------------------------------------------------------*/

  /*-----------------------------------------------------RANGED BAR CHART------------------------------------------------------------------------------------*/
  var ranged_bar_data_source=[];
  var ranged_bar_data_source_two=[];
  for(var i=0;i<csv_json.length;i++){
    if(csv_json[i].TOPIC_GROUP=="dumbell_Final"){
      ranged_bar_data_source.push(csv_json[i]);
    }
    if(csv_json[i].TOPIC_GROUP=="dumbell_Final_Benchmark"){
      ranged_bar_data_source_two.push(csv_json[i]);
    }
  }

  var ranged_categories=[];
  ranged_categories.push('');
  for(var i=ranged_bar_data_source.length-1;i>=0;i--){
    if((ranged_categories.indexOf(ranged_bar_data_source[i].PROJECT_NAME)==-1)&&(ranged_bar_data_source[i].PROJECT_NAME=="OTHER")){
      ranged_categories.push(ranged_bar_data_source[i].PROJECT_NAME);
    }
  }
  for(var i=ranged_bar_data_source.length-1;i>=0;i--){
    if((ranged_categories.indexOf(ranged_bar_data_source[i].PROJECT_NAME)==-1)&&(ranged_bar_data_source[i].PROJECT_NAME!="OTHER")){
      ranged_categories.push(ranged_bar_data_source[i].PROJECT_NAME);
    }
  }

  var max,min;
  var ranged_ranges=[];
  var ranged_ranges_two=[];
  var out;var out_two;
  for(var i=1;i<ranged_categories.length;i++){
    k=0;
    var sub_array=[];
    var sub_array_two=[];
    while(k<2){
      for(var j=0;j<ranged_bar_data_source.length;j++){
        if(ranged_bar_data_source[j].PROJECT_NAME==ranged_categories[i]){
          sub_array.push(parseFloat(ranged_bar_data_source[j].PERC_ONE_DEC_PLACE));
          sub_array.reverse();
          out=ranged_bar_data_source[j].OUTCOME;
          sub_array_two.push(parseFloat(ranged_bar_data_source_two[j].PERC_ONE_DEC_PLACE));
          out_two=ranged_bar_data_source_two[j].OUTCOME;
        }
        k++;
      }
    }
    sub_array_two.reverse();
    sub_array.push(out);
    sub_array_two.push(out_two);
    // console.log(sub_array);
    ranged_ranges.push(sub_array);
    ranged_ranges_two.push(sub_array_two);
  }

  min=ranged_ranges_two[0][0];
  max=ranged_ranges_two[0][1];
  for(var supers=0;supers<ranged_ranges_two.length;supers++){
    if(ranged_ranges_two[supers][0]<min){
      min=ranged_ranges_two[supers][0];
    }
    if(ranged_ranges_two[supers][1]>max){
      max=ranged_ranges_two[supers][1];
    }
  }
  console.log(ranged_ranges,ranged_ranges_two);
  ranged_bar_chart(csv_json,ranged_categories,ranged_ranges,ranged_ranges_two,min,max);
  /*-----------------------------------------------------RANGED BAR CHART------------------------------------------------------------------------------------*/

  /*---------------------------------------------------RANGED BAR CHART TABLE------------------------------------------------------------------------------------*/
  var range_table_data_source=[];
  var ranged_table_data_array=[];
  var range_table_heads=[];
  var response_range_row=document.getElementById("range_row");
  var response_range_row_head=document.getElementById("range_head");

  for(var rt=0;rt<csv_json.length;rt++){
    if(csv_json[rt].TOPIC_GROUP=="DUMBLE _NUM"){
      range_table_data_source.push(csv_json[rt]);
    }
  }
  for(var rtd=1;rtd<range_table_data_source.length;rtd++){
    ranged_table_data_array.push(range_table_data_source[rtd].PERC_ONE_DEC_PLACE);
    range_table_heads.push(range_table_data_source[rtd].TOPIC);
  }
  // console.log(range_table_heads);
  // console.log(ranged_table_data_array,range_table_data_source);
  // var crazy=["2","26","86"];
  // var prog=0;
  // for(var i=0;i<crazy.length;i++){
  //   prog++;
  //   response_range_table(csv_json,crazy[i],response_range_row,prog);
  // }
  var prog=0;
  for(var i=0;i<ranged_table_data_array.length;i++){
    prog++;
    response_range_table(csv_json,ranged_table_data_array[i],response_range_row,prog,response_range_row_head,range_table_heads[i]);
  }
 

  var prog_bar_one=document.getElementById("prog1");
  append_progress_bar(prog_bar_one,csv_json);
  var prog_bar_two=document.getElementById("prog2");
  append_progress_bar(prog_bar_two,csv_json);
  var prog_bar_three=document.getElementById("prog3");
  append_progress_bar(prog_bar_three,csv_json);
  /*---------------------------------------------------RANGED BAR CHART TABLE------------------------------------------------------------------------------------*/

  /*-----------------------------------------------------BOX PLOT CHART------------------------------------------------------------------------------------*/
  var box_plot_data_source=[];
  var response_percentages=[];
  var response_percentage_categories=[];
  var original_response_categories=[];
  for(var bp=0;bp<csv_json.length;bp++){
    if(csv_json[bp].TOPIC_GROUP=="BOXPLOT"){
      box_plot_data_source.push(csv_json[bp]);
    }
  }


  var box_plot_categories=[];
  var box_plot_designations=[];
  for(var bp=0;bp<box_plot_data_source.length;bp++){
    if(box_plot_categories.indexOf(box_plot_data_source[bp].TOPIC)==-1){
      box_plot_categories.push(box_plot_data_source[bp].TOPIC);
    }
    if(box_plot_designations.indexOf(box_plot_data_source[bp].PROJECT_NAME)==-1){
      box_plot_designations.push(box_plot_data_source[bp].PROJECT_NAME);
    }
  }

  var box_plot_data_main=[];
  for(var m=0;m<box_plot_data_source.length;m++){
    if(original_response_categories.indexOf(box_plot_data_source[m].OUTCOME)==-1){original_response_categories.push(box_plot_data_source[m].OUTCOME);}
    if(box_plot_data_source[m].TOPIC==box_plot_categories[box_plot_categories.length-1]){
      response_percentages.push(box_plot_data_source[m].OUTCOME);
      if(response_percentage_categories.indexOf(box_plot_data_source[m].OUTCOME)==-1){response_percentage_categories.push(box_plot_data_source[m].OUTCOME);}
      var obj={"designation":box_plot_data_source[m].PROJECT_NAME,"score":box_plot_data_source[m].PERC_ONE_DEC_PLACE,"group":'Response_values'};
      box_plot_data_main.push(obj);
    }
  }

  var count;
  var total_count=0;
  var response_percentage_counts=[];
  for(var rp=0;rp<response_percentage_categories.length;rp++){
    var respone_percentage_string;
    count=0;
    for(var rp_two=0;rp_two<response_percentages.length;rp_two++){
      if(response_percentages[rp_two]==response_percentage_categories[rp]){
        respone_percentage_string=response_percentage_categories[rp];
        count++;
      }
    }
    total_count=total_count+count;
    var obj={"type":respone_percentage_string,"count":count};
    response_percentage_counts.push(obj);
    // console.log(count,respone_percentage_string,total_count);
  }

  for(var rpc=0;rpc<response_percentage_counts.length;rpc++){
    response_percentage_counts[rpc].count=Math.round((response_percentage_counts[rpc].count/total_count)*100);
  }

 

  var first_response_group=0,second_response_group=0,third_response_group=0;
  var first_count=0,second_count=0,third_count=0;
  var response_group_array=[];

  for(var opc_two=0;opc_two<response_percentage_counts.length;opc_two++){
    if(response_percentage_counts[opc_two].type==original_response_categories[0] || response_percentage_counts[opc_two].type==original_response_categories[1]){
      console.log(response_percentage_counts[opc_two].type);
      first_count++;
      first_response_group=first_response_group+response_percentage_counts[opc_two].count;
    }
    if(response_percentage_counts[opc_two].type==original_response_categories[4] || response_percentage_counts[opc_two].type==original_response_categories[5]){
      console.log(response_percentage_counts[opc_two].type);
      second_count++;
      second_response_group=second_response_group+response_percentage_counts[opc_two].count;
    }
    if(response_percentage_counts[opc_two].type==original_response_categories[2] || response_percentage_counts[opc_two].type==original_response_categories[3]){
      console.log(response_percentage_counts[opc_two].type);
      third_count++;
      third_response_group=third_response_group+response_percentage_counts[opc_two].count;
    }
  }
  console.log(first_count,second_count,third_count);
  response_group_array.push(second_response_group/second_count,first_response_group/first_count,third_response_group/third_count);

  // console.log(response_percentages,response_percentage_categories,original_response_categories,response_percentage_counts,response_group_array);
  // console.log(box_plot_data_main,box_plot_designations);
  // console.log(box_plot_data_source,box_plot_categories,box_plot_designations);
  
  box_plot_chart(csv_json,box_plot_data_main,box_plot_designations,response_group_array);

  box_plot_table_source=[];
  for(var bt=0;bt<csv_json.length;bt++){
    if(csv_json[bt].TOPIC_GROUP=="TOP_BOTTOM_BUBBLE"){
      box_plot_table_source.push(csv_json[bt].TOPIC,csv_json[bt].PERC_ONE_DEC_PLACE);
    }
  }
  console.log(box_plot_table_source);

  var box_plot_tables=document.getElementById("box_plot_table");

  for(var bt=0;bt<box_plot_table_source.length;bt++){
    var box_plot_table_cell=document.createElement("td");
    box_plot_table_cell.style.backgroundColor="#f5f5f5";
    box_plot_table_cell.innerText=box_plot_table_source[bt] + "%";
    box_plot_tables.appendChild(box_plot_table_cell);

  }
  /*-----------------------------------------------------BOX PLOT CHART------------------------------------------------------------------------------------*/
}