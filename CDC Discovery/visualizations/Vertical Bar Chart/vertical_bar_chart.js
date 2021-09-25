function vertical_bar_chart(main_data,data){
  console.log(data);
  const margin = { top: 5, right: 5, bottom: 100, left: 35 };
  const width = 300 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
  .padding(0.1)
  .domain(data.map(function(d) { return d.type; }))
  .range([0, width]);

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { console.log(d.percentage);return d.percentage; })])
  .range([height, 0]);

  var color=["#ed7d31", "#a5a5a5", "#800000", "#4472c4", "#a5a5a5", "#548235"];
  var i=0;

  const svg = d3.select('#vertical-bar-chart')
  .append('svg')
  .attr("id","svg1")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .call(responsivefy) 
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .attr("class","xLine")
  .call(d3.axisBottom(xScale))
  .selectAll("text")
  .style("text-anchor","end")
  .attr("dx","-.8em")
  .attr("dy","-.5em")
  .attr("transform","rotate(-90)");

  svg.append('g')
  .attr("class","yLine")
  .call(d3.axisLeft(yScale)
  .tickFormat(d=>d+"%"));

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', d => xScale(d.type))
  .attr('width', d => xScale.bandwidth())
  .attr("y",  d => { return height; })
  .attr("height", 0)
  .style("fill",function(d){
    // console.log(Math.round(d.percentage));
    var col=color_categories(main_data,d.percentage);
    // var col=known_colour_categories(d.category);
    return col;
    // return color[i++]
  })
  .transition()
  .duration(500)
  .delay(function (d, i) {
      return i * 150;
  })
  .attr('y', d => yScale(d.percentage))
  .attr('height', d => height - yScale(d.percentage))

}