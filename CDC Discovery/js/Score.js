function Start_Up(){
  navigation_hub("nav_hub_page_eleven");
  // console.log(csv_json);
  var grouped_bar_data_source=[];
  var main_project_source=[];
  for(var i=0;i<csv_json.length;i++){
    if(csv_json[i].TOPIC_GROUP=="BENCHMARK"){
      grouped_bar_data_source.push(csv_json[i]);
    }
  }

  for(var i=0;i<csv_json.length;i++){
    if(csv_json[i].TOPIC_GROUP=="Customer Culture TG PARTICIPNATS QUESTIONS"){
      main_project_source.push(csv_json[i]);
    }
  }
  console.log(main_project_source);

  var project_names=[];
  var project_dates=[];
  var available_project_names=[];
  var bar_categories_per_group=[];
  var all_percentages=[];
  for(var i=0;i<grouped_bar_data_source.length;i++){
    all_percentages.push(parseFloat(grouped_bar_data_source[i].PERC_ONE_DEC_PLACE));

    if(project_dates.indexOf(grouped_bar_data_source[i].PROJECT_START_DATE)==-1){
      var date_obj={'sector':grouped_bar_data_source[i].PROJECT_NAME,'date':grouped_bar_data_source[i].PROJECT_START_DATE};
      project_dates.push(date_obj);
    }
    if(project_names.indexOf(grouped_bar_data_source[i].PROJECT_NAME)==-1){
      available_project_names.push(grouped_bar_data_source[i].PROJECT_NAME);
      project_names.push(grouped_bar_data_source[i].PROJECT_NAME);
    }
    if(bar_categories_per_group.indexOf(grouped_bar_data_source[i].TOPIC)==-1){
      bar_categories_per_group.push(grouped_bar_data_source[i].TOPIC);
    }
  }

  for(var i=0;i<main_project_source.length;i++){
    if(project_names.indexOf(main_project_source[i].PROJECT_NAME)==-1){
      project_names.push(main_project_source[i].PROJECT_NAME);
    }
  }
  console.log(project_names);

  for(var i=0;i<main_project_source.length;i++){
    var date_obj={'sector':main_project_source[i].PROJECT_NAME,'date':main_project_source[i].PROJECT_START_DATE};
    project_dates.push(date_obj);
  }

  const map = {};
  const newArray = [];
   project_dates.forEach(el => {
      if(!map[JSON.stringify(el)]){
         map[JSON.stringify(el)] = true;
         newArray.push(el);
   }
  });
  console.log(newArray);
  
  var predefined_project_names=[];

  var predefined_project_names=["Benchmark","TESLA","TESLA II","TESLA III"];
  for(var missing=0;missing<predefined_project_names.length;missing++){
    if(project_names.indexOf(predefined_project_names[missing])==-1){
      var missing_name=predefined_project_names[missing];
      project_names.splice(missing,0,missing_name);
    }
  }
  bar_categories_per_group=bar_categories_per_group.slice(0,5);

  project_names.sort(function(a,b){
    return predefined_project_names.indexOf(a)-predefined_project_names.indexOf(b);
  })
  console.log(predefined_project_names,project_names);

  var actual_categories_order=[];
  for(var i=bar_categories_per_group.length-2;i>=0;i--){
    actual_categories_order.push(bar_categories_per_group[i]);
  }
  actual_categories_order.push(bar_categories_per_group[bar_categories_per_group.length-1]);

  var min=all_percentages[0];
  for(var per=0;per<all_percentages.length;per++){
    if(all_percentages[per]<min){
      min=all_percentages[per];
    }
  }

  console.log(min);
  if(min>=0&&min<=5){
    min=Math.round(min+3);
  }
  else{
    min=Math.round(min-2);
  }
  console.log(min);

  var main_project_source_percentages=[];
  for(var i=0;i<main_project_source.length;i++){
    main_project_source_percentages.push(main_project_source[i].PERC_ONE_DEC_PLACE);
  }
  console.log(main_project_source_percentages);

  var grouped_bar_data_main=[];
  var flag;

  for(var i=0;i<project_names.length;i++){
    flag=0;
    var obj={"group":project_names[i]};
    
    if(available_project_names.includes(project_names[i])==false){
      flag++;
    }

    for(var k=0;k<actual_categories_order.length;k++){
      for(var j=0;j<grouped_bar_data_source.length;j++){
        if( grouped_bar_data_source[j].PROJECT_NAME==project_names[i] && grouped_bar_data_source[j].TOPIC==actual_categories_order[k]){
          obj[actual_categories_order[k]]=grouped_bar_data_source[j].PERC_ONE_DEC_PLACE;
        }
        //if no data is given, then set all bars to same height
        if(flag==1){
          // obj[actual_categories_order[k]]=main_project_source_percentages[j];
          obj[actual_categories_order[k]]=min.toString();
        }
      }
    }
    
    grouped_bar_data_main.push(obj);
  }

  for(var i=0;i<grouped_bar_data_main.length;i++){
    if(grouped_bar_data_main[i].group=="TESLA"){
      for(var j=0;j<actual_categories_order.length;j++){
        grouped_bar_data_main[i][actual_categories_order[j]]=main_project_source_percentages[j];
      }
      // grouped_bar_data_main[i][actual_categories_order[i]]
    }
  }

  for(var gb=0;gb<grouped_bar_data_main.length;gb++){
    for(var gb_two=0;gb_two<newArray.length;gb_two++){
      if(grouped_bar_data_main[gb].group==newArray[gb_two].sector){
        grouped_bar_data_main[gb].group=grouped_bar_data_main[gb].group+" - "+newArray[gb_two].date;
        // grouped_bar_data_main[gb]['date']=newArray[gb_two].date;
      }
    }
  }

  console.log(grouped_bar_data_main,bar_categories_per_group,actual_categories_order,all_percentages);
  grouped_bar(csv_json,grouped_bar_data_main,min);
}