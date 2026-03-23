import mongoose, { Schema, Document } from 'mongoose';

// Definimos una interfaz que representa un curso
interface ICurso extends Document {
  titulo: string;
  instructor: mongoose.Types.ObjectId;
  precio: number;
  imagenUrl: string;
  seccion: 'ninos' | 'adolescentes' | 'adultos';
  categoria: 'FREE' | 'PREMIUM';
  fechaCreacion: Date;
  habilitado: boolean;
  sesiones: Array<mongoose.Types.ObjectId>;
  examenes: Array<mongoose.Types.ObjectId>;
  cuestionarios: Array<mongoose.Types.ObjectId>;
}

// Esquema de Cursos
const CursoSchema: Schema = new Schema({
  titulo: {
    type: String,
    required: true,
    minlength: [5, 'El título debe tener al menos 5 caracteres.'],
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'Docente',
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo.'],
  },
  imagenUrl: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria.'],
    validate: {
      validator: (value: string) => /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value),
      message: 'La URL de la imagen debe ser válida y terminar en jpg, jpeg, png o gif.',
    },
  },  
  seccion: {
    type: String,
    required: true,
    enum: ['ninos', 'adolescentes', 'adultos'],
  },
  categoria: {
    type: String,
    required: true,
    enum: ['FREE', 'PREMIUM'],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  habilitado: {
    type: Boolean,
    default: true, // Por defecto, el curso está habilitado
  },
  sesiones: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sesion',
      default: [], // Inicialmente vacío
    },
  ],
  examenes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Examen',
      default: [], // Inicialmente vacío
    },
  ],
  cuestionarios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cuestionario',
      default: [], // Inicialmente vacío
    },
  ],
});

// Crear el modelo de Curso
const Curso = mongoose.model<ICurso>('Curso', CursoSchema);

export default Curso;
