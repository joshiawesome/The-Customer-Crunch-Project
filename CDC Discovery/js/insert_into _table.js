/*---------------------------------------------------------TO INSERT CELLS AND DATA INTO TABLE-----------------------------------------------------------------------------------------*/
function insert_table_cell(main_data,val_one,val_two,val_three,val_four,val_five,progs,row_flag,table_row_one,table_row_two,table_row_three,table_row_four){
  var value_array=[];
  value_array.push(val_one,val_two,val_three,val_four,val_five);
  for(var i=0;i<value_array.length;i++){
    var table_cell=document.createElement("td");
    table_cell.setAttribute("width","7%");
    table_cell.setAttribute("class","table_cell");
    
    if(i==0 || i==1){
      table_cell.setAttribute("class","first_two_cells");
      table_cell.innerText=value_array[i];
    }
    if(i==2){
      table_cell.setAttribute("id","prog"+progs);
      table_cell.style.backgroundColor="#f8f8f8";
    }
    if(i==2 || i==3){
      table_cell.setAttribute("class","first_two_cells");
      value_array[i]=parseFloat(value_array[i]);
      value_array[i]=Math.round(value_array[i]);
      //for color categories
      table_cell.style.color=color_categories(main_data,value_array[i]);
      table_cell.innerText=value_array[i] +"%";
    }
    if(i==4){
      table_cell.setAttribute("class","first_two_cells");
      if(value_array[i]<0){
        table_cell.style.color="#c00c2e";
        value_array[i]=parseFloat(value_array[i]);
        value_array[i]=Math.round(value_array[i]);
        table_cell.innerText=value_array[i];
      }
      if(value_array[i]>=0){
        table_cell.style.color="#0070c0";
        value_array[i]=parseFloat(value_array[i]);
        value_array[i]=Math.round(value_array[i]);
        table_cell.innerText="+"+value_array[i];
      }
    }

    if(row_flag==1){
      table_row_one.appendChild(table_cell);
    }
    if(row_flag==2){
      table_row_two.appendChild(table_cell);
    }
    if(row_flag==3){
      table_row_three.appendChild(table_cell);
    }
    if(row_flag==4){
      table_row_four.appendChild(table_cell);
    }
    
  }
}
/*---------------------------------------------------------TO INSERT CELLS AND DATA INTO TABLE-----------------------------------------------------------------------------------------*/

/*---------------------------------------------------------TO APPEND OUTCOME TEXTS INTO TABLE-----------------------------------------------------------------------------------------*/
function append_outcome_text(outcome,outcome_string,outcome_clas,tabrow){
  outcome.setAttribute("class",outcome_clas);
  // outcome.style.fontSize="13px";
  outcome.innerText=outcome_string
  tabrow.appendChild(outcome);
}
/*---------------------------------------------------------TO APPEND OUTCOME TEXTS INTO TABLE-----------------------------------------------------------------------------------------*/

/*---------------------------------------------------------TO APPEND IMAGES INTO TABLE-----------------------------------------------------------------------------------------*/
function append_image(image,image_row,source,tablerow,connections){
  var a=document.createElement("a");
  a.setAttribute("href",connections);
  image.setAttribute("src",source);
  image.setAttribute("width","70px");
  image.setAttribute("height","70px");
  image_row.appendChild(image);
  a.appendChild(image_row);
  tablerow.appendChild(a);
}
/*---------------------------------------------------------TO APPEND IMAGES INTO TABLE-----------------------------------------------------------------------------------------*/

/*---------------------------------------------------------TO APPEND PROGRESS BARS INTO TABLE-----------------------------------------------------------------------------------------*/
function append_progress_bar(bar,main_data){
  var prog_div=document.createElement("div");
  prog_div.style.margin="0 auto";
  prog_div.style.width="100px";
  var text=bar.innerText;
  text=text.replace('%','');
  text=parseFloat(text);
  // text=Math.round(text);

  progress_bar_id="progress_bar";

  prog_div.style.color="white";
  prog_div.setAttribute("class","prog_text");
   //for color categories
  prog_div.style.backgroundColor=color_categories(main_data,text);
  prog_div.innerHTML=color_categories(main_data,text,progress_bar_id)
  bar.appendChild(prog_div);
}
/*---------------------------------------------------------TO APPEND PROGRESS BARS INTO TABLE-----------------------------------------------------------------------------------------*/

