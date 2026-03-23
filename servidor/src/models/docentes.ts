import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para Docentes
interface IDocente extends Document {
  nombre: string;
  correo: string;
  contra: string;
  telefono: string;
  dni: string;
  direccion: string;
  fecha_nacimiento: Date;
  estado: boolean;
  cursos: Array<mongoose.Types.ObjectId>;
  grado_academico: string;
}

// Define el esquema
const DocenteSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contra: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true,
    match: /^[0-9]{9}$/,  
    message: 'El teléfono debe contener exactamente 9 dígitos numéricos.'
  },
  dni: {
    type: String,
    required: true,
    match: /^[0-9]{8}$/,  
    message: 'El DNI debe contener exactamente 8 dígitos numéricos.'
  },
  direccion: {
    type: String,
    required: true,
    minlength: 5,
    message: 'La dirección debe tener al menos 5 caracteres.'
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true
  },
  cursos: [{
    type: Schema.Types.ObjectId,
    ref: 'Curso'
  }],
  grado_academico: {
    type: String
  }
});

// Crea el modelo a partir del esquema
const Docente = mongoose.model<IDocente>('Docente', DocenteSchema);

export default Docente;
