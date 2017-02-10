const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Fun(ctional) game!</title>
    </head>
    <body>
      <h1>Game</h1>
      <button class="name">Name</button>
      <button class="start">Start</button>
      <script src="socket.js"></script>
    </body>
  </html>
`
module.exports = (app) => {
  app.get('/', (req, res) => res.send(html))
}
