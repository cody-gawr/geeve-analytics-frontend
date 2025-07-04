export const environment = {
  production: false,
  development: false,
  pilot: true,
  staging: false,
  test: false,
  commonApiUrl: 'https://pilot-api.jeeve.com.au/pilot/v1/common',
  baseApiUrl: 'https://pilot-api.jeeve.com.au/pilot',
  apiUrl: 'https://pilot-api.jeeve.com.au/pilot/analytics',
  apiNodeUrl: 'https://pilot-api.jeeve.com.au/pilot/node/analytics',
  homeUrl: 'https://pilot-analytics.jeeve.com.au/',
  solutionsUrl: 'https://pilot-api.jeeve.com.au/pilot/solutions',
  stripeKey:
    'pk_live_51IwzWzDUubFKxLHp2MqYQ5j2CjhYBJ0wjhtllafbqMot3JctJ4dD6VWA1FUsDl2AIl8ELT1za1YBtTNSIo0otf6a007W0C05yH',
  payUrl: 'https://pilot-pay.jeeve.com.au',
  featureFlags: {
    'jeeve-voice': false,
    'conversion-tracker': false,
    'practice-insights': false,
  },
};
