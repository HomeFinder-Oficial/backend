export class Role {
  id: string;
  name: string;
  active: boolean;

  constructor(partial: Partial<Role> & { active?: boolean | null }) {
    Object.assign(this, {
      ...partial,
      active: partial.active ?? true,
    });
  }

  isActive(): boolean {
    return this.active;
  }
}
