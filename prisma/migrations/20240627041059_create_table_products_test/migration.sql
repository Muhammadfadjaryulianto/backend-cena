-- CreateTable
CREATE TABLE `Products_test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cover` VARCHAR(200) NOT NULL,
    `judul_buku` VARCHAR(100) NOT NULL,
    `nama_penulis` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `harga` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
