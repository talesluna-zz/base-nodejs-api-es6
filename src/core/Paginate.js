class Paginate {

    /**
     * Return default paginate object
     * @param limit
     * @param page
     * @param total
     * @returns {{offset, page: *, perPage: *, lastPage: number, total: *}}
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
     * Format final result object with data and paginate object
     * @param paginateObject
     * @param dataResult
     * @returns {{data: *, paginate: *}}
     */
    static getPaginateResultObject(paginateObject, dataResult) {
        return {
            data    : dataResult,
            paginate: paginateObject
        }
    }


    /**
     * Return sequelize paginate method
     * @param options
     * @param limit
     * @param page
     * @returns {Promise|*|Promise<T>}
     */
    sequelize(options, limit, page) {

        // Initialize paginate object
        let paginateObject = {};

        return this.count()
            .then(total => {

                // Set paginate object
                paginateObject = Paginate.getPaginateObject(limit, page, total);

                // Define options complements
                options.limit   = paginateObject.limit;
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
     * Return mongoose paginate method
     * @param options
     * @param limit
     * @param page
     * @returns {Promise|*|Promise<T>}
     */
    mongoose(options, limit, page) {

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

export default new Paginate();