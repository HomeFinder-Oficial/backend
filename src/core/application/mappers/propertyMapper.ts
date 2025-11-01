import { Property } from "src/core/domain/entities/property.entity";

export class PropertyMapper {
  static toPersistence(domain: Partial<Property>) {
    return {
      id: domain.id,
      title: domain.title,
      description: domain.description,
      price: domain.price,
      area_m2: domain.area_m2,
      bedrooms: domain.bedrooms,
      bathrooms: domain.bathrooms,
      type_of_sale: domain.type_of_sale ?? null,
      active: domain.active,
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
      user: raw.user,
      property_type: raw.property_type,
      location: raw.location,
      property_photo: raw.property_photo ?? [],
    });
  }
}
