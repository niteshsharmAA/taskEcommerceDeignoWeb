exports.find = (model, findObj, options) => {
    return model.find({ isDeleted: {$ne: true}, ...findObj }, options)
}

exports.findOne = (model, findObj, options) => {
    return model.findOne({ isDeleted: {$ne: true}, ...findObj }, options)
}

exports.updateOne = (model, findObj, updateObj, options={new:true}) => {
    return model.findOneAndUpdate({ isDeleted: {$ne: true}, ...findObj }, updateObj, options)
}

exports.create = (model, data) => {
    return model.create(data)
}

exports.updateMany = (model, findObj, updateObj, options) => {
    return model.updateMany({ isDeleted: {$ne: true}, ...findObj }, updateObj, options)
}

exports.insertMany = (model, insertArray, options) => {
    return model.insertMany(insertArray, options)
}