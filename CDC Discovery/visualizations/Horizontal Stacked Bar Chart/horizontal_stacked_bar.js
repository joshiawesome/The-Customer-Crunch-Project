function horizontal_stacked_bar(data,div_id,keys,w,h,y_class_axis,y_padding,left_pad,color,t,x_class_axis,bottom){
  console.log("bottom",bottom);
  // var available_width=document.getElementById("svg_id").offsetWidth;
  // console.log(available_width);
  
  var margin = {top: t, right: 20, bottom: bottom, left: left_pad};
  width = w - margin.left - margin.right,
  height = h - margin.top - 2*margin.bottom;

  var xScale = d3.scaleLinear().rangeRound([0, width]);
  var yScale = d3.scaleBand().rangeRound([height, 0]).padding(y_padding);
 
  var xAxis=d3.axisBottom(xScale)
  .tickFormat(d=>d+"%");
  var yAxis=d3.axisLeft(yScale);

  var svg = d3.select("#"+div_id).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id","HorizontalStackedBarChart")
  .call(responsivefy) 
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2=d3.select("#HorizontalStackedBarChart");
    
  var stack = d3.stack()
  .keys(keys)
  .offset(d3.stackOffsetNone);

  // console.log(stack);
  var layers=stack(data);
  // console.log(layers);

  yScale.domain(data.map(function(d) { return (d.type); }));
  // xScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();
  xScale.domain([0,100]);

  svg.append("g")
  .attr("class", x_class_axis)
  .attr("transform", "translate(-1," + (height) + ")")
  .call(xAxis);

  svg.append("g")
  .attr("class", y_class_axis)
  .attr("transform", "translate(-1,0)")
  .call(yAxis);	

  if(y_class_axis!="y_big_text"){
    svg.append("g")			
    .attr("class", "stacked_grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
    )

    function make_x_gridlines() {		
      return d3.axisBottom(xScale);
    }
  }

  var layer = svg.selectAll(".layer")
  .data(layers)
  .enter().append("g")
  .attr("class", "layer")
  .style("fill", function(d, i) { return color[i]; });

  layer.selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
  .attr("y", function(d) { return yScale(d.data.type); })
  .attr("x", function(d) { console.log(d.data.type,xScale(d[0]+0),d[0]); return xScale(d[0]+0); })
  .attr("height", yScale.bandwidth())
  .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });

  var layer_two = svg.selectAll(".layer_two")
  .data(layers)
  .enter().append("g")
  .attr("class", "layer_two")
  
  if(y_class_axis=="y_big_text"){

    svg2.append('rect')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);

    
    var l=0,m=0,flag_one=0,flag_two=0,y_flag_one=0,y_flag_two=0;

    layer_two.selectAll(".vertical_lines")
    .data(function(d) { return d; })
    .enter().append("line")
    .attr("x1", function(d) { 
      if(d.data.type=="TOTAL RESPONSE AVERAGE"){
        flag_one++;
        if(flag_one!=3){
          // console.log(l,d[1]);
          return xScale(d[1]);
        }
      }
      l++;
    })
    .attr("y1", function(d){
      if(d.data.type=="TOTAL RESPONSE AVERAGE"){
        y_flag_one++;
        if(y_flag_one!=3){
          return 0;
        }
      }
    })
    .attr("x2", function(d) { 
      if(d.data.type=="TOTAL RESPONSE AVERAGE"){
        flag_two++;
        if(flag_two!=3){
          // console.log(m,d[1]);
          return xScale(d[1]);
        }
      }
      
      m++;
    })
    .attr("y2", function(d){
      if(d.data.type=="TOTAL RESPONSE AVERAGE"){
        y_flag_two++;
        if(y_flag_two!=3){
          return (height - margin.top - margin.bottom ) + 20;
        }
      }
    })
    .style("stroke", "black")
    .style("fill", "black");
    
    layer.selectAll("text")
    .data(function(d) { console.log(d);return d; })
    .enter()
    .append("text")
    .attr("class", "textlabel")
    .style("font-size","3.5px")
    .style("font-family", "Arial")
    .attr("x",function(d){
      return (xScale(d[1]) + xScale(d[0]))/2;
      // return xScale(d[0]);
      console.log(d);
    })
    .attr("y",function(d){
      return yScale(d.data.type) + 3.2;
      console.log(d);
    })
    .text(function(d){ console.log(d);return (Math.round(d[1]-d[0]) + "%"); });

    var categories=["positive","neutral","depreciating"];
  
    const legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', 'translate(0,0)');

  const lg = legend.selectAll('g')
    .data(categories.slice())
    .enter()
  .append('g')
    .attr('transform', (d,i) => `translate(${(width-100)+i * 30},${0})`);

  lg.append('rect')
  .style("fill", function(d, i) { return color[i]; })
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 5)
  .attr('height', 5);

  lg.append('text')
 
  .style('font-size', '5px')
  .attr('x', 10)
  .attr('y', 4)
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

  
  
}
