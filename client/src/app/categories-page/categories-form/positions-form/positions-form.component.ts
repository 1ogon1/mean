import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";
import {Position} from "../../../shared/interfaces";
import {PositionsService} from "../../../shared/services/positions.service";

@Component({
	selector: 'app-positions-form',
	templateUrl: './positions-form.component.html',
	styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input('categoryID') categoryID: string;
	@ViewChild('modal') modalRef: ElementRef;

	form: FormGroup;
	_id: string = null;
	modal: MaterialInstance;
	loading: boolean = false;
	positions: Array<Position> = new Array<Position>();

	constructor(private service: PositionsService) {
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(null, Validators.required),
			cost: new FormControl(1, [Validators.required, Validators.min(1)])
		});

		this.loading = true;
		this.service.fetch(this.categoryID).subscribe((positions: Array<Position>) => {
			this.positions = positions;
			this.loading = false;
		})
	}

	ngOnDestroy(): void {
		this.modal.destroy();
	}

	ngAfterViewInit(): void {
		this.modal = MaterialService.initModal(this.modalRef);
	}

	onAddPosition() {
		this._id = null;
		this.form.reset({
			name: '',
			cost: 1
		});
		this.modal.open();
		MaterialService.updateTextInputs();
	}

	onClose() {
		this.modal.close();
	}

	onSelectedPosition(position: Position) {
		this.form.patchValue({
			name: position.name,
			cost: position.cost
		});
		this.modal.open();
		this._id = position._id;
		MaterialService.updateTextInputs();
	}

	onSubmit() {
		this.form.disable();

		const newPosition: Position = {
			name: this.form.value.name,
			cost: this.form.value.cost,
			category: this.categoryID
		};

		const onComplete = () => {
			this.modal.close();
			this.form.reset({name: '', cost: 1});
			this.form.enable();
		};

		if (this._id) {
			newPosition._id = this._id;

			this.service.update(newPosition).subscribe((position) => {
					MaterialService.toaster('Позиция обновлена');
					const index = this.positions.findIndex(p => p._id === position._id);

					if (index > -1) {
						this.positions.splice(index, 1, position);
					}
				},
				(error) => {
					MaterialService.toaster(error.error.message);
				},
				onComplete)
		} else {
			this.service.created(newPosition).subscribe((position) => {
					MaterialService.toaster('Позиция создана');
					this.positions.push(position)
				},
				(error) => {
					MaterialService.toaster(error.error.message);
				},
				onComplete)
		}
	}

	onDelete(event: Event, posrition: Position) {
		event.stopPropagation();
		if (window.confirm(`Вы уверены, что хотите удалить позицию ${posrition.name}`)) {
			this.service.delete(posrition).subscribe((result) => {
				MaterialService.toaster((result as any).message);
				const index = this.positions.findIndex(p => p._id === posrition._id);

				if (index > 1) {
					this.positions.splice(index, 1);
				}
			}, (error) => {
				MaterialService.toaster(error.error.message);
			})
		}
	}

}
