/*
    Module import(s)
*/
import * as data from './data';

/*
    Function to create canvas and draw pixel background
*/
function drawPixelBackground(type, style, parent, id) {

    const t0 = performance.now();

    let canvas = document.createElement('canvas');

    canvas.id = `pixel-background-canvas-${id}`;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    parent.appendChild(canvas);
    let context = canvas.getContext('2d');

    let height = canvas.height;
    let width = canvas.width;
    let pixelSize = data.pixelBackground.pixelSize;

    switch (type) {
        case 'button':

            drawButtonRectangles(context, style, height, width, pixelSize);
            break;
        default:

            drawCardRectangles(context, style, height, width, pixelSize);
            break;
    };

    const t1 = performance.now();
    console.log(`${id}: Pixel Background Render: ${t1 - t0} milliseconds`);
};

/*
    Function to update canvas style and type
*/
function updatePixelBackground(type, style, canvas) {

    let context = canvas.getContext('2d');

    let height = canvas.height;
    let width = canvas.width;
    let pixelSize = data.pixelBackground.pixelSize;

    context.clearRect(0, 0, width, height);

    switch (type) {
        case 'button':

            drawButtonRectangles(context, style, height, width, pixelSize);
            break;
        default:

            drawCardRectangles(context, style, height, width, pixelSize);
            break;
    };
};

function drawCardRectangles(context, style, height, width, pixelSize) {

    // Border

    context.fillStyle = `#${data.pixelBackground.styles[style].border}`;

    // Top Side
    context.fillRect(pixelSize * 4, 0, width - (pixelSize * 8), pixelSize);
    // Bottom Side
    context.fillRect(pixelSize * 4, height - pixelSize, width - (pixelSize * 8), pixelSize);
    // Left Side
    context.fillRect(0, pixelSize * 4, pixelSize, height - (pixelSize * 8));
    // Right Side
    context.fillRect(width - pixelSize, pixelSize * 4, pixelSize, height - (pixelSize * 8));
    // Top Left Corner
    context.fillRect(pixelSize * 3, pixelSize, pixelSize, pixelSize);
    context.fillRect(pixelSize * 2, pixelSize * 2, pixelSize, pixelSize);
    context.fillRect(pixelSize, pixelSize * 3, pixelSize, pixelSize);
    // Top Right Corner
    context.fillRect(width - (pixelSize * 4), pixelSize, pixelSize, pixelSize);
    context.fillRect(width - (pixelSize * 3), pixelSize * 2, pixelSize, pixelSize);
    context.fillRect(width - (pixelSize * 2), pixelSize * 3, pixelSize, pixelSize);
    // Bottom Left Corner
    context.fillRect(pixelSize, height - (pixelSize * 4), pixelSize, pixelSize);
    context.fillRect(pixelSize * 2, height - (pixelSize * 3), pixelSize, pixelSize);
    context.fillRect(pixelSize * 3, height - (pixelSize * 2), pixelSize, pixelSize);
    // Bottom Right Corner
    context.fillRect(width - (pixelSize * 2), height - (pixelSize * 4), pixelSize, pixelSize);
    context.fillRect(width - (pixelSize * 3), height - (pixelSize * 3), pixelSize, pixelSize);
    context.fillRect(width - (pixelSize * 4), height - (pixelSize * 2), pixelSize, pixelSize);

    // Outer

    context.fillStyle = `#${data.pixelBackground.styles[style].outer}`;

    // Top Side
    context.fillRect(pixelSize * 4, pixelSize, width - (pixelSize * 8), pixelSize);
    // Bottom Side
    context.fillRect(pixelSize * 4, height - (pixelSize * 2), width - (pixelSize * 8), pixelSize);
    // Left Side
    context.fillRect(pixelSize, pixelSize * 4, pixelSize, height - (pixelSize * 8));
    // Right Side
    context.fillRect(width - (pixelSize * 2), pixelSize * 4, pixelSize, height - (pixelSize * 8));
    // Top Left Corner
    context.fillRect(pixelSize * 3, pixelSize * 2, pixelSize, pixelSize);
    context.fillRect(pixelSize * 2, pixelSize * 3, pixelSize, pixelSize);
    // Top Right Corner
    context.fillRect(width - (pixelSize * 4), pixelSize * 2, pixelSize, pixelSize);
    context.fillRect(width - (pixelSize * 3), pixelSize * 3, pixelSize, pixelSize);
    // Bottom Left Corner
    context.fillRect(pixelSize * 3, height - (pixelSize * 3), pixelSize, pixelSize);
    context.fillRect(pixelSize * 2, height - (pixelSize * 4), pixelSize, pixelSize);
    // Bottom Right Corner
    context.fillRect(width - (pixelSize * 3), height - (pixelSize * 4), pixelSize, pixelSize);
    context.fillRect(width - (pixelSize * 4), height - (pixelSize * 3), pixelSize, pixelSize);

    // Inner

    context.fillStyle = `#${data.pixelBackground.styles[style].inner}`;

    // Top
    context.fillRect(pixelSize * 4, pixelSize * 2, width - (pixelSize * 8), pixelSize);
    context.fillRect(pixelSize * 3, pixelSize * 3, width - (pixelSize * 6), pixelSize);
    // Middle
    context.fillRect(pixelSize * 2, pixelSize * 4, width - (pixelSize * 4), height - (pixelSize * 8));
    // Bottom
    context.fillRect(pixelSize * 4, height - (pixelSize * 3), width - (pixelSize * 8), pixelSize);
    context.fillRect(pixelSize * 3, height - (pixelSize * 4), width - (pixelSize * 6), pixelSize);
};

