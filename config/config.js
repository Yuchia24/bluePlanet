module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    googleAPIKey: process.env.GOOGLEAPIKEY
  },
  production: {
    use_env_variable: ''
  }
}
