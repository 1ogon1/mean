import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../interfaces";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({
	providedIn: "root"
})
export class PositionsService {

	private baseUrl: string = '/api/position/';

	constructor(private http: HttpClient) {
	}

	fetch(categoryId: string): Observable<Array<Position>> {
		return this.http.get<Array<Position>>(this.baseUrl + categoryId);
	}

	created(position: Position): Observable<Position> {
		return this.http.post<Position>(this.baseUrl, position);
	}

	update(position: Position): Observable<Position> {
		return this.http.patch<Position>(this.baseUrl + position._id, position);
	}

	delete(position: Position): Observable<Message> {
		return this.http.delete<Message>(this.baseUrl + position._id);
	}
}
