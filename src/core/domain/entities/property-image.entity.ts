export class PropertyImage {
  id: string;
  id_inmueble: string;
  url: string;
  numero?: number | null;
  activo: boolean;

  constructor(partial: Partial<PropertyImage>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.activo;
  }
}
