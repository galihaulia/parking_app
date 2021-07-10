const http = require('http')
const app = require('./server/app')

const port = process.env.PORT || '4001'
const server = http.createServer(app)

server.listen(port, async () => {
  console.log(`Server running at port ${port}`)
  try {
    // await setRemainders()
  } catch (err) {
    console.log(err)
  }
})
