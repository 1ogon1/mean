import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../shared/interfaces";
import {CategoriesService} from "../../shared/services/categories-service";

@Component({
	selector: 'app-order-categories',
	templateUrl: './order-categories.component.html',
	styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

	categories$: Observable<Array<Category>>
	constructor(private service: CategoriesService) {
	}

	ngOnInit(): void {
		this.categories$ = this.service.fetch();
	}

}
