const { constants } = require("../constants");
const errorHandler = (err, res, req, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.Validation_Error:
            res.json({
                title: "Validation error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.Unauthorised_Error:
            res.json({
                title: "Unauthorised error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.Forbidden:
            res.json({
                title: "forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.Server_Error:
            res.json({
                title: "server error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NotFound:
            res.json({
                title: "not found",
                message: err.message,
                stackTrace: err.stack,
            });
        default:
            console.log("all good!");
            break;
    }
};
module.exports = errorHandler