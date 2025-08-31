/**
 * Standard API Response Formatter
 */
const formatResponse = (res, statusCode, data, message = null, meta = null) => {
  const response = {
    success: statusCode < 400,
    status: statusCode,
    timestamp: new Date().toISOString(),
  };

  if (message) response.message = message;
  if (data !== undefined) response.data = data;
  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
};

/**
 * Response helper middleware - adds formatted response methods to res object
 */
const responseFormatter = (req, res, next) => {
  // Success responses
  res.success = (data, message = 'Success', meta = null) => 
    formatResponse(res, 200, data, message, meta);

  res.created = (data, message = 'Created successfully', meta = null) => 
    formatResponse(res, 201, data, message, meta);

  res.updated = (data, message = 'Updated successfully', meta = null) => 
    formatResponse(res, 200, data, message, meta);

  res.deleted = (message = 'Deleted successfully') => 
    formatResponse(res, 200, null, message);

  // Error responses
  res.badRequest = (message = 'Bad request', data = null) => 
    formatResponse(res, 400, data, message);

  res.unauthorized = (message = 'Unauthorized') => 
    formatResponse(res, 401, null, message);

  res.forbidden = (message = 'Forbidden') => 
    formatResponse(res, 403, null, message);

  res.notFound = (message = 'Not found') => 
    formatResponse(res, 404, null, message);

  res.conflict = (message = 'Conflict') => 
    formatResponse(res, 409, null, message);

  res.serverError = (message = 'Internal server error') => 
    formatResponse(res, 500, null, message);

  next();
};

module.exports = responseFormatter;
