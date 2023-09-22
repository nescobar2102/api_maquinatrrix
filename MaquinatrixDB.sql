 
INSERT INTO public.status
(status, description)
VALUES('A', 'CATALOGOS ACTIVOS');


INSERT INTO public.status
(status, description)
VALUES('I', 'CATALOGOS INACTIVO');


INSERT INTO public.status
(status, description)
VALUES('AU', 'USUARIOS ACTIVOS');

INSERT INTO public.status
(status, description)
VALUES('IU', 'USUARIOS INACTIVOS');

INSERT INTO public.status
(status, description)
VALUES('PU', 'USUARIOS PENDIENTES VERIFICACION');

INSERT INTO public.status
(status, description)
VALUES('AP', 'PUBLICACIONES ACTIVAS O APROBADAS');

INSERT INTO public.status
(status, description)
VALUES('IP', 'PUBLICACIONES INACTIVAS O SUSPENDIDAS');

INSERT INTO public.status
(status, description)
VALUES('P', 'PUBLICACIONES ELIMINADAS');
 
 
-----  
INSERT INTO public.roles
(roles, description,status_id)
VALUES('ADMIN', 'ACCESO TOTAL A TODOS LOS MODULOS DEL SISTEMA',1),
 ('SUBADMIN', 'ACCESO TOTAL A LOS MODULOS EXCLUYENDO LOS DE ADMINISTRADOR',1),
 ('CUSTOMERS', 'VISUALIZAR PUBLICACIONES',1);


INSERT INTO public.publication_type
(type_pub, description,status_id)
VALUES('Arrendar', ' ARRIENDO',1),
('Comprar', 'COMPRAR',1);


INSERT INTO public.category
(category, description,status_id)
VALUES('Maquinaria y Equipos', 'Incluye los equipo como Retroexcavadora',1),
('Repuestos', 'Incluye los repuestos en genera',1),
('Neumatico', 'Incluye los neumaticos en genera',1),
('Productos y Accesorios', 'Incluye los productos y accesorios en genera',1);

INSERT INTO public.users
(email, "password", status_id)
VALUES('norbelysnaguanagua21@gmail.com', md5('Qwerty123'), 3);

INSERT INTO public.user_roles
(id_user, id_role)
VALUES(1, 1);
