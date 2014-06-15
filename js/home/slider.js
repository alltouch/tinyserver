var slider = $("#slider");
var button_open = $("#open");
var button_close = $("#close");
button_open.click(function(){
    if (!slider.hasClass("open")) {
        slider.animate({"height": "1370px"}, "slow").addClass("open");
    } else {
        slider.animate({"height": "0px"}, "slow").removeClass("open");
    }
});
button_close.click(function(){
    slider.animate({"height": "0px"}, "slow").removeClass("open");
});