module.exports = {
  options: {
    origin: '*',
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204 || 200,
  },
};
