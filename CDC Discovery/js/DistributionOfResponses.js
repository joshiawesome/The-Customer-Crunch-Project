navigation_hub("nav_hub_page_eight");


function Start_Up(){
  // console.log(csv_json);
  // var result_key_tables=document.getElementById("Result_key_Table");
  // result_key_table(result_key_tables,csv_json);
  /*--------------------------------------------------------HORIZONTAL STACKED BAR CHART--------------------------------------------------------------------------------------------------------------*/
  var diverging_chart_source=[];
  var diverging_chart_graph_data=[];
  var diverging_chart_graph_data_main=[];

  for(var i=0;i<csv_json.length;i++){
    if(csv_json[i].TOPIC_GROUP=="DIVERGING CHART"){
      diverging_chart_source.push(csv_json[i]);
    }
  }
  
  for(var i=0;i<diverging_chart_source.length;i++){
    if(diverging_chart_source[i].RECOMMENDATION_TEXT=="TOTAL RESPONSE AVERAGE"){
      var diverging_chart_obj={'type':diverging_chart_source[i].RECOMMENDATION_TEXT,'Promoting':diverging_chart_source[i].TOPIC,'Neutral':diverging_chart_source[i].PERC_ONE_DEC_PLACE,'Depreciating':diverging_chart_source[i].OUTCOME};
      diverging_chart_graph_data.push(diverging_chart_obj);
    }
  }
  for(var i=0;i<diverging_chart_source.length;i++){
    if(diverging_chart_source[i].RECOMMENDATION_TEXT!="TOTAL RESPONSE AVERAGE"){
      var diverging_chart_obj={'type':diverging_chart_source[i].RECOMMENDATION_TEXT,'Promoting':diverging_chart_source[i].TOPIC,'Neutral':diverging_chart_source[i].PERC_ONE_DEC_PLACE,'Depreciating':diverging_chart_source[i].OUTCOME};
      diverging_chart_graph_data.push(diverging_chart_obj);
    }
  }

  var diverging_chart_object={'type':diverging_chart_graph_data[0].type,'Promoting':diverging_chart_graph_data[0].Promoting,'Neutral':diverging_chart_graph_data[0].Neutral,'Depreciating':diverging_chart_graph_data[0].Depreciating};
  diverging_chart_graph_data_main.push(diverging_chart_object);
  for(var i=diverging_chart_graph_data.length-1;i>0;i--){
    var diverging_chart_obj={'type':diverging_chart_graph_data[i].type,'Promoting':diverging_chart_graph_data[i].Promoting,'Neutral':diverging_chart_graph_data[i].Neutral,'Depreciating':diverging_chart_graph_data[i].Depreciating};
    diverging_chart_graph_data_main.push(diverging_chart_obj);
  }
  // console.log(diverging_chart_graph_data_main);

  var keys=['Promoting','Neutral','Depreciating'];
  var color=['#003366','#a6a6a6','#8e0c0e'];
  horizontal_stacked_bar(diverging_chart_graph_data_main,"horizontal-stacked-bar",keys,500,250,'y_big_text',0.6,140,color,0,'x_axis_big_text',20);
  /*--------------------------------------------------------HORIZONTAL STACKED BAR CHART--------------------------------------------------------------------------------------------------------------*/
}