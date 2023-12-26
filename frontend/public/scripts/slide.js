let next_btn = document.querySelector(".right_slide");
let back_btn = document.querySelector(".left_slide");
let image = document.querySelectorAll(".image_slider");
let slider_line = document.querySelector(".image_slide_line");
let box_slider = document.querySelector(".slider");
let dots = document.querySelectorAll(".slider_radio");

let count = 0;
let width_slide = null;
showDot();

setInterval(() =>
{
    count++;
    locationSlide();
}, 5000);

function init()
{
    width_slide = box_slider.offsetWidth;
    slider_line.style.width = width_slide * image.length + "px";
    image.forEach(element => {
        element.style.width = width_slide + "px";
        element.style.height = "auto";
    });
    moveSlider();
}

window.addEventListener("resize", init);
init();
clickDot();

next_btn.addEventListener("click", function(){
    count++;
    locationSlide();
})

back_btn.addEventListener("click", function(){
    count--;
    locationSlide();
})

function moveSlider()
{
    slider_line.style.transform = "translate(-" + count * width_slide + "px)";
}

function showDot()
{
    for(let i = 0; i < dots.length; i++) 
    {
        dots[i].classList.remove("active");
    }
    dots[count].classList.add("active");
}

function clickDot()
{
    for(let i = 0; i < dots.length; i++) 
    {
        dots[i].addEventListener("click", () =>
        {
            count = i;
            locationSlide();
        });
    }
}

function locationSlide()
{
    if(count >= image.length) count = 0;
    if(count < 0) count = image.length - 1;
    moveSlider();
    showDot();
}