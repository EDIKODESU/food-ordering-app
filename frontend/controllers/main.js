const path = require('path');

const getMenu = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/menu.html'));
}

module.exports = {getMenu};