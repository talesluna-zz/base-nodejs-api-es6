import {SequelizeStaticAndInstance, Errors, Associations, Hooks} from 'sequelize';

declare module 'sequelize' {
    interface SequelizeStaticAndInstance extends Errors {
        Model: Model<any, any>;
    }

    interface Model<TInstance, TAttributes> extends Hooks<TInstance>, Associations  {
        paginate: PaginateFunction
    }
}