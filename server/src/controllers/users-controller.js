import models from '../models'

async function index(req, res) {
  const users = await models.User.findAll({})

  res.json(users)
}

export { index }

