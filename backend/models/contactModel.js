import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  age: {
    type: String,
  },
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;