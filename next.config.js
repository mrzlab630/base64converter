require('dotenv').config()
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withReactSvg = require('next-react-svg')





/** @type {import('next').NextConfig} */

const moduleExports =  withPlugins(
    [
      withReactSvg({
        include: path.resolve(__dirname, 'assets/svg'),
        webpack5: true,
        webpack(config) {
          config.resolve.fallback = { fs: false }
          return config
        }
      }),
    ],
    {
      /* global config here ... */
      include: path.resolve(__dirname, 'assets/images'),
      webpack5: true,
      webpack(config) {
        config.resolve.fallback = { fs: false }
        return config
      },
      reactStrictMode: true,
      distDir: 'build',
      env:{
        SECRET_KEY:process.env.SECRET_KEY,
        BASE_URL_DEV:process.env.BASE_URL_DEV,
        BASE_URL_PROD:process.env.BASE_URL_PROD,
        API_URL_DEV_LOCAL:process.env.API_URL_DEV_LOCAL,
        API_URL_DEV:process.env.API_URL_DEV,
        API_URL_PROD:process.env.API_URL_PROD,
        DATABASE_SERVER:process.env.DATABASE_SERVER,
        DATABASE_PORT:process.env.DATABASE_PORT,
        DATABASE_DB:process.env.DATABASE_DB,
        DATABASE_USER:process.env.DATABASE_USER,
        DATABASE_PASSWORD:process.env.DATABASE_PASSWORD,
        DATABASE_URL:process.env.DATABASE_URL,
        DATABASE_URL_WITH_SCHEMA_USERS:process.env.DATABASE_URL_WITH_SCHEMA_USERS,
        DATABASE_URL_WITH_SCHEMA_NOTES:process.env.DATABASE_URL_WITH_SCHEMA_NOTES,
        DATABASE_URL_WITH_SCHEMA_SERVICE:process.env.DATABASE_URL_WITH_SCHEMA_SERVICE,
        DATABASE_URL_WITH_SCHEMA_PAGES:process.env.DATABASE_URL_WITH_SCHEMA_PAGES,
        TLG_BOT_TOKEN:process.env.TLG_BOT_TOKEN,
        TLG_BOT_NAME:process.env.TLG_BOT_NAME,
        TLG_BOT_RECIPIENT_ID:process.env.TLG_BOT_RECIPIENT_ID,
        GOOGLE_ANALYTICS_ID:process.env.GOOGLE_ANALYTICS_ID,
        FACEBOOK_PIXEL_ID:process.env.FACEBOOK_PIXEL_ID
      }
    },
);

module.exports = moduleExports