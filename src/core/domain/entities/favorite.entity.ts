export class Favorite {
  id: string;
  client_id: string;
  property_id: string;
  active: boolean;

  constructor(partial: Partial<Favorite>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.active;
  }
}
