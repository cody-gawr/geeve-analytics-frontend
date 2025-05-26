export const environment = {
  production: true,
  development: false,
  pilot: false,
  staging: false,
  test: false,
  commonApiUrl: 'https://api.jeeve.com.au/v1/common',
  baseApiUrl: 'https://api.jeeve.com.au',
  // apiUrl : "http://localhost/jeeveanalytics/server/",
  // homeUrl:"http://localhost/jeeveanalytics/client2/"
  apiUrl: 'https://api.jeeve.com.au/analytics',
  apiNodeUrl: 'https://api.jeeve.com.au/node/analytics',
  homeUrl: 'https://analytics.jeeve.com.au/',
  solutionsUrl: 'https://api.jeeve.com.au/solutions',
  stripeKey:
    'pk_live_51IwzWzDUubFKxLHp2MqYQ5j2CjhYBJ0wjhtllafbqMot3JctJ4dD6VWA1FUsDl2AIl8ELT1za1YBtTNSIo0otf6a007W0C05yH',
  payUrl: 'https://pay.jeeve.com.au',
  featureFlags: {
    'jeeve-voice': false,
    'conversion-tracker': false,
    'practice-insights': false,
  },
};
