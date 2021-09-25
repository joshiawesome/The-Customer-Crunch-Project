function grouped_bar(main_data,data,min){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  console.log(today);

  console.log(min);
  // console.log(data);
  var categories = d3.keys(data[0]).filter(function(key) { return key !== "group"; });
  console.log(categories);
  data.forEach(function(d) {
    d.groups = categories.map(function(key) { return {key: key, value: +d[key]}; });
  });
  // console.log(data);

  var margin = {top: 40, right: 20, bottom: 30, left: 200};
  width = 1500 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

  var svg = d3.select("#grouped-bar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id","GroupedBarChart")
  .call(responsivefy)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  

  var x0 = d3.scaleBand()
  .range([0, width])
  .padding([0.05]);
  var x1 = d3.scaleBand()
  .padding([0.05]);;
  var y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0 ]);


  x0.domain(data.map(function(d) { return d.group; }));
  x1.domain(categories).range([0, x0.bandwidth()]);

  
 
  var color = d3.scaleOrdinal()
  .range(["#c00000", "#ffc000", "#44546a", "#afabab", "#548235"]);
 
  var xAxis= svg
  .append("g")
  .attr("class","g-x-axis")
  .attr("transform", "translate(0," + (height- 510)+ ")")
  .call(d3.axisBottom(x0));

  var yAxis= svg
  .append("g")
  // .attr("transform", "translate(10," + width + ")")
  .call(d3.axisLeft(y));

  svg.append("g")			
  .attr("class", "grid")
  .call(make_y_gridlines()
      .tickSize(-width)
      .tickFormat("")
  )

  function make_y_gridlines() {		
    return d3.axisLeft(y);
  }

  var grps = svg.selectAll(".state")
  .data(data)
  .enter().append("g")
  .attr("class", function(d){return d.group;})
  .attr("transform", function(d) { return "translate(" + (x0(d.group)) + ",0)"; });

  var grps_two = svg.selectAll(".sate_two")
  .data(data)
  .enter().append("g")
  .attr("class", "state_two")
  .attr("transform", function(d) { return "translate(" + (x0(d.group)) + ",0)"; });

  var date_checker;
  var str;
  var date_flag=0;
  grps.selectAll("rect")
  .data(function(d) { 
    date_checker=0;
    str=d.group;
    var extracted_date=str.split(" - ");
    var final_extracted_date;
    if(extracted_date.length!=1){
      if(extracted_date[1]!=null && extracted_date[1]!=""){
        final_extracted_date=extracted_date[1];
        console.log(final_extracted_date);

        var current_date=Date.parse(today);
        var project_date=Date.parse(final_extracted_date);
        console.log(current_date,project_date);

        if(project_date>current_date){
          date_checker=1;
          console.log(final_extracted_date,today);
        }
      }
    }
    var return_array=[];
    var return_array_obj={'key':date_checker,'value':str};
    return_array.push(return_array_obj);
    console.log(d.groups);
    d.groups.push(return_array_obj);
    return d.groups; 
  })
  .enter().append("rect")
  .attr("id",function(d){
    if(isNaN(d.value)==true){
      console.log(d.value);
      // return d.value;
    }
  })
  .attr("width", x1.bandwidth())
  .attr("x", function(d) {
    if(isNaN(d.key)==true){
      // console.log(d);
      return x1(d.key); 
    }
  })
  .attr("y", function(d) { 
    if(isNaN(d.key)==true){
      // console.log(d);
      return y(d.value); 
    }
  })
  .attr("height", function(d) { 
    if(isNaN(d.key)==true){
    return height - y(d.value); 
    }
  })
  .attr("opacity", function(d){
    if(isNaN(d.key)==false){
      console.log(d);
      if(d.key==1){
        var class_name=d3.select(this.parentNode)._groups[0][0].className.baseVal;
        var g_ele= d3.select(this.parentNode)._groups[0][0];
        console.log(g_ele.children);
        for(var r=0;r<(g_ele.children).length;r++){
          console.log((g_ele.children)[r].id);
          (g_ele.children)[r].id=class_name+r;
          console.log(document.getElementById(class_name+r))
          document.getElementById(class_name+r).style.opacity=0.6;
        }
      }
    }
    // if(d.value==min){
    //   return 0.6;
    // }
  })
  .style("fill", function(d) {
    //  console.log(d); 
    if(isNaN(d.key)==true){
     return color(d.key); 
    }
  }); 

  // var targetGoalArr = [22,42,52,70,86];
  var targetGoalArr=[
    {'target':'Undeveloped','percentage':22},
    {'target':'Immature','percentage':43},
    {'target':'Competent','percentage':52},
    {'target':'Advanced','percentage':70},
    {'target':'Commercially Sound','percentage':86}
  ]

  var target = svg.selectAll(".targetgoal")
    .data(targetGoalArr)
    .enter()
    .append("g")
    .attr("transform", function(d){
      return "translate(0, " + y(d.percentage) +")"
    })

  target.append("line")
    .attr("class", "targetgoal")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", 0) 
    .attr("y2", 0)
    .style("stroke", "black")
    .style("stroke-width","2")
    .style("stroke-dasharray",("3,4"));

  target.append("text")
      .attr("class","group_categories")
      .text(function(d){ return d.target; })
      .attr("x", width-1420)
      .attr("y", "0.35em")
    
  grps_two.selectAll(".vertical_lines_grouped")
  .data(function(d) { console.log(d.groups); return d.groups; })
  .enter().append("line")
  .attr("x1", function(d){
    if(d.key=="Overall Efficiency Score-Introduction"){
      return x1(d.key) + 57;
    }
  })
  .attr("y1", function(d){
    if(d.key=="Overall Efficiency Score-Introduction"){
      return 0;
    }
  })
  .attr("x2", function(d){
    if(d.key=="Overall Efficiency Score-Introduction" ){
      // console.log(d);
      return x1(d.key) + 57;
    }
  })
  .attr("y2", function(d){
    if(d.key=="Overall Efficiency Score-Introduction"){
      return (height - (margin.top-20) - margin.bottom ) + 50;
    }
  })
  .style("stroke", "grey")
  .style("fill", "grey");

  grps_two.selectAll(".text_grouped")
  .data(function(d) { console.log(d.groups); return d.groups; })
  .enter()
  .append("text")
  .attr("class", "textlabel")
  .style("font-family", "Arial")
  .attr("x",function(d){
    if(isNaN(d.key)==true){
      return x1(d.key)+5;
      console.log(d);
    }
  })
  .attr("y",function(d){
    if(isNaN(d.key)==true){
      return y(d.value)-5;
      console.log(d);
    }
  })
  .text(function(d){
    if(isNaN(d.key)==true){
      return d.value+"%";
    }
  });

  var n = categories.length/2;
  var itemWidth =80;
  var itemHeight = 18;

  // var nodeWidth = (d) => d.getBBox().width;

  const legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', 'translate(0,0)');

  const lg = legend.selectAll('g')
    .data(categories.slice())
    .enter()
  .append('g')
    .attr('transform', (d,i) => `translate(${i * 250},${height + 15})`);

  lg.append('rect')
  .style("fill", color)
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 10)
  .attr('height', 10);

  lg.append('text')
  .style('font-family', 'Georgia')
  .style('font-size', '13px')
  .attr('x', 17.5)
  .attr('y', 10)
  .text(function(d){return d;});

  let offset = 0;
  lg.attr('transform', function(d, i) {
      let x = offset;
      offset += nodeWidth(this) + 10;
      return `translate(${x},${height + 10})`;
  });

  legend.attr('transform', function() {
    return `translate(${(width - nodeWidth(this)) / 2},${0})`
  });

  
}