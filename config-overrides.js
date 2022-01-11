const path = require('path');

module.exports = {
    paths: (paths, env) => {
        paths.appSrc = path.resolve(__dirname, 'popup_ui/src');
        paths.appPublic = path.resolve(__dirname, 'popup_ui/public');
        paths.appIndexJs = path.resolve(__dirname, 'popup_ui/src/index.js')
        paths.appHtml = path.resolve(__dirname, 'popup_ui/public/index.html');
        return paths;
    },
}