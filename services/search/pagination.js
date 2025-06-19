const getPagination = (page, perPage) => {
    const offset = (page - 1) * perPage;
    return { limit: perPage, offset };
};

module.exports =  getPagination;