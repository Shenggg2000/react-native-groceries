-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 26, 2022 at 12:15 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wireless_application_development`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `amount` double(15,2) NOT NULL,
  `delivery_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `isCancel` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SKU` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_category_id` bigint(20) UNSIGNED NOT NULL,
  `price` double(15,2) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `img`, `desc`, `SKU`, `product_category_id`, `price`, `stock`) VALUES
(1, 'Baking Ingredients A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Baking Ingredients', 'k5oZK0lcTcPPbZO', 1, 74.00, 9),
(2, 'Baking Ingredients B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Baking Ingredients', 'Sm7JXxhueMLgQy4', 1, 10.00, 8),
(3, 'Biscuits & Cakes A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Biscuits & Cakes', 'Cz5vkzTIzFKyOUD', 2, 48.00, 4),
(4, 'Biscuits & Cakes B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Biscuits & Cakes', 'FFJWjQp30TFFZmk', 2, 99.00, 0),
(5, 'Canned Food A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Canned Food', 'XxJ9YyuwgN0imcZ', 3, 4.00, 7),
(6, 'Canned Food B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Canned Food', 's9Sxj3XVxF3kh9S', 3, 9.00, 5),
(7, 'Cereals A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Cereals', 'Vd3gEXXxTUid9gq', 4, 42.00, 6),
(8, 'Cereals B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Cereals', 'cm1UHCl5jP23ZLx', 4, 21.00, 10),
(9, 'Chocolates, Sweets & Jelly A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Chocolates, Sweets & Jelly', '4yTFdxuweRdBNua', 5, 53.00, 6),
(10, 'Chocolates, Sweets & Jelly B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Chocolates, Sweets & Jelly', 'oqQYJaCYWB29Nr8', 5, 28.00, 6),
(11, 'Commodities A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Commodities', 'JtFV87CWnrasIH1', 6, 27.00, 8),
(12, 'Commodities B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Commodities', '6vSTJjSRa6rgASX', 6, 51.00, 1),
(13, 'Jam, Spreads & Honey A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Jam, Spreads & Honey', 'pqWrfdvHxlW0SiA', 7, 20.00, 2),
(14, 'Jam, Spreads & Honey B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Jam, Spreads & Honey', 'qd9nhRSpcvoXVrk', 7, 28.00, 1),
(15, 'Organic Food A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Organic Food', 'U057gI5Hzr9TCu6', 8, 16.00, 7),
(16, 'Organic Food B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Organic Food', 'Rx6aYp18BgeT5Xf', 8, 72.00, 10),
(17, 'Pasta & Instant Food A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Pasta & Instant Food', 'PfWqUHyUeSexr0G', 9, 27.00, 9),
(18, 'Pasta & Instant Food B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Pasta & Instant Food', 'dDbbf5H5tFbo6jo', 9, 47.00, 7),
(19, 'Sauce, Spice & Seasoning A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Sauce, Spice & Seasoning', 'aMxOojLYrVcIpAv', 10, 2.00, 5),
(20, 'Sauce, Spice & Seasoning B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Sauce, Spice & Seasoning', 'We6PN6LIW5Qpm7T', 10, 42.00, 5),
(21, 'Snacks A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Snacks', 'eTN46I6J5vEd0ve', 11, 43.00, 7),
(22, 'Snacks B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Snacks', 'sOTSGJBDvApG5FL', 11, 55.00, 10),
(23, 'Sundry A', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Sundry', 'iGIKJYc3u41nFtl', 12, 34.00, 6),
(24, 'Sundry B', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'This Sundry', 'JVppb9OnPCh4ZMl', 12, 63.00, 7);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`) VALUES
(1, 'Baking Ingredients'),
(2, 'Biscuits & Cakes'),
(3, 'Canned Food'),
(4, 'Cereals'),
(5, 'Chocolates, Sweets & Jelly'),
(6, 'Commodities'),
(7, 'Jam, Spreads & Honey'),
(8, 'Organic Food'),
(9, 'Pasta & Instant Food'),
(10, 'Sauce, Spice & Seasoning'),
(11, 'Snacks'),
(12, 'Sundry');

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

DROP TABLE IF EXISTS `product_order`;
CREATE TABLE IF NOT EXISTS `product_order` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
