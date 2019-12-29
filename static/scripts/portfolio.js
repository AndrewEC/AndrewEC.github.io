(function(){

    var buttonId = 'reveal-email';
    var spanId = 'email-container';

    var doWithElement = function(id, callback){
        var element = document.getElementById(id);
        if(!element){
            console.error('Could not find element with id: ' + id);
            return;
        }
        callback(element);
    };

    var compose = function(id, callback){
        return function(){
            doWithElement(id, callback);
        }
    };

    var hideButton = compose(buttonId, function(button){
        button.style.display = 'none';
    });

    var revealEmail = compose(spanId, function(span){
        var email = 'YW5kcmV3LmUuY3VtbWluZ0BnbWFpbC5jb20=';
        try{
            email = atob(email);
        }catch(e){
            return console.error('Could not decode email address.');
        }
        span.innerHTML = email;
        hideButton();
    });

    window.onload = compose(buttonId, function(button){
        button.addEventListener('click', revealEmail, true);
    });
    
})();