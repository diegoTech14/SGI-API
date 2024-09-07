/*
  Warnings:

  - Added the required column `cb_compra` to the `T_Diagnostico` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `T_Diagnostico_cn_id_usuario_fkey` ON `t_diagnostico`;

-- DropIndex
DROP INDEX `T_Diagnostico_ct_codigo_incidencia_fkey` ON `t_diagnostico`;

-- DropIndex
DROP INDEX `T_Imagenes_cn_id_incidencia_fkey` ON `t_imagenes`;

-- DropIndex
DROP INDEX `T_Incidencias_cn_id_afectacion_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `T_Incidencias_cn_id_categoria_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `T_Incidencias_cn_id_estado_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `T_Incidencias_cn_id_prioridad_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `T_Incidencias_cn_id_riesgo_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `T_Incidencias_cn_id_usuario_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_usuarios_x_rol_cn_id_rol_fkey` ON `t_usuarios_x_rol`;

-- AlterTable
ALTER TABLE `t_diagnostico` ADD COLUMN `cb_compra` BOOLEAN NOT NULL;

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
ALTER TABLE `T_Diagnostico` ADD CONSTRAINT `T_Diagnostico_cn_id_usuario_fkey` FOREIGN KEY (`cn_id_usuario`) REFERENCES `T_usuarios`(`ct_cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Diagnostico` ADD CONSTRAINT `T_Diagnostico_ct_codigo_incidencia_fkey` FOREIGN KEY (`ct_codigo_incidencia`) REFERENCES `T_Incidencias`(`ct_codigo_incidencia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_T_Usuarios_x_Rol` ADD CONSTRAINT `_T_Usuarios_x_Rol_A_fkey` FOREIGN KEY (`A`) REFERENCES `T_Roles`(`cn_id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_T_Usuarios_x_Rol` ADD CONSTRAINT `_T_Usuarios_x_Rol_B_fkey` FOREIGN KEY (`B`) REFERENCES `T_usuarios`(`ct_cedula`) ON DELETE CASCADE ON UPDATE CASCADE;
