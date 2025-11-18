import { Favorite } from './favorite.entity';
import { Location } from './location.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyType } from './property-type.entity';
import { User } from './user.entity';

export class Property {
  id: string;
  title: string;
  description?: string | null;
  price?: number | null;
  area_m2?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  active: boolean;
  id_owner: string;
  property_type_id: string;
  location_id: string;
  type_of_sale?: 'sold' | 'rented' | null;
  user?: User;
  property_type?: PropertyType;
  location?: Location;
  favorite?: Favorite[];
  property_photo?: PropertyImage[];

  constructor(partial: Partial<Property>) {
    Object.assign(this, {
      ...partial,
      active: partial.active ?? true,
    });
  }

  isActive(): boolean {
    return this.active;
  }

  belongsTo(userId: string): boolean {
    return this.id_owner === userId;
  }

  toPriceNumber(): number | null {
    if (!this.price) return null;
    return typeof this.price === 'object' ? Number(this.price) : this.price;
  }

  toAreaNumber(): number | null {
    if (!this.area_m2) return null;
    return typeof this.area_m2 === 'object'
      ? Number(this.area_m2)
      : this.area_m2;
  }
}
