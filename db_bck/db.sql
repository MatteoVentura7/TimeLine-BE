-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              8.0.30 - MySQL Community Server - GPL
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database time_line_db
DROP DATABASE IF EXISTS `time_line_db`;
CREATE DATABASE IF NOT EXISTS `time_line_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `time_line_db`;

-- Dump della struttura di tabella time_line_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `emailToken` varchar(255) DEFAULT NULL,
  `isConfirmed` tinyint(1) DEFAULT '0',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella time_line_db.user: ~12 rows (circa)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `name`, `surname`, `email`, `password`, `emailToken`, `isConfirmed`, `role`, `resetToken`) VALUES
	(1, 'Matteo', 'Ventura', 'matteo.ventura18@gmail.com', '$2b$10$KX9zTwRVrHLBjT1W6jHnpOzd7udKb3NVvGB.X5H2DLKEQ3DBMW6Dm', NULL, 1, 'Admin', NULL),
	(2, 'Mario', 'Rossi', 'matteoventura52@gmail.com', '$2b$10$N6a7QbXRMD3J8pz9VbCsMO/Fd1ywp/y7xl1HSjfyev2m.QrULmuSm', 'bf624beca45347350fb452de13f4cce55fee0d2de710a837f3e069d30a267418', 1, 'Guest', NULL),
	(3, 'Giuseppe', 'bianco', 'g@email.com', '$2b$10$cBdaI07L7ppa8OGG3Bo4sOaCMQrMr3UdEOao4wnxWMeINLI64mBqa', '1ddf61db7adba45f2180d080dc8c9f6d8aed3b9e9e42d2248effe1c4e358d878', 1, 'Guest', NULL),
	(4, 'alessandro', 'scopece', 'a@email.com', '$2b$10$.erxKfgx7AUwx66WqppwEOO1vUVyri/9U2nFZ1UR1rQ7o/HKjYK/O', 'b7aa4fe43f3b148874d340fbbd63127de91416511d75d4455656bcfae4781b93', 1, 'Guest', NULL),
	(6, 'raffaele', 'graziano', 'r@email.com', '$2b$10$5acdUTjYvA5SAEtRNqZ/1eT/l9gu9U6qMjAhq5hAb8AfXYn6MJ256', '1d1c1e7941435329a83a8bc300f182ea7541fe6ffa7867aaac8b8329ea86e8f9', 1, 'Guest', NULL),
	(7, 'alessandro', 'Rossi', 'al@email.com', '$2b$10$.1T7HwrVn541Md29J5T7xekOBVfjWMhVke4DydojpTBsNmGmJovSm', 'd4ded07b0576194c0a792bc753c51e02144697745d45c13a38836a19d3c8086a', 0, 'Guest', NULL),
	(8, 'andrea ', 'bianco', 'ab@email.com', '$2b$10$wRfPopF.NJKIOU6O9oQGKOkLSVQni7tTwRboohKMEYvPER1IvhOv2', '940910664094fff81fecb304819c22b3f182343244cd1e1e0a781956a535b2e2', 0, 'User', NULL),
	(9, 'Matteo', 'Ventura', 'z@gmail.com', '$2b$10$O862LJT9bkjo7hStJevFh.oMfEIHfui2.KMDFpW1mfTt4EoBU41GO', 'ef66599ea3374f8a42dd46ee9b9e939533be0dcc40c597858188d973df9973a6', 0, 'User', NULL),
	(10, 'Matteo', 'caputo', 'e@gmail.com', '$2b$10$vJPbn1quVA2NvepNScrleOsyUtlhtk63CoebAbQx8HMSO.Ml7Knie', '7ed80833c05316d58d2676fa45f391dd7e48bdf5292a3fe353df39e5436a45d0', 0, 'User', NULL),
	(11, 'andrea ', 'fiore', 'f@gmail.com', '$2b$10$kgrzMq2CsQz4C4GdDX16JeDpo4IT1lDojzHGv.1m6N4iqFEmChG3C', '4e3a4d44a82772d359627f01e6f82649faba332500bc336d6e39ae3c3c503a96', 0, 'Guest', NULL),
	(12, 'Matteo', 'graziano', 'gm@email.com', '$2b$10$xpN9Msld9ezrS/asQkoRo.zrqwI39BLOwZ1IbVYgJ/vZpL6vOOZOW', 'b34f9666e49f07a81f6c757bcd52dc390099d7c268fcdca871efc59ebb2270b5', 0, 'User', NULL),
	(13, 'andrea ', 'Ventura', 'g@gmail.com', '$2b$10$vC5T/5RLUL8yqW2Vh5udqeqeaHgtub1yi1BsLzsshlSz/.3xR0yO6', 'a037953082d5408b96bc8b6fb40d30b62ddddc4a15a3572e07c12f2fb2a2c0e5', 0, 'Guest', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
