import Rental from "@/modules/Rental/Rental.vue";

export interface ISkateParkData {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  location: { city: string; state: string; id: string };
  rented: boolean;
  rentals: Rental[];
}