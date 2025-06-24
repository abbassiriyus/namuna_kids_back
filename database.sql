

-- type admin bugalter hamshira
CREATE TABLE admin                           (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    type INT CHECK (type IN (1, 2, 3)),
    description TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) UNIQUE NOT NULL,  -- UNIQUE cheklovi qo'shildi
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE lavozim(
    id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE xodim(
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   phone VARCHAR(50) NOT NULL,
   lavozim_id INT NOT NULL,
   address VARCHAR(100) NOT NULL,
   oylik INT NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE bonus(
  id SERIAL PRIMARY KEY,
  xodim_id INT NOT NULL,
  narx INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE jarima(
  id SERIAL PRIMARY KEY,
  xodim_id INT NOT NULL,
  narx INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE kunlik(
  id SERIAL PRIMARY KEY,
  xodim_id INT NOT NULL,
  narx INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE oylik_type(
  id SERIAL PRIMARY KEY,
  oylik_type BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sklad_product(
    id SERIAL PRIMARY KEY,
    nomi VARCHAR(100) NOT NULL,  --kartoshka
    hajm integer NOT NULL,  --1
    hajm_birlik VARCHAR(50) NOT NULL, --kg
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sklad_product_taktic(
    id SERIAL PRIMARY KEY,
    hajm integer NOT NULL, --yangi qoshilayapgan maxsulot
    sklad_product_id integer NOT NULL, --qaysi productga tegishli
    narx integer NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE chiqim_qoshimcha(
    id SERIAL PRIMARY KEY,
    price integer NOT NULL, --yangi qoshilayapgan maxsulot
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
CREATE TABLE chiqim_ombor (
    id SERIAL PRIMARY KEY,
    hajm INTEGER NOT NULL, -- yangi qo‘shilayotgan mahsulot
    sklad_product_id INTEGER NOT NULL, -- qaysi productga tegishli
    description TEXT,
    chiqim_sana TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE chiqim_maishiy(
    id SERIAL PRIMARY KEY,
    hajm integer NOT NULL, --yangi qoshilayapgan maxsulot
    sklad_product_id integer NOT NULL, --qaysi productga tegishli
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
CREATE TABLE sklad_maishiy(
    id SERIAL PRIMARY KEY,
    nomi VARCHAR(100) NOT NULL,  --kartoshka
    hajm integer NOT NULL,  --1
    hajm_birlik VARCHAR(50) NOT NULL, --kg
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE kirim_maishiy(
    id SERIAL PRIMARY KEY,
    hajm integer NOT NULL, --yangi qoshilayapgan maxsulot
    sklad_product_id integer NOT NULL, --qaysi productga tegishli
    narx integer NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE guruh(
 id SERIAL PRIMARY KEY,
 name VARCHAR(50),
xodim_id INT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE darssana (
  id SERIAL PRIMARY KEY,
  mavzu VARCHAR(150) NOT NULL,
  sana DATE NOT NULL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE bola_kun (
  id SERIAL PRIMARY KEY,
  holati INTEGER NOT NULL DEFAULT 0,
  bola_id INTEGER NOT NULL,
  darssana_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (bola_id, darssana_id)
);
CREATE TABLE bola(
 id SERIAL PRIMARY KEY,
 username VARCHAR(100) NOT NULL,
 metrka VARCHAR(50) UNIQUE NOT NULL,
 guruh_id INT NOT NULL,
 tugilgan_kun TIMESTAMP NOT NULL,
 oylik_toliv INT NOT NULL, 
 balans INT NOT NULL, 
 holati VARCHAR(100) NOT NULL,
 ota_FISH VARCHAR(100) NOT NULL,
 ota_phone VARCHAR(100),
 ota_pasport VARCHAR(50),
  ona_FISH VARCHAR(100) NOT NULL,
 ona_phone VARCHAR(100),
 ona_pasport VARCHAR(50),
 qoshimcha_phone VARCHAR(50),
 address VARCHAR(300),
 description TEXT,
 is_active BOOLEAN NOT NULL DEFAULT TRUE,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE taom (
  id SERIAL PRIMARY KEY,
  nomi VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE taom_ingredient (
  id SERIAL PRIMARY KEY,
  taom_id INTEGER REFERENCES taom(id) ON DELETE CASCADE,
  sklad_product_id INTEGER REFERENCES sklad_product(id),
  miqdor NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE taom_id_seq OWNED BY taom.id;
GRANT USAGE, SELECT ON SEQUENCE taom_id_seq TO abbasuz3_user;

ALTER SEQUENCE taom_ingredient_id_seq OWNED BY taom_ingredient.id;
GRANT USAGE, SELECT ON SEQUENCE taom_ingredient_id_seq TO abbasuz3_user;
ALTER SEQUENCE admin_id_seq OWNED BY admin.id;
GRANT USAGE, SELECT ON SEQUENCE admin_id_seq TO abbasuz3_user;

ALTER SEQUENCE lavozim_id_seq OWNED BY lavozim.id;
GRANT USAGE, SELECT ON SEQUENCE lavozim_id_seq TO abbasuz3_user;

ALTER SEQUENCE xodim_id_seq OWNED BY xodim.id;
GRANT USAGE, SELECT ON SEQUENCE xodim_id_seq TO abbasuz3_user;

ALTER SEQUENCE bonus_id_seq OWNED BY bonus.id;
GRANT USAGE, SELECT ON SEQUENCE bonus_id_seq TO abbasuz3_user;


ALTER SEQUENCE jarima_id_seq OWNED BY jarima.id;
GRANT USAGE, SELECT ON SEQUENCE jarima_id_seq TO abbasuz3_user;

ALTER SEQUENCE kunlik_id_seq OWNED BY kunlik.id;
GRANT USAGE, SELECT ON SEQUENCE kunlik_id_seq TO abbasuz3_user;

ALTER SEQUENCE oylik_type_id_seq OWNED BY oylik_type.id;
GRANT USAGE, SELECT ON SEQUENCE oylik_type_id_seq TO abbasuz3_user;

ALTER SEQUENCE sklad_product_id_seq OWNED BY sklad_product.id;
GRANT USAGE, SELECT ON SEQUENCE sklad_product_id_seq TO abbasuz3_user;

ALTER SEQUENCE sklad_product_taktic_id_seq OWNED BY sklad_product_taktic.id;
GRANT USAGE, SELECT ON SEQUENCE sklad_product_taktic_id_seq TO abbasuz3_user;

ALTER SEQUENCE guruh_id_seq OWNED BY guruh.id;
GRANT USAGE, SELECT ON SEQUENCE guruh_id_seq TO abbasuz3_user;

ALTER SEQUENCE bola_id_seq OWNED BY bola.id;
GRANT USAGE, SELECT ON SEQUENCE bola_id_seq TO abbasuz3_user;



ALTER SEQUENCE chiqim_qoshimcha_id_seq OWNED BY chiqim_qoshimcha.id;
GRANT USAGE, SELECT ON SEQUENCE chiqim_qoshimcha_id_seq TO abbasuz3_user;

ALTER SEQUENCE chiqim_ombor_id_seq OWNED BY chiqim_ombor.id;
GRANT USAGE, SELECT ON SEQUENCE chiqim_ombor_id_seq TO abbasuz3_user;

ALTER SEQUENCE chiqim_maishiy_id_seq OWNED BY chiqim_maishiy.id;
GRANT USAGE, SELECT ON SEQUENCE chiqim_maishiy_id_seq TO abbasuz3_user;

ALTER SEQUENCE sklad_maishiy_id_seq OWNED BY sklad_maishiy.id;
GRANT USAGE, SELECT ON SEQUENCE sklad_maishiy_id_seq TO abbasuz3_user;

ALTER SEQUENCE kirim_maishiy_id_seq OWNED BY kirim_maishiy.id;
GRANT USAGE, SELECT ON SEQUENCE kirim_maishiy_id_seq TO abbasuz3_user;





ALTER SEQUENCE darssana_id_seq OWNED BY darssana.id;
GRANT USAGE, SELECT ON SEQUENCE darssana_id_seq TO abbasuz3_user;

ALTER SEQUENCE bola_kun_id_seq OWNED BY bola_kun.id;
GRANT USAGE, SELECT ON SEQUENCE bola_kun_id_seq TO abbasuz3_user;

