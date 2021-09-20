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


  const resetForm = () => {
    for (const key in form) {
      form[key] = ''
    }
  }
  return {
    form,
    setFormValue,
    setNewForm,
    resetForm
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
      if (!value) return null
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
  // change to switch case
  const {
    dialogContext,
    dialogType
  } = contextProps
  switch (dialogType) {
    case 'Edit Company':
      return {
        companyId: dialogContext.id,
          companyName: dialogContext.companyName,
          email: dialogContext.email,
          corporateNumber: dialogContext.corporateNumber,
          type: dialogContext.type,
      }
      case 'Edit role and status':
        return {
          companyId: dialogContext.userInCompany.companyId,
            userId: dialogContext.userId,
            companyRole: dialogContext.userInCompany.companyRole ? dialogContext.userInCompany.companyRole : '',
            status: dialogContext.userInCompany.status ? dialogContext.userInCompany.status : ''
        }
        case 'Edit User':
          return {
            userId: dialogContext.id,
              firstName: dialogContext.firstName,
              lastName: dialogContext.lastName,
              phoneNumber: dialogContext.phoneNumber,
              emailAddress: dialogContext.emailAddress,
          }
          case 'Add User':
            return {
              firstName: "",
                lastName: "",
                phoneNumber: "",
                emailAddress: '',
                password: ''
            }
            case 'Add Company':
            case 'Add company to user':
              return {
                companyName: "",
                  email: "",
                  corporateNumber: "",
                  type: '',
              }
              default:
                return {
                  firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    emailAddress: '',
                    password: ''
                }
  }
}
