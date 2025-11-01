export class Location {
  id: string;
  address?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  active: boolean;

  constructor(partial: Partial<Location>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.active;
  }
}
