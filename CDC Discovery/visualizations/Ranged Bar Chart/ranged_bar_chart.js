function ranged_bar_chart(main_data,categories,ranges,ranges_two,min,max){
  console.log(categories,ranges,ranges_two,min,max);
 
  const margin = { top: 0, right: 8, bottom: 30, left: 110 };
  const width = 350 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  const svg = d3.select('#ranged-bar-chart')
  .append('svg')
  .attr("id","svg1")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .call(responsivefy) 
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  var xscale = d3.scaleLinear()
  .domain([min,max])
  .range([0, width]);

  var yscale = d3.scaleLinear()
  .domain([0, categories.length])
  .range([height, 0]);

  var xAxis= svg
  .append("g")
  .attr("class","xRange")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xscale));

  var yAxis= svg
  .append("g")
  .attr("class","yRange")
  .call(d3.axisLeft(yscale)
  .tickSize(2)
  .tickFormat(function(d, i) {
    return categories[i];
  })
  .tickValues(d3.range(17)));

  console.log(categories[1],categories[2],max)

  line_annotation(svg,main_data,categories.length-4,categories.length-1,max-30,xscale,yscale,"Lead Culture","9px");
  line_annotation(svg,main_data,categories.length-6,categories.length-5,max-30,xscale,yscale,"Directed Culture","9px");
  line_annotation(svg,main_data,categories.length-7,categories.length-9,max-30,xscale,yscale,"Expressed Culture","9px");

  var chart_one,chart_two;
  var transit_one,transit_two;

  for(var i=0;i<2;i++){
    if(i==0){append_all(ranges_two,chart_two,transit_two,"bars_two",0);}
    if(i==1){append_all(ranges,chart_one,transit_one,"bars_one",1);}
  }


  function append_all(chart_data,chart_name,transit_name,bars_id,j){
    chart_name = svg
    .append('g')
    .attr("transform", "translate(0,0)")
    .attr('id', bars_id)
    .selectAll('rect')
    .data(chart_data)
    .enter()
    .append("g")
    .attr("id", bars_id);
  
    chart_name
    .append("rect")
    .attr("height",function(d){
      if(j==0){return 10;}
      if(j==1){return 2;}
    })  
    .attr("x", function(d) {
      return xscale(d[0]);
    })
    .attr("y", function(d,i) {
      if(j==1){return yscale(i) - 45.5;} 
      if(j==0){return yscale(i) - 49.5;} 
    })
    .attr("rx",function(d){
      if(j==0){return 5;}
    })
    .attr("ry",function(d){
      if(j==0){return 5;}
    })
    .style("fill",function(d){
     if(j==0){return "#d0cece";}
     if(j==1){
      var col=known_colour_categories(d[2]);
      return col;
     }
    })
    .style("opacity",function(d){
      if(j==0){return 0.3;}
    })
    .attr("width", function(d){
      return 0;
    });

    transit_name = d3.select("#"+bars_id).selectAll("rect")
    .data(chart_data)
    .transition()
    .duration(1000)
    .attr("width", function(d) {
      if(j==0){ return ((xscale(d[1])) - (xscale(d[0]))) ;}
      if(j==1){
        if(((xscale(d[1])) - (xscale(d[0])))!=0){
          return ((xscale(d[1])) - (xscale(d[0])))-2;
        }
        else
        return ((xscale(d[1])) - (xscale(d[0]))) ;
      }
    });

    if(j==1){
      for(var k=1;k<=2;k++){
        chart_name
        .append("circle")
        .attr("r",4)
        .attr("cx",function(d){
          if(k==1){return xscale(d[0]);}
          if(k==2){return xscale(d[1])-1;}
        })
        .attr("cy",function(d,i){
          return yscale(i) - 44.4;
        })
        .style("fill",function(d){
          var col;
          for(var cir=k-1;cir<k;cir++){
            if(typeof(d[cir])=='number'){
              col=color_categories(main_data,d[cir]);
              return col;
            }
          }
        })
        
      }
    }
  
  }

}