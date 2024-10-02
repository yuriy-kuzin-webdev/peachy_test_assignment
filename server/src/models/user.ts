import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { UserProfile } from './user-profile';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public profile?: UserProfile;

  static associate() {
    User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
