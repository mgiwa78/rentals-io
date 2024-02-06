import { TCategories } from "./Categories";
import { TUser } from "./User";

export interface TRental {
  _id: string;
  name: string;
  price: string;
  size: string;
  vendor: TUser;
  category: TCategories;
  brand: string;
  description: string;
  imgPath: string;
}
