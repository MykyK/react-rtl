export const mockUserStore = {
  // users: {
  //   items: [{
  //     emailAddress: 'test'
  //   }]
  // },
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
  companies: {
    items: [{
      email: 'company'
    }]
  },
  notification: null,
  contextCompany: null,
  company: null,
  isLoading: false
}
