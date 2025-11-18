import { Role } from './role.entity';

export class User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  active: boolean;
  phone?: string | null;
  role_id?: string | null;
  role?: Role;
  photo?: string | null;

  constructor(partial: Partial<User> & { active?: boolean | null }) {
    Object.assign(this, {
      ...partial,
      active: partial.active ?? true,
      phone: partial.phone ?? null,
      role_id: partial.role_id ?? null,
      photo: partial.photo ?? null,
      role: partial.role ?? null,
    });
  }

  isActive(): boolean {
    return this.active;
  }

  toSafeObject() {
    const { password, ...safeUser } = this;
    return safeUser;
  }
}
