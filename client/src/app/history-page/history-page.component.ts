import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {Filter, Order} from "../shared/interfaces";
import {OrdersService} from "../shared/services/order.service";

const STEP = 2;

@Component({
	selector: 'app-history-page',
	templateUrl: './history-page.component.html',
	styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

	@ViewChild('tooltip') tooltipRef: ElementRef
	tooltip: MaterialInstance
	isFilterVisible: boolean = false;
	offset: number = 0;
	limit: number = STEP;
	hSub: Subscription;
	orders: Array<Order> = new Array<Order>();

	loading: boolean = false;
	reloading: boolean = false;
	noMore: boolean = false;

	filter: Filter = {};

	constructor(private ordersService: OrdersService) {
	}

	ngAfterViewInit(): void {
		this.tooltip = MaterialService.initTooltip(this.tooltipRef);
	}

	ngOnDestroy(): void {
		this.tooltip.destroy();

		if (this.hSub) {
			this.hSub.unsubscribe();
		}
	}

	ngOnInit(): void {
		this.reloading = true;
		this.fetch();
	}

	loadMore() {
		this.loading = true;
		this.offset += STEP;

		this.fetch();
	}

	applyFilter(filter: Filter) {
		this.offset = 0;
		this.filter = filter;
		this.reloading = true;
		this.orders = new Array<Order>();

		this.fetch();
	}

	isFiltered(): boolean {
		return Object.keys(this.filter).length > 0;
	}

	filtered() {
		if (this.isFilterVisible && this.isFiltered()) {
			this.applyFilter({});
		}

		this.isFilterVisible = !this.isFilterVisible;
	}

	private fetch() {
		// const params = {
		// 	offset: this.offset,
		// 	limit: this.limit
		// };
		const params = Object.assign({}, this.filter, {
			offset: this.offset,
			limit: this.limit
		});


		this.hSub = this.ordersService.fetch(params).subscribe((result) => {
			this.noMore = result.length < STEP;
			this.orders.push(...result);
			this.loading = false;
			this.reloading = false;
		})
	}
}
