module.exports = {
    resolve : {
        fallback: {"crypto": require.resolve("crypto-browserify"), 
        "https": require.resolve("https-browserify"), 
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify"), }
    }

}