import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para el documento de Usuario
interface IUsuario extends Document {
  nombre: string;
  correo: string;
  fecha_nacimiento: Date;
  contra: string;
  direccion: string;
  telefono: string;
  biografia: string;
  genero: string;
  apellido: string;
  plan: string;
  becas: string[]; 
  cursos: string[]; 
}

// Define el esquema para Usuario
const UsuarioSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true 
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  },
  contra: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: false 
  },
  telefono: {
    type: String,
    required: false 
  },
  biografia: {
    type: String,
    required: false
  },
  genero: {
    type: String,
    required: false 
  },
  apellido: {
    type: String,
    required: false
  },
  plan: {
    type: String,
    required: false
  },
  becas: {
    type: [String], 
    default: [] 
  },
  cursos: {
    type: [String], 
    default: []
  }
});

// Crea el modelo a partir del esquema
const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;
