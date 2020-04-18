import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";
import {CategoriesService} from "../shared/services/categories-service";

@Component({
	selector: 'app-categories-page',
	templateUrl: './categories-page.component.html',
	styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

	categories$: Observable<Array<Category>>;

	constructor(private categoryService: CategoriesService) {
	}

	ngOnInit(): void {
		this.categories$ = this.categoryService.fetch();
	}

}
