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

  const emailError = 'invalid format.Email should be: test@test.com';
  const minLength = 'Username must be longer than 5 characters'
  const requireError = 'field is require'
  const emailRegex = new RegExp(/\S+@\S+\.\S+/)

  const formKeys = Object.keys(form)

  const errors = formKeys.map(name => {
    if (name == 'email') {
      const value = form[name]
      const emailInvalid = emailRegex.test(form[name])
      if (value.length < 1) {
        return requireError
      } else if (!emailInvalid) {
        return emailError;
      } else {
        return null
      }
    }
    if (name == 'username' || name == 'password') {
      const value = form[name]
      if (value.length < 1) {
        return requireError
      } else if (value.length < 6) {
        return minLength;
      } else {
        return null
      }
    }
  })

  return errors
}
