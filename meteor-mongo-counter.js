import { Meteor } from 'meteor/meteor'
import { Mongo, MongoInternals } from 'meteor/mongo'

function _getMongoCollectionByName (collectionName) {
  return MongoInternals.defaultRemoteCollectionDriver().mongo.rawCollection(collectionName)
}

if (!(Mongo.Collection.setCounter && Mongo.Collection.setCounter.constructor === Function)) {
  Mongo.Collection.setCounter = function (collectionName, counterName, value) {
    const collection = _getMongoCollectionByName(collectionName)
    const res = Meteor.wrapAsync(callback => {
      collection.findOneAndUpdate({
        _id: counterName
      }, {
        $set: { next_val: value }
      }, {
        upsert: true
      }, callback)
    })()
    return res.value === null ? undefined : res.value
  }
}

if (!(Mongo.Collection.incrementCounter && Mongo.Collection.incrementCounter.constructor === Function)) {
  Mongo.Collection.incrementCounter = function (collectionName, counterName, step = 1, isUpsert = true) {
    const collection = _getMongoCollectionByName(collectionName)
    const res = Meteor.wrapAsync(callback => {
      collection.findOneAndUpdate({
        _id: counterName
      }, {
        $inc: { next_val: Math.abs(step) }
      }, {
        projection: { next_val: 1 },
        returnOriginal: false,
        upsert: !!isUpsert
      }, callback)
    })()
    return res.value === null ? undefined : res.value.next_val
  }
}

if (!(Mongo.Collection.decrementCounter && Mongo.Collection.decrementCounter.constructor === Function)) {
  Mongo.Collection.decrementCounter = function (collectionName, counterName, step = 1, isUpsert = true) {
    const collection = _getMongoCollectionByName(collectionName)
    const res = Meteor.wrapAsync(callback => {
      collection.findOneAndUpdate({
        _id: counterName
      }, {
        $inc: { next_val: -Math.abs(step) }
      }, {
        projection: { next_val: 1 },
        returnOriginal: false,
        upsert: !!isUpsert
      }, callback)
    })()
    return res.value === null ? undefined : res.value.next_val
  }
}
