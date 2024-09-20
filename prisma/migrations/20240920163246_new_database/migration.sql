-- CreateTable
CREATE TABLE `roles` (
    `rol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `system` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `roles_rol_id_key`(`rol_id`),
    PRIMARY KEY (`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `general_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `system` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `general_log_log_id_key`(`log_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `dni` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_surname` VARCHAR(191) NOT NULL,
    `second_surname` VARCHAR(191) NOT NULL,
    `phone` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `department` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_dni_key`(`dni`),
    PRIMARY KEY (`dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_x_incident` (
    `assign_code` INTEGER NOT NULL AUTO_INCREMENT,
    `user_dni_fk` VARCHAR(11) NOT NULL,
    `incident_id_fk` VARCHAR(12) NOT NULL,
    `assign_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_x_incident_assign_code_key`(`assign_code`),
    PRIMARY KEY (`assign_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_change_status_incident` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `incident_id` VARCHAR(12) NOT NULL,
    `change_date` DATETIME(3) NOT NULL,
    `current_status` INTEGER NOT NULL,
    `previous_state` INTEGER NOT NULL,
    `user_dni` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `log_change_status_incident_log_id_key`(`log_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_x_incidents` (
    `user_dni` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_dni`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_effects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `incident_effects_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `incident_categories_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `incident_status_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_risks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `incident_risks_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_priorities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `incident_priorities_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incidents` (
    `incident_id` VARCHAR(11) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `close_justification` VARCHAR(191) NOT NULL,
    `incident_place` VARCHAR(191) NOT NULL,
    `record_date` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `time_to_solve` INTEGER NOT NULL,
    `user_dni` VARCHAR(11) NOT NULL,
    `effect_id` INTEGER NOT NULL,
    `risk_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `prority_id` INTEGER NOT NULL,
    `status_id` INTEGER NOT NULL,

    UNIQUE INDEX `incidents_incident_id_key`(`incident_id`),
    PRIMARY KEY (`incident_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnosis` (
    `diagnosis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `diagnosis_date` DATETIME(3) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `estimated_time` INTEGER NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `buy` BOOLEAN NOT NULL,
    `user_dni` VARCHAR(11) NOT NULL,
    `incident_id` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `diagnosis_diagnosis_id_key`(`diagnosis_id`),
    PRIMARY KEY (`diagnosis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_users_x_rol` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_users_x_rol_AB_unique`(`A`, `B`),
    INDEX `_users_x_rol_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `general_log` ADD CONSTRAINT `general_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_x_incident` ADD CONSTRAINT `user_x_incident_user_dni_fk_fkey` FOREIGN KEY (`user_dni_fk`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_x_incident` ADD CONSTRAINT `user_x_incident_incident_id_fk_fkey` FOREIGN KEY (`incident_id_fk`) REFERENCES `incidents`(`incident_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_change_status_incident` ADD CONSTRAINT `log_change_status_incident_incident_id_fkey` FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`incident_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_change_status_incident` ADD CONSTRAINT `log_change_status_incident_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_x_incidents` ADD CONSTRAINT `users_x_incidents_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_x_incidents` ADD CONSTRAINT `users_x_incidents_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_effect_id_fkey` FOREIGN KEY (`effect_id`) REFERENCES `incident_effects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_risk_id_fkey` FOREIGN KEY (`risk_id`) REFERENCES `incident_risks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `incident_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_prority_id_fkey` FOREIGN KEY (`prority_id`) REFERENCES `incident_priorities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `incident_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis` ADD CONSTRAINT `diagnosis_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis` ADD CONSTRAINT `diagnosis_incident_id_fkey` FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`incident_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_users_x_rol` ADD CONSTRAINT `_users_x_rol_A_fkey` FOREIGN KEY (`A`) REFERENCES `roles`(`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_users_x_rol` ADD CONSTRAINT `_users_x_rol_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;
