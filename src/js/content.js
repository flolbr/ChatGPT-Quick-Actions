console.log('content.js loaded');

import { VIDEO_SUMMARIZER_URL } from "./consts";

const autoContinueURLs = [
    `${VIDEO_SUMMARIZER_URL}`,
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

    console.log('Clicking continue button');
    continueButton.click();
    continueButton.disabled = true;
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

            const form = document.getElementsByTagName('form')[0];

            // wait for 500ms and then inject the video URL
            setTimeout(() => {


                let button = form.querySelector('button.enabled\\:bg-brand-purple');

                // wait 500ms and then inject the video URL again
                const injectInterval = setInterval(() => {
                    if (promptTextarea.value.trim() !== videoParam) {

                        promptTextarea.value = videoParam;


                    } else {
                        // stop the interval
                        clearInterval(injectInterval);
                        console.log('Stopping injectInterval')

                        promptTextarea.focus();

                        const sendInterval = setInterval(() => {
                            if (button.getAttribute('disabled') === null) {

                                clearInterval(sendInterval);
                                console.log('Stopping sendInterval');

                                console.log('button is enabled, clicking');
                                button.click();
                            } else {
                                promptTextarea.focus()
                                promptTextarea.click();
                            }
                        }, 500);

                    }
                }, 500);
            }, 500);
        }
    });
});

promptTextareaObserver.observe(document.body, { childList: true, subtree: true });
