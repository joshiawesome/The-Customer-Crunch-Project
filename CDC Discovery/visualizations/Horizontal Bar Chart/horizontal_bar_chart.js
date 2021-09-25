function horizontal_bar_chart(data,div_id,w,h,l,color,trans,categories,participant_data,total_partcipants){
  console.log(data,div_id,categories);
  
  var margin = {top: 0, right: 120, bottom: 0, left: l};
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

  var svg = d3.select("#"+div_id).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id","JustBarChart")
  .call(responsivefy) 
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale;

  if(trans==0){
    xScale = d3.scaleLinear()
    .domain([0,60])
    .range([0, width])
  }

  else{
    xScale = d3.scaleLinear()
    .domain([0,d3.max(data,function(d){return d.percentage})])
    .range([0, width])
  }

  svg.append("g")
  .attr("class", "x-axis-two")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale)
  .tickFormat(d=>d+"%"));

  var yScale = d3.scaleBand()
  .range([ 0, height])
  .domain(data.map(function(d) { return d.text; }))
  .padding(.1);
  svg.append("g")
  .attr("class", "y-axis-two")
  .style("text-anchor","start")
  .attr("transform", "translate(-"+(margin.left-10) +  ",0)")
  .call(d3.axisLeft(yScale));

  
  svg.append("g")			
  .attr("class", function(d){
    if(trans==0){return "grid";}
    else{return "grid_to"}
  })
  .attr("transform", "translate(0," + height + ")")
  .call(make_x_gridlines()
      .tickSize(-height)
      .tickFormat("")
  )

  function make_x_gridlines() {		
    return d3.axisBottom(xScale);
  }

  if(trans==0){
    var exceed_competent=0;
    var defecient_to_competent=0;
    var competent_percentage;
    var total_partcipants_above_competent=0;
    var total_partcipants_below_competent=0;
    var competent_participants=0;
    
    for(var ld=0;ld<data.length;ld++){
      console.log(data[ld]);
      if(data[ld].text=="Competent"){
        competent_percentage=parseFloat(data[ld].percentage);
        competent_participants=participant_data[ld].participants;
        break;
      }
      if(data[ld]!="Competent"){
        exceed_competent=exceed_competent+parseFloat(data[ld].percentage);
        total_partcipants_above_competent=total_partcipants_above_competent+participant_data[ld].participants;
      }
    }

    exceed_competent=Math.round(exceed_competent);
    competent_percentage=Math.round(competent_percentage);
    defecient_to_competent=100-(competent_percentage+exceed_competent);

    total_partcipants_below_competent=total_partcipants-(competent_participants+total_partcipants_above_competent);
    console.log(categories,participant_data,total_partcipants_above_competent,total_partcipants_below_competent);

    line_annotation2(svg,data,categories[0],categories[2],50,xScale,yScale,exceed_competent.toString()+"%",15,"EXCEEDING COMPETENT",1);
    line_annotation2(svg,data,categories[3],categories[4],50,xScale,yScale,defecient_to_competent.toString()+"%",15,"DEFICIENT TO COMPETENT",1);

    line_annotation2(svg,data,categories[0],categories[2],65,xScale,yScale,total_partcipants_above_competent.toString(),10,"PARTICIPANTS",2);
    line_annotation2(svg,data,categories[3],categories[4],65,xScale,yScale,total_partcipants_below_competent.toString(),10,"PARTCIPANTS",3);
  }

  var bars=svg.selectAll("myRect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", xScale(0) )
  .attr("y", function(d) { return yScale(d.text); })
  .attr("width", function(d) { return xScale(d.percentage); })
  .attr("height", yScale.bandwidth() )
  // .style("fill", function(d, i) { return color[i]; });  
  .style("fill",function(d,i){
    if(trans==0){
      var col=known_colour_categories(d.text);
      return col;
    }
    else{return color[i];}
  })

  svg.append("g")
  .attr("transform", "translate(" + (trans)  + "," + (margin.top-5) + ")")
  .selectAll(".textlabel")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "textlabel")
  .style("font-family", "Arial")
  .attr("x", function(d){
    if(trans==0){return 3;}
    else{return xScale(parseFloat(d.percentage)) + 2 ; }
  })
  .attr("y", function(d){ return yScale(d.text) + yScale.bandwidth()/1.3; })
  .text(function(d){ return (d.percentage + "%"); })
  .style("fill",function(d){
    if(trans==0){return "white";}
    else{return "black";}
  })

 

}

function get_color_from_score(score){
  if(score>=85 && score<=100){
    return "#003366";
  }
  else if(score>=70 && score<=84){
    return "#507ad1";
  }
  else if(score>=55 && score<=69){
    return "#458a00";
  }
  else if(score>=45 && score<=54){
    return "#57bd4f";
  }
  else if(score>=25 && score<=44){
    return "#ff6100";
  }
  else if(score>=0 && score<=24){
    return "#a01c20";
  }
}