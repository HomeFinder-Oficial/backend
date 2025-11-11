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
    photo?: string | null;
  };
}
