// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of whifch enretv maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

 // apiUrl :"http://localhost/jeevemembers/server/staging/members",
 // homeUrl:"http://localhost/jeevemembers/server/staging/members/",
//  // solutionsUrl : "http://localhost/jeevesolutions/server/staging/solutions",
 solutionsUrl : "https://api.jeeve.com.au/staging/solutions",
apiUrl :"https://api.jeeve.com.au/staging/members",
homeUrl:"https://staging-members.jeeve.com.au",
  // apiUrl : "http://localhost:4001/staging/members",
  // homeUrl:"http://localhost/jeevemembers/client2/src/",
  // solutionsUrl : "http://localhost/jeevesolutions/server/staging/solutions",

};

