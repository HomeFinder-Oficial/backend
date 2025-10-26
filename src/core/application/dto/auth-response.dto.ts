export class AuthResponseDto {
  access_token: string;
  user: {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    activo: boolean;
    telefono?: string | null;
    id_rol?: string | null;
    foto?: string | null;
  };
}
