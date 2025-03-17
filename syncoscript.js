const canvas = document.getElementById('collageCanvas');
const ctx = canvas.getContext('2d');
const imageStackPath = 'imageStack/';
let visualStack = [];
let images = {};
let imagesLoaded = false;

fetch('count_stackula.json')
    .then(response => response.json())
    .then(data => {
        visualStack = data.visual_stack;
        loadImages();
    });

function loadImages() {
    let loadedCount = 0;
    let errorCount = 0;
    const changeGroups = {};

    visualStack.forEach(layer => {
        if (!changeGroups[layer.change_group]) {
            changeGroups[layer.change_group] = [];
        }
        changeGroups[layer.change_group].push(layer);
    });

    for (const groupName in changeGroups) {
        const group = changeGroups[groupName];
        if (group.length === 1) {
            group[0].opacity = 1;
        } else {
            const randomIndex = Math.floor(Math.random() * group.length);
            group.forEach((layer, index) => {
                layer.opacity = (index === randomIndex) ? 1 : 0;
            });
        }
    }

    visualStack.forEach(layer => {
        const img = new Image();
        img.src = imageStackPath + layer.filePath;
        img.onload = () => {
            images[layer.filename] = img;
            loadedCount++;
            if (loadedCount + errorCount === visualStack.length) {
                if (errorCount > 0) {
                    console.error(`Error: ${errorCount} images failed to load.`);
                } else {
                    console.log('All images loaded successfully.');
                }
                initCanvas();
                drawStack();
                imagesLoaded = true;
            }
        };
        img.onerror = () => {
            console.error(`Error loading image: ${layer.filename}`);
            errorCount++;
            loadedCount++;
            if (loadedCount + errorCount === visualStack.length) {
                console.error(`Error: ${errorCount} images failed to load.`);
                initCanvas();
                drawStack();
                imagesLoaded = true;
            }
        };
    });
}

function initCanvas() {
    const baseImage = images[visualStack.find(layer => layer.filename === 'base_image.png').filename];
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
}

function drawStack() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    visualStack.forEach(layer => {
        if (layer.opacity > 0 && images[layer.filename]) {
            ctx.drawImage(images[layer.filename], 0, 0);
        }
    });
    console.log("Canvas Redrawn");
}

function getClickedLayer(x, y) {
    for (let i = visualStack.length - 1; i >= 0; i--) {
        const layer = visualStack[i];
        if (layer.opacity > 0 && images[layer.filename] && layer.clickability) {
            const img = images[layer.filename];
            if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
                const pixelData = ctx.getImageData(x, y, 1, 1).data;
                if (pixelData[3] > 0) {
                    const offscreenCanvas = new OffscreenCanvas(img.width, img.height);
                    const offscreenCtx = offscreenCanvas.getContext('2d');
                    offscreenCtx.drawImage(img, 0, 0);
                    const layerPixelData = offscreenCtx.getImageData(x, y, 1, 1).data;
                    if (layerPixelData[3] > 0) {
                        return layer;
                    }
                }
            }
        }
    }
    return null;
}

canvas.addEventListener('click', (event) => {
    if (!imagesLoaded) {
        console.log("Images not fully loaded. Click event ignored.");
        return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedLayer = getClickedLayer(x, y);

    if (clickedLayer) {
        const group = visualStack.filter(layer => layer.change_group === clickedLayer.change_group);

        console.log(`Clicked layer: ${clickedLayer.filename}, Group: ${clickedLayer.change_group}`);

        if(clickedLayer.clickability){
            let currentIndex = group.findIndex(layer => layer.filename === clickedLayer.filename);
            currentIndex = (currentIndex + 1) % group.length;

            group.forEach(layer => layer.opacity = 0);
            group[currentIndex].opacity = 1;

            drawStack();
        }
    }
});