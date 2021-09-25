function box_plot_chart(main_data,data,labels,response_group_array){
  console.log(data,labels,response_group_array);

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
      // console.log(d);
      return "<span style='color:orange'>Designation:</span> <span style='color:white'>" + d.designation +"</span>"
    +"<br/><br><span style='color:orange'>Score:</span> <span style='color:white'><strong>" + d.score +"%" +"</strong></span>"
    });

  const margin = { top: 10, right: 0, bottom: 0, left:0 };
  const width = 300 - margin.left - margin.right;
  const height = 305 - margin.top - margin.bottom;

  const svg = d3.select('#box-plot-chart')
  .append('svg')
  .attr("id","svg1_box")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  // .style('position', 'absolute')
  .style('z-index', 1)
  .call(responsivefy) 
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.call(tip);

  var svg_two=d3.selectAll("#svg1_box");

  var sumstat = d3.nest() 
  .key(function(d) { return d.group;})
  .rollup(function(d) {
    // q1 = d3.quantile(d.map(function(g) { return g.score;}).sort(d3.ascending),.25)
    // median = d3.quantile(d.map(function(g) { return g.score;}).sort(d3.ascending),.50)
    // q3 = d3.quantile(d.map(function(g) { return g.score;}).sort(d3.ascending),.75)
    q1 = d3.quantile(d.map(function(g) { return g.score;}).sort(d3.ascending),.10)
    median = d3.quantile(d.map(function(g) { return g.score;}).sort(d3.ascending),.60)
    q3 = d3.quantile(d.map(function(g) { return g.score;}).sort(d3.ascending),.90)
    interQuantileRange = q3 - q1
    min = q1 - 1.3 * interQuantileRange
    max = q3 + 1.3 * interQuantileRange
    return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
  })
  .entries(data);

  var whiskers=[];
  var whisker_lines=[];
  for(var s=0;s<sumstat.length;s++){
    var max=sumstat[s].value.max;
    var median=sumstat[s].value.median;
    var min=sumstat[s].value.min;
    whiskers.push(min,median,max);
  }
  for(var w=0;w<whiskers.length;w++){
    var obj={"keys":"Response_values","value":whiskers[w]};
    whisker_lines.push(obj);
  }

  // console.log(sumstat,whiskers,whisker_lines);

  var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(["Response_values"])
  .paddingInner(1)
  .paddingOuter(.5)
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","xBoxPlot")
  .call(d3.axisBottom(x));
  
  var y = d3.scaleLinear()
  .domain([0,100])
  .range([height, 0])
  svg.append("g")
  .attr("class","yBoxPlot")
  .call(d3.axisLeft(y));

  svg
  .selectAll("vertLines")
  .data(sumstat)
  .enter()
  .append("line")
  .attr("x1", function(d){return(x(d.key))})
  .attr("x2", function(d){return(x(d.key))})
  .attr("y1", function(d){return(y(d.value.min))})
  .attr("y2", function(d){return(y(d.value.max))})
  .attr("stroke", "black")
  .style("width", 40);

  var boxWidth = 100;

  for(ts=0;ts<=1;ts++){
    svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
    .attr("x", function(d){return(x(d.key)-boxWidth/2)})
    .attr("y", function(d){
      if(ts==0){
        return(y(d.value.q3));
      }
      if(ts==1){
        return( (y(d.value.q3))*1.28);
      }
    })
    .attr("height", function(d){
      if(ts==0){
        return( (y(d.value.q1)-y(d.value.q3))/2.6);
      }
      if(ts==1){
        return( (y(d.value.q1)-y(d.value.q3))/1.2);
      }
    })
    .attr("width", boxWidth )
    .attr("stroke", function(d){
      if(ts==0){
        return "#efedee";
      }
      if(ts==1){
        return "#cac8c9";
      }
    })
    .style("fill", function(d){
      if(ts==0){
        return "#efedee";
      }
      if(ts==1){
        return "#cac8c9";
      }
    })
  
  }

  svg
  .selectAll("toto")
  .data(whisker_lines)
  .enter()
  .append("line")
  .attr("x1", function(d){return(x(d.keys)-boxWidth/2) })
  .attr("x2", function(d){return(x(d.keys)+boxWidth/2) })
  .attr("y1", function(d){return(y(d.value))})
  .attr("y2", function(d){return(y(d.value))})
  .attr("stroke", "black")
  .style("width", 80);

  
  var i=0;
  svg
  .selectAll("indPoints")
  .data(data)
  .enter()
  .append("circle")
  .attr("id",function(d){
    i++;
    return i;
  })
  .attr("cx","150")
  .attr("cy", function(d){return(y(d.score))})
  .attr("r", 6)
  .style("fill", function(d){
    col=color_categories(main_data,d.score);
    return col;
  })
  .attr("stroke", "black")
  .attr("opacity","0.8");

  svg.selectAll("circle")
  .on('mouseover', function(d){
    id=this.id;
    tip.show(d,this);     
  })
  .on('mouseout', tip.hide);

  var text_array=[response_group_array[0]+"%"+ " of Responses","were Advanced or","Commercially sound"];
  var text_array_two=[response_group_array[1]+"%"+ " of Responses","were Established or","Competent"];
  var text_array_three=[response_group_array[2]+"%"+ " of Responses","were Immature or","Undeveloped"];

  var quartile_text=["Upper Quartile","Median","Lower Quartile"];

  for(var qt=0;qt<quartile_text.length;qt++){
    svg_two.append("text")
    .attr("class","Quartile_Text")
    .attr("x",function(d){
      if(qt==0 || qt==2){
        return "80";
      }
      if(qt==1){
        return "95";
      }
    })
    .attr("dy",function(d){
      if(qt==0){
        return "12em";
      }
      if(qt==1){
        return "18em";
      }
      if(qt==2){
        return "25em";
      }
    })
    .text(quartile_text[qt]);
  }

  var text=svg_two.append("text")
  .attr("x",(200))
  .attr("y",20- (margin.top/2))
  .attr("text-anchor","middle")
  .style("fill","black")
  .attr("font-size","7px");
  
  var em_pos=0;
  var em_pos_two=0;
  var em_pos_three=0;

  for(var ta=0;ta<text_array.length;ta++){
     text.append("tspan")
    .attr("x",(245))
    .attr("class","text_annotation")
    .attr("dy", function(d){
      if (ta==0){return ((em_pos+7)+"em")}
      else{return (1.2+"em")}
    })
    .text(text_array[ta]);
  }

  for(var ta_two=0;ta_two<text_array_two.length;ta_two++){
    text.append("tspan")
   .attr("x",(245))
   .attr("class","text_annotation")
   .attr("dy", function(d){
     if (ta_two==0){return ((em_pos_two+12)+"em")}
     else{return (1.2+"em")}
   })
   .text(text_array_two[ta_two]);
 }

 for(var ta_three=0;ta_three<text_array_three.length;ta_three++){
  text.append("tspan")
 .attr("x",(245))
 .attr("class","text_annotation")
 .attr("dy", function(d){
  if (ta_three==0){return ((em_pos_three+12)+"em")}
  else{return (1.2+"em")}
  })
 .text(text_array_three[ta_three]);
}


}