async function findAll(Model, cb){
  await Model.find({}, (err, docs)=>{
    if(err) throw err
    cb(docs)
  })
}
module.exports = {findAll}