const task = require("folktale/concurrency/task/task");
// postServiceTsk:: Object => Object => Promise.resolve [] || Promise.reject []
const postServiceTsk = (collections, body) => task((resolver) => {
    const { startDate, endDate, minCount, maxCount } = body || { //DEFAULT FOR TESTING THE DB
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    };
    const agg = [
        {
            $addFields: {
                totalCount: { $sum: "$counts" }
            }
        },
        {
            $match: {
                totalCount: {
                    $gte: parseInt(minCount),
                    $lte: parseInt(maxCount)
                },
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        },
        {
            $project: {
                _id: 0,
                key: 1,
                createdAt: 1,
                totalCount: 1
            }
        }
    ];
    collections
    .getir
    .aggregate(agg)
    .toArray()
    .then((data) => {
        resolver.resolve({
            code: 0,
            msg: "Success",
            records: data
        });
    }).catch((error) => {
        resolver.reject({
            message: "find hatasi",
            error
        });
    });
});
exports.postServiceTsk = postServiceTsk;
