import { Component, OnDestroy, OnInit,ViewEncapsulation } from '@angular/core';
import { RewardsService } from './rewards.service';
import { CookieService } from "ngx-cookie";
import {  Router } from "@angular/router";
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RewardsComponent implements OnInit, OnDestroy {	
	public isLoading:boolean =  true;
	public rewards:any =  [];
	constructor(public rewardsService: RewardsService,private _cookieService: CookieService, private router: Router) { 
		$('#title').html('Rewards');
		this.dentistProduction();
	}

  ngOnInit() {}

	ngOnDestroy() {
	}  
	dentistProduction(){
		
		this.isLoading = true;
		this.rewardsService.dentistProduction().subscribe( (data:any) => {
			if(data.message == 'success'){
				this.rewards = data.data;
			}
		}, error => {
      this._cookieService.removeAll();
       this.router.navigateByUrl("/login");
    });
	}

	openLink(link){
		window.open(link,"_blank");
	}
}
