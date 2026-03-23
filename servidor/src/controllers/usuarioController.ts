import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_secreto'; // Clave para firmar el JWT

export const crearCuenta = async (req: Request, res: Response) => {
    const { nombre, correo, fecha_nacimiento, contra } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contra, 10);
        const nuevoUsuario = new Usuario({ nombre, correo, fecha_nacimiento, contra: hashedPassword });
        await nuevoUsuario.save();
        res.status(200).json({ mensaje: "Usuario registrado exitosamente", exito: true });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario", exito: false });
    }
};

export const iniciarSesion = async (req: Request, res: Response) => {
    const { correo, contra } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (usuario && await bcrypt.compare(contra, usuario.contra)) {
            // Calcular la edad
            const birthDate = new Date(usuario.fecha_nacimiento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            // Determinar el tipo de CSS
            let cssType = '';
            if (age < 10) {
                cssType = 'ninos';
            } else if (age < 18) {
                cssType = 'adolescentes';
            } else {
                cssType = 'adultos';
            }

            // Generar el token
            const token = jwt.sign({ id: usuario._id }, SECRET_KEY, { expiresIn: '1h' });

            // Obtener el primer nombre
            const primerNombre = usuario.nombre.split(' ')[0];

            // Responder con los datos esenciales y el token
            res.status(200).json({
                exito: true,
                mensaje: "Inicio de sesión exitoso",
                css: cssType,
                nombre: primerNombre, // Solo el primer nombre
                token // Enviar el token para futuras solicitudes
            });

        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas", exito: false });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión", exito: false });
    }
};

export const obtenerPerfil = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers['authorization'];
  
      if (!token) {
        res.status(401).json({ mensaje: 'Token no proporcionado' });
        return;
      }
  
      const decoded: any = jwt.verify(token.split(' ')[1], SECRET_KEY);
  
      const usuario = await Usuario.findById(decoded.id).select('-contra');
      if (!usuario) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
        return;
      }
  
      res.json(usuario); // Enviar la respuesta sin retornar el objeto res
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };
  
  export const actualizarPerfil = async (req: Request, res: Response) => {
    try {
        // Decodificar el token directamente desde el encabezado
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            // Si no hay token, enviar la respuesta de error
            res.status(401).json({ message: 'Token no proporcionado' });
            return; // Si no hay token, ya no continuamos
        }

        console.log("Token recibido:", token); // Verifica que el token sea el esperado

        // Verificar el token usando el secreto
        const decoded: any = jwt.verify(token, SECRET_KEY); // Asegúrate de usar el mismo secreto
        const userId = decoded.id; // Obtén el ID del usuario decodificado del token

        const { nombres, apellidos, direccion, correo, telefono, biografia, genero, cumpleaños, intereses } = req.body;

        // Asegúrate de que cumpleaños esté bien recibido en el body
        console.log("Datos recibidos:", req.body); // Verifica los datos que llegan

        // Buscar al usuario y actualizar sus datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(userId, {
            nombre: nombres, apellido: apellidos, direccion, correo, telefono, biografia, genero, fecha_nacimiento: cumpleaños, intereses
        }, { new: true });

        if (!usuarioActualizado) {
            // Si no se encuentra el usuario, enviar el error
            res.status(404).json({ message: 'Usuario no encontrado' });
            return; // Ya no seguimos ejecutando el código aquí
        }

        // Devolver el usuario actualizado
        res.json(usuarioActualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
};
