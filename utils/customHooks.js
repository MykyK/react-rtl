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
    if (name == 'email') {
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
    if (name == 'username' || name == 'password') {
      const value = form[name]
      if (value.length < 1) {
        return REQUIRE_ERROR
      } else if (value.length < 6) {
        return MIN_LENGTH_ERROR;
      } else {
        return null
      }
    }
  })

  return errors
}
