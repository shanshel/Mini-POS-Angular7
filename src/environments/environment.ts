/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const BASE_ENDPOINT = "http://127.0.0.1:8000/api";
export const environment = {
  defaultLang: 'ar',
  production: false,
  API_BASE: BASE_ENDPOINT,
  EndPoint: {
    ADMIN: BASE_ENDPOINT + '/Admin',
    MANAGER: BASE_ENDPOINT + '/Acountant',
    OPERATOR: BASE_ENDPOINT + '/Opreator',
    AUTH: BASE_ENDPOINT + '/Auth/Token',
    SITEADMIN: '',
  },
  Role: {
    Admin: 'Admin',
    Accountant: 'Accountant',
    Operator: 'Operator',
    Manager: '',
    SiteAdmin: '',
  }

};
