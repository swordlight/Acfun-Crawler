module.exports = (services) => ({
  getSexInfo: (ctx) => {
    services.response.json(ctx, {'男': 60, '女': 40})
  },
})