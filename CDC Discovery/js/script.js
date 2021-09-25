navigation_hub("nav_hub_page_main");
localStorage.setItem("Benchmark_choice","Benchmark");
var percent = document.querySelector('.percent');
var progress = document.querySelector('.progress');
var text = document.querySelector('.text');
var count = 2;
var per = 28;
var loading = setInterval(animate,50);

function animate(){
    if(count == 67){
        percent.classList.add(".text-blink");
        text.style.display="block";
        clearInterval(loading);
    }else{
        per = per + 2;
        count = count + 1;
        progress.style.width = per + "px";
        percent.textContent = count + "%";
    }
}




