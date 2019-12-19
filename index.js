const path = require('path');
const { exec } = require('child_process');

exports.activate = async context => {

    context.subscriptions.push(commands.registerCommand('github.openLink', async () => {

        const currDir = path.dirname(__filename);
        const isGitFolder = isGitFolder(currDir);

        if (isGitFolder) {

            let res;

            exec('git remote -v', (error, stdout) => {
                res = stdout;
                const reg = new RegExp('([https://|http://])*([www.])*\w+\.\w+\D+');
                const url = reg.exec(res);
                console.log(url);
            });

        }

    }));

}


function isGitFolder(location) {

    if (location === '/') {
        return false;
    }

    fs.readdir(location, files => {

        if (!files.includes('.git')) {
            const parent = location.slice(0, location.lastIndexOf('/'));
            isGitFolder(parent)
        } else {
            return true;
        }

    });

}
