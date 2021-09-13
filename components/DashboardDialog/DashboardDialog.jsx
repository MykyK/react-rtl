import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CompanySelect from './../CompanySelect/index'
import InputField from './../InputField/index'
import PropTypes from 'prop-types'

export const DashboardDialog = (props) => {
  const {
    isDialogOpen,
    errors,
    dialogContext,
    initialContext,
    dialogType,
    companies,
    setFormValue,
    handleAdd,
    handleClose,
    submitText,
    handleUpdate,
    selectHandleChange,
    isError,
    form,
  } = props

  return (
    <div data-testid="dialog-wrapper">
      <Dialog
        open={isDialogOpen}
        data-testid="dialog-component"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogType}</DialogTitle>
        <DialogContent>
          {dialogType === 'Add company to user' && companies && (
            <CompanySelect
              companies={companies}
              form={form}
              selectHandleChange={selectHandleChange}
            />
          )}
          {initialContext &&
            Object.keys(initialContext).map((key, i) => {
              return !key.toLocaleLowerCase().includes('id') ? (
                <InputField
                  key={i}
                  margin="dense"
                  error={errors[i]}
                  name="username"
                  label={key}
                  type="text"
                  fullWidth
                  value={form[key]}
                  onChange={setFormValue(key)}
                />
              ) : null
            })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            data-testid="close-dialog-button"
            color="primary"
          >
            Cancel
          </Button>
          <Tooltip
            title={
              Boolean(isError) ? (
                <ul>
                  {errors.map(
                    (error, index) => error && <li key={index}>{error}</li>
                  )}
                </ul>
              ) : (
                <span>{submitText}</span>
              )
            }
          >
            <span>
              <Button
                data-testid="action-type-button"
                onClick={dialogContext ? handleUpdate : handleAdd}
                color="primary"
                disabled={Boolean(isError)}
              >
                {submitText}
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DashboardDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  dialogContext: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  initialContext: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  companies: PropTypes.array,
  errors: PropTypes.array,
  submitText: PropTypes.string.isRequired,
  dialogType: PropTypes.string.isRequired,
  setFormValue: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  selectHandleChange: PropTypes.func.isRequired,
}
