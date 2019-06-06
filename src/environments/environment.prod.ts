/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
const BASE_ENDPOINT = "http://127.0.0.1:8000/api";
export const environment = {
  defaultLang: 'ar',
  production: true,
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
