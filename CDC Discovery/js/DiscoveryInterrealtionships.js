function Start_Up(){
// console.log(csv_json);
  navigation_hub("nav_hub_page_ten");

  var analysis_driven_culture_one=document.getElementById("AD_ONE");
  var analysis_driven_culture_two=document.getElementById("AD_TWO");
  var insight_driven_culture_one=document.getElementById("INS_ONE");
  var insight_driven_culture_two=document.getElementById("INS_TWO");
  var data_driven_culture_one=document.getElementById("DAT_ONE");
  var data_driven_culture_two=document.getElementById("DAT_TWO");

  var venn=document.getElementById("Venn_Diagram");

  var venn_source=[];
  for(var i=0;i<csv_json.length;i++){
    if(csv_json[i].TOPIC_GROUP=="Customer Culture TG"){
      venn_source.push(csv_json[i]);
    }
  }
  venn_source=venn_source.slice(0,4);

  var venn_data=[];
  for(var i=0;i<venn_source.length;i++){
    var venn_string=venn_source[i].TOPIC;
    var new_venn_string=[];
    venn_string=venn_string.split(" ");
    for(var j=0;j<venn_string.length;j++){
      var words=venn_string[j].split(" ");
      new_venn_string.push(words[0]);
    }
    var obj={"type":new_venn_string[0].toLowerCase(),"value":venn_source[i].PERC_ONE_DEC_PLACE};
    venn_data.push(obj);
  }
/*
  for(var i=0;i<venn_data.length;i++){
    var p_tag=document.createElement("p");
    var second_class="venn_percentage_"+venn_data[i].type;
    p_tag.setAttribute("class","venn_percentage_common "  + second_class +" ");
    p_tag.innerText=venn_data[i].value+"%";
    p_tag.style.position="absolute";
    p_tag.style.color=color_categories(csv_json,venn_data[i].value);

    var div_tag=document.createElement("div");
    var another_second_class="venn_progress_"+venn_data[i].type;
    div_tag.setAttribute("class","venn_progress_common " + another_second_class + " ");
    div_tag.style.backgroundColor=color_categories(csv_json,venn_data[i].value);
    if(venn_data[i].type=="competent"){div_tag.style.color="black";}
    else{div_tag.style.color="white";}
    div_tag.innerText=color_categories(csv_json,venn_data[i].value,"progress_bar");

    venn.appendChild(p_tag);
    venn.appendChild(div_tag);
  }
  */

  for(var i=0;i<venn_data.length;i++){

    if(venn_data[i].type=="listen"){
      analysis_driven_culture_one.style.color=color_categories(csv_json,venn_data[i].value);
      analysis_driven_culture_one.style.textDecoration="underline";
      analysis_driven_culture_one.innerText=venn_data[i].type.toUpperCase() + " " + venn_data[i].value+"%";
      data_driven_culture_two.style.color=color_categories(csv_json,venn_data[i].value);
      data_driven_culture_two.style.textDecoration="underline";
      data_driven_culture_two.innerText=venn_data[i].type.toUpperCase() + " " + venn_data[i].value+"%";
    }
    if(venn_data[i].type=="knowledge"){
      analysis_driven_culture_two.style.color=color_categories(csv_json,venn_data[i].value);
      analysis_driven_culture_two.style.textDecoration="underline";
      analysis_driven_culture_two.innerText=venn_data[i].type.toUpperCase() + " " + venn_data[i].value+"%";
      insight_driven_culture_one.style.color=color_categories(csv_json,venn_data[i].value);
      insight_driven_culture_one.style.textDecoration="underline";
      insight_driven_culture_one.innerText=venn_data[i].type.toUpperCase() + " " + venn_data[i].value+"%";
    }
    if(venn_data[i].type=="interaction"){
      insight_driven_culture_two.style.color=color_categories(csv_json,venn_data[i].value);
      insight_driven_culture_two.style.textDecoration="underline";
      insight_driven_culture_two.innerText=venn_data[i].type.toUpperCase() + " " + venn_data[i].value+"%";
      data_driven_culture_one.style.color=color_categories(csv_json,venn_data[i].value);
      data_driven_culture_one.style.textDecoration="underline";
      data_driven_culture_one.innerText=venn_data[i].type.toUpperCase() + " " + venn_data[i].value+"%";
    }
    
  }

}