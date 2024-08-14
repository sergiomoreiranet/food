function getSettings(req, res, next) {

    res.json({
        email: 'ser-moreira@hotmail.com'
    });
}

module.exports = { getSettings }