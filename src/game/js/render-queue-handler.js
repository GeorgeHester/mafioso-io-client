/*
    Module import(s)
*/
import * as data from './data';
import * as pixelBackgroundDrawer from './pixel-background-drawer';
import * as uuidGenerator from './uuid-generator';

function pageUpdated() {

    data.renderQueue = {};

    if (data.pageHandler.currentPage.id != '') {

        let itemsToAdd = document.getElementById(data.pageHandler.currentPage.id).getElementsByClassName('pixel-background');

        for (let i = 0; i < itemsToAdd.length; i++) {
            let id = '';
            if (!itemsToAdd[i].hasAttribute('pbgeneratedby')) { continue };
            if (itemsToAdd[i].getAttribute('pbgeneratedby') != 'html') { continue };
            if (!itemsToAdd[i].hasAttribute('pbid')) {
                id = uuidGenerator.generateUuid();
            } else {
                id = itemsToAdd[i].getAttribute('pbid');
            };

            data.renderQueue[id] = {
                id: id,
                parent: itemsToAdd[i],
                type: itemsToAdd[i].hasAttribute('pbtype') ? itemsToAdd[i].getAttribute('pbtype') : null,
                style: itemsToAdd[i].hasAttribute('pbstyle') ? itemsToAdd[i].getAttribute('pbstyle') : null,
                hoverStyle: itemsToAdd[i].hasAttribute('pbhoverstyle') ? itemsToAdd[i].getAttribute('pbhoverstyle') : null,
                focusStyle: itemsToAdd[i].hasAttribute('pbfocusstyle') ? itemsToAdd[i].getAttribute('pbfocusstyle') : null,
                focusElementId: itemsToAdd[i].hasAttribute('pbfocusid') ? itemsToAdd[i].getAttribute('pbfocusid') : null
            };
        };
    };

    renderRenderQueue(window.innerWidth, window.innerHeight);
};

function renderRenderQueue(width, height) {

    if (data.mode == 'debug') {
        //console.groupCollapsed('Rendering Queue');
        //console.log(`Rendering Queue ${width} ${height}`);

        console.warn(`Queue Length: ${Object.keys(data.renderQueue).length}`);

        /*let renderQueueTable = {};

        for (let i = 0; i < Object.keys(data.renderQueue).length; i++) {
            renderQueueTable[Object.keys(data.renderQueue)[i]] = {
                element: data.renderQueue[Object.keys(data.renderQueue)[i]].parent
            };
        };

        console.table(renderQueueTable);*/
    };

    for (let i = 0; i < Object.keys(data.renderQueue).length; i++) {

        if (width != window.innerWidth || height != window.innerHeight) {

            if (data.mode == 'debug') {

                console.warn('Rendering Cancelled');
                //console.groupEnd();
            };

            return;
        };

        let queueItem = data.renderQueue[Object.keys(data.renderQueue)[i]];

        queueItem.parent.innerHTML = '';

        pixelBackgroundDrawer.drawPixelBackground(queueItem.type, queueItem.style, queueItem.parent, queueItem.id);

        if (queueItem.hoverStyle != null) {

            let queueItemHover;

            if (queueItem.hoverElementId) {
                queueItemHover = document.getElementById(queueItem.hoverElementId);
            } else {
                queueItemHover = queueItem.parent;
            };

            queueItemHover.addEventListener('mouseover', () => {
                pixelBackgroundDrawer.updatePixelBackground(queueItem.type, queueItem.hoverStyle, document.getElementById(`pixel-background-canvas-${queueItem.id}`));
            });

            queueItemHover.addEventListener('mouseleave', () => {
                pixelBackgroundDrawer.updatePixelBackground(queueItem.type, queueItem.style, document.getElementById(`pixel-background-canvas-${queueItem.id}`));
            });
        };

        if (queueItem.focusStyle != null) {

            let queueItemFocus = document.getElementById(queueItem.focusElementId);

            queueItemFocus.addEventListener('focusin', () => {
                pixelBackgroundDrawer.updatePixelBackground(queueItem.type, queueItem.focusStyle, document.getElementById(`pixel-background-canvas-${queueItem.id}`));
            });

            queueItemFocus.addEventListener('focusout', () => {
                pixelBackgroundDrawer.updatePixelBackground(queueItem.type, queueItem.style, document.getElementById(`pixel-background-canvas-${queueItem.id}`));
            });
        };
    };

    if (data.mode == 'debug') {

        //console.groupEnd();
    };
};

window.addEventListener('resize', () => {

    renderRenderQueue(window.innerWidth, window.innerHeight);
});

/*
    Module export(s)
*/
export {
    pageUpdated,
    renderRenderQueue
};