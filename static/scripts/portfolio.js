(function() {

    const REVEAL_EMAIL_BUTTON_ID = 'reveal-email';
    const EMAIL_CONTAINER_SPAN_ID = 'email-container';
    const SOURCE_ADDRESS = 'YW5kcmV3LmUuY3VtbWluZ0BnbWFpbC5jb20=';

    const createElementConsumerFunction = function(elementId, consumerCallback) {
        return function() {
            var element = document.getElementById(elementId);
            if (!element) {
                return console.error('Could not find element with id: ' + elementId);
            }
            consumerCallback(element);
        }
    };

    const hideRevealEmailButton = createElementConsumerFunction(REVEAL_EMAIL_BUTTON_ID, function(revealEmailButton) {
        revealEmailButton.style.display = 'none';
    });

    const decodeAddress = function() {
        try {
            return atob(SOURCE_ADDRESS);
        } catch (e) {
            console.error('Could not decode email address: ' + JSON.stringify(e));
            return null;
        }
    }

    const revealEmail = createElementConsumerFunction(EMAIL_CONTAINER_SPAN_ID, function(emailContainerSpan) {
        hideRevealEmailButton();

        const decodedAddress = decodeAddress();
        if (!decodedAddress) {
            emailContainerSpan.innerText = 'The email address could not be decoded. '
                + 'Your browser might not support base64 encoding and decoding.'
        } else {
            const link = document.createElement('a');
            link.href = `mailto:${decodedAddress}`;
            link.innerText = decodedAddress;
            emailContainerSpan.appendChild(link);
        }
    });

    window.onload = createElementConsumerFunction(REVEAL_EMAIL_BUTTON_ID, function(revealEmailButton) {
        revealEmailButton.addEventListener('click', revealEmail, true);
    });
    
})();