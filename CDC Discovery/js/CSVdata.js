var csv_json;
d3.csv("./data/CSV_data.csv",function(error,data){
 csv_json=data;
 Start_Up();
});

