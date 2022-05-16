import prisma from 'lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const trips = await prisma.expense.findMany()
    return res.status(200).json({ trips })
  }

  if (req.method === 'POST') {
    const { trip, name, date, amount, currency } = req.body

    if (!trip) {
      return res
        .status(400)
        .send({ message: 'Missing required parameter `trip`' })
    }
    if (!name) {
      return res
        .status(400)
        .send({ message: 'Missing required parameter `name`' })
    }
    if (!amount) {
      return res
        .status(400)
        .send({ message: 'Missing required parameter `amount`' })
    }
    if (!currency) {
      return res
        .status(400)
        .send({ message: 'Missing required parameter `currency`' })
    }

    await prisma.expense.create({
      data: {
        trip,
        name,
        date,
        amount,
        currency,
      },
    })

    return res.status(200).end()
  }

  res.status(405).send({ message: 'Method Not Allowed' })
}
