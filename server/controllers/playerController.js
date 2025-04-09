import ClubPlayer from '../models/playerModel.js';


export const getPlayers = async (req, res) => {
  try {
    const {
      name,
      position,
      minAge,
      maxAge,
      sortBy = 'name',
      order = 'asc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Filtro por nombre parcial (insensible a mayúsculas)
    if (name) {
      query['personalData.name'] = { $regex: name, $options: 'i' };
    }

    // Filtro por posición
    if (position) {
      query['physicalAttributes.positions'] = position;
    }

    // Filtro por edad
    if (minAge || maxAge) {
      const today = dayjs();
      if (minAge) {
        const maxDOB = today.subtract(minAge, 'year').toDate();
        query['personalData.dateOfBirth'] = { ...(query['personalData.dateOfBirth'] || {}), $lte: maxDOB };
      }
      if (maxAge) {
        const minDOB = today.subtract(maxAge, 'year').toDate();
        query['personalData.dateOfBirth'] = { ...(query['personalData.dateOfBirth'] || {}), $gte: minDOB };
      }
    }

    // Ordenamiento
    const sortOptions = {};
    if (sortBy === 'name') {
      sortOptions['personalData.name'] = order === 'desc' ? -1 : 1;
    } else if (sortBy === 'age') {
      sortOptions['personalData.dateOfBirth'] = order === 'desc' ? 1 : -1; // más joven primero si asc
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const players = await ClubPlayer.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ClubPlayer.countDocuments(query);

    return res.status(200).json({
      message: 'Jugadores obtenidos exitosamente',
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: players,
    });
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};


export const getPlayerById = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await ClubPlayer.findById(id);

    if (!player) {
      return res.status(404).json({
        message: 'Jugador no encontrado',
      });
    }

    return res.status(200).json({
      message: 'Jugador obtenido exitosamente',
      data: player,
    });
  } catch (error) {
    console.error('Error al obtener jugador por ID:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};



export const createPlayer = async (req, res) => {
  const players = req.body;

  // Verificamos si es un array
  if (!Array.isArray(players)) {
    return res.status(400).json({
      message: 'Se espera un array de jugadores',
    });
  }

  try {
    const savedPlayers = await ClubPlayer.insertMany(players, { ordered: false });
    return res.status(201).json({
      message: 'Jugadores creados exitosamente',
      data: savedPlayers,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.writeErrors) {
      const errores = error.writeErrors?.map(e => e.err?.errors) || [error.errors];
      const detalles = errores.map(errSet => {
        const campos = {};
        for (let campo in errSet) {
          campos[campo] = errSet[campo].message;
        }
        return campos;
      });
      return res.status(400).json({
        message: 'Error de validación',
        errors: detalles,
      });
    }

    console.error('Error al crear jugadores:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};



export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const player = await ClubPlayer.findById(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    // Actualizar solo campos presentes
    for (const key in updates) {
      if (typeof updates[key] === 'object' && updates[key] !== null) {
        player[key] = {
          ...player[key].toObject(), // convierte en objeto simple para merge
          ...updates[key],
        };
      } else {
        player[key] = updates[key];
      }
    }

    const updatedPlayer = await player.save();

    return res.status(200).json({
      message: 'Jugador actualizado exitosamente',
      data: updatedPlayer,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el jugador',
      error: error.message,
    });
  }
};


export const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlayer = await ClubPlayer.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).json({
        message: 'Jugador no encontrado',
      });
    }

    return res.status(200).json({
      message: 'Jugador eliminado exitosamente',
      data: deletedPlayer,
    });
  } catch (error) {
    console.error('Error al eliminar jugador:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};

