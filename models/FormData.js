// models/FormData.js

const mongoose = require('mongoose');
const {Schema}= mongoose;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

if (mongoose.connection.models['FormSubmit']) {
  delete mongoose.connection.models['FormSubmit'];
}
const formDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  consent: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('FormSubmit', formDataSchema);
