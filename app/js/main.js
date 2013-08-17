$(document).ready(function(){
    //main window open
    var slider = $(".slider");
    var button_open = $("#open");
    var button_close = $("#close");
    button_open.click(function(){
        if (!slider.hasClass("open")) {
            slider.animate({"height": "1270px"}, "slow").addClass("open");
        } else {
            slider.animate({"height": "0px"}, "slow").removeClass("open");
        }
    });
    button_close.click(function(){
        slider.animate({"height": "0px"}, "slow").removeClass("open");
    });
    //modal window
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
    //placeholder

    $("input[placeholder]").placeholder();

    var errorBlock = $('#popup .error');
    $('#popup form').submit(function(){

        if(this.name.value.length < 3){
            errorBlock.text('Заполните пожалуйста поле Имя');
            return false;
        }

        if(this.phone.value.length < 8){
            errorBlock.text('Заполните пожалуйста поле Телефон');
            return false;
        }

        errorBlock.text('');
        var data = $(this).serialize();
        $.post($(this).attr('action'), data, function(data){
            if(data.status == 'OK'){
                errorBlock.text('Ваша заявка отправлена на обработку.')
                $('#popup .submit').css('display', 'none');
                setTimeout(function(){
                    $('#popup .submit').css('display', 'inline');
                }, 10000);
            } else {
                errorBlock.text('Свяжитесь пожалуйста с нами по телефону.')
            }
        }, "json");

        return false;
    });
});