// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment whichff uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl : "https://localhost:4005",
  commonApiUrl: 'https://test-api.jeeve.com.au/test/v1/common',
  baseApiUrl: 'https://test-api.jeeve.com.au/test',
  apiUrl: 'https://test-api.jeeve.com.au/test/analytics',
  homeUrl: 'http://localhost/jeeveanalytics/client2/',
  solutionsUrl: 'https://api.jeeve.com.au/solutions',
  // apiUrl : "https://api.jeeve.com.au/analytics",
  // homeUrl:"https://staging-analytics.jeeve.com.au/",
  // solutionsUrl : "https://api.jeeve.com.au/staging/solutions",
  stripeKey:
    'pk_test_51IwzWzDUubFKxLHp1i9fEqN0jFQTWPYOslUFJ2k84twcLejkiE4nnyq5HgsHqNlez8pGy9ZvKPR9AjO2vZ1th9JY00Kv8FlSSy',
};
