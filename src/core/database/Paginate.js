/**
 * @class Paginate
 * @description Create pagina functions for databases ODM/ORM's
 *
 */
export default class Paginate {


    /**
     * @name getPaginateObject
     * @description Return default paginate object
     * @static
     *
     * @param {number} limit
     * @param {number} page
     * @param {name} total
     *
     * @returns {{offset, page: *, perPage: *, lastPage: number, total: *}}
     *
     */
    static getPaginateObject(limit, page, total) {
        return {
            offset  : limit * (page - 1),
            page    : page,
            perPage : page === 1 && total < limit ? total : limit,
            lastPage: Math.ceil(total / limit),
            total   : total
        }
    }

    /**
     * @name getPaginateResultObject
     * @description Format final result object with data and paginate object
     * @static
     *
     * @param {Object} paginateObject
     * @param {Objec} dataResult
     *
     * @returns {{data: *, paginate: *}}
     *
     */
    static getPaginateResultObject(paginateObject, dataResult) {
        return {
            data    : dataResult,
            paginate: paginateObject
        }
    }


    /**
     * @name sequelizePaginate
     * @description Return sequelize paginate method
     * @public
     *
     * @param {*}       options
     * @param {number}  limit
     * @param {number}  page
     *
     * @returns {Promise|*|Promise<T>}
     *
     */
    sequelizePaginate(options, limit, page) {

        // Initialize paginate object
        let paginateObject = {};

        return this.count()
            .then(total => {

                // Set paginate object
                paginateObject = Paginate.getPaginateObject(limit, page, total);

                // Define options complements
                options.limit   = paginateObject.perPage;
                options.offset  = paginateObject.offset;

                // Find registers with options
                return this.findAll(options)

            })
            .then(dataResult => {

                // Return registers and paginate
                return Paginate.getPaginateResultObject(paginateObject, dataResult)

            })
            .catch(err => {
                // Reject promise returning errors
                throw err;
            })
    }


    /**
     * @name mongoosePaginate
     * @description Return mongoose paginate method
     * @public
     *
     * @param {*}       options
     * @param {number}  limit
     * @param {number}  page
     *
     * @returns {Promise|*|Promise<T>}
     *
     */
    mongoosePaginate(options, limit, page) {

        // Initialize paginate object
        let paginateObject = {};

        return this.count()
            .then(total => {

                // Set paginate result
                paginateObject = Paginate.getPaginateObject(limit, page, total);

                // Find registers with options
                return this.aggregate(options)
                    .skip(paginateObject.offset)
                    // Limit aways be positive
                    .limit(paginateObject.perPage > 0 ? paginateObject.perPage : 1)

            })
            .then(dataResult => {

                // Return registers and paginate
                return Paginate.getPaginateResultObject(paginateObject, dataResult)

            })
            .catch(err => {
                // Reject promise returning errors
                throw err;
            })
    }
}