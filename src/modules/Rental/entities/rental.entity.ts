export default class Rental {
  public id: string;

  public skateParkId: string;
  
  public startTime: string;

  public endTime: string;

  public renterId: string;

  public renterName: string;

  public userId: string;

  public startDate: Date;

  public endDate: Date;

  public createdAt: Date;

  public updatedAt: Date;

  constructor(rental = {
    id: '',
    skateParkId: '',
    userId: '',
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    startTime: '',
    endTime: '',
    renterId: '',
    renterName: '',
  }) {
    this.id = rental.id;
    this.skateParkId = rental.skateParkId;
    this.userId = rental.userId;
    this.startDate = rental.startDate;
    this.endDate = rental.endDate;
    this.createdAt = rental.createdAt;
    this.updatedAt = rental.updatedAt;
    this.startTime = rental.startTime;
    this.endTime = rental.endTime;
    this.renterId = rental.renterId;
    this.renterName = rental.renterName;
    this.renterId = rental.renterId;
  }
}