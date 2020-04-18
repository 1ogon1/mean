import {Injectable} from "@angular/core";
import {MaterialService} from "../shared/classes/material.service";
import {OrderPosition, Position} from "../shared/interfaces";

@Injectable()
export class OrderService {

	public list: Array<OrderPosition> = new Array<OrderPosition>();
	public price: number = 0;

	add(position: Position): void {
		const index = this.list.findIndex(p => p._id == position._id);

		if (index > -1) {
			this.list[index].quantity += position.quantity;
		} else {
			const orderPosition: OrderPosition = Object.assign({}, {
				name: position.name,
				cost: position.cost,
				quantity: position.quantity,
				_id: position._id
			});
			this.list.push(orderPosition)
		}
		MaterialService.toaster(`Добавлено x${position.quantity}`)

		this.computePrice();
	}

	remove(position: OrderPosition): void {
		const index = this.list.findIndex(p => p._id === position._id);

		if (index > -1){
			this.list.splice(index, 1);

			this.computePrice();
		}
	}

	clear(): void {

	}

	private computePrice(): void {
		// this.price = 0;
		//
		// this.list.forEach((item) => {
		// 	this.price += (item.cost * item.quantity);
		// })
		this.price = this.list.reduce((total, item) => {
			return total += item.quantity * item.cost;
		}, 0);
	}
}
