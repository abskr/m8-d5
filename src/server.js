import express from 'express'

const port = 3001 || process.env.PORT

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port port!`))