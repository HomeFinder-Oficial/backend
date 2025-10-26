export class User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  contrasena: string;
  activo: boolean;
  telefono?: string | null;
  id_rol?: string | null;
  foto?: string | null;

  constructor(partial: Partial<User> & { activo?: boolean | null }) {
    Object.assign(this, {
      ...partial,
      activo: partial.activo ?? true,
      telefono: partial.telefono ?? undefined,
      id_rol: partial.id_rol ?? undefined,
      foto: partial.foto ?? undefined,
    });
  }

  isActive(): boolean {
    return this.activo;
  }

  toSafeObject() {
    const { contrasena, ...safeUser } = this;
    return safeUser;
  }
}
