import {
  renderHook,
  act
} from '@testing-library/react-hooks'

import {
  useFieldValidation,
  useSetForm,
  useDialogContext
} from './../customHooks';
import {
  MIN_LENGTH_ERROR,
  EMAIL_ERROR,
  REQUIRE_ERROR
} from '../../utils/constants';

describe('useSetForm', () => {
  const initialForm = {
    username: '',
  }
  let hook
  beforeEach(() => {
    hook = renderHook(() => useSetForm(initialForm))
  })

  const event = {
    target: {
      value: 'test',
    },
  }

  it('should reset form ', () => {
    const {
      result
    } = hook

    act(() => {
      result.current.resetForm()
    })
    expect(result.current.form).toEqual(initialForm)
  })

  it('should set form value', async () => {
    const {
      result
    } = hook

    act(() => {
      result.current.setFormValue('username')(event)
    })

    expect(result.current.form).toEqual({
      username: 'test',
    })
  })

  it('should set new form', async () => {
    const {
      result
    } = hook

    const newForm = {
      newField: 'it is new form'
    }

    act(() => {
      result.current.setNewForm(newForm)
    })

    expect(result.current.form).toEqual(newForm)
  })
})

const values = [
  ['', '', '', ['username ' + REQUIRE_ERROR, 'email ' + REQUIRE_ERROR, 'password ' + REQUIRE_ERROR]],
  ['test', 'test', 'test', ['username ' + MIN_LENGTH_ERROR, EMAIL_ERROR, 'password ' + MIN_LENGTH_ERROR]],
  ['test123', 'test@test.com', 'test123', [null, null, null]]
]

describe.each(values)(
  'useFieldValidation',
  (usernameValue, emailValue, passwordValue, errors) => {
    it(`should return array with [${errors}]`, () => {
      const initialForm = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      }
      const {
        result,
      } = renderHook(() => useFieldValidation(initialForm))
      expect(result.current).toEqual(errors)
    })
  })


const cases = [
  [{
    dialogType: 'Edit Company',
    dialogContext: {
      id: 1,
      companyName: 'testCompanyName',
      email: 'testCompany@email.com',
      corporateNumber: '21332131',
      type: 'testType',
    }
  }, {
    companyId: 1,
    companyName: 'testCompanyName',
    email: 'testCompany@email.com',
    corporateNumber: '21332131',
    type: 'testType',
  }],
  [{
    dialogType: 'Edit role and status',
    dialogContext: {
      userInCompany: {
        companyId: 1,
        companyRole: 'Web Ui',
        status: 'offline'
      },
      userId: 2,
    }
  }, {
    companyId: 1,
    userId: 2,
    companyRole: 'Web Ui',
    status: 'offline'
  }],
  [{
    dialogType: 'Edit User',
    dialogContext: {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '2233332',
      emailAddress: 'test@email.com',
    }
  }, {
    userId: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: '2233332',
    emailAddress: 'test@email.com',
  }],
  [{
    dialogType: 'Add User',
    dialogContext: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      password: '',
    }
  }, {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  }],
  [{
    dialogType: 'Add Company',
    dialogContext: {
      companyName: '',
      corporateNumber: '',
      email: '',
      type: '',
    }
  }, {
    companyName: '',
    corporateNumber: '',
    email: '',
    type: '',
  }],
  [{
    dialogType: 'Add company to user',
    dialogContext: {
      companyName: '',
      corporateNumber: '',
      email: '',
      type: '',
    }
  }, {
    companyName: '',
    corporateNumber: '',
    email: '',
    type: '',
  }],
  [{
    dialogType: null,
    dialogContext: null
  }, {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  }]
]

describe.each(cases)('useDialogContext', (contextProps, returnedForm) => {
  it(`When dialogType is "${contextProps.dialogType }" should return correct structure`, () => {
    const {
      result,
    } = renderHook(() => useDialogContext(contextProps))
    expect(result.current).toEqual(returnedForm)
  })
})
