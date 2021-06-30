import {
  renderHook,
  act
} from '@testing-library/react-hooks'

import {
  useFieldValidation,
  useSetForm
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
  ['', '', '', [REQUIRE_ERROR, REQUIRE_ERROR, REQUIRE_ERROR]],
  ['test', 'test', 'test', [MIN_LENGTH_ERROR, EMAIL_ERROR, MIN_LENGTH_ERROR]],
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
