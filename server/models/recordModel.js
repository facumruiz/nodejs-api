import mongoose from 'mongoose';

const { Schema } = mongoose;

const recordSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
  },
  position: {
    type: String,
    required: [true, 'La posición es obligatoria'],
  },
  level: {
    type: String,
    enum: {
      values: ['Junior', 'Mid', 'Senior'],
      message: 'El nivel debe ser uno de los siguientes: Junior, Mid, Senior',
    },
    required: [true, 'El nivel es obligatorio'],
  },
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
