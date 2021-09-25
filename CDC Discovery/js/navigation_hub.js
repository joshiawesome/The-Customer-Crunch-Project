/*------------------------------------NAVIGATION HUB FUNCTION - STARTS HERE----------------------------------------------------------------*/
function navigation_hub(id_name){

  // heading for navigation hub
  var heading=document.createElement("p");
  heading.setAttribute("class","navigation");
  heading.style.position="absolute";
  heading.innerText="NAVIGATION HUB";

  document.getElementById(id_name).appendChild(heading);

  //appending the hub
  var nav_hub=document.createElement("img");
  nav_hub.setAttribute("src","./assets/NAVIGATION HUB.png");
  nav_hub.setAttribute("width","230");
  nav_hub.setAttribute("height","auto");
  nav_hub.setAttribute("alt"," ");
  nav_hub.setAttribute("usemap","#nav_map");
  nav_hub.style.position="relative";
  document.getElementById(id_name).appendChild(nav_hub);

  var nav_map=document.createElement("map");
  nav_map.setAttribute("name","nav_map");

  for(var i=1;i<=6;i++){
    var nav_area=document.createElement("area");
    nav_area.setAttribute("shape","rect");
    nav_area.setAttribute("alt","cdc");
    if(i==1){nav_area.setAttribute("coords","138,85,100,29"); nav_area.setAttribute("href","HomePage.html");}
    if(i==2){nav_area.setAttribute("coords","117,120,59,83"); nav_area.setAttribute("href","CustomerDataCulture.html");}
    if(i==3){nav_area.setAttribute("coords","200,119,145,54"); nav_area.setAttribute("href","ResultDistribution.html");}
    if(i==4){nav_area.setAttribute("coords","74,202,19,126"); nav_area.setAttribute("href","DiscoveryInterrelationships.html");}
    if(i==5){nav_area.setAttribute("coords","158,202,103,126"); nav_area.setAttribute("href","https://customercrunch.com/");}
    if(i==6){nav_area.setAttribute("coords","240,202,185,126"); nav_area.setAttribute("href","DiscoveryRecommendations.html");}
    nav_map.appendChild(nav_area);
  }

  document.getElementById(id_name).appendChild(nav_map); 
}
/*-------------------------------------NAVIGATION HUB FUNCTION - ENDS HERE-------------------------------------------------------------*/