CREATE TABLE Usuarios (
  Usu_Nombre   varchar(50) NOT NULL, 
  Usu_Apellido varchar(50) NOT NULL, 
  Usu_Correo   varchar(100) NOT NULL, 
  Usu_Password varchar(100) NOT NULL, 
  Usu_Username varchar(100) NOT NULL);
CREATE TABLE ProfesionalEvaluado (
  Pro_Documento                      int(10) NOT NULL AUTO_INCREMENT, 
  Pro_Nombre                         varchar(50) NOT NULL, 
  Pro_Apellido                       varchar(50) NOT NULL, 
  Pro_TipoId                         varchar(100) NOT NULL, 
  Pro_Rol                            varchar(100) NOT NULL, 
  Pro_Correo                         varchar(200) NOT NULL, 
  Pro_Codigo                         int(10) NOT NULL, 
  Pro_Grado                          int(10) NOT NULL, 
  Pro_Dependencia                    varchar(100) NOT NULL, 
  ProfesionalEvaluadorProE_Documento int(10) NOT NULL, 
  PRIMARY KEY (Pro_Documento));
CREATE TABLE ProfesionalEvaluador (
  ProE_Documento   int(10) NOT NULL AUTO_INCREMENT, 
  ProE_Nombre      varchar(50) NOT NULL, 
  ProE_Apellido    varchar(50) NOT NULL, 
  ProE_Tipoid      varchar(100) NOT NULL, 
  ProE_Rol         varchar(100) NOT NULL, 
  ProE_Correo      varchar(200) NOT NULL, 
  ProE_Codigo      int(10) NOT NULL, 
  ProE_Grado       int(10) NOT NULL, 
  ProE_Dependencia varchar(100) NOT NULL, 
  PRIMARY KEY (ProE_Documento));
CREATE TABLE CompromisosFucionales (
  ComF_Id                          int(10) NOT NULL AUTO_INCREMENT, 
  ComF_Numero                      int(10) NOT NULL, 
  ComF_Descripcion                 varchar(200) NOT NULL, 
  ComF_PorPactado                  decimal(19, 0) NOT NULL, 
  ProfesionalEvaluadoPro_Documento int(10) NOT NULL, 
  PRIMARY KEY (ComF_Id));
CREATE TABLE CompromisosComportamentales (
  ComC_Id                          int(10) NOT NULL AUTO_INCREMENT, 
  ComC_Numero                      int(10) NOT NULL, 
  ComC_Descripcion                 varchar(200) NOT NULL, 
  ProfesionalEvaluadoPro_Documento int(10) NOT NULL, 
  PRIMARY KEY (ComC_Id));
CREATE TABLE Formato (
  For_Id      int(10) NOT NULL, 
  For_Dia     int(10) NOT NULL, 
  For_Mes     int(10) NOT NULL, 
  For_Año     int(10) NOT NULL, 
  For_Periodo int(10) NOT NULL, 
  For_TipoR   int(10) NOT NULL, 
  For_Version int(10) NOT NULL, 
  For_Codigo  int(10) NOT NULL);
CREATE TABLE ProfesionalEvaluadorComision (
  C_Documento                        int(10) NOT NULL AUTO_INCREMENT, 
  C_Nombre                           varchar(50) NOT NULL, 
  C_Apellido                         varchar(50) NOT NULL, 
  C_Tipoid                           varchar(100) NOT NULL, 
  C_Rol                              varchar(100) NOT NULL, 
  C_Codigo                           int(10) NOT NULL, 
  C_Grado                            int(10) NOT NULL, 
  C_Dependencia                      varchar(100) NOT NULL, 
  ProfesionalEvaluadorProE_Documento int(10) NOT NULL, 
  PRIMARY KEY (C_Documento));
ALTER TABLE ProfesionalEvaluado ADD CONSTRAINT FKProfesiona617748 FOREIGN KEY (ProfesionalEvaluadorProE_Documento) REFERENCES ProfesionalEvaluador (ProE_Documento);
ALTER TABLE CompromisosFucionales ADD CONSTRAINT FKCompromiso712185 FOREIGN KEY (ProfesionalEvaluadoPro_Documento) REFERENCES ProfesionalEvaluado (Pro_Documento);
ALTER TABLE CompromisosComportamentales ADD CONSTRAINT FKCompromiso274941 FOREIGN KEY (ProfesionalEvaluadoPro_Documento) REFERENCES ProfesionalEvaluado (Pro_Documento);
ALTER TABLE ProfesionalEvaluadorComision ADD CONSTRAINT FKProfesiona663654 FOREIGN KEY (ProfesionalEvaluadorProE_Documento) REFERENCES ProfesionalEvaluador (ProE_Documento);
