import { User } from './../../domain/entities/user.entity';

export class UserMapper {
    static toPersistence(domain: Partial<User> | any) {
        return {
            id: domain.id,
            first_name: domain.first_name ?? domain.firstName,
            last_name: domain.last_name ?? domain.lastName,
            email: domain.email,
            password: domain.password,
            active: domain.active ?? true,
            phone: domain.phone ?? null,
            role_id: domain.role_id ?? domain.roleId ?? null,
            photo:
                domain.photo ??
                'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png',
        };
    }

    static toDomain(prismaUser: any): User {
        return new User({
            id: prismaUser.id,
            first_name: prismaUser.first_name,
            last_name: prismaUser.last_name,
            email: prismaUser.email,
            password: prismaUser.password,
            active: prismaUser.active ?? true,
            phone: prismaUser.phone ?? undefined,
            role_id: prismaUser.role_id ?? undefined,
            photo: prismaUser.photo ?? undefined,
        });
    }
}