/*---------------------------------------------------------TABLE LEGEND FOR HORIZONTAL STACKED BAR CHART-----------------------------------------------------------------------------------------*/
function stack_table_legend(stack_table_array_project,stack_table_flag,stack_row_one,stack_row_two,stack_row_three){
  
  for(var i=0;i<stack_table_array_project.length;i++){
    stack_table_flag++;
    var stack_table_cell=document.createElement("td");
    stack_table_cell.style.fontSize="10px";
    stack_table_cell.innerText=Math.round(stack_table_array_project[i]) + "%";
    if(stack_table_flag==1){
      stack_row_one.appendChild(stack_table_cell);
    }
    if(stack_table_flag==2){
      stack_row_two.appendChild(stack_table_cell);
    }
    if(stack_table_flag==3){
      stack_row_three.appendChild(stack_table_cell);
    }
  }
}
/*---------------------------------------------------------TABLE LEGEND FOR HORIZONTAL STACKED BAR CHART-----------------------------------------------------------------------------------------*/

/*--------------------------------------------------------RESULT KEY-----------------------------------------------------------------------*/
function result_key_table(table_id,main_data){
  // console.log(main_data);
  var color_data=[];
  var catg=[];
  for(var cd=0;cd<main_data.length;cd++){
    if(main_data[cd].TOPIC_GROUP=="SCORING_MATRX"){
      var obj={"type":main_data[cd].OUTCOME.trim(),"range":main_data[cd].PERC_ONE_DEC_PLACE};
      catg.push(main_data[cd].OUTCOME.trim());
      color_data.push(obj);
    }
  }

  var result_table=document.createElement("table");
  result_table.style.marginTop="30px";

  var result_table_body=document.createElement("tbody");
  result_table_body.setAttribute("class","result_key");
  result_table_body.setAttribute("id","result_key");
  result_table_body.style.border="1px solid black";

  for(var cd=color_data.length-1;cd>=0;cd--){
    var result_key_row=document.createElement("tr");
    result_key_row.setAttribute("scope","row");
    var result_cell_one=document.createElement("td");
    var result_cell_two=document.createElement("td");
    result_cell_two.setAttribute("class","dotted");
    result_cell_one.setAttribute("class","category");
    result_cell_one.style.color="white";
    result_cell_one.style.backgroundColor=known_colour_categories(color_data[cd].type);
    result_cell_one.innerText=color_data[cd].type;
    result_cell_two.innerText=color_data[cd].range;
    result_key_row.appendChild(result_cell_one);
    result_key_row.appendChild(result_cell_two);
    result_table_body.appendChild(result_key_row);
  }

  // result_table.appendChild(result_table_caption);
  result_table.appendChild(result_table_body);
  table_id.appendChild(result_table);

}
/*--------------------------------------------------------RESULT KEY-----------------------------------------------------------------------*/

/*---------------------------------------------------------TABLE FOR DISCOVERY RECOMMENDATION-------------------------------------------------------------------------------*/
function discovery_recommendation_table(value,pr,fl,r1,r2,r3,r4,main_data){
  // console.log(value);
  var arr=[];
  arr.push(value);
  for(var i=0;i<arr.length;i++){
    var table_cell=document.createElement("td");
    table_cell.setAttribute("class","table_cell");
    table_cell.setAttribute("class","first_two_cells");
    table_cell.setAttribute("id","prog"+pr);

    if(i==0){
      table_cell.style.backgroundColor="#f8f8f8";
    }
    //for color categories
    table_cell.style.color=color_categories(main_data,arr[i]);
    table_cell.innerText=arr[i] +"%";

    if(fl==1){
      r1.appendChild(table_cell);
    }
    if(fl==2){
      r2.appendChild(table_cell);
    }
    if(fl==3){
      r3.appendChild(table_cell);
    }
    if(fl==4){
      r4.appendChild(table_cell);
    }
  }
}
/*---------------------------------------------------------TABLE FOR DISCOVERY RECOMMENDATION-------------------------------------------------------------------------------*/

