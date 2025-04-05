import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-api.service';
import { ICar, NewCar } from '../../interfaces/car.ts';
import { CarComponent } from '../car/car.component'; 

@Component({
  selector: 'app-carlist',
  standalone: true, 
  imports: [CommonModule, CarComponent], 
  providers: [CarApiService], 
  templateUrl: './carlist.component.html',
  styleUrl: './carlist.component.css'
})
export class CarlistComponent {
  carsData: ICar[] = []; 
  show: boolean = false; 

  constructor(private _carApiService: CarApiService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this._carApiService.getCarDetails().subscribe((carsData: any) => {
      this.carsData = carsData;
    });
  }

  addCar(make:string, model:string, year:string,imageUrl:string):boolean {
    let addCar: ICar = new NewCar(make, model, year, imageUrl);
    
    this._carApiService.addCarDetails(addCar).subscribe((carsData: any) => {
      this.getCars(); // ✅ This will refresh the list after adding a car
    });
  
    return false;
  }
  

  refreshCars() {
    this.getCars();
  }
}
