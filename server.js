const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Fun(ctional) game!</title>
    </head>
    <body>
      <section class="welcome">
      <h1>Game</h1>
        <form id="entry" class="entry-form">
          <input name="name" placeholder="name" id="name" type="text" />
          <button type="submit">Enter</button>
        </form>
      </section>
      <script src="./node_modules/steal/steal.js"></script>~
    </body>
  </html>
`
module.exports = (app) => {
  app.get('/', (req, res) => res.send(html))
}
