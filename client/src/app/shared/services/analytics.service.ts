import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AnalyticsPage, OverViewPage} from "../interfaces";

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {
	private baseUrl: string = '/api/analytics/'

	constructor(private http: HttpClient) {
	}

	getOverView(): Observable<OverViewPage> {
		return this.http.get<OverViewPage>(this.baseUrl + 'overview')
	}

	getAnalytics(): Observable<AnalyticsPage> {
		return this.http.get<AnalyticsPage>(this.baseUrl + 'analytics');
	}
}
