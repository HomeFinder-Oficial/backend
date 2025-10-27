export class Favorito {
    id: string;
    id_cliente: string;
    id_inmueble: string;
    activo: boolean;

    constructor(partial: Partial<Favorito>) {
        Object.assign(this, partial);
    }
    isActive(): boolean {
        return this.activo;
    }
}