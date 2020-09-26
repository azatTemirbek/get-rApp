const { dbConnection } = require("./dbConnection");
const { ExpressBuilder } = require("./ExpressBuilder");
const { port } = require("./config");
const MongoClient = require('mongodb').MongoClient;
// mainApp :: TASK.resolve || TASK.reject
const mainApp = dbConnection(MongoClient)
  .chain(models => ExpressBuilder(models));
/** DI */
mainApp.run().listen({
  onCancelled: (reason) => console.log('FAIL BRO WHO IS TRYING TO KILL ME?', reason),
  onRejected: (reason) => console.log('FAIL BRO DIVE INTO FOLKTALE STUFF', reason),
  onResolved: () => console.log(`Express: listening on ${port}`)
})