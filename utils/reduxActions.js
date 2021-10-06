export const getCombineActions = (ctx, reducer, callback) => {
  const actionTypes = {
    request: reducer + ctx + '_REQUEST',
    success: reducer + ctx + '_SUCCESS',
    fail: reducer + ctx + '_FAIL'
  }
  return callback(actionTypes)
}

export const actionPromise = (promise, name, ctx, reducer) => {
  const actionPending = (name) => ({
    type: reducer + ctx + '_REQUEST',
    name,
    status: 'PENDING',
    payload: null,
    ctx,
    error: null
  })

  const actionResolved = (name, payload) => ({
    type: reducer + ctx + '_SUCCESS',
    name,
    status: 'RESOLVED',
    payload,
    ctx,
    error: null
  })

  const actionRejected = (name, error) => ({
    type: reducer + ctx + '_FAIL',
    name,
    status: 'REJECTED',
    payload: null,
    ctx,
    error
  })
  return async dispatch => {
    dispatch(actionPending(name))
    try {
      let result = await promise
      dispatch(actionResolved(name, result))
      return result;
    } catch (error) {
      error.status ? error : error.status = 'error'
      dispatch(actionRejected(name, error.response.data))
      return error;
    }
  }
}
