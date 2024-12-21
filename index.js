import express from 'express'
import userRouter from './modules/user/user.routes.js'
import rentalRouter from './modules/rental/rental.routes.js'
import CarRouter from './modules/car/car.routes.js'
import specialRouter from './modules/special/special.routes.js'
const app = express()
const port = 3000
app.use(express.json())

app.use('/user',userRouter)
app.use('/rental',rentalRouter)
app.use('/car',CarRouter)
app.use('/special',specialRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))