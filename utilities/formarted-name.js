function formatName(req,file) {
  let date = new Date
  let now = date.toISOString()
  let formatedDate = now.replace(':','-').replace(':','-')
  let extension = '.' +file.mimetype.slice(6)
  let formatedName = file.fieldname + '_' + formatedDate + extension
  return formatedName
}

module.exports = formatName