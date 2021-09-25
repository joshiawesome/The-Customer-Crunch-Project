// navigation_hub("nav_hub_page_main");
var json_datas;
var company_name=document.getElementById("Company");
var project_name=document.getElementById("Project_Name");
var date=document.getElementById("Date");

function Start_Up(){
  // console.log(csv_json[0].COMPANY_NAME,csv_json[0].PROJECT_NAME,csv_json[0].DATE_UPLOAD);
  var index=0;
  var C_Name='';
  var C_Name_str="Company Name";
  C_Name_str=C_Name_str.italics();

  var P_Name='';
  var P_Name_str="Project Name";
  P_Name_str=P_Name_str.italics();

  var Day='';
  var Date_str="Date";
  Date_str=Date_str.italics();

  C_Name+=csv_json[0].COMPANY_NAME;
  P_Name+=csv_json[0].PROJECT_NAME;
  Day+=csv_json[0].DATE_UPLOAD;
  console.log(C_Name,P_Name,Day);
  company_name.innerHTML = C_Name_str + ' : ' + C_Name.bold();
  project_name.innerHTML = P_Name_str + ' : ' + P_Name.bold();
  date.innerHTML = Date_str + ' : ' + Day.bold();
}
