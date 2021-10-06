export const mockUserStore = {
  users: null,
  isExpanded: false,
  user: {
    emailAddress: "test@test.com",
    id: 12,
    firstName: "firstName",
    secondName: "secondName",
    generalRole: 'admin'
  },
  dialogContext: null,
  userCompanies: null,
  dialogType: '',
  isDialogOpen: false,
  isLoading: false,
  notification: null
}

export const mockAuthStore = {
  isLoggedIn: true,
  user: {
    emailAddress: "test@test.com",
    id: 12,
    firstName: "firstName",
    secondName: "secondName",
    generalRole: 'admin'
  },
  notification: null,
  isLoading: false
}

export const mockCompanyStore = {
  companies: null,
  notification: null,
  contextCompany: null,
  company: null,
  isLoading: false
}
