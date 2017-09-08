module.exports = {
    port: process.env.PORT || 5000,
    files: [ './**/*.{html,htm,css,js}' ],
    server: {
        baseDir: "src",
        routes: {
            "/node_modules": "node_modules"
        }
    }
};