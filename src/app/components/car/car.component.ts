import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CarApiService } from '../../services/car-api.service';
import { ICar } from '../../interfaces/car.ts';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
  providers: [CarApiService] 
})
export class CarComponent {
  carImageWidth: number = 300;
  @Output() carDeletedEvent = new EventEmitter<string>();
  @Input() carData?: ICar; 

  constructor(private _carApiService: CarApiService) {}

  deleteCar(carId: string) { 
    this._carApiService.delCarDetails(carId).subscribe(result => { 
      console.log(result);

    this.carDeletedEvent.emit("car got deleted");
    });
  }
}