/*---------------------------------------------------------TABLE FOR RESPONSE RANGE-------------------------------------------------------------------------------*/
function response_range_table(main_data,range_percentage_value,range_row,range_prog,range_heads,range_heads_data){

  var range_percentage_arr=[];
  range_percentage_arr.push(range_percentage_value);

  for(var rp=0;rp<range_percentage_arr.length;rp++){
    var range_table_cell=document.createElement("td");
    var range_table_head=document.createElement("th");

    range_table_head.innerText=range_heads_data;

    range_table_cell.style.textAlign="center";
    range_table_cell.setAttribute("class","table_cell");
    range_table_cell.setAttribute("class","first_two_cells");
    range_table_cell.setAttribute("id","prog"+range_prog);
    //for color categories
    range_table_cell.style.color=color_categories(main_data,range_percentage_arr[rp]);
    range_table_cell.innerText=range_percentage_arr[rp] +"%";

    range_row.appendChild(range_table_cell);
    range_heads.appendChild(range_table_head);
  }
}
/*---------------------------------------------------------TABLE FOR RESPONSE RANGE-------------------------------------------------------------------------------*/
 
/*---------------------------------------------------------COLOR CATEGORIES-------------------------------------------------------------------------------*/
function known_colour_categories(outcome){
    if(outcome=="Commercially Sound" || outcome=="Commercially Sound "){
      return "#003366";
    }
    if(outcome=="Advanced"){
      return "#507ad1";
    }
    if(outcome=="Established"){
      return "#458a00";
    }
    if(outcome=="Competent"){
      return "#57bd4f";
    }
    if(outcome=="Immature"){
      return "#ff6100";
    }
    if(outcome=="Undeveloped"){
      return "#a01c20";
    }
}

