import models from '../models'

async function randomNumber (req, res) {
  res.json({
    message: 'Hello World!',
    randomNumber: Math.random()
  })
}

export { randomNumber }
