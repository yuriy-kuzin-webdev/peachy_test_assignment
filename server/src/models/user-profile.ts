import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

interface UserProfileAttributes {
  id: number;
  phone: string;
  userId: number;
}

export interface UserProfileCreationAttributes extends Optional<UserProfileAttributes, 'id'> {}

export class UserProfile extends Model<UserProfileAttributes, UserProfileCreationAttributes> implements UserProfileAttributes {
  public id!: number;
  public phone!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  }
}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserProfile',
  }
);
