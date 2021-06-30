-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.24 - MySQL Community Server - GPL
-- SE du serveur:                Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour verretech-erp-db
CREATE DATABASE IF NOT EXISTS `verretech-erp-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `verretech-erp-db`;

-- Listage de la structure de la table verretech-erp-db. article
CREATE TABLE IF NOT EXISTS `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `categoryid` int DEFAULT NULL,
  `photoUrls` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('available','pending','sold') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'available',
  PRIMARY KEY (`id`),
  KEY `FK_article_category` (`categoryid`),
  CONSTRAINT `FK_article_category` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table verretech-erp-db.article : ~8 rows (environ)
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`id`, `name`, `categoryid`, `photoUrls`, `status`) VALUES
	(3, 'Insert F70 R', 5, 'insert0.jpg,insert1.jpg', 'pending'),
	(4, 'Insert F50 R', 5, 'insert1.jpg', 'available'),
	(5, 'Insert F30 R', 5, 'insert2.jpg', 'available'),
	(6, 'Saniclass', 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBF6rJvM_1EnSgYMNcEk_WPIZBybcPDKOPCvaMEwKcX77fzW4S5bBJqefuco&usqp=CAc', 'available'),
	(7, 'Porte de douche coulissante', 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgu0l4M7heohUq0zz3CAChQ0zPYvr2BLShF5KCafttdIwQMhijYqrOVx8SvQ&usqp=CAc', 'available'),
	(8, 'Porte de douche pivotante', 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1Sur5vkcajFqh58xL_nxN7Hkqn35oztzAaybMUXmln7VGkoyzDDc7EeI7-c&usqp=CAc', 'available'),
	(9, 'Porte de douche fixe', 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJNbjxaFMntIDWOwmkDV5kjm1Ns8VtgABEm5HajGWM6ji7UHH8qvSsIxnkINc&usqp=CAc', 'available');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- Listage de la structure de la table verretech-erp-db. category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Listage des données de la table verretech-erp-db.category : ~4 rows (environ)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `name`) VALUES
	(5, 'Inserts de cheminées'),
	(6, 'Portes de douche'),
	(7, 'Parroies de douche'),
	(8, 'Mirroirs'),
	(9, 'Verranda');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Listage de la structure de la table verretech-erp-db. inventory
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `articleid` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articleid` (`articleid`),
  CONSTRAINT `FK_inventory_article` FOREIGN KEY (`articleid`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table verretech-erp-db.inventory : ~6 rows (environ)
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` (`id`, `articleid`, `quantity`) VALUES
	(2, 5, 250),
	(3, 3, 700),
	(4, 6, 24),
	(6, 4, 15),
	(8, 8, 72),
	(9, 7, 17);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

-- Listage de la structure de la table verretech-erp-db. order
CREATE TABLE IF NOT EXISTS `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `quantity` int NOT NULL,
  `ship_date` date NOT NULL,
  `status` enum('placed','approved','delivered') NOT NULL,
  `complete` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `FK_order_article` (`article_id`) USING BTREE,
  CONSTRAINT `FK_order_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table verretech-erp-db.order : ~0 rows (environ)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Listage de la structure de la table verretech-erp-db. user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userStatus` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table verretech-erp-db.user : ~4 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `phone`, `userStatus`) VALUES
	(3, 'manu', 'Emmanuel', 'Bigeon', 'emmanuel.bigeon@viacesi.fr', '$2b$10$bMKb6N3hq1I8CpRtnfdtWeK/MyZCbdF3QrR1f5H3v3oJF/sUsk1P.', NULL, 5),
	(4, 'paps', 'Florian', 'Stock', 'florian.stock@viacesi.fr', '$2b$10$bMKb6N3hq1I8CpRtnfdtWeK/MyZCbdF3QrR1f5H3v3oJF/sUsk1P.', NULL, 5),
	(5, 'coco', 'Coralie', 'Cotret', 'coralie.cotret@viacesi.fr', '$2b$10$bMKb6N3hq1I8CpRtnfdtWeK/MyZCbdF3QrR1f5H3v3oJF/sUsk1P.', NULL, 5),
	(6, 'quentin', 'Quentin', 'Richard', 'quentin.richard@viacesi.fr', '$2b$10$bMKb6N3hq1I8CpRtnfdtWeK/MyZCbdF3QrR1f5H3v3oJF/sUsk1P.', NULL, 5);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
