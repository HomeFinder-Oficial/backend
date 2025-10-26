export class PropertyType {
  id: string;
  tipo: string;
  activo: boolean;

  constructor(partial: Partial<PropertyType>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.activo;
  }
}
