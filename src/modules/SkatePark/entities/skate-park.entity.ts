import { ISkateParkData } from '../interfaces/skate-park-data.interface';

export default class SkatePark {
  public id: string;

  public name: string;

  public description: string;

  public createdAt: Date;

  public updatedAt: Date;

  public location: { city: string; state: string; id: string };

  public rentals: any[];

  public rented: boolean;
  
  constructor(skate_park: ISkateParkData = {
    id: '',
    name: '',
    description: '',
    location: { city: '', state: '', id: '' },
    createdAt: new Date(),
    updatedAt: new Date(),
    rented: false,
    rentals: []
  }) {
    this.id = skate_park.id;
    this.name = skate_park.name;
    this.description = skate_park.description;
    this.createdAt = skate_park.createdAt;
    this.updatedAt = skate_park.updatedAt;
    this.location = skate_park.location;
    this.rented = skate_park.rented;
    this.rentals = skate_park.rentals;
  }
}