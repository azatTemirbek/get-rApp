const { postServiceTsk } = require("./postServiceTsk");
module.exports = (app, db) => {
  app.get('/records', (req, res) => postServiceTsk(db, req.body).run().listen({
    onRejected: (err) => res.status(500).json(err),
    onResolved: (ps) => res.status(200).json(ps)
  }))
}
