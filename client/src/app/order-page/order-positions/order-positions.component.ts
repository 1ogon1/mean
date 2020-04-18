import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Position} from "../../shared/interfaces";
import {PositionsService} from "../../shared/services/positions.service";
import {OrderService} from "../order.service";

@Component({
	selector: 'app-order-positions',
	templateUrl: './order-positions.component.html',
	styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

	positions$: Observable<Array<Position>>

	constructor(private route: ActivatedRoute, private positionsService: PositionsService, private orderService: OrderService) {
	}

	ngOnInit(): void {
		this.positions$ = this.route.params.pipe(
			switchMap((params: Params) => {
				return this.positionsService.fetch(params['id'])
			}),
			map((positions: Array<Position>) => {
				return positions.map(p => {
					p.quantity = 1
					return p;
				});
			}));
	}

	addToOrder(position: Position) {
		this.orderService.add(position);
	}

}
