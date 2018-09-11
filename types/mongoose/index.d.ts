declare module 'mongoose-beautiful-unique-validation' {
    const beautifyUnique: Function;
}

declare module 'mongoose' {
    interface Model<T> {
        paginate: PaginateFunction
    }
}