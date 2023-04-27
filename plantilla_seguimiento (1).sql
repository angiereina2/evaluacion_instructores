-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-04-2023 a las 20:51:12
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compromisoscomportamentales`
--

INSERT INTO `compromisoscomportamentales` (`ComC_Id`, `ComC_Numero`, `ComC_Descripcion`, `ProfesionalEvaluadoPro_Documento`) VALUES
(3, 1, 'ERTRYTYUUII', 36521489),
(4, 1, 'trabajo en equipo', 28540),
(5, 2, 'utilizacion de elementos de proteccion', 28540);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compromisosfucionales`
--

INSERT INTO `compromisosfucionales` (`ComF_Id`, `ComF_Numero`, `ComF_Descripcion`, `ComF_PorPactado`, `ProfesionalEvaluadoPro_Documento`) VALUES
(5, 1, 'WERTY56UI', '40', 36521489),
(6, 2, 'FRRTGYUIO', '20', 36521489),
(7, 1, 'cumplimiento de horarios', '50', 28540),
(8, 2, 'sdfghj', '20', 28540);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesionalevaluado`
--

INSERT INTO `profesionalevaluado` (`Pro_Documento`, `Pro_Nombre`, `Pro_Apellido`, `Pro_TipoId`, `Pro_Rol`, `Pro_Correo`, `Pro_Codigo`, `Pro_Grado`, `Pro_Dependencia`, `ProfesionalEvaluadorProE_Documento`, `ProfesionalComision`) VALUES
(28540, 'oswaldo', 'perez', 'Cédula de Ciudadania', 'instructor', 'oswaldo@gmail.com', 5652, 3, 'administracion', 4041432, 1),
(256314, 'PAOLA LINARES', 'LINARES', 'Cédula', 'INSTRUCTOR', 'PAOLA@MISENA.EDU.CO', 6523, 5, 'CENIGRAF', 3652145, 321456),
(36521489, 'MARTHA ROJAS', 'ROJAS', 'Cédula', 'INSTRUCTOR', 'MARTHA@MISENA.EDU.CO', 2563, 5, 'CENIGRAF', 3652145, 321456),
(69854725, 'PABLO HURTADO', 'HURTADO', 'Cédula', 'INSTRUCTOR', 'PABLO@MISENA.EDU.CO', 9856, 2, 'CENIGRAF', 1, 321456);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesionalevaluador`
--

INSERT INTO `profesionalevaluador` (`ProE_Documento`, `ProE_Nombre`, `ProE_Apellido`, `ProE_Tipoid`, `ProE_Rol`, `ProE_Correo`, `ProE_Codigo`, `ProE_Grado`, `ProE_Dependencia`) VALUES
(1, '', '', '', '', '', 0, 0, ''),
(3652145, 'LUIS PEREZ', 'PEREZ', '', 'INSTRUCTOR', 'LUIS@MISENA.EDU.CO', 5235, 3, 'CENIGRAF'),
(4041432, 'johana', 'cifuentes', 'Cédula', 'instructor', 'ljcm19@gmail.com', 2323, 11, 'coordinacion');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesionalevaluadorcomision`
--

INSERT INTO `profesionalevaluadorcomision` (`C_Documento`, `C_Nombre`, `C_Apellido`, `C_Tipoid`, `C_Rol`, `C_Codigo`, `C_Grado`, `C_Dependencia`) VALUES
(1, '', '', '', '', 0, 0, ''),
(321456, 'ALBERTO MORALES', 'MORALES', 'Cédula', 'INSTRUCTOR', 3214, 2, 'CENIGRAF');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Usu_Documento`, `Usu_Nombre`, `Usu_Apellido`, `Rol`, `Usu_Correo`, `Usu_Password`) VALUES
(2131202, 'aswedfrgg', 'qwer', 'admin', 'hola@gmail.com', '1234');

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
  MODIFY `ComC_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `compromisosfucionales`
--
ALTER TABLE `compromisosfucionales`
  MODIFY `ComF_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
