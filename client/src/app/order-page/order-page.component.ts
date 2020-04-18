import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {Order} from "../shared/interfaces";
import {OrdersService} from "../shared/services/order.service";
import {OrderService} from "./order.service";

@Component({
	selector: 'app-order-page',
	templateUrl: './order-page.component.html',
	styleUrls: ['./order-page.component.css'],
	providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

	@ViewChild('modal') modalRef: ElementRef;
	isRoot: boolean = true;
	modal: MaterialInstance;
	oSab: Subscription;

	constructor(private router: Router, public orderService: OrderService, private ordersService: OrdersService) {
	}

	ngAfterViewInit(): void {
		this.modal = MaterialService.initModal(this.modalRef);
	}

	ngOnDestroy(): void {
		this.modal.destroy();

		if (this.oSab){
			this.oSab.unsubscribe();
		}
	}

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isRoot = this.router.url === '/order';
			}
		});

	}

	open(): void {
		this.modal.open();
	}

	cancel(): void {
		this.modal.close();
	}

	submit(): void {
		const order: Order = {
			list: this.orderService.list.map(p => {
				delete p._id;
				return p
			})
		};

		this.oSab = this.ordersService.create(order).subscribe(
			(result) => {
				MaterialService.toaster(`Заказ №${result.order} добавлен`);
			},
			(error) => {
				MaterialService.toaster(error.error.message);
			},
			() => {
				this.modal.close();
			}
		)
	}
}
