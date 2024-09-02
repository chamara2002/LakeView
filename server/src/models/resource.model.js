const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({

    resourceId: { type: String, required: true },
    resourceName: { type: String, required: true },
    resourceType: { type: String, required: true,enum:['indoor', 'outdoor'] },
    availableQuantity: { type: Number, required: true },
    location: { type: String, required: true },
    repairStatus: { type: Boolean, default: false },
    maintainanceStatus: { type: Boolean, default: false },
    createAt:{type: Date, default: Date.now},
    price: { type: Number, required: true },

});

const Resource =mongoose.model('Resource',resourceSchema);

module.exports=Resource;


