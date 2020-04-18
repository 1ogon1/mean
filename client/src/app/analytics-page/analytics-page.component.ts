import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Chart} from 'chart.js'
import {AnalyticsPage} from "../shared/interfaces";
import {AnalyticsService} from "../shared/services/analytics.service";

@Component({
	selector: 'app-analytics-page',
	templateUrl: './analytics-page.component.html',
	styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

	@ViewChild('gain') gainRef: ElementRef;
	@ViewChild('order') orderRef: ElementRef;

	average: number;
	pending: boolean = true;
	aSub: Subscription;

	constructor(private service: AnalyticsService) {
	}

	ngOnDestroy(): void {
		if (this.aSub) {
			this.aSub.unsubscribe();
		}
	}

	ngAfterViewInit(): void {
		const gainConfig: any = {
			label: 'Выручка',
			color: 'rgb(255, 99, 132)'
		}
		const orderConfig: any = {
			label: 'Заказы',
			color: 'rgb(54, 165, 255)'
		}

		this.aSub = this.service.getAnalytics().subscribe((response: AnalyticsPage) => {
			this.average = response.average

			gainConfig.labels = response.chart.map(item => item.label);
			gainConfig.data = response.chart.map(item => item.gain);

			const gainContext = this.gainRef.nativeElement.getContext('2d');
			gainContext.canvas.height = '300 px';
			new Chart(gainContext, createChartConfig(gainConfig));

			orderConfig.labels = response.chart.map(item => item.label);
			orderConfig.data = response.chart.map(item => item.order);

			const orderContext = this.orderRef.nativeElement.getContext('2d');
			orderContext.canvas.height = '300 px';
			new Chart(orderContext, createChartConfig(orderConfig));

			this.pending = false;
		})
	}

}

function createChartConfig({labels, data, label, color}) {
	return{
		type: 'line',
		options:{
			responsive: true
		},
		data:{
			labels,
			datasets: [{
				label,
				data,
				borderColor: color,
				steppedLine: false,
				fill: false
			}]
		}
	}
}
