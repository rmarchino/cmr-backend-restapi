const errorHandler = (err, req, res, next) => {
    const { status } = err;

    return res.status(status || 500).json({
        errorName: err.name,
        message: err.message
    });
};

module.exports = errorHandler;