import sequelize from '../config/database';
import { Transaction } from 'sequelize';
import { User, UserCreationAttributes } from '../models/user';
import { UserProfile, UserProfileCreationAttributes } from '../models/user-profile';

export class UserRepository {
    async findById(userId: number): Promise<User | null> {
        return User.findByPk(userId, {
            include: [{ model: UserProfile, as: 'profile' }]
        });
    }

    async findAll(): Promise<User[]> {
        return User.findAll({
            include: [{ model: UserProfile, as: 'profile' }]
        });
    }

    async create(user: Omit<UserCreationAttributes, 'id'>, profile: Omit<UserProfileCreationAttributes, 'id' | 'userId'>): Promise<User> {
        const transaction: Transaction = await sequelize.transaction();

        try {
            const createdUser = await User.create(
                {
                    ...user,
                    profile: profile,
                } as UserCreationAttributes,
                {
                    include: [{ model: UserProfile, as: 'profile' }],
                    transaction,
                }
            );

            await transaction.commit();
            return createdUser;

        } catch (error: unknown) {
            await transaction.rollback();
            throw new Error(`Failed to create user with profile: ${(error as Error).message}`);
        }
    }

    async update(userId: number, user: Partial<User>, profile: Partial<UserProfile>): Promise<void> {
        const transaction: Transaction = await sequelize.transaction();

        try {
            const existingUser = await this.findById(userId);
            if (!existingUser) throw new Error('User not found');

            await existingUser.update(user, { transaction });
            if (existingUser.profile) {
                await existingUser.profile.update(profile, { transaction });
            }

            await transaction.commit();
        } catch (error: unknown) {
            await transaction.rollback();
            throw new Error(`Failed to update user with profile: ${(error as Error).message}`);
        }
    }

    async delete(userId: number): Promise<void> {
        const transaction: Transaction = await sequelize.transaction();

        try {
            const user = await this.findById(userId);
            if (!user) throw new Error('User not found');

            if (user.profile) {
                await user.profile.destroy({ transaction });
            }
            await user.destroy({ transaction });

            await transaction.commit();
        } catch (error: unknown) {
            await transaction.rollback();
            throw new Error(`Failed to delete user with profile: ${(error as Error).message}`);
        }
    }
}
