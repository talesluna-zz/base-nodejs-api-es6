export interface PaginateObject {
    page    : number;
    total   : number;
    offset  : number;
    perPage : number;
    lastPage: number;
}

/**
 * @description Create pagina functions for databases ODM/ORM's
 */
export default class Paginate {


    /**
     * @description Return default paginate object
     *
     * @param {number} limit
     * @param {number} page
     * @param {name} total
     *
     * @returns {PaginateObject}
     */
    static getPaginateObject(limit: number, page: number, total: number): PaginateObject {
        return {
            total,
            page,
            perPage : page === 1 && total < limit ? total : limit,
            lastPage: Math.ceil(total / limit),
            offset  : limit * (page - 1),
        };
    }

    /**
     * @name getPaginateResultObject
     * @description Format final result object with data and paginate object
     *
     * @param {*} paginateObject
     * @param {Objec} dataResult
     *
     * @returns {{data: *, paginate: *}}
     */
    static getPaginateResultObject(paginateObject: PaginateObject, dataResult: any) {
        return {
            data    : dataResult,
            paginate: paginateObject
        };
    }


    /**
     * @name sequelizePaginate
     * @description Return sequelize paginate method
     *
     * @param {*}       options
     * @param {number}  limit
     * @param {number}  page
     *
     * @returns {Promise|*|Promise<T>}
     */
    protected sequelizePaginate(options: any, limit: number, page: number) {

        const self: any = this;

        // Initialize paginate object
        let paginateObject: PaginateObject;

        return self.count()
            .then((total: number) => {

                // Set paginate object
                paginateObject = Paginate.getPaginateObject(limit, page, total);

                // Define options complements
                options.limit   = paginateObject.perPage;
                options.offset  = paginateObject.offset;

                // Find registers with options
                return self.findAll(options);

            })
            .then((dataResult: any) => {

                // Return registers and paginate
                return Paginate.getPaginateResultObject(paginateObject, dataResult);

            })
            .catch((err: Error) => {
                // Reject promise returning errors
                throw err;
            });
    }


    /**
     * @description Return mongoose paginate method
     *
     * @param {*}       options
     * @param {number}  limit
     * @param {number}  page
     *
     * @returns {Promise|*|Promise<T>}
     */
    protected mongoosePaginate(options: number, limit: number, page: number) {

        const self: any = this;

        // Initialize paginate object
        let paginateObject: PaginateObject;

        return self.count()
            .then((total: number) => {

                // Set paginate result
                paginateObject = Paginate.getPaginateObject(limit, page, total);

                // Find registers with options
                return self.aggregate(options)
                    .skip(paginateObject.offset)
                    // Limit aways be positive
                    .limit(paginateObject.perPage > 0 ? paginateObject.perPage : 1);

            })
            .then((dataResult: any) => {

                // Return registers and paginate
                return Paginate.getPaginateResultObject(paginateObject, dataResult);

            })
            .catch((err: Error) => {
                // Reject promise returning errors
                throw err;
            });
    }
}
