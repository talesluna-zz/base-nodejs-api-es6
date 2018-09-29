declare module 'mongoose-beautiful-unique-validation' {
    export default Function;
}

declare module 'mongoose' {
    interface Model<T> {
        paginate: PaginateFunction
    }
}