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
