const config = require('config');

module.exports = {
    mongodb: {
        url: config.MONGODB_URI,
        databaseName: config.MONGODB_DATABASE,
        options: {
            useNewUrlParser: true
        }
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog"
};
