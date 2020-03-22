import models from '../models'

async function index (req, res) {
  const users = await models.User.findAll({
    order: [
      ['id', 'DESC']
    ]})

  res.json(users)
}

async function create (req, res) {
  try {
    const user = await models.User.create(req.body)
    res.json(user)
  } catch (error) {
    res.status(422)
    res.json(error)
  }
}

async function show (req, res) {
  const user = await models.User.findByPk(req.params.id)
  if (!user) {
    // Return 404 with nothing
    res.status(404)
    res.json({})
  }

  res.json(user)
}

async function destroy (req, res) {
  const user = await models.User.findByPk(req.params.id)
  if (!user) {
    // Return 404 with nothing
    res.status(404)
    res.json({})
  }

  try {
    await user.destroy()
    res.status(200)
    res.json({})
  } catch (error) {
    res.status(422)
    res.json(error)
  }
}

async function update (req, res) {
  const user = await models.User.findByPk(req.params.id)
  if (!user) {
    // Return 404 with nothing
    res.status(404)
    res.json({})
  }

  try {
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (error) {
    res.status(422)
    res.json(error)
  }
}

export { index, create, show, destroy, update }
