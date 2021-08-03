import {
  EMAIL_ERROR,
  REQUIRE_ERROR,
  EMAIL_REGEXP,
  MIN_LENGTH_ERROR
} from "../utils/constants";
import {
  useState,
} from 'react';

export const useSetForm = (formValues) => {
  const [form, setForm] = useState(formValues);

  const setFormValue = name => ({
    target: {
      value
    }
  }) => {
    setForm({
      ...form,
      [name]: value
    })
  }
  const setNewForm = (form) => {
    setForm(form)
  }

  return {
    form,
    setFormValue,
    setNewForm
  };
};


export const useFieldValidation = (form) => {
  const formKeys = Object.keys(form)
  const errors = formKeys.map(name => {
    if (name == 'emailAddress' || name == 'email') {
      const value = form[name]
      const emailInvalid = EMAIL_REGEXP.test(form[name])
      if (value.length < 1) {
        return REQUIRE_ERROR
      } else if (!emailInvalid) {
        return EMAIL_ERROR;
      } else {
        return null
      }
    }
    if (name !== 'emailAddress' || name !== 'email') {
      const value = form[name]
      if (value.length < 1) {
        return REQUIRE_ERROR
      } else if (value.length < 6) {
        return name + ' ' + MIN_LENGTH_ERROR;
      } else {
        return null
      }
    }
  })

  return errors
}


export const useDialogContext = (contextProps) => {

  const {
    dialogContext,
    dialogType
  } = contextProps
  if (dialogType === 'Edit Company') {
    return {
      companyId: dialogContext.id,
      companyName: dialogContext.companyName,
      email: dialogContext.email,
      corporateNumber: dialogContext.corporateNumber,
      type: dialogContext.type,
    }

  } else if (dialogType === 'Edit role and status') {
    return {
      companyId: dialogContext.companyId,
      userId: dialogContext.userId,
      companyRole: dialogContext.companyRole ? dialogContext.companyRole : '',
      status: dialogContext.status ? dialogContext.status : ''
    }
  } else if (dialogType === 'Edit User') {
    return {
      userId: dialogContext.id,
      firstName: dialogContext.firstName,
      lastName: dialogContext.lastName,
      phoneNumber: dialogContext.phoneNumber,
      emailAddress: dialogContext.emailAddress,
    }
  } else if (dialogType === 'Add User') {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: '',
      password: ''
    }
  } else if (dialogType === 'Add Company' || dialogType === 'Add company to user') {
    return {
      companyName: "",
      email: "",
      corporateNumber: "",
      type: '',
    }
  } else {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: '',
      password: ''
    }
  }
}
