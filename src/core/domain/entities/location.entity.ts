export class Location {
  id: string;
  direccion?: string | null;
  ciudad?: string | null;
  barrio?: string | null;
  latitud?: number | null;
  longitud?: number | null;
  activo: boolean;

  constructor(partial: Partial<Location>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.activo;
  }
}
