-- DropIndex
DROP INDEX `T_Bitacora_Cambio_Estado_ct_cedula_usuario_fkey` ON `t_bitacora_cambio_estado`;

-- DropIndex
DROP INDEX `T_Bitacora_Cambio_Estado_ct_codigo_incidencia_fkey` ON `t_bitacora_cambio_estado`;

-- DropIndex
DROP INDEX `T_Bitacora_General_cn_id_usuario_fkey` ON `t_bitacora_general`;

-- DropIndex
DROP INDEX `T_Bitacora_General_ct_codigo_pantalla_fkey` ON `t_bitacora_general`;

-- DropIndex
DROP INDEX `T_Diagnostico_cn_id_usuario_fkey` ON `t_diagnostico`;

-- DropIndex
DROP INDEX `T_Diagnostico_ct_codigo_incidencia_fkey` ON `t_diagnostico`;

-- DropIndex
DROP INDEX `T_Imagenes_cn_id_diagnostico_fkey` ON `t_imagenes`;

-- DropIndex
DROP INDEX `T_Imagenes_cn_id_incidencia_fkey` ON `t_imagenes`;

-- DropIndex
DROP INDEX `t_incidencias_cn_id_afectacion_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_id_categoria_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_id_estado_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_id_prioridad_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_id_riesgo_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_id_usuario_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `T_Usuario_X_Incidencia_ct_cedula_usuario_fkey` ON `t_usuario_x_incidencia`;

-- DropIndex
DROP INDEX `T_Usuario_X_Incidencia_ct_codigo_incidencia_fkey` ON `t_usuario_x_incidencia`;

-- DropIndex
DROP INDEX `t_usuarios_x_rol_cn_id_rol_fkey` ON `t_usuarios_x_rol`;

-- AddForeignKey
ALTER TABLE `t_imagenes` ADD CONSTRAINT `t_imagenes_cn_id_incidencia_fkey` FOREIGN KEY (`cn_id_incidencia`) REFERENCES `t_incidencias`(`ct_codigo_incidencia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_imagenes` ADD CONSTRAINT `t_imagenes_cn_id_diagnostico_fkey` FOREIGN KEY (`cn_id_diagnostico`) REFERENCES `t_diagnostico`(`cn_id_diagnostico`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_bitacora_general` ADD CONSTRAINT `t_bitacora_general_cn_id_usuario_fkey` FOREIGN KEY (`cn_id_usuario`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_bitacora_general` ADD CONSTRAINT `t_bitacora_general_ct_codigo_pantalla_fkey` FOREIGN KEY (`ct_codigo_pantalla`) REFERENCES `t_pantalla`(`cn_codio_pantalla`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_usuario_x_incidencia` ADD CONSTRAINT `t_usuario_x_incidencia_ct_cedula_usuario_fkey` FOREIGN KEY (`ct_cedula_usuario`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_usuario_x_incidencia` ADD CONSTRAINT `t_usuario_x_incidencia_ct_codigo_incidencia_fkey` FOREIGN KEY (`ct_codigo_incidencia`) REFERENCES `t_incidencias`(`ct_codigo_incidencia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_bitacora_cambio_estado` ADD CONSTRAINT `t_bitacora_cambio_estado_ct_codigo_incidencia_fkey` FOREIGN KEY (`ct_codigo_incidencia`) REFERENCES `t_incidencias`(`ct_codigo_incidencia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_bitacora_cambio_estado` ADD CONSTRAINT `t_bitacora_cambio_estado_ct_cedula_usuario_fkey` FOREIGN KEY (`ct_cedula_usuario`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_usuarios_x_rol` ADD CONSTRAINT `t_usuarios_x_rol_ct_cedula_fkey` FOREIGN KEY (`ct_cedula`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_usuarios_x_rol` ADD CONSTRAINT `t_usuarios_x_rol_cn_id_rol_fkey` FOREIGN KEY (`cn_id_rol`) REFERENCES `t_roles`(`cn_id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_id_usuario_fkey` FOREIGN KEY (`cn_id_usuario`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_id_afectacion_fkey` FOREIGN KEY (`cn_id_afectacion`) REFERENCES `t_afectaciones`(`cn_id_afectacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_id_riesgo_fkey` FOREIGN KEY (`cn_id_riesgo`) REFERENCES `t_riesgos`(`cn_id_riesgo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_id_categoria_fkey` FOREIGN KEY (`cn_id_categoria`) REFERENCES `t_categorias`(`cn_id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_id_prioridad_fkey` FOREIGN KEY (`cn_id_prioridad`) REFERENCES `t_prioridades`(`cn_id_prioridad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_id_estado_fkey` FOREIGN KEY (`cn_id_estado`) REFERENCES `t_estados`(`cn_id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_diagnostico` ADD CONSTRAINT `t_diagnostico_cn_id_usuario_fkey` FOREIGN KEY (`cn_id_usuario`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_diagnostico` ADD CONSTRAINT `t_diagnostico_ct_codigo_incidencia_fkey` FOREIGN KEY (`ct_codigo_incidencia`) REFERENCES `t_incidencias`(`ct_codigo_incidencia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_t_usuarios_x_rol` ADD CONSTRAINT `_t_usuarios_x_rol_A_fkey` FOREIGN KEY (`A`) REFERENCES `t_roles`(`cn_id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_t_usuarios_x_rol` ADD CONSTRAINT `_t_usuarios_x_rol_B_fkey` FOREIGN KEY (`B`) REFERENCES `t_usuarios`(`ct_cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_t_usuarios_x_rol` RENAME INDEX `_T_Usuarios_x_Rol_AB_unique` TO `_t_usuarios_x_rol_AB_unique`;

-- RenameIndex
ALTER TABLE `_t_usuarios_x_rol` RENAME INDEX `_T_Usuarios_x_Rol_B_index` TO `_t_usuarios_x_rol_B_index`;

-- RenameIndex
ALTER TABLE `t_afectaciones` RENAME INDEX `T_Afectaciones_cn_id_afectacion_key` TO `t_afectaciones_cn_id_afectacion_key`;

-- RenameIndex
ALTER TABLE `t_bitacora_cambio_estado` RENAME INDEX `T_Bitacora_Cambio_Estado_cn_codig_bitacora_key` TO `t_bitacora_cambio_estado_cn_codig_bitacora_key`;

-- RenameIndex
ALTER TABLE `t_bitacora_general` RENAME INDEX `T_Bitacora_General_cn_codigo_key` TO `t_bitacora_general_cn_codigo_key`;

-- RenameIndex
ALTER TABLE `t_categorias` RENAME INDEX `T_Categorias_cn_id_categoria_key` TO `t_categorias_cn_id_categoria_key`;

-- RenameIndex
ALTER TABLE `t_diagnostico` RENAME INDEX `T_Diagnostico_cn_id_diagnostico_key` TO `t_diagnostico_cn_id_diagnostico_key`;

-- RenameIndex
ALTER TABLE `t_estados` RENAME INDEX `T_Estados_cn_id_estado_key` TO `t_estados_cn_id_estado_key`;

-- RenameIndex
ALTER TABLE `t_imagenes` RENAME INDEX `T_Imagenes_cn_id_imagen_key` TO `t_imagenes_cn_id_imagen_key`;

-- RenameIndex
ALTER TABLE `t_pantalla` RENAME INDEX `T_Pantalla_cn_codio_pantalla_key` TO `t_pantalla_cn_codio_pantalla_key`;

-- RenameIndex
ALTER TABLE `t_prioridades` RENAME INDEX `T_Prioridades_cn_id_prioridad_key` TO `t_prioridades_cn_id_prioridad_key`;

-- RenameIndex
ALTER TABLE `t_riesgos` RENAME INDEX `T_Riesgos_cn_id_riesgo_key` TO `t_riesgos_cn_id_riesgo_key`;

-- RenameIndex
ALTER TABLE `t_roles` RENAME INDEX `T_Roles_cn_id_rol_key` TO `t_roles_cn_id_rol_key`;

-- RenameIndex
ALTER TABLE `t_usuario_x_incidencia` RENAME INDEX `T_Usuario_X_Incidencia_cn_codigo_asignacion_key` TO `t_usuario_x_incidencia_cn_codigo_asignacion_key`;
