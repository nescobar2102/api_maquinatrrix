const Status = require('./Status');
const Roles = require('./Roles');
const PublicationType = require('./PublicationType');
const Category = require('./Category');
const Users = require('./User');
const UserRoles = require('./UserRoles');

const insertData = async () => {
  try {
    // Insertar registros en la tabla 'status'
    await Status.bulkCreate([
      { status: 'A', description: 'CATALOGOS ACTIVOS' },
      { status: 'I', description: 'CATALOGOS INACTIVO' },
      { status: 'AU', description: 'USUARIOS ACTIVOS' },
      { status: 'IU', description: 'USUARIOS INACTIVOS' },
      { status: 'PU', description: 'USUARIOS PENDIENTES VERIFICACION' },
      { status: 'AP', description: 'PUBLICACIONES ACTIVAS O APROBADAS' },
      { status: 'IP', description: 'PUBLICACIONES INACTIVAS O SUSPENDIDAS' },
      { status: 'P', description: 'PUBLICACIONES ELIMINADAS' }
    ]);

    // Insertar registros en la tabla 'roles'
    await Roles.bulkCreate([
      { roles: 'ADMIN', description: 'ACCESO TOTAL A TODOS LOS MODULOS DEL SISTEMA', status_id: 1 },
      { roles: 'SUBADMIN', description: 'ACCESO TOTAL A LOS MODULOS EXCLUYENDO LOS DE ADMINISTRADOR', status_id: 1 },
      { roles: 'CUSTOMERS', description: 'VISUALIZAR PUBLICACIONES', status_id: 1 }
    ]);

    // Insertar registros en la tabla 'publication_type'
    await PublicationType.bulkCreate([
      { type_pub: 'Arrendar', description: 'ARRIENDO', status_id: 1 },
      { type_pub: 'Comprar', description: 'COMPRAR', status_id: 1 }
    ]);

    // Insertar registros en la tabla 'category'
    await Category.bulkCreate([
      { category: 'Maquinaria y Equipos', description: 'Incluye los equipo como Retroexcavadora', status_id: 1 },
      { category: 'Repuestos', description: 'Incluye los repuestos en genera', status_id: 1 },
      { category: 'Neumatico', description: 'Incluye los neumaticos en genera', status_id: 1 },
      { category: 'Productos y Accesorios', description: 'Incluye los productos y accesorios en genera', status_id: 1 }
    ]);

    // Insertar registros en la tabla 'users'
    await Users.bulkCreate([
      { email: 'norbelysnaguanagua21@gmail.com', password: 'Qwerty123', status_id: 3 }
    ]);

    // Insertar registros en la tabla 'user_roles'
    await UserRoles.bulkCreate([
      { id_user: 1, id_role: 1 }
    ]);

    console.log('Datos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar los datos:', error);
  }
};
module.exports = insertData;
 