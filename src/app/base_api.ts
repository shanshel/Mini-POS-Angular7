export class BaseAPI {
  private baseURL = 'http://176.9.61.203:5001/api';

  manager(path: string = '/') {
    return `${this.baseURL}/Manager/${path}`;
  }

  siteAdmin(path: string = '/') {
    return `${this.baseURL}/SiteAdmin/${path}`;
  }
}
