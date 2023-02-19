const mongoose = require('mongoose');
const apidataSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
   companyCode  : {
        type : String,
        required : true,
        unique : true,
    },
    companyName : {
        type : String,
        required : true
    },
    currentPrice : {
                type : Number,
                required : true
            },
            highPrice : {
                type : Number,
                required : true
            },
            lowPrice : {
                type : Number,
                required : true
            }, 
            variance : {
                type : Number,
                required : true
            },      
             
            stockSignal: {
                type : String,
                required : true
            },
            category: {
                type : String,
                
            },
               
})
const apidata = new mongoose.model("APIDATA", apidataSchema);

module.exports = apidata;