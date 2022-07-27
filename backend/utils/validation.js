const {validationResult} = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => `${error.msg}`);

      const err = Error('Validation Error');
      err.status = 400;
      err.errors = errors;
      // err.title = 'Validation Error'
      next(err);
    }
    next();
  };

const handleRepeats = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('User already exists');
    err.status = 403;
    err.errors = errors;
    // err.title = 'Validation Error'
    next(err);
  }
  next();
}

module.exports = {handleValidationErrors, handleRepeats};
