import {SequelizeStaticAndInstance, Errors, Associations, Hooks} from 'sequelize';

declare module 'sequelize' {
    interface Model<TInstance, TAttributes> extends Hooks<TInstance>, Associations  {
        paginate: PaginateFunction
    }
}