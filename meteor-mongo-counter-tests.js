import { Mongo } from 'meteor/mongo'
import { Tinytest } from "meteor/tinytest"

const collectionName = "__fake_collection__" + Date.now()
const fakeCollection = new Mongo.Collection(collectionName)

Tinytest.add('mongo-counter - setCounter', function (test) {
  const currentValue = Mongo.Collection.setCounter(collectionName, 'testConter', 10)
  test.isUndefined(currentValue)
})

Tinytest.add('mongo-counter - incrementCounter', function (test) {
  let value = Mongo.Collection.incrementCounter(collectionName, 'testConter')
  test.equal(value, 11)
  value = Mongo.Collection.incrementCounter(collectionName, 'testConter', 3)
  test.equal(value, 14)
  value = Mongo.Collection.incrementCounter(collectionName, 'testConter', -1)
  test.equal(value, 15)
})

Tinytest.add('mongo-counter - decrementCounter', function (test) {
  let value = Mongo.Collection.decrementCounter(collectionName, 'testConter')
  test.equal(value, 14)
  value = Mongo.Collection.decrementCounter(collectionName, 'testConter', 3)
  test.equal(value, 11)
  value = Mongo.Collection.decrementCounter(collectionName, 'testConter', -1)
  test.equal(value, 10)
})
