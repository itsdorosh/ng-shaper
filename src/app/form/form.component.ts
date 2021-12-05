import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { GeometryType, mapToFigureItem } from '../figure-item.model';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public shapeFormGroup: FormGroup;
  public geometryTypesSelectOptions: [string, GeometryType][] = Object.entries(GeometryType);

  constructor(private dataService: DataService) {
    this.shapeFormGroup = new FormGroup({
      figureName: new FormControl('', [Validators.required]),
      geometryType: new FormControl(Object.keys(GeometryType)[0]),
      figureSize: new FormControl(2),
      figureColor: new FormControl('#A9EA1F'),
    });
  }

  public onSubmit() {
    if (this.shapeFormGroup.valid) {
      this.dataService.addFigureItem(mapToFigureItem({
        id: uuidv4(),
        name: this.shapeFormGroup.value.figureName,
        size: this.shapeFormGroup.value.figureSize,
        color: this.shapeFormGroup.value.figureColor,
        geometryType: this.shapeFormGroup.value.geometryType,
      }));
    }
  }
}
