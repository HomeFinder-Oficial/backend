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
  user?: any;
  property_type?: any;
  location?: any;
  favorite?: any[];
  property_photo?: any[];

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
