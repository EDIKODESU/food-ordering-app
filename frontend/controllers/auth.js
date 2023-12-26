const path = require('path');

const register = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/registration.html'));
}

module.exports = {register};