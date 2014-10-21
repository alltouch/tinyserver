(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("call", function(exports, require, module) {
/*$(function(){
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
});        */


$('#popup-call form,#slider form').submit(function(e){
    e.preventDefault();

    if(this.name.value.length < 3){
        alert('Заполните пожалуйста поле Имя');
        return false;
    }

    if(this.phone.value.length < 8){
        alert('Заполните пожалуйста поле Телефон');
        return false;
    }

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
});

;require.register("home/popup", function(exports, require, module) {
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
});

;require.register("home/slider", function(exports, require, module) {
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
});

;require.register("initialize", function(exports, require, module) {
Parse.initialize("mmoxo7fS0y2eZpwL0aKBQyWGYR1jGL7V3d7fDqfN", "z6yMGl5T5eMWmMtEtcX6dY1Kj6hBresgKBO0el5u");
});

;