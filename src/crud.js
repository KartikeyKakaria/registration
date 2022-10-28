const mongoose = require('mongoose');
const functions = {
    insertOne: async(collection, data) => {
        try {
            const Exam = new collection(data)

            const result = await Exam.save();
            console.log(result);
        } catch (err) {
            console.log(err)
        }
    },
    insertMany: async(collection, array) => {
        try {

            data = [];
            array.forEach(element => {
                collData = new collection(element);
                data.push(collData);
            });
            const result = collection.insertMany(data)
            console.log(result)
        } catch (error) {

        }
    },
    find: async(collection, condition) => {
        //number of documents
        // const result = await collection.find(condition).countDocuments()
        //sort documents alphjabetically
        const result = await collection.find(condition)
        console.log(result)
    },
    update: async(collection, id, update) => {
        try {
            const result = await collection.updateOne({ _id: id }, update);
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    },
    delete: async(collection, id) => {
        try {
            const result = await collection.deleteOne({ _id: id });
            console.log(result.acknowledged);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = functions;