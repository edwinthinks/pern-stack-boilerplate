import models from '../models'

async function index (req, res) {
  const users = await models.User.findAll({})

  res.json(users)
}

async function create (req, res) {
  try {
    const user = await models.User.create(req.body);
    res.json(user);
  } catch (error) {
    res.json(error)
  }
}

export { index, create }
