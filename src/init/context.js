// const robotConfig = require('../../config/robot')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../../Infra/config/jwt')

module.exports = async function initGraphqlContext ({ req }) {
  function validaToken (token) {
    if (!token) return undefined
    return jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) return undefined
      return decoded
    })
  }

  const token = req.headers.authorization || ''

  if (token) {
    return { token: validaToken(token) }
  }

  return { token: undefined }
}
