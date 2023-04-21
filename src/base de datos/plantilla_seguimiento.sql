-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2023 a las 21:25:56
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plantilla_seguimiento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compromisoscomportamentales`
--

CREATE TABLE `compromisoscomportamentales` (
  `ComC_Id` int(10) NOT NULL,
  `ComC_Numero` int(10) NOT NULL,
  `ComC_Descripcion` varchar(200) NOT NULL,
  `ProfesionalEvaluadoPro_Documento` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compromisosfucionales`
--

CREATE TABLE `compromisosfucionales` (
  `ComF_Id` int(10) NOT NULL,
  `ComF_Numero` int(10) NOT NULL,
  `ComF_Descripcion` varchar(200) NOT NULL,
  `ComF_PorPactado` decimal(19,0) NOT NULL,
  `ProfesionalEvaluadoPro_Documento` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato`
--

CREATE TABLE `formato` (
  `For_Id` int(10) NOT NULL,
  `For_Dia` int(10) NOT NULL,
  `For_Mes` int(10) NOT NULL,
  `For_Año` int(10) NOT NULL,
  `For_Periodo` int(10) NOT NULL,
  `For_TipoR` int(10) NOT NULL,
  `For_Version` int(10) NOT NULL,
  `For_Codigo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionalevaluado`
--

CREATE TABLE `profesionalevaluado` (
  `Pro_Documento` int(10) NOT NULL,
  `Pro_Nombre` varchar(50) NOT NULL,
  `Pro_Apellido` varchar(50) NOT NULL,
  `Pro_TipoId` varchar(100) NOT NULL,
  `Pro_Rol` varchar(100) NOT NULL,
  `Pro_Correo` varchar(200) NOT NULL,
  `Pro_Codigo` int(10) NOT NULL,
  `Pro_Grado` int(10) NOT NULL,
  `Pro_Dependencia` varchar(100) NOT NULL,
  `ProfesionalEvaluadorProE_Documento` int(10) NOT NULL,
  `ProfesionalComision` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionalevaluador`
--

CREATE TABLE `profesionalevaluador` (
  `ProE_Documento` int(10) NOT NULL,
  `ProE_Nombre` varchar(50) NOT NULL,
  `ProE_Apellido` varchar(50) NOT NULL,
  `ProE_Tipoid` varchar(100) NOT NULL,
  `ProE_Rol` varchar(100) NOT NULL,
  `ProE_Correo` varchar(200) NOT NULL,
  `ProE_Codigo` int(10) NOT NULL,
  `ProE_Grado` int(10) NOT NULL,
  `ProE_Dependencia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionalevaluadorcomision`
--

CREATE TABLE `profesionalevaluadorcomision` (
  `C_Documento` int(10) NOT NULL,
  `C_Nombre` varchar(50) NOT NULL,
  `C_Apellido` varchar(50) NOT NULL,
  `C_Tipoid` varchar(100) NOT NULL,
  `C_Rol` varchar(100) NOT NULL,
  `C_Codigo` int(10) NOT NULL,
  `C_Grado` int(10) NOT NULL,
  `C_Dependencia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Usu_Documento` int(10) NOT NULL,
  `Usu_Nombre` varchar(50) NOT NULL,
  `Usu_Apellido` varchar(50) NOT NULL,
  `Rol` varchar(40) NOT NULL,
  `Usu_Correo` varchar(100) NOT NULL,
  `Usu_Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compromisoscomportamentales`
--
ALTER TABLE `compromisoscomportamentales`
  ADD PRIMARY KEY (`ComC_Id`),
  ADD KEY `FKCompromiso274941` (`ProfesionalEvaluadoPro_Documento`);

--
-- Indices de la tabla `compromisosfucionales`
--
ALTER TABLE `compromisosfucionales`
  ADD PRIMARY KEY (`ComF_Id`),
  ADD KEY `FKCompromiso712185` (`ProfesionalEvaluadoPro_Documento`);

--
-- Indices de la tabla `profesionalevaluado`
--
ALTER TABLE `profesionalevaluado`
  ADD PRIMARY KEY (`Pro_Documento`),
  ADD KEY `FKProfesiona617748` (`ProfesionalEvaluadorProE_Documento`),
  ADD KEY `ProfesionalComision` (`ProfesionalComision`);

--
-- Indices de la tabla `profesionalevaluador`
--
ALTER TABLE `profesionalevaluador`
  ADD PRIMARY KEY (`ProE_Documento`);

--
-- Indices de la tabla `profesionalevaluadorcomision`
--
ALTER TABLE `profesionalevaluadorcomision`
  ADD PRIMARY KEY (`C_Documento`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Usu_Documento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compromisoscomportamentales`
--
ALTER TABLE `compromisoscomportamentales`
  MODIFY `ComC_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `compromisosfucionales`
--
ALTER TABLE `compromisosfucionales`
  MODIFY `ComF_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compromisoscomportamentales`
--
ALTER TABLE `compromisoscomportamentales`
  ADD CONSTRAINT `FKCompromiso274941` FOREIGN KEY (`ProfesionalEvaluadoPro_Documento`) REFERENCES `profesionalevaluado` (`Pro_Documento`);

--
-- Filtros para la tabla `compromisosfucionales`
--
ALTER TABLE `compromisosfucionales`
  ADD CONSTRAINT `FKCompromiso712185` FOREIGN KEY (`ProfesionalEvaluadoPro_Documento`) REFERENCES `profesionalevaluado` (`Pro_Documento`);

--
-- Filtros para la tabla `profesionalevaluado`
--
ALTER TABLE `profesionalevaluado`
  ADD CONSTRAINT `FKProfesiona617748` FOREIGN KEY (`ProfesionalEvaluadorProE_Documento`) REFERENCES `profesionalevaluador` (`ProE_Documento`),
  ADD CONSTRAINT `profesionalevaluado_ibfk_1` FOREIGN KEY (`ProfesionalComision`) REFERENCES `profesionalevaluadorcomision` (`C_Documento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
