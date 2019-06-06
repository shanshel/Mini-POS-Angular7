import { Injectable } from '@angular/core';
import { NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppTokenService {
    private token: NbAuthJWTToken = null;
    constructor(
        private router: Router
    ) {

    }

    getData() {
        return this.token;
    }

    getToken(){
        return (this.token) ? this.token.getValue() : false;
    }

    getPayload() {
        if (this.token) {
            return this.token.getPayload();
        }
        return "";
       
    }

    getRoleForApi() {
        if (this.token.getPayload().FeRole === environment.Role.Operator) {
            return 'Opreator';
        }
        if (this.token.getPayload().FeRole === environment.Role.Accountant) {
            return 'Acountant';
        }
        return this.token.getPayload().FeRole;
    }

    getRole() {
        return this.token.getPayload().FeRole;
    }

    getId(){
        return this.token.getPayload().sub;
    }
    
    setTokenData(token: NbAuthJWTToken) {
        
        this.token = token;
    }

    redirectToLoginPage() {
        this.router.navigateByUrl('/auth/login');
    }

    redirectToHomePage() {

        let role = this.getPayload().FeRole;
        
        console.log("tessst", role);
        if (role === environment.Role.Accountant) {
            this.router.navigate(['/statistics/accountant']);
        }
        else if(role === environment.Role.Admin) {
            this.router.navigate(['/customer']);
        }
        else if(role === environment.Role.Operator) {
            this.router.navigate(['/statistics/operator']);
        }
    }
    setNoToken() {
        this.token = null;
    }



}
