import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Order} from "../interfaces";

@Injectable({
	providedIn: "root"
})
export class OrdersService {
	private baseUrl: string = '/api/order/'

	constructor(private http: HttpClient) {
	}

	create(order: Order): Observable<Order> {
		return this.http.post<Order>(this.baseUrl, order);
	}

	fetch(params: any = {}): Observable<Array<Order>> {
		return this.http.get<Array<Order>>(this.baseUrl, {
			params: new HttpParams({
				fromObject: params
			})
		});
	}
}
