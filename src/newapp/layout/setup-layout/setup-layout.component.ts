import { AuthFacade } from "@/newapp/auth/facades/auth.facade";
import { Component } from "@angular/core";


@Component({
    selector: 'app-setup-layout',
    templateUrl: './setup-layout.component.html',
    styleUrls: ['./setup-layout.component.scss']
})
export class SetupLayoutComponent {
    constructor(private authFacade: AuthFacade){
    }

    get isLoading$() {
        return this.authFacade.isLoading$;
    }

    logout = () => {
        this.authFacade.logout();
    };
}