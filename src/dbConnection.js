const { task } = require('folktale/concurrency/task');
const { curry } = require('ramda');
/** this is task used with try catch */
// dbConnection:: String => Object => Promise.reject || Promise.resolver
const dbConnection = curry(
    (uri, MongoClient) => task(async (resolver) => {
        new MongoClient(uri, { useUnifiedTopology: true }).connect(
            (err, cl) => {
                if (!cl && err) {
                    resolver.reject({
                        message: "invalid db connection",
                        err
                    });
                }
                const database = cl.db('challenge-xzwqd');
                const collection = database.collection('getir-case-study');
                resolver.resolve({ getir: collection })
            }
        )
    })
)
const murl = process.env.CONNECTION_STRING || "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
exports.dbConnection = dbConnection(murl);