function color_categories(data,value,progress_bar_id){
  // console.log(data,value);
  var color_data=[];
  var color_data_ranges=[];
  var catg=[];
  for(var cd=0;cd<data.length;cd++){
    if(data[cd].TOPIC_GROUP=="SCORING_MATRX"){
      var obj={"type":data[cd].OUTCOME,"range":data[cd].PERC_ONE_DEC_PLACE};
      catg.push(data[cd].OUTCOME.trim());
      color_data.push(obj);
    }
  }
  // console.log(color_data);
  for(var cd=0;cd<color_data.length;cd++){
    var sub_array=[];
    for(var j=0;j<(color_data[cd].range).length;j++){
      if((color_data[cd].range)[j]!="%" && (color_data[cd].range)[j]!="-"){
        sub_array.push((color_data[cd].range)[j]);
      }
    }
    color_data_ranges.push(sub_array);
  }
  for(var cd=0;cd<color_data_ranges.length;cd++){
    var temp_array=color_data_ranges[cd];
    for(var j=0;j<temp_array.length;j++){
      if(temp_array[j]==" "){
        color_data_ranges[cd][j]=-1;
      }
    }
  }

  var flag;
  var flag_array=[];
  for(var cd=0;cd<color_data_ranges.length;cd++){
    flag=0;
    var flag_sub_array=[];
    var temp_array=color_data_ranges[cd];
    for(var j=0;j<temp_array.length;j++){
      if(temp_array[j]!=-1){flag++;}
      else{flag=0}
      flag_sub_array.push(flag);
    }
    flag_array.push(flag_sub_array);
  }

  var refined_colour_ranges=[];
  for(var i=0;i<color_data_ranges.length;i++){
    var new_sub_array=[];
    for(var i_two=0;i_two<color_data_ranges[i].length;i_two++){
      if(flag_array[i][i_two]==1 && flag_array[i][i_two+1]==0){
        new_sub_array.push(parseInt(color_data_ranges[i][i_two]));
      }
      if(flag_array[i][i_two]==1 && flag_array[i][i_two+1]==2 && flag_array[i][i_two+2]!=3){
        var joined=color_data_ranges[i][i_two].concat(color_data_ranges[i][i_two+1]);
        new_sub_array.push(parseInt(joined));
      }
      if(flag_array[i][i_two]==1 && flag_array[i][i_two+1]==2 && flag_array[i][i_two+2]==3 ){
        var joined=color_data_ranges[i][i_two].concat(color_data_ranges[i][i_two+1])
        joined=joined.concat(color_data_ranges[i][i_two+2]);
        new_sub_array.push(parseInt(joined));
      }
    }
    refined_colour_ranges.push(new_sub_array);
  }
 
  for(var rr=refined_colour_ranges.length-1;rr>=0;rr--){
    // console.log(refined_colour_ranges[rr],catg[rr]);
    for(rr_two=0;rr_two<refined_colour_ranges[rr].length;rr_two++){
      if(rr_two+1<refined_colour_ranges[rr].length){
        if(catg[rr]=="Commercially Sound"){
          if(Math.round(value)>=refined_colour_ranges[rr][rr_two] && Math.round(value)<=refined_colour_ranges[rr][rr_two+1]){
            if(typeof(progress_bar_id)!='undefined'){return catg[rr]}
            else{return "#003366";}
          }
        }
        if(catg[rr]=="Advanced"){
          if(Math.round(value)>=refined_colour_ranges[rr][rr_two] && Math.round(value)<=refined_colour_ranges[rr][rr_two+1]){
            if(typeof(progress_bar_id)!='undefined'){return catg[rr]}
            else{return "#507ad1";}
          }
        }
        if(catg[rr]=="Established"){
          if(Math.round(value)>=refined_colour_ranges[rr][rr_two] && Math.round(value)<=refined_colour_ranges[rr][rr_two+1]){
            if(typeof(progress_bar_id)!='undefined'){return catg[rr]}
            else{return "#458a00"};
          }
        }
        if(catg[rr]=="Competent"){
          if(Math.round(value)>=refined_colour_ranges[rr][rr_two] && Math.round(value)<=refined_colour_ranges[rr][rr_two+1]){
            if(typeof(progress_bar_id)!='undefined'){return catg[rr]}
            else{return "#57bd4f";}
          }
        }
        if(catg[rr]=="Immature"){
          if(Math.round(value)>=refined_colour_ranges[rr][rr_two] && Math.round(value)<=refined_colour_ranges[rr][rr_two+1]){
            if(typeof(progress_bar_id)!='undefined'){return catg[rr]}
            else{return "#ff6100";}
          }
        }
        if(catg[rr]=="Undeveloped"){
          if(Math.round(value)>=refined_colour_ranges[rr][rr_two] && Math.round(value)<=refined_colour_ranges[rr][rr_two+1]){
            if(typeof(progress_bar_id)!='undefined'){return catg[rr]}
            else{return "#a01c20";}
          }
        }
      }
    }
  }
}
/*---------------------------------------------------------COLOR CATEGORIES-------------------------------------------------------------------------------*/

/*---------------------------------------------------------NEXT STEPS TABLE-------------------------------------------------------------------------------*/
function NextStepsTable(main_data,value_one,progs,row_flag,table_row_one,table_row_two,table_row_three,table_row_four){
  var value_array=[];
  value_array.push(value_one);

  for(var i=0;i<value_array.length;i++){

    var table_cell=document.createElement("td");
    table_cell.setAttribute("width","7%");
    table_cell.setAttribute("class","table_cell");
    table_cell.setAttribute("id","prog"+progs);
    table_cell.style.backgroundColor="#f8f8f8";
    table_cell.setAttribute("class","first_two_cells");
    value_array[i]=parseFloat(value_array[i]);
    value_array[i]=Math.round(value_array[i]);
    table_cell.style.color=color_categories(main_data,value_array[i]);
    table_cell.innerText=value_array[i] +"%";

    
    if(row_flag==1){
      table_row_one.appendChild(table_cell);
    }
    if(row_flag==2){
      table_row_two.appendChild(table_cell);
    }
    if(row_flag==3){
      table_row_three.appendChild(table_cell);
    }
    if(row_flag==4){
      table_row_four.appendChild(table_cell);
    }

  }

}
/*---------------------------------------------------------NEXT STEPS TABLE-------------------------------------------------------------------------------*/
