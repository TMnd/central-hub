CREATE TABLE cat_shelve_products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    bar_code text NOT NULL,
    product_name TEXT NOT NULL,
    product_code TEXT NOT NULL,
    shelve_code TEXT UNIQUE NOT NULL,
    expiration_date TIMESTAMPTZ NOT NULL,
    insert_date timestamp NOT NULL,
    description TEXT
);