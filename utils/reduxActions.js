export const getCombineActions = (ctx, callback) => {
  const actionTypes = {
    request: ctx + '_REQUEST',
    success: ctx + '_SUCCESS',
    fail: ctx + '_FAIL'
  }
  return callback(actionTypes)
}

export const actionPromise = (promise, name, ctx) => {
  const actionPending = (name) => ({
    type: ctx + '_REQUEST',
    name,
    status: 'PENDING',
    payload: null,
    ctx,
    error: null
  })

  const actionResolved = (name, payload) => ({
    type: ctx + '_SUCCESS',
    name,
    status: 'RESOLVED',
    payload,
    ctx,
    error: null
  })

  const actionRejected = (name, error) => ({
    type: ctx + '_ERROR',
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
      dispatch(actionRejected(name, error))
    }
  }
}
