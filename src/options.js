// When the form is submitted, save the custom URL.
document.querySelector("#options-form").addEventListener('submit', function(e) {
    e.preventDefault();
    let url = document.querySelector("#custom-url").value;
    browser.storage.sync.set({customUrl: url});
    console.log('customUrl saved:', url);
});

// On page load, restore the saved URL.
document.addEventListener('DOMContentLoaded', function() {
    console.log('options.js loaded');
    browser.storage.sync.get('customUrl', function(data) {
        document.querySelector("#custom-url").value = data.customUrl || '';
    });
});
