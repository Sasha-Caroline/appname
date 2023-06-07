--------------------------------------------
---------------- CADASTRO ------------------
--------------------------------------------


-- [TABLE] CADASTRO
CREATE TABLE  IF NOT EXISTS "APPNAME".CADASTRO (
    ID_USER BIGINT PRIMARY KEY NOT NULL,
    NOME VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(225) NOT NULL
);

