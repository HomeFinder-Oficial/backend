import { Property } from 'src/core/domain/entities/property.entity';

export class PropertyMapper {
  static toPersistence(domain: Partial<Property>) {
    if (!domain.id) throw new Error('id es requerido');
    if (!domain.id_owner) throw new Error('id_owner es requerido');
    if (!domain.title) throw new Error('title es requerido');
    if (!domain.location_id) throw new Error('location_id es requerido');
    if (!domain.property_type_id)
      throw new Error('property_type_id es requerido');

    return {
      id: domain.id,
      title: domain.title,
      description: domain.description ?? null,
      price: domain.price ?? null,
      area_m2: domain.area_m2 ?? null,
      bedrooms: domain.bedrooms ?? null,
      bathrooms: domain.bathrooms ?? null,
      type_of_sale: domain.type_of_sale ?? null,
      active: domain.active ?? true,
      id_owner: domain.id_owner,
      property_type_id: domain.property_type_id,
      location_id: domain.location_id,
    };
  }

  static toDomain(raw: any): Property {
    return new Property({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      price: raw.price,
      area_m2: raw.area_m2,
      bedrooms: raw.bedrooms,
      bathrooms: raw.bathrooms,
      type_of_sale: raw.type_of_sale,
      active: raw.active,
      id_owner: raw.id_owner,
      location_id: raw.location_id,
      property_type_id: raw.property_type_id,
      user: raw.user,
      property_type: raw.property_type,
      location: raw.location,
      property_photo: raw.property_photo ?? [],
    });
  }
}
