var button_modal = $("[rel=call]");
var popup = $("#popup-call");
var form = popup.find('form');

button_modal.click(function(){
    popup.fadeIn(300);
    return false;
});
form.click(function(e){
    e.stopPropagation();
});
popup.click(function(){
    popup.fadeOut();
});