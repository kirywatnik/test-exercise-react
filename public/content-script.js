
const articles = document.querySelectorAll('.story-text');

const cssUrl = chrome.runtime.getURL('content-script.css');

const block = document.createElement('div');
document.body.prepend(block);
block.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`;
block.classList.add('noblock');

for (const article of articles) {
    const root = document.createElement('div');
    root.style.position = 'relative';
    const shadowRoot = root.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`;

    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = "weather";
    button.classList.add('button-weather')
    shadowRoot.prepend(button);
    article.prepend(root);

    button.addEventListener('click', () => {
        block.classList.add('block');
    })


}


