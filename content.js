console.log('content.js loaded');

const VIDEO_SUMMERIZER_URL = 'https://chat.openai.com/share/ea0b7446-42eb-4a4e-88e2-de75f5a1eefc';

const autoContinueURLs = [
    `${VIDEO_SUMMERIZER_URL}`,
];

const promptInjectURLs = [
    `${VIDEO_SUMMERIZER_URL}/continue`,
];

let videoParam = '';

if (autoContinueURLs.includes(window.location.origin + window.location.pathname)) {
    console.log('autoContinueURLs matched');
    // print the 'video' query parameter is it exists
    const urlParams = new URLSearchParams(window.location.search);
    videoParam = urlParams.get('video');
    if (videoParam) {
        console.log('videoParam:', videoParam);
    }
    const continueButton = document.querySelector('a[as="link"]');

    if (!continueButton) {
        console.error('Could not find continue button');
    }

    // add the video query parameter to the continue button
    const newURL = new URL(continueButton.href);
    newURL.searchParams.set('video', encodeURIComponent(videoParam));
    // Add to the "to" attribute as well
    continueButton.setAttribute('to', newURL.toString());
    continueButton.setAttribute('href', newURL.toString());

    continueButton.click();
}


/* Detect the appearance of the id="prompt-textarea" element and inject the video URL into it */
let found = false;
const promptTextareaObserver = new MutationObserver((mutations) => {
    if (found) {
        promptTextareaObserver.disconnect();
        return;
    }
    mutations.forEach((mutation) => {
        let promptTextarea = document.getElementById('prompt-textarea');
        if (promptTextarea && !found) {
            found = true;
            console.log(`prompt-textarea detected, injecting video URL (${videoParam})`);
            console.log(promptTextarea);
            promptTextareaObserver.disconnect();

            // wait for 1 second and then inject the video URL
            setTimeout(() => {


                // wait 100ms and then inject the video URL again
                const injectInterval = setInterval(() => {
                    if (promptTextarea.value === '') {

                        promptTextarea.value = videoParam;

                        let button = document.querySelector('button.enabled\\:bg-brand-purple');

                        promptTextarea.click();

                        const anInterval = setInterval(() => {
                            if (button.getAttribute('disabled') === null) {

                                clearInterval(anInterval);
                                button.click();
                            }
                        }, 100);

                    } else {
                        console.log('promptTextarea.value is not empty, not injecting video URL');
                        console.log(promptTextarea.value);
                        // stop the interval
                        clearInterval(injectInterval);
                    }
                }, 1000);
            }, 2000);
        }
    });
});

promptTextareaObserver.observe(document.body, { childList: true, subtree: true });