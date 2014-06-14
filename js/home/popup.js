
var overlay = $(".overlay");
var button_modal = $(".modal");
var popup = $("#popup");
var docHeight = $(document).height();
button_modal.click(function(){
    overlay.fadeIn();
    overlay.height(docHeight);
    popup.fadeIn(300);
    return false;
});
overlay.click(function(){
    $(this).fadeOut();
    popup.fadeOut();
});