function drawButtonRectangles(context, style, height, width, pixelSize) {

    // Border

    context.fillStyle = `#${data.pixelBackground.styles[style].border}`;

    // Top Side
    context.fillRect(pixelSize * 2, 0, width - (pixelSize * 4), pixelSize);
    // Bottom Side
    context.fillRect(pixelSize * 2, height - pixelSize, width - (pixelSize * 4), pixelSize);
    // Left Side
    context.fillRect(0, pixelSize * 2, pixelSize, height - (pixelSize * 4));
    // Right Side
    context.fillRect(width - pixelSize, pixelSize * 2, pixelSize, height - (pixelSize * 4));
    // Top Left Corner
    context.fillRect(pixelSize, pixelSize, pixelSize, pixelSize);
    // Top Right Corner
    context.fillRect(width - (pixelSize * 2), pixelSize, pixelSize, pixelSize);
    // Bottom Left Corner
    context.fillRect(pixelSize, height - (pixelSize * 2), pixelSize, pixelSize);
    // Bottom Right Corner
    context.fillRect(width - (pixelSize * 2), height - (pixelSize * 2), pixelSize, pixelSize);

    // Outer

    context.fillStyle = `#${data.pixelBackground.styles[style].outer}`;

    // Top Side
    context.fillRect(pixelSize * 2, pixelSize, width - (pixelSize * 4), pixelSize);
    // Bottom Side
    context.fillRect(pixelSize * 2, height - (pixelSize * 2), width - (pixelSize * 4), pixelSize);
    // Left Side
    context.fillRect(pixelSize, pixelSize * 2, pixelSize, height - (pixelSize * 4));
    // Right Side
    context.fillRect(width - (pixelSize * 2), pixelSize * 2, pixelSize, height - (pixelSize * 4));
    // Top Left Corner
    context.fillRect(pixelSize * 2, pixelSize * 2, pixelSize, pixelSize);
    // Top Right Corner
    context.fillRect(width - (pixelSize * 3), pixelSize * 2, pixelSize, pixelSize);
    // Bottom Left Corner
    context.fillRect(pixelSize * 2, height - (pixelSize * 3), pixelSize, pixelSize);
    // Bottom Right Corner
    context.fillRect(width - (pixelSize * 3), height - (pixelSize * 3), pixelSize, pixelSize);

    // Inner

    context.fillStyle = `#${data.pixelBackground.styles[style].inner}`;

    // Top
    context.fillRect(pixelSize * 3, pixelSize * 2, width - (pixelSize * 6), pixelSize);
    // Middle
    context.fillRect(pixelSize * 2, pixelSize * 3, width - (pixelSize * 4), height - (pixelSize * 6));
    // Bottom
    context.fillRect(pixelSize * 3, height - (pixelSize * 3), width - (pixelSize * 6), pixelSize);
};

/*
    Module export(s)
*/
export {
    drawPixelBackground,
    updatePixelBackground
};

/*const testElement = document.getElementById('pixel-background-test');

drawPixelBackground('card', 'cardPlayer', testElement, '01');

testElement.addEventListener('mouseover', () => {
    updatePixelBackground('card', 'cardPlayerHover', document.getElementById(`pixel-background-canvas-01`));
});

testElement.addEventListener('mouseleave', () => {
    updatePixelBackground('card', 'cardPlayer', document.getElementById(`pixel-background-canvas-01`));
});*/