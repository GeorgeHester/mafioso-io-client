/*
    Module import(s)
*/
import * as data from './data';
import * as pixelBackgroundDrawer from './pixel-background-drawer';

function drawItemPixelBackground(items) {

    for (let i = 0; i < items.length; i++) {

        let item = items[i];

        item.innerHTML = '';

        pixelBackgroundDrawer.drawPixelBackground(item.getAttribute('pbtype'), item.getAttribute('pbstyle'), item, item.getAttribute('pbid'));

        if (item.hasAttribute('pbhoverstyle')) {

            item.addEventListener('mouseover', () => {

                pixelBackgroundDrawer.updatePixelBackground(item.getAttribute('pbtype'), item.getAttribute('pbhoverstyle'), document.getElementById(`pixel-background-canvas-${item.getAttribute('pbid')}`));
            });

            item.addEventListener('mouseleave', () => {

                pixelBackgroundDrawer.updatePixelBackground(item.getAttribute('pbtype'), item.getAttribute('pbstyle'), document.getElementById(`pixel-background-canvas-${item.getAttribute('pbid')}`));
            });
        };
    };
};

function drawPagePixelBackground(pageId) {

    let page = document.getElementById(pageId);

    let items = page.getElementsByClassName('pixel-background');
    data.pixelBackground.itemsRendering = items;

    drawItemPixelBackground(items);
};

window.addEventListener('resize', () => {

    drawItemPixelBackground(data.pixelBackground.itemsRendering);
});

/*
    Module export(s)
*/
export {
    drawPagePixelBackground
};