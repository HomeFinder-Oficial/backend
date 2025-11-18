export class AuthResponseDto {
  access_token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
    phone?: string | null;
    role_id?: string | null;
    role?: {
      id: string;
      name: string;
      active: boolean;
    } | null;
    photo?: string | null;
  };
}
