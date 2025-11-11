export class PropertyImage {
  id: string;
  property_id: string;
  url: string;
  number?: number | null;
  active: boolean;

  constructor(partial: Partial<PropertyImage>) {
    Object.assign(this, {
      ...partial,
      active: partial.active ?? true,
    });
  }

  isActive(): boolean {
    return this.active;
  }
}
