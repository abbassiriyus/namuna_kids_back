

-- type admin bugalter hamshira
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    type INT CHECK (type IN (1, 2, 3)),
    image TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) UNIQUE NOT NULL,  -- UNIQUE cheklovi qo'shildi
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

ALTER SEQUENCE tarixoylik_id_seq OWNED BY tarixoylik.id;
GRANT USAGE, SELECT ON SEQUENCE tarixoylik_id_seq TO hayyatuz_menugo_user;



