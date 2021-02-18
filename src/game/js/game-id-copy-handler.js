const copyGameIdInputElement = document.getElementById('button-copy-input');
const copyGameIdButtonElement = document.getElementById('button-copy');

copyGameIdButtonElement.addEventListener('click', () => {

    copyGameIdInputElement.select();
    copyGameIdInputElement.setSelectionRange(0, 99999);

    document.execCommand('copy');

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    };
});