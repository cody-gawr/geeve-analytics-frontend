import { Component, OnDestroy, OnInit,ViewEncapsulation } from '@angular/core';
import { RewardsService } from './rewards.service';
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RewardsComponent implements OnInit, OnDestroy {	
	constructor(public rewardsService: RewardsService ) { 
		$('#title').html('Rewards');
	}

  ngOnInit() {}

	ngOnDestroy() {
	}  
	lostOpportunityData(){
		/*
		this.isLoading = true;
		this.lostOpportunityService.dentistProduction(this.clinic_id).subscribe( (data:any) => {
		}, error => {
     		alert('Something Went Wrong.');
    });*/
	}

	openLink(link){
		window.open(link,"_blank");
	}
}
