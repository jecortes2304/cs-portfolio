const fs = require('fs');
const path = require('path');

const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects-images');
const outputPath = path.join(process.cwd(), 'src', 'data', 'projectImages.json');

const projectImages = {};

function getProjectImages() {
    fs.readdirSync(projectsDir).forEach((projectName) => {
        const projectDir = path.join(projectsDir, projectName);
        if (fs.statSync(projectDir).isDirectory()) {
            projectImages[projectName] = fs.readdirSync(projectDir).map(fileName => {
                return path.join('/images', 'projects-images', projectName, fileName).replace(/\\/g, '/');
            });
        }
    });

    fs.writeFileSync(outputPath, JSON.stringify(projectImages, null, 2));
    console.log(`Project images information has been written to ${outputPath}`);
}

getProjectImages();