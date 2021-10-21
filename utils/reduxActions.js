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
    payload: null,
    ctx,
    error: null
  })

  const actionResolved = (name, payload) => ({
    type: reducer + ctx + '_SUCCESS',
    name,
    payload,
    ctx,
    error: null
  })

  const actionRejected = (name, error) => ({
    type: reducer + ctx + '_FAIL',
    name,
    payload: null,
    ctx,
    error
  })
  return async dispatch => {
    dispatch(actionPending(name))
    try {
      let result = await promise
      name === 'user' && reducer === 'AUTH_' && localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(actionResolved(name, result.data))
      return result;
    } catch (error) {
      error.status = 'error'
      dispatch(actionRejected(name, error.response && error.response.data.message ? error.response.data : error))
      return error;
    }
  }
}
