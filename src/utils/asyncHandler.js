const asyncHandler = (requestHandler) =>{
  return (req, res, next) => {
    Promise
    .resolve(requestHandler(res, req, next))
    .catch((err) => next(err))
  };
};

export default asyncHandler;