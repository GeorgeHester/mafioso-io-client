/*
    Module import(s)
*/
import * as pixelBackgroundDrawer from './pixel-background-drawer';

function drawAllPixelBackground(items) {

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

var items = document.getElementsByClassName('pixel-background');
drawAllPixelBackground(items);

window.addEventListener('resize', () => {

    items = document.getElementsByClassName('pixel-background');
    drawAllPixelBackground(items);
});