function responsivefy(svg) {
  const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;

  svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

  d3.select(window).on('resize.' + container.attr('id'), resize);

  function resize() {
      const targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
  }
}

function line_annotation(svg,data,y1,y2,x1,xScale,yScale,text,text_size){

  function line_annotation(svg,data,y1,y2,x1,xScale,yScale,text,text_size){

    // console.log(x1,y1,y2,xScale,yScale);
    
    svg
    .append("line")
    .style("stroke","grey")
    .style("stroke-dasharray",("3,3"))
    .attr('x1',xScale(x1))
    .attr('y1',yScale(y1))
    .attr('x2',xScale(x1))
    .attr('y2',yScale(y2))
    
    svg.append("g")
    .append("text")
    .style("font-size",text_size)
    .attr('x',xScale(x1)+3)
    .attr('y',function(d){
      return (yScale(y1)+ yScale(y2))/2;
    })
    .text(text)
    
  }         
}

function line_annotation2(svg,data,y1,y2,x1,xScale,yScale,text,text_size,title,flag){

  // console.log(x1,y1,y2,xScale,yScale);
  if(flag==1){
    svg
    .append("line")
    .style("stroke","grey")
    .style("stroke-dasharray",("3,3"))
    .attr('x1',xScale(x1)-10)
    .attr('y1',yScale(y1))
    .attr('x2',xScale(x1)-10)
    .attr('y2',yScale(y2))
    
    svg
    .append("line")
    .style("stroke","grey")
    .style("stroke-dasharray",("3,3"))
    .attr('x1',xScale(x1)-10)
    .attr('y1',yScale(y1))
    .attr('x2',xScale(x1)-20)
    .attr('y2',yScale(y1))

    svg
    .append("line")
    .style("stroke","grey")
    .style("stroke-dasharray",("3,3"))
    .attr('x1',xScale(x1)-10)
    .attr('y1',yScale(y2))
    .attr('x2',xScale(x1)-20)
    .attr('y2',yScale(y2))

    svg
    .append("line")
    .style("stroke","grey")
    .style("stroke-dasharray",("3,3"))
    .attr('x1',xScale(x1)-10)
    .attr('y1',(yScale(y2)+yScale(y1))/2)
    .attr('x2',xScale(x1))
    .attr('y2',(yScale(y2)+yScale(y1))/2)
  }

  svg.append("g")
  .append("text")
  .style("font-size","9px")
  .attr('x',xScale(x1))
  .attr('y',function(d){
    return (yScale(y1)+ yScale(y2))/2-45;
  })
  .style("fill","black")
  .text(title)

  svg.append("g")
  .append("text")
  .style("font-size","12px")
  // .attr('x',xScale(x1))
  .attr('x',function(d){
    if(flag==1){
      return xScale(x1)+23;
    }
    if(flag==2){
      return xScale(x1)+23;
    }
    if(flag==3){
      return xScale(x1)+30;
    }
  })
  .attr('y',function(d){
    if(flag==1){
      return ((yScale(y1)+ yScale(y2))/2)+5 ;
    }
    if(flag==2||flag==3){
      return ((yScale(y1)+ yScale(y2))/2)+5;
    }
  })
  .style("fill",function(d){
   
    return get_color_from_score(Number(text.replace("%","")));
  })
  .text(text)

  svg.append('rect')
  .attr('x',xScale(x1) )
  .attr('y',function(d){
    return (yScale(y1)+ yScale(y2))/2-40;
  })
  .attr("height",80)
  .attr("width",80)
  .attr("fill","gray")
  .style("opacity","0.2")
          
          
}