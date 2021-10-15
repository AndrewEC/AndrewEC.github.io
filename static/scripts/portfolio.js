(function() {

    var revealEmailButtonId = 'reveal-email';
    var emailContainerSpanId = 'email-container';
    var encodedEmailAddress = 'YW5kcmV3LmUuY3VtbWluZ0BnbWFpbC5jb20=';

    var createElementConsumerFunction = function(elementId, consumerCallback) {
        return function() {
            var element = document.getElementById(elementId);
            if (!element) {
                return console.error('Could not find element with id: ' + elementId);
            }
            consumerCallback(element);
        }
    };

    var hideRevealEmailButton = createElementConsumerFunction(revealEmailButtonId, function(revealEmailButton) {
        revealEmailButton.style.display = 'none';
    });

    var decodeEmailAddress = function() {
        try {
            return atob(encodedEmailAddress);
        } catch (e) {
            console.error('Could not decode email address: ' + JSON.stringify(e));
            return 'Cannot base64 decode the email address. Your browser might not supporrt base64 encoding and decoding.';
        }
    }

    var revealEmail = createElementConsumerFunction(emailContainerSpanId, function(emailContainerSpan) {
        hideRevealEmailButton();
        emailContainerSpan.innerHTML = decodeEmailAddress();
    });

    window.onload = createElementConsumerFunction(revealEmailButtonId, function(revealEmailButton) {
        revealEmailButton.addEventListener('click', revealEmail, true);
    });
    
})();