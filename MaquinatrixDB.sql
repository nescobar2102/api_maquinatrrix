select * from status s 

CREATE TABLE maqdb.status (
	id_status serial NOT NULL, 
	status varchar(10) NOT NULL,
	description varchar(255) NOT NULL, 
	CONSTRAINT status_pkey PRIMARY KEY (id_status)
);



INSERT INTO maqdb.status
(status, description)
VALUES('A', 'CATALOGOS ACTIVOS');


INSERT INTO maqdb.status
(status, description)
VALUES('I', 'CATALOGOS INACTIVO');


INSERT INTO maqdb.status
(status, description)
VALUES('AU', 'USUARIOS ACTIVOS');

INSERT INTO maqdb.status
(status, description)
VALUES('IU', 'USUARIOS INACTIVOS');

INSERT INTO maqdb.status
(status, description)
VALUES('PU', 'USUARIOS PENDIENTES VERIFICACION');

INSERT INTO maqdb.status
(status, description)
VALUES('AP', 'PUBLICACIONES ACTIVAS O APROBADAS');

INSERT INTO maqdb.status
(status, description)
VALUES('IP', 'PUBLICACIONES INACTIVAS O SUSPENDIDAS');

INSERT INTO maqdb.status
(status, description)
VALUES('P', 'PUBLICACIONES ELIMINADAS');

CREATE TABLE maqdb.users (
    id_user serial NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    status_id integer NOT NULL,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_pkey PRIMARY KEY (id_user),
    CONSTRAINT users_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES maqdb.status (id_status)
);


CREATE TABLE maqdb.profile (
	id_profile serial NOT NULL,
	id_user integer,
	full_name varchar(255) NOT NULL,
	photo text NULL, 
	CONSTRAINT profile_pkey PRIMARY KEY (id_profile)
);

ALTER TABLE maqdb.profile
ADD CONSTRAINT profile_id_user_fkey
FOREIGN KEY (id_user)
REFERENCES maqdb.users (id_user)
ON DELETE CASCADE;



CREATE TABLE maqdb.roles (
	id_roles serial NOT NULL, 
	roles varchar(10) NOT NULL,
	description varchar(255) NOT NULL, 
	  status_id integer NOT NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id_roles),
	  CONSTRAINT roles_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES maqdb.status (id_status)
);
 
CREATE TABLE maqdb.user_roles (
    id_user_role serial NOT NULL,
    id_user integer,
    id_role integer,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id_user_role),
    CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (id_user) REFERENCES maqdb.users (id_user) ON DELETE CASCADE,
    CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (id_role) REFERENCES maqdb.roles (id_roles) ON DELETE CASCADE
);


ALTER TABLE maqdb.user_roles ADD CONSTRAINT user_roles_fk FOREIGN KEY (id_role) REFERENCES maqdb.roles(id_roles) ON DELETE CASCADE;



CREATE TABLE maqdb.category (
    id_category serial NOT NULL,
    category varchar(255) NOT NULL,
    description text,
      status_id integer NOT NULL, 
       CONSTRAINT categorias_pkey PRIMARY KEY (id_category),
	  CONSTRAINT category_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES maqdb.status (id_status)
   
);

CREATE TABLE publication_type (
    id_publication_type serial NOT NULL,
    type_pub varchar(255) NOT NULL,
    description text,
      status_id integer NOT NULL, 
    CONSTRAINT typepub_pkey PRIMARY KEY (id_publication_type),
     CONSTRAINT publi_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES maqdb.status (id_status)
   
);
 
-- maqdb.products definition

-- Drop table

-- DROP TABLE maqdb.products;

CREATE TABLE maqdb.products (
	id_product serial NOT NULL,
	title varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	description text NULL,
	id_publication_type int4 NULL,
	id_category int4 NULL,
	create_at date NULL,
	status_id int4 NOT NULL,
	id_user int4 NOT NULL,
	CONSTRAINT productos_pkey PRIMARY KEY (id_product)
);


-- maqdb.products foreign keys

ALTER TABLE maqdb.products ADD CONSTRAINT product_status_id_fkey FOREIGN KEY (status_id) REFERENCES maqdb.status(id_status);
ALTER TABLE maqdb.products ADD CONSTRAINT productos_id_category_fkey FOREIGN KEY (id_category) REFERENCES maqdb.category(id_category);
ALTER TABLE maqdb.products ADD CONSTRAINT products_fk FOREIGN KEY (id_user) REFERENCES maqdb.users(id_user);
ALTER TABLE maqdb.products ADD CONSTRAINT products_fk1 FOREIGN KEY (id_publication_type) REFERENCES maqdb.publication_type(id_publication_type);


CREATE TABLE maqdb.product_details (
	id_product_details serial NOT NULL,
	id_product int4 NULL,
	price varchar(50) NOT NULL,
	brand varchar(255) NOT NULL,
	model varchar(255) NOT NULL,
	"year" varchar(10) NOT NULL,
	"condition" varchar(50) NOT NULL,
	mileage varchar(10) NOT NULL,
	engine_number varchar(50) NOT NULL,
	warranty varchar(50) NOT NULL,
	"owner" varchar(50) NOT NULL,
	delivery bpchar(1) NOT NULL,
	pay_now_delivery bpchar(1) NOT NULL,
	CONSTRAINT product_details_pkey PRIMARY KEY (id_product_details),
	CONSTRAINT product_details_fk FOREIGN KEY (id_product) REFERENCES maqdb.products(id_product)
);


CREATE TABLE maqdb.product_images (
	id_image serial NOT NULL,
	id_product int4 NULL,
	image_name varchar(255) NULL,
	"path" varchar(255) NULL,
	creation_date date NULL,
	CONSTRAINT product_images_pkey PRIMARY KEY (id_image),
	CONSTRAINT product_images_fk FOREIGN KEY (id_product) REFERENCES maqdb.products(id_product)
);

 
-----  
INSERT INTO maqdb.roles
(roles, description,status_id)
VALUES('ADMIN', 'ACCESO TOTAL A TODOS LOS MODULOS DEL SISTEMA',1),
 ('SUBADMIN', 'ACCESO TOTAL A LOS MODULOS EXCLUYENDO LOS DE ADMINISTRADOR',1),
 ('CUSTOMERS', 'VISUALIZAR PUBLICACIONES',1);


INSERT INTO maqdb.publication_type
(type_pub, description,status_id)
VALUES('Arrendar', ' ARRIENDO',1),
('Comprar', 'COMPRAR',1);


INSERT INTO maqdb.category
(category, description,status_id)
VALUES('Maquinaria y Equipos', 'Incluye los equipo como Retroexcavadora',1),
('Repuestos', 'Incluye los repuestos en genera',1),
('Neumatico', 'Incluye los neumaticos en genera',1),
('Productos y Accesorios', 'Incluye los productos y accesorios en genera',1);

INSERT INTO maqdb.users
(email, "password", status_id)
VALUES('norbelysnaguanagua21@gmail.com', md5('Qwerty123'), 3);

INSERT INTO maqdb.user_roles
(id_user, id_role)
VALUES(1, 1);
