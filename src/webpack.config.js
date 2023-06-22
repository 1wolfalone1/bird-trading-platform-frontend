const Dotenv = require('dotenv-webpack');

plugins: [
    // other plugins
    new Dotenv({
      path: './.env', // Path to your .env file
      safe: true, // Load .env.example (if exists) as the default values
      systemvars: true, // Load system environment variables as well
      silent: true, // Hide console output (optional)
    }),
  ]
  