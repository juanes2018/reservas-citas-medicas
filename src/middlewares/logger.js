const LoggerMiddleware = (req, res, next) => {

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp} ] ${req.method} ${req.url} - IP: ${req.ip}`);

    const star = Date.now();

    res.on('finish', () => {    
        const duration = Date.now() - star;
        console.log(`[${timestamp} ] Response: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = LoggerMiddleware;