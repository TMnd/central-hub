module.exports = {
    "/assets/shelveProducts": {
        "target": "http://localhost:4201",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/shelveProducts": "/assets" }
    },
    "/assets/mf2": {
        "target": "http://localhost:4202",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/mf2": "/assets" }
    },
    "/assets/mf1": {
        "target": "http://localhost:4203",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/mf1": "/assets" }
    },
    "/shelve/api": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
};


