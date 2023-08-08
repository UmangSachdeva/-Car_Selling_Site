const jwt = require('jsonwebtoken');

exports.jwtAuth = (req, res, next) => {
    const token = req.headers.authorization;
}