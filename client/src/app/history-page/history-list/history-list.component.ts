import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";
import {Order} from "../../shared/interfaces";

@Component({
	selector: 'app-history-list',
	templateUrl: './history-list.component.html',
	styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {

	@Input() orders: Array<Order>
	@ViewChild('modal') modalRef: ElementRef;
	modal: MaterialInstance;
	order: Order;

	constructor() {
	}

	ngAfterViewInit(): void {
		this.modal = MaterialService.initModal(this.modalRef);
	}

	ngOnDestroy(): void {
		this.modal.close();
	}

	computePrice(order: Order): number {
		return order.list.reduce((total, item) => {
			return total += item.quantity * item.cost;
		}, 0)
	}

	selectOrder(order: Order) {
		this.order = order;
		this.modal.open();
	}

	close() {
		this.order = null;
		this.modal.close();
	}
}
