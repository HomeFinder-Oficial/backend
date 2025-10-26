export class Property {
  id: string;
  titulo: string;
  descripcion?: string | null;
  precio?: number | null;
  area_m2?: number | null;
  habitaciones?: number | null;
  banos?: number | null;
  activo: boolean;
  id_propietario: string;
  id_tipo_inmueble: string;
  id_ubicacion: string;
  propietario?: any;
  tipoInmueble?: any;
  ubicacion?: any;
  fotos?: any[];

  constructor(partial: Partial<Property>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.activo;
  }

  belongsTo(userId: string): boolean {
    return this.id_propietario === userId;
  }

  toPriceNumber(): number | null {
    if (!this.precio) return null;
    return typeof this.precio === 'object' ? Number(this.precio) : this.precio;
  }

  toAreaNumber(): number | null {
    if (!this.area_m2) return null;
    return typeof this.area_m2 === 'object'
      ? Number(this.area_m2)
      : this.area_m2;
  }
}
