import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OverViewPage} from "../shared/interfaces";
import {AnalyticsService} from "../shared/services/analytics.service";

@Component({
	selector: 'app-overview-page',
	templateUrl: './overview-page.component.html',
	styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

	@ViewChild('tapTarget') tapTargetRef: ElementRef;
	tapTarget: MaterialInstance;
	data$: Observable<OverViewPage>
	yesterday: Date = new Date();

	constructor(private service: AnalyticsService) {
	}

	ngAfterViewInit(): void {
		this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
    }

	ngOnDestroy(): void {
		this.tapTarget.destroy();
    }

	ngOnInit(): void {
		this.data$ = this.service.getOverView();
		this.yesterday.setDate(this.yesterday.getDate() - 1);
	}

	openInfo(){
		this.tapTarget.open();
	}

}
