$(function(){
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