-- CreateTable
CREATE TABLE `T_Imagenes` (
    `cn_id_imagen` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_ruta_imagen` VARCHAR(191) NOT NULL,
    `cb_tipo_imagen` BOOLEAN NOT NULL,
    `cn_id_incidencia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `T_Imagenes_cn_id_imagen_key`(`cn_id_imagen`),
    PRIMARY KEY (`cn_id_imagen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Roles` (
    `cn_id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_Descripcion` VARCHAR(191) NOT NULL,
    `ct_Sistema` VARCHAR(191) NOT NULL,
    `cb_estado` BOOLEAN NOT NULL,

    UNIQUE INDEX `T_Roles_cn_id_rol_key`(`cn_id_rol`),
    PRIMARY KEY (`cn_id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_usuarios` (
    `ct_cedula` VARCHAR(191) NOT NULL,
    `ct_nombre` VARCHAR(191) NOT NULL,
    `ct_apellido_uno` VARCHAR(191) NOT NULL,
    `ct_apellido_dos` VARCHAR(191) NOT NULL,
    `cn_telefono` INTEGER NULL,
    `ct_correo` VARCHAR(191) NOT NULL,
    `ct_puesto` VARCHAR(191) NOT NULL,
    `ct_departamento` INTEGER NOT NULL,
    `cb_estado` BOOLEAN NOT NULL,
    `ct_contrasena` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ct_cedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_usuarios_x_rol` (
    `ct_cedula` VARCHAR(191) NOT NULL,
    `cn_id_rol` INTEGER NOT NULL,

    PRIMARY KEY (`ct_cedula`, `cn_id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Afectaciones` (
    `cn_id_afectacion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `T_Afectaciones_cn_id_afectacion_key`(`cn_id_afectacion`),
    PRIMARY KEY (`cn_id_afectacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Categorias` (
    `cn_id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `T_Categorias_cn_id_categoria_key`(`cn_id_categoria`),
    PRIMARY KEY (`cn_id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Estados` (
    `cn_id_estado` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `T_Estados_cn_id_estado_key`(`cn_id_estado`),
    PRIMARY KEY (`cn_id_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Riesgos` (
    `cn_id_riesgo` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `T_Riesgos_cn_id_riesgo_key`(`cn_id_riesgo`),
    PRIMARY KEY (`cn_id_riesgo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Prioridades` (
    `cn_id_prioridad` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `T_Prioridades_cn_id_prioridad_key`(`cn_id_prioridad`),
    PRIMARY KEY (`cn_id_prioridad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Incidencias` (
    `ct_codigo_incidencia` VARCHAR(11) NOT NULL,
    `ct_nombre` VARCHAR(191) NOT NULL,
    `ct_descripcion` VARCHAR(191) NOT NULL,
    `ct_justificacion_cierre` VARCHAR(191) NOT NULL,
    `ct_lugar_incidencia` VARCHAR(191) NOT NULL,
    `cf_fecha_registro` DATETIME(3) NOT NULL,
    `cd_costo` DOUBLE NOT NULL,
    `cn_duracion_gestion` INTEGER NOT NULL,
    `cn_id_usuario` VARCHAR(11) NOT NULL,
    `cn_id_afectacion` INTEGER NOT NULL,
    `cn_id_riesgo` INTEGER NOT NULL,
    `cn_id_categoria` INTEGER NOT NULL,
    `cn_id_prioridad` INTEGER NOT NULL,
    `cn_id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `T_Incidencias_ct_codigo_incidencia_key`(`ct_codigo_incidencia`),
    PRIMARY KEY (`ct_codigo_incidencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_T_Usuarios_x_Rol` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_T_Usuarios_x_Rol_AB_unique`(`A`, `B`),
    INDEX `_T_Usuarios_x_Rol_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `T_Imagenes` ADD CONSTRAINT `T_Imagenes_cn_id_incidencia_fkey` FOREIGN KEY (`cn_id_incidencia`) REFERENCES `T_Incidencias`(`ct_codigo_incidencia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_usuarios_x_rol` ADD CONSTRAINT `t_usuarios_x_rol_ct_cedula_fkey` FOREIGN KEY (`ct_cedula`) REFERENCES `T_usuarios`(`ct_cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_usuarios_x_rol` ADD CONSTRAINT `t_usuarios_x_rol_cn_id_rol_fkey` FOREIGN KEY (`cn_id_rol`) REFERENCES `T_Roles`(`cn_id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Incidencias` ADD CONSTRAINT `T_Incidencias_cn_id_usuario_fkey` FOREIGN KEY (`cn_id_usuario`) REFERENCES `T_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Incidencias` ADD CONSTRAINT `T_Incidencias_cn_id_afectacion_fkey` FOREIGN KEY (`cn_id_afectacion`) REFERENCES `T_Afectaciones`(`cn_id_afectacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Incidencias` ADD CONSTRAINT `T_Incidencias_cn_id_riesgo_fkey` FOREIGN KEY (`cn_id_riesgo`) REFERENCES `T_Riesgos`(`cn_id_riesgo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Incidencias` ADD CONSTRAINT `T_Incidencias_cn_id_categoria_fkey` FOREIGN KEY (`cn_id_categoria`) REFERENCES `T_Categorias`(`cn_id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Incidencias` ADD CONSTRAINT `T_Incidencias_cn_id_prioridad_fkey` FOREIGN KEY (`cn_id_prioridad`) REFERENCES `T_Prioridades`(`cn_id_prioridad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Incidencias` ADD CONSTRAINT `T_Incidencias_cn_id_estado_fkey` FOREIGN KEY (`cn_id_estado`) REFERENCES `T_Estados`(`cn_id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_T_Usuarios_x_Rol` ADD CONSTRAINT `_T_Usuarios_x_Rol_A_fkey` FOREIGN KEY (`A`) REFERENCES `T_Roles`(`cn_id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_T_Usuarios_x_Rol` ADD CONSTRAINT `_T_Usuarios_x_Rol_B_fkey` FOREIGN KEY (`B`) REFERENCES `T_usuarios`(`ct_cedula`) ON DELETE CASCADE ON UPDATE CASCADE;
