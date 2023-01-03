import { Component, OnDestroy, OnInit,ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
	title = 'Rewards & Exclusive Partner Offers | Jeeve Analytics';	
	public isLoading:boolean =  true;
	public rewards:any =  [];
	public rewardsCode:any = "";
	constructor(private titleService:Title,public rewardsService: RewardsService,private _cookieService: CookieService, private router: Router) { 
		$('#title').html('Rewards');
		this.dentistProduction();
	}

  ngOnInit() {
	this.titleService.setTitle(this.title);
  }

	ngOnDestroy() {
		this.titleService.setTitle("Jeeve Analytics");
	}  
	dentistProduction(){
		
		this.isLoading = true;
		this.rewardsService.dentistProduction().subscribe( (data:any) => {
			if(data.body.message == 'success'){
				this.rewards = data.data;
				this.rewardsCode = data.code
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
