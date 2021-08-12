export const mockUserStore = {
  users: [],
  user: null,
  isDialogOpen: false,
  isLoading: false
}

export const mockAuthStore = {
  isLoggedIn: true,
  user: {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTYyMzA3ODk5MywiZXhwIjoxNjIzMTY1MzkzfQ.V-LIBQpSlFPAaoZsdAuceJrGFGuUzYTU61hg-rA6AgY",
    email: "test@test.com",
    id: 12,
    roles: [],
    username: "test"
  },
  notification: null,
  isLoading: false
}
