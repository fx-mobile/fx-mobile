const env = process.env.NODE_ENV

module.exports = env === 'local' || env === 'dev' || env === 'testEnv' || env === 'preproduction' || env === 'production'
