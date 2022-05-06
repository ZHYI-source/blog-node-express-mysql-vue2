module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "mg_db",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};
