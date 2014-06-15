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


$('#popup-call form,#slider form').submit(function(e){
    e.preventDefault();

    var errorBlock = $(this).find('.text');
    var submitBtn = $(this).find('input[type=submit]');

    var Calls = Parse.Object.extend("Calls");
    var call = new Calls();
    call.save(
        {
            name: this.name.value,
            phone: this.phone.value
        },
        {
            success: function(object){
                errorBlock.text('Ваша заявка отправлена на обработку. В ближайшее время с вами свяжется наш менеджер.');
                submitBtn.css('display', 'none');
                setTimeout(function(){
                    submitBtn.css('display', 'inline');
                }, 10000);
            },
            error: function(object, error){
                errorBlock.text('Свяжитесь пожалуйста с нами по телефону.')
            }
        }
    );
});