module.exports = (execution) => (req, res, next) => {
    Promise.resolve(execution(req, res, next)).catch(next);
};
