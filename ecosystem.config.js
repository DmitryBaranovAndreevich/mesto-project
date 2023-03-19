require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/develop',
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/DmitryBaranovAndreevich/mesto-project.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `npm run build && scp -Cr ./dist/* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
    },
  },
};
