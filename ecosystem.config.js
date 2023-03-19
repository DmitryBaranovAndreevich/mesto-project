module.exports = {
  deploy: {
    production: {
      ref: 'origin/develop',
      'pre-deploy': `npm i && npm run build && scp -Cr ./dist/* user-admin@51.250.99.58:/home/praktikum/mesto-frontend`,
    },
  },
};
