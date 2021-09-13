module.exports = {
  async rewrites() {
    return [{
      source: '/dashboard/companies',
      destination: '/dashboard',
    }, ]
  },
}
