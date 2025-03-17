const fs = require('fs');
const path = require('path');

const imageStackPath = path.join(process.env.USERPROFILE, 'Documents', 'Collager', 'imageStack');
const countStackulaPath = path.join(process.env.USERPROFILE, 'Documents', 'Collager', 'count_stackula.json');

fs.readdir(imageStackPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error('Error reading imageStack directory:', err);
        return;
    }

    const directories = files
        .filter(file => file.isDirectory())
        .map(dir => dir.name)
        .sort();

    let visualStack = [];

    directories.forEach(groupName => {
        const groupPath = path.join(imageStackPath, groupName);

        fs.readdir(groupPath, (err, imageFiles) => {
            if (err) {
                console.error(`Error reading directory ${groupName}:`, err);
                return;
            }

            const pngFiles = imageFiles.filter(file => path.extname(file).toLowerCase() === '.png');
            const clickability = pngFiles.length > 1; // Set clickability based on group size

            pngFiles.forEach(filename => {
                visualStack.push({
                    filename: filename,
                    change_layer: filename,
                    change_group: groupName,
                    opacity: 0, // Opacity will be set in script.js
                    filePath: path.join(groupName, filename),
                    clickability: clickability, // Add clickability
                });
            });

            if (visualStack.length === directories.reduce((sum, dir) => sum + fs.readdirSync(path.join(imageStackPath, dir)).filter(file => path.extname(file).toLowerCase() === '.png').length, 0)) {
                visualStack.sort((a, b) => {
                    if (a.change_group < b.change_group) return -1;
                    if (a.change_group > b.change_group) return 1;
                    if (a.change_layer < b.change_layer) return -1;
                    if (a.change_layer > b.change_layer) return 1;
                    return 0;
                });

                fs.writeFile(countStackulaPath, JSON.stringify({ visual_stack: visualStack }, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing count_stackula.json:', err);
                    } else {
                        console.log('count_stackula.json generated successfully.');
                    }
                });
            }
        });
    });
});