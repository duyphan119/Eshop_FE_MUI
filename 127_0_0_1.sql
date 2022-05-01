-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2022 at 06:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my-shop`
--
CREATE DATABASE IF NOT EXISTS `my-shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `my-shop`;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_color_size_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_color_size_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(21, 1, 34, 1, '2022-04-13 14:26:43', '2022-04-13 14:26:43');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `group_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `full_name`, `short_name`, `description`, `icon`, `thumbnail`, `slug`, `createdAt`, `updatedAt`, `group_category_id`) VALUES
(1, 'Áo thun nam', 'Áo thun', '', 'https://cdn-icons-png.flaticon.com/64/892/892458.png', '', 'ao-thun-nam', '2022-04-09 17:10:12', '2022-04-09 17:10:12', 2),
(2, 'Áo Polo Nam', 'Áo Polo', '', 'https://cdn-icons-png.flaticon.com/64/343/343418.png', '', 'ao-polo-nam', '2022-04-09 17:10:12', '2022-04-09 17:10:12', 2),
(3, 'Áo Polo nữ', 'Áo Polo', '', 'https://cdn-icons-png.flaticon.com/64/2161/2161014.png', '', 'ao-polo-nu', '2022-04-14 13:27:20', '2022-04-14 13:27:20', 5),
(4, 'Áo Polo trẻ em', 'Áo Polo', '', 'https://cdn-icons-png.flaticon.com/64/343/343418.png', '', 'ao-polo-tre-em', '2022-04-14 13:27:20', '2022-04-14 13:27:20', 8),
(5, 'Quần kaki nam', 'Quần kaki', '', 'https://cdn-icons-png.flaticon.com/64/2093/2093933.png', '', 'quan-kaki-nam', '2022-04-22 07:46:16', '2022-04-22 07:46:16', 3),
(6, 'Quần jean nam', 'Quần jean', '', 'https://cdn-icons-png.flaticon.com/64/776/776623.png', '', 'quan-jean-nam', '2022-04-22 07:46:16', '2022-04-22 07:46:16', 3),
(7, 'Ví nam', 'Ví', '', 'https://cdn-icons-png.flaticon.com/64/1040/1040980.png', '', 'vi-nam', '2022-04-22 07:47:38', '2022-04-22 07:47:38', 4),
(8, 'Thắt lưng nam', 'Thắt lưng', '', 'https://cdn-icons-png.flaticon.com/64/1154/1154828.png', '', 'that-lung-nam', '2022-04-22 07:47:38', '2022-04-22 07:47:38', 4),
(12, 'Áo sơ mi nữ', 'Áo sơ mi', '', 'https://cdn-icons-png.flaticon.com/64/2405/2405594.png', '', 'ao-so-mi-nu', '2022-04-22 07:52:21', '2022-04-22 07:52:21', 5),
(13, 'Quần jean nữ', 'Quần jean', '', 'https://cdn-icons-png.flaticon.com/64/776/776623.png', '', 'quan-jean-nu', '2022-04-22 07:52:21', '2022-04-22 07:52:21', 6),
(14, 'Quần kaki nữ', 'Quần kaki', '', 'https://cdn-icons-png.flaticon.com/64/2093/2093933.png', '', 'quan-kaki-nu', '2022-04-22 07:52:21', '2022-04-22 07:52:21', 6),
(15, 'Giày nữ', 'Giày', '', 'https://cdn-icons-png.flaticon.com/64/24/24697.png', '', 'giay-nu', '2022-04-22 08:00:16', '2022-04-22 08:00:16', 7),
(16, 'Thắt lưng nữ', 'Thắt lưng', '', 'https://cdn-icons-png.flaticon.com/64/1154/1154828.png', '', 'that-lung-nu', '2022-04-22 08:00:16', '2022-04-22 08:00:16', 7),
(18, 'Áo thun nữ', 'Áo thun', '', 'https://cdn-icons-png.flaticon.com/64/892/892458.png', '', 'ao-thun-nu', '2022-04-24 17:10:12', '2022-04-24 17:10:12', 5);

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `code_key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `value_vi` varchar(255) NOT NULL,
  `is_default` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `codes`
--

INSERT INTO `codes` (`id`, `type`, `code_key`, `value`, `value_vi`, `is_default`, `createdAt`, `updatedAt`) VALUES
(1, 'ORDER_STATUS', 'OS1', 'Pending', 'Đang xử lý', 1, '2022-04-17 22:03:02', '2022-04-17 22:03:02');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `is_main` tinyint(4) NOT NULL DEFAULT 0,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `full_name`, `short_name`, `icon`, `thumbnail`, `slug`, `is_main`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Bộ sưu tập Polo Yody', 'Polo Yody', '', '', 'ao-polo-yody', 1, '', '2022-04-12 15:23:26', '2022-04-12 15:23:26');

-- --------------------------------------------------------

--
-- Table structure for table `collection_items`
--

CREATE TABLE `collection_items` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collection_items`
--

INSERT INTO `collection_items` (`id`, `product_id`, `collection_id`, `createdAt`, `updatedAt`) VALUES
(1, 3, 1, '2022-04-12 15:24:34', '2022-04-12 15:24:34'),
(2, 4, 1, '2022-04-12 15:24:34', '2022-04-12 15:24:34'),
(3, 5, 1, '2022-04-12 15:24:34', '2022-04-12 15:24:34'),
(4, 6, 1, '2022-04-12 15:24:34', '2022-04-12 15:24:34'),
(5, 7, 1, '2022-04-12 15:24:34', '2022-04-12 15:24:34');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `rate` smallint(6) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `rate`, `product_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(3, 'Áo này đẹp quá', 5, 2, 1, '2022-04-09 13:25:36', '2022-04-09 13:25:36'),
(4, 'Áo này cũng đẹp', 4, 2, 2, '2022-04-09 13:26:53', '2022-04-09 13:26:53'),
(5, 'Áo này rất là đẹp', 5, 23, 2, '2022-04-26 13:26:53', '2022-04-26 13:26:53');

-- --------------------------------------------------------

--
-- Table structure for table `gender_categories`
--

CREATE TABLE `gender_categories` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gender_categories`
--

INSERT INTO `gender_categories` (`id`, `full_name`, `short_name`, `description`, `icon`, `thumbnail`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Thời trang nam', 'Nam', '', '', '', 'nam', '2022-04-09 16:44:49', '2022-04-09 16:44:49'),
(2, 'Thời trang nữ', 'Nữ', '', '', '', 'nu', '2022-04-09 16:44:49', '2022-04-09 16:44:49'),
(3, 'Thời trang trẻ em', 'Trẻ em', '', '', '', 'tre-em', '2022-04-09 16:44:49', '2022-04-09 16:44:49');

-- --------------------------------------------------------

--
-- Table structure for table `group_categories`
--

CREATE TABLE `group_categories` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `gender_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_categories`
--

INSERT INTO `group_categories` (`id`, `full_name`, `short_name`, `icon`, `thumbnail`, `description`, `slug`, `createdAt`, `updatedAt`, `gender_category_id`) VALUES
(2, 'Áo nam', 'Áo', '', '', '', 'ao-nam', '2022-04-09 17:02:51', '2022-04-09 17:02:51', 1),
(3, 'Quần nam', 'Quần', '', '', '', 'quan', '2022-04-09 17:02:51', '2022-04-09 17:02:51', 1),
(4, 'Phụ kiện nam', 'Phụ kiện', '', '', '', 'phu-kien-nam', '2022-04-09 20:08:18', '2022-04-09 20:08:18', 1),
(5, 'Áo nữ', 'Áo', '', '', '', 'ao-nu', '2022-04-14 13:24:59', '2022-04-14 13:24:59', 2),
(6, 'Quần nữ', 'Quần', '', '', '', 'quan-nu', '2022-04-14 13:24:59', '2022-04-14 13:24:59', 2),
(7, 'Phụ kiện nữ', 'Phụ kiện', '', '', '', 'phu-kien-nu', '2022-04-14 13:24:59', '2022-04-14 13:24:59', 2),
(8, 'Áo trẻ em', 'Áo', '', '', '', 'ao-tre-em', '2022-04-14 13:25:48', '2022-04-14 13:25:48', 3),
(9, 'Quần trẻ em', 'Quần', '', '', '', 'quan-tre-em', '2022-04-14 13:25:48', '2022-04-14 13:25:48', 3),
(10, 'Phụ kiện trẻ em', 'Phụ kiện', '', '', '', 'phu-kien-tre-em', '2022-04-14 13:25:48', '2022-04-14 13:25:48', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `address_no` varchar(255) NOT NULL,
  `delivery_price` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `code_id` int(11) NOT NULL,
  `checkout_method` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `city`, `district`, `ward`, `street`, `address_no`, `delivery_price`, `total`, `code_id`, `checkout_method`, `createdAt`, `updatedAt`) VALUES
(10, 2, 'Tỉnh Long An', 'Thành phố Tân An', 'Phường 2', 'Hoàng Hoa Thám', '115/20', 23000, 897000, 1, 1, '2022-04-17 15:13:56', '2022-04-17 15:13:56'),
(11, 2, 'Tỉnh Long An', 'Thành phố Tân An', 'Phường 2', 'Hoàng Hoa Thám', '115/20', 23000, 269000, 1, 1, '2022-04-17 15:24:16', '2022-04-17 15:24:16'),
(12, 2, 'Tỉnh Long An', 'Thành phố Tân An', 'Phường 2', 'Hoàng Hoa Thám', '115/20', 23000, 598000, 1, 1, '2022-04-17 15:26:15', '2022-04-17 15:26:15'),
(13, 2, 'Tỉnh Long An', 'Thành phố Tân An', 'Phường 2', 'Hoàng Hoa Thám', '115/20', 23000, 289000, 1, 1, '2022-04-18 15:26:15', '2022-04-18 15:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_color_size_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_color_size_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(15, 10, 26, 2, '2022-04-17 15:13:56', '2022-04-17 15:13:56'),
(16, 10, 28, 1, '2022-04-17 15:13:56', '2022-04-17 15:13:56'),
(17, 11, 4, 1, '2022-04-17 15:24:16', '2022-04-17 15:24:16'),
(18, 12, 27, 1, '2022-04-17 15:26:15', '2022-04-17 15:26:15'),
(19, 12, 32, 1, '2022-04-17 15:26:15', '2022-04-17 15:26:15'),
(20, 13, 91, 1, '2022-04-18 15:26:15', '2022-04-18 15:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `description` text NOT NULL DEFAULT ' <p>Chất liệu: 98% cotton và 2% spandex</p><p>Quần jean nữ YODY giữ form đẹp, co giãn nhẹ tạo cảm giác thoải mái khi mặc.</p><p>Chất vải mềm, độ dày dặn vừa phải nên không gây cảm giác nóng bức, khó chịu.</p><p>Quần jean nữ với kiểu dáng và màu sắc trẻ trung, dáng quần cơ bản nên phù hợp với nhiều đối tượng.</p><p>Quần có thể mặc cùng với áo phông, áo sơ mi hay hầu hết các loại trang phục khác để đi chơi hoặc đi làm.</p><p>YODY - Look good. Feel good.</p>',
  `slug` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `slug`, `category_id`, `createdAt`, `updatedAt`) VALUES
(2, 'Áo Phông Nam Cotton Compact Năng Động', 269000, '<p>YODY - Look good. Feel good</p>', 'ao-phong-nam-cotton-compact-nang-dong', 1, '2022-04-09 18:31:35', '2022-04-23 15:22:46'),
(3, 'Áo Polo Nam Cafe Phối Gấu Không Nhăn Không Nhão', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nam-cafe-phoi-gau-khong-nhan-khong-nhao', 2, '2022-04-09 16:09:49', '2022-04-09 16:09:49'),
(4, 'Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nam-pique-mat-chim-basic-co-gian-thoang-khi', 2, '2022-04-11 07:49:37', '2022-04-11 07:49:37'),
(5, 'Áo Polo Nam Pique Mắt Chim Thêu Ngực', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nam-pique-mat-chim-theu-nguc', 2, '2022-04-11 07:49:37', '2022-04-11 07:49:37'),
(6, 'Áo Polo Nam Airy Cool Phối Nẹp', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nam-airy-cool-phoi-nep', 2, '2022-04-11 07:51:52', '2022-04-11 07:51:52'),
(7, 'Áo Polo Nam Ngực Thêu Thuyền', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nam-nguc-theu-thuyen', 2, '2022-04-11 07:51:52', '2022-04-11 07:51:52'),
(8, 'Áo Polo Nữ Coolmax Phối Bo Siêu Mát', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-coolmax-phoi-bo-sieu-mat', 3, '2022-04-14 13:30:42', '2022-04-14 13:30:42'),
(9, 'Áo Polo Cho Bé Cafe Phối Bo', 229000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-cho-be-cafe-phoi-bo', 4, '2022-04-14 13:30:42', '2022-04-14 13:30:42'),
(17, 'Áo Polo Nữ Cafe Phối Tay Raglan Ngực In Gấu', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-cafe-phoi-tay-raglan-nguc-in-gau', 3, '2022-04-20 13:31:36', '2022-04-20 13:31:36'),
(18, 'Áo Polo Nam Cafe Bo Phối Cổ Chống Tia UV', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nam-cafe-bo-phoi-co-chong-tia-uv', 2, '2022-04-20 14:11:05', '2022-04-20 14:11:05'),
(19, 'Áo Sơ Mi Nữ Dáng Suông Trễ Cổ', 459000, '<p>YODY - Look good. Feel good</p>', 'ao-so-mi-nu-dang-suong-tre-co', 12, '2022-04-22 01:02:27', '2022-04-22 01:02:27'),
(21, 'Áo Croptop Tay Ngắn Phồng Họa Tiết Gingham', 459000, '<p>YODY - Look good. Feel good</p>', 'ao-croptop-tay-ngan-phong-hoa-tiet-gingham', 12, '2022-04-22 01:27:26', '2022-04-22 01:27:26'),
(22, 'Giày Cao Gót Mũi Nhọn Đính Nơ 7 Cm', 499000, '<p>YODY - Look good. Feel good</p>', 'giay-cao-got-mui-nhon-djinh-no-7-cm', 15, '2022-04-22 05:18:18', '2022-04-22 05:18:18'),
(23, 'Áo Polo Nữ Pique Mắt Chim Phối Kẻ', 289000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-pique-mat-chim-phoi-ke', 3, '2022-04-22 15:50:10', '2022-04-22 15:50:10'),
(24, 'Áo Sơ Mi Nữ Tay Dài Visco Thoáng Mát', 399000, '<p>YODY - Look good. Feel good</p>', 'ao-so-mi-nu-tay-dai-visco-thoang-mat', 12, '2022-04-23 02:19:04', '2022-04-23 02:19:04'),
(25, 'Áo Polo Nữ Pima Co Giãn', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-pima-co-gian', 3, '2022-04-23 02:22:27', '2022-04-23 02:22:27'),
(26, 'Áo Polo Nữ Mắt Chim Thấm Hút Tốt', 289000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-mat-chim-tham-hut-tot', 3, '2022-04-23 07:10:08', '2022-04-23 07:10:08'),
(27, 'Áo Polo Nữ Vải Vỏ Hàu Phối Bo Chống Tĩnh Điện', 299000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-vai-vo-hau-phoi-bo-chong-tinh-djien', 3, '2022-04-23 07:13:00', '2022-04-23 07:13:00'),
(28, 'Áo Polo Nữ Airmax In Ngực - Hồng', 289000, '<p>YODY - Look good. Feel good</p>', 'ao-polo-nu-airmax-in-nguc-hong', 3, '2022-04-23 07:16:30', '2022-04-23 07:16:30'),
(29, 'Áo Phông Nữ Cotton Cổ Tròn In Chữ Ski Resort', 249000, '<p>YODY - Look good. Feel good</p>', 'ao-phong-nu-cotton-co-tron-in-chu-ski-resort', 18, '2022-04-24 21:30:23', '2022-04-24 21:30:23'),
(30, 'Quần Jean Nữ Dáng Boy Lưng Thấp Vải Mềm Thoáng Khí', 399000, '<p>Chất liệu: 98% cotton và 2% spandex</p><p>Quần jean nữ YODY giữ form đẹp, co giãn nhẹ tạo cảm giác thoải mái khi mặc.</p><p>Chất vải mềm, độ dày dặn vừa phải nên không gây cảm giác nóng bức, khó chịu.</p><p>Quần jean nữ với kiểu dáng và màu sắc trẻ trung, dáng quần cơ bản nên phù hợp với nhiều đối tượng.</p><p>Quần có thể mặc cùng với áo phông, áo sơ mi hay hầu hết các loại trang phục khác để đi chơi hoặc đi làm.</p><p>YODY - Look good. Feel good.</p>', 'quan-jean-nu-dang-boy-lung-thap-vai-mem-thoang-khi', 13, '2022-05-01 22:11:44', '2022-05-01 22:11:44'),
(31, 'Quần Kaki Nam Ống Đứng Basic', 459000, '<p>Chất liệu kaki co giãn nhẹ mang lại cảm giác thoải mái khi sử dụng sản phẩm</p><p>Vải có độ bền cao, ít nhăn và không bị xù lông, co giãn rất tốt.</p><p>Kaki hút ẩm mồ hôi tốt, thoáng mát.</p><p>Vải dễ dàng làm sạch và nhanh khô.</p><p>Thiết kế trẻ, form quần ôm dễ phối với các các dòng sơ mi, áo phông.</p><p>YODY - Look good. Feel good.</p>', 'quan-kaki-nam-ong-dung-basic', 5, '2022-05-01 22:11:44', '2022-05-01 22:11:44'),
(32, 'Áo Polo Trẻ Em Airycool Thoáng Khí Thấm Hút Tốt', 199000, '<p>Chất liệu:Vải Airycool với thành phần 85% nylon + 15% spandex</p><p>Công nghệ làm mát FREEZING tiên tiến siêu khô thoáng</p><p>Kết cấu vải siêu mịn, tỉ mỉ, chắc chắn.</p><p>Trong lượng nhẹ, thoáng khí hút ẩm cực tốt.</p><p>Thấm hút mồ hôi tốt.</p><p>Khả năng co giãn, giữ form tốt.</p><p>YODY - Look good. Feel good.</p>', 'ao-polo-tre-em-airycool-thoang-khi-tham-hut-tot', 4, '2022-05-01 22:28:15', '2022-05-01 22:28:15');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `color_code` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp',
  `product_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`id`, `color`, `color_code`, `thumbnail`, `product_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420483/tsm5139-tra-4_fzjk2e.webp', 2, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(2, 'Đỏ', '#ab232a', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 3, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(3, 'Xanh bích', '#7a90ba', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 4, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(4, 'Xanh lam', '#c1ddea', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 4, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(5, 'Đen', '#000', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 5, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(6, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 5, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(7, 'Tím than', '#232c4f', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 6, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(8, 'Xanh cổ vịt', '#437b9c', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 6, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(9, 'Đen', '#000', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 7, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(10, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420874/apm3831-tra-3_e2axwn.webp', 7, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(11, 'Xanh vỏ đỗ', '#91ab89', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 8, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(12, 'Hồng', '#f6b9ba', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1649918200/apk5169-hog-4_pohdoy.jpg', 9, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(21, 'Xanh rêu', '#1a4539', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461498/k4161dnovvrclffbccn8.webp', 17, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(23, 'Vàng', '#f4a935', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463867/objy5qcuqstjxusrboxs.webp', 18, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(24, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463879/nbeqheg9akp6fo7mq3hq.webp', 18, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(26, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589351/wg8c5vcwqodktbbxxsiz.webp', 19, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(30, 'Đen', '#000', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 21, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(32, 'Đen', '#000', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 22, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(34, 'Xanh lam', '#5888b9', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 23, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(36, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 24, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(38, 'Tím than', '#273959', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 25, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(40, 'Đen', '#000', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 26, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(42, 'Đen', '#000', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 27, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(44, 'Hồng', '#EAB7C3', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 28, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(46, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 29, '2022-04-24 22:09:43', '2022-04-24 22:09:43'),
(47, 'Xanh sáng', '#4a6d8a', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304724/smrwlda15vugmppmnvfv.webp', 30, '2022-05-01 22:17:59', '2022-05-01 22:17:59'),
(48, 'Xanh đậm', '#263745', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304728/q9bye1x8anzswxehrz47.webp', 30, '2022-05-01 22:17:59', '2022-05-01 22:17:59'),
(49, 'Xanh trung', '#435d77', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304733/ihmtjdwzooxtsfh9hjef.webp', 30, '2022-05-01 22:17:59', '2022-05-01 22:17:59'),
(50, 'Vàng', '#bf9669', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651303840/h3qut0onylyti3ubrz20.webp', 31, '2022-05-01 22:17:59', '2022-05-01 22:17:59'),
(51, 'Trắng', '#fff', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300160/xr4grxlltoho3oadag1q.webp', 32, '2022-05-01 22:29:35', '2022-05-01 22:29:35'),
(52, 'Đỏ', '#d91638', 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300162/nrz1059han9gejta6fmg.webp', 32, '2022-05-01 22:29:35', '2022-05-01 22:29:35');

-- --------------------------------------------------------

--
-- Table structure for table `product_color_images`
--

CREATE TABLE `product_color_images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `product_color_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_color_images`
--

INSERT INTO `product_color_images` (`id`, `url`, `product_color_id`, `createdAt`, `updatedAt`) VALUES
(1, 'https://i.ibb.co/fvyKvM9/tsm5139-tra-4.webp', 1, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(2, 'https://i.ibb.co/Q6f1kCx/tsm5139-tra.webp', 1, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(3, 'https://i.ibb.co/59wXVY0/apm3657-ddo-qjm4005-xba-4.webp', 2, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(4, 'https://i.ibb.co/Yth0sg1/apm3657-ddo-qjm4005-xba-1.webp', 2, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(5, 'https://i.ibb.co/DMDGcft/apm3657-ddo-qjm4005-xba-3.webp', 2, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(6, 'https://i.ibb.co/2618gLK/apm3299-xbh-5.jpg', 3, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(7, 'https://i.ibb.co/fYt4kz5/apm3299-xbh-qjm5007-dni-4.jpg', 3, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(8, 'https://i.ibb.co/D9WN3LQ/apm3299-xbh-7.jpg', 3, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(9, 'https://i.ibb.co/dJgp8cy/apm3299-xbh-qjm5007-dni-5.jpg', 3, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(10, 'https://i.ibb.co/Vv7YxNF/apm3299-xbh-6.jpg', 3, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(11, 'https://i.ibb.co/1XrrcJV/apm3299-xbh-1.jpg', 3, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(12, 'https://i.ibb.co/wMXWKNk/apm3299-xlm-7.jpg', 4, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(13, 'https://i.ibb.co/W5CL1XJ/apm3299-xlm-6.jpg', 4, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(14, 'https://i.ibb.co/q0fqkPn/apm3299-xlm-5.jpg', 4, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(15, 'https://i.ibb.co/HgYPGx4/apm3299-xlm-4.jpg', 4, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(16, 'https://i.ibb.co/TWHvSq7/apm3299-xlm-3.jpg', 4, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(17, 'https://i.ibb.co/J2yVW8z/apm3299-xlm-2.jpg', 4, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(18, 'https://i.ibb.co/VSRK9cS/apm3739-den-3.webp', 5, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(19, 'https://i.ibb.co/ZTgfybH/apm3739-den-qsm3026-bee-1.webp', 5, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(20, 'https://i.ibb.co/Yj7Q9MM/apm3739-denqsm3026-bee-2.webp', 5, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(21, 'https://i.ibb.co/x7rj8xd/apm3739-den-6.webp', 5, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(22, 'https://i.ibb.co/2hvmbFM/apm3739-den-4.webp', 5, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(23, 'https://i.ibb.co/s2DDnjg/apm3739-den-5.webp', 5, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(24, 'https://i.ibb.co/5hnrrMp/apm3739-tra-2.webp', 6, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(25, 'https://i.ibb.co/ggr01Bt/apm3739-tra-1.webp', 6, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(26, 'https://i.ibb.co/C79P7vj/apm3739-tra-3.webp', 6, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(27, 'https://i.ibb.co/r6jgkGN/apm3739-tra-4.webp', 6, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(28, 'https://i.ibb.co/VJHFNkm/apm4107-tit-2.webp', 7, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(29, 'https://i.ibb.co/KXK8ZNs/apm4107-tit-qsm3015-xas-2.webp', 7, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(30, 'https://i.ibb.co/z67zXY2/apm4107-tit-4.webp', 7, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(31, 'https://i.ibb.co/gdLn0cv/apm4107-tit-3.webp', 7, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(32, 'https://i.ibb.co/RDqn40N/apm4107-tit-5.webp', 7, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(33, 'https://i.ibb.co/X7RSRF2/apm4107-xcv-4.webp', 8, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(34, 'https://i.ibb.co/VYW07Hd/apm4107-xcv-3-57592cc5-ba5e-4bad-8dc3-c79bb1848fea.webp', 8, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(35, 'https://i.ibb.co/vcx8j7y/apm4107-xcv-5.jpg', 8, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(36, 'https://i.ibb.co/PYKMs8K/apm4107-xcv-1.webp', 8, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(37, 'https://i.ibb.co/jWccvQY/apm4107-xcv-2.webp', 8, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(38, 'https://i.ibb.co/6JmQTKF/apm4107-xcv-6.jpg', 8, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(39, 'https://i.ibb.co/LzwNLX4/apm3831-den-5.jpg', 9, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(40, 'https://i.ibb.co/nscZYk7/apm3831-den-1.jpg', 9, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(41, 'https://i.ibb.co/5LGCP3q/apm3831-den-4.jpg', 9, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(42, 'https://i.ibb.co/vHykfyN/apm3831-den-6.jpg', 9, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(43, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420953/apm3831-den-qjm3075-xnh-3_swm70o.jpg', 9, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(44, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420936/apm3831-den-7_gcrcpl.jpg', 9, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(45, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420874/apm3831-tra-3_e2axwn.webp', 10, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(46, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420855/apm3831-tra-5_dzpkdr.webp', 10, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(47, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420816/apm3831-tra-4_dcybut.webp', 10, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(48, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420778/apm3831-tra-6_yy67h1.webp', 10, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(49, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420754/apm3831-tra-qam3190-den-3_g4wb1x.webp', 10, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(50, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651420721/apm3831-tra-1_e5bugv.webp', 10, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(51, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1649917356/apn5320-xd1-4_g4hgqw.jpg', 11, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(52, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1649918200/apk5169-hog-4_pohdoy.jpg', 12, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(53, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461498/k4161dnovvrclffbccn8.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(54, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461500/ixkhdrglmjnbcm58xhg9.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(55, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461503/rx6n2dmeg0sxeaummf5m.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(56, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461506/p9woddfacp0mmovaigzu.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(57, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461508/qh2dqx2gw6ewaiakoz8v.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(58, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461511/rbitw5pcsm2hv9b5izmz.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(59, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461514/j81p0tmwumkhe9sqcdtk.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(60, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461516/fjqtsblfoknsrcsktfal.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(61, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461518/b7qbgoy1bj6stviowzlw.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(62, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650461520/e0oedz1ow7amquwgb8fm.webp', 21, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(64, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463867/objy5qcuqstjxusrboxs.webp', 23, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(65, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463870/pjuhrnxt0zvnsj9o1aea.webp', 23, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(66, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463874/ixbcepp0v0vltupb0czn.webp', 23, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(67, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463875/ukaukn7v0rkfbvwunba1.webp', 23, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(68, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463877/affvzsqth8otc2fe1ebt.webp', 23, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(70, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463879/nbeqheg9akp6fo7mq3hq.webp', 24, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(71, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463880/zdojggiohdzinnd7aflg.webp', 24, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(72, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463882/y2i9ugmrrh0qfir3izen.webp', 24, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(73, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463885/qwzrot00hoawwx2ou7oe.webp', 24, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(74, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650463886/pb44sxba3fujrnbztvfd.webp', 24, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(76, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589351/wg8c5vcwqodktbbxxsiz.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(77, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589353/wp3i7bdylwglzsulahpx.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(78, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589354/qm2b9uqcjgw7vzgsi2tq.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(79, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589357/axei5zvwyi5xroikxjry.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(80, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589358/zanm4nji13e3l3gsx0dr.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(81, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589360/ljgxg7ut5yibfymfk891.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(82, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650589362/qec1iqnwacmqzxgiehtp.webp', 26, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(84, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590851/ll4qtn1crmvekw3miejc.webp', 30, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(85, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590854/aex0yvdog2eqfzdliisd.webp', 30, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(86, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590855/clpcia0ukxkyhzzca3lg.webp', 30, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(87, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590857/eewzce3tbd20iuqfksvj.webp', 30, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(88, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650590859/rwtmwn1f4tumyivwc8ll.webp', 30, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(90, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650604701/amqbsi7tctmiag383bos.webp', 32, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(91, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650604703/jmxuqoqm8fvg96hmtoml.webp', 32, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(92, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650604705/eseptsy8ronem0g3kjqj.webp', 32, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(93, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650642615/rgupgkadplsamgyrmrxl.webp', 34, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(94, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650642617/dqguelywcaqeeeenebsn.jpg', 34, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(95, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650642619/z79qlce2li9dgv2w6dmf.webp', 34, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(96, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650642622/emacrcxw84mwbewz5yhb.jpg', 34, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(97, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650642624/folhrhyqxd6j7gzsrcee.webp', 34, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(98, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680348/c7gv5mo8yj9h6efugpe3.webp', 36, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(99, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680352/wra2buoro3gdbh6qn1yy.webp', 36, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(100, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680354/vope3ppagbggpzgij3js.webp', 36, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(101, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680356/rrv4sxkybkmhajvzafn4.webp', 36, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(102, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680358/r2tna0nd5j5uqmbx98dv.webp', 36, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(103, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680360/odkuzexiqdrysz3biwnn.webp', 36, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(104, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680551/ahszcdkmkcjaiyvijo70.webp', 38, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(105, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680554/pieiedzoqzlmtz855sbt.webp', 38, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(106, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680555/tawpvtzrvxcc4vyij1w9.webp', 38, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(107, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680558/kvbbnyhkc131iduojwud.webp', 38, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(108, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680561/ik9sv8y6gyiva15p4ftf.webp', 38, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(109, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650680563/mkmbebm3f1szigh7ntiu.webp', 38, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(110, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697812/cqtn5lx0zfsvhzzbq7jw.webp', 40, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(111, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697815/eoybooggc2iwcv0sil3z.webp', 40, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(112, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697817/yvdfh5cdcmwb41ix147r.webp', 40, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(113, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697819/v5d9ltctmxqdelnd7xt7.webp', 40, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(114, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697820/iarxr45tnqevhfxk1s4x.webp', 40, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(115, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697823/trwlxwurmtxct8jhg3dz.webp', 40, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(116, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697984/q87hmwuzj2thefqgpmno.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(117, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697986/o9aoe9wjyt8slliq8u5i.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(118, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697988/v818mprynzlqahsvppiz.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(119, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697990/fe2fkkc6ec4q0c6jkzgz.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(120, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697993/ptdmav1rmvtbthbqaw3p.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(121, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697995/uee1orfhastndwa1b18q.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(122, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697997/givudbr16sxsocxqvbwl.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(123, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650697999/lmb8fzntnihqf196duj8.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(124, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698001/deep5i0tkcsmrz2xbvba.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(125, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698003/nbypqb9n9raebjbq4nbc.webp', 42, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(126, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698194/tbdxwdxdqdrz8h603qxk.webp', 44, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(127, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698195/awronvzi1bhm4kj5ata3.webp', 44, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(128, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698199/llbmhrbq6shxu9c1mqwu.webp', 44, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(129, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698200/o1jcmmxz4objbppjrxa1.webp', 44, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(130, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650698202/duohdjeryqfyjy8pskms.jpg', 44, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(131, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-1_uy4mmb.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(132, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-7_ube0kq.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(133, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-9_tcryca.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(134, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-5_je12nd.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(135, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-6_xtfive.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(136, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-8_tuaehk.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(137, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812194/tsn5244-tra-4_ft7p1r.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(138, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650812195/tsn5244-tra-3_fevszv.webp', 46, '2022-04-24 22:10:43', '2022-04-24 22:10:43'),
(139, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304724/smrwlda15vugmppmnvfv.webp', 47, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(140, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304726/m0uhhlwk1g2i51hr7nje.webp', 47, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(141, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304728/q9bye1x8anzswxehrz47.webp', 48, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(142, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304730/swfutarjqd9csbnyj6vq.webp', 48, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(143, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304733/ihmtjdwzooxtsfh9hjef.webp', 49, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(144, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651304734/t5tgk6cyejzpdqyjtcum.webp', 49, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(145, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651303840/h3qut0onylyti3ubrz20.webp', 50, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(146, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651303842/ye98tbg4xizyktj0aila.webp', 50, '2022-05-01 22:24:56', '2022-05-01 22:24:56'),
(149, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300160/xr4grxlltoho3oadag1q.webp', 51, '2022-05-01 22:33:10', '2022-05-01 22:33:10'),
(150, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300164/ewjjjtqovnpqdgo7la2a.webp', 51, '2022-05-01 22:33:10', '2022-05-01 22:33:10'),
(151, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300165/oqupxnksap8vduwtqkzg.webp', 51, '2022-05-01 22:33:10', '2022-05-01 22:33:10'),
(152, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300168/obxzrtbyjledshwo0tni.webp', 51, '2022-05-01 22:33:10', '2022-05-01 22:33:10'),
(153, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300162/nrz1059han9gejta6fmg.webp', 52, '2022-05-01 22:33:10', '2022-05-01 22:33:10'),
(154, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300170/vyyvvbsw8zvqk47bysaj.webp', 52, '2022-05-01 22:33:10', '2022-05-01 22:33:10'),
(155, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651300172/pi19bxmrtd6inwlnw3rn.jpg', 52, '2022-05-01 22:33:10', '2022-05-01 22:33:10');

-- --------------------------------------------------------

--
-- Table structure for table `product_color_sizes`
--

CREATE TABLE `product_color_sizes` (
  `id` int(11) NOT NULL,
  `size_text` varchar(255) NOT NULL,
  `size_value` int(11) NOT NULL DEFAULT 0,
  `amount` int(11) NOT NULL DEFAULT 0,
  `product_color_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_color_sizes`
--

INSERT INTO `product_color_sizes` (`id`, `size_text`, `size_value`, `amount`, `product_color_id`, `createdAt`, `updatedAt`) VALUES
(1, 'S', 0, 10, 1, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(2, 'M', 1, 10, 1, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(3, 'L', 2, 10, 1, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(4, 'XL', 3, 10, 1, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(6, 'S', 0, 10, 2, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(7, 'M', 1, 10, 2, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(8, 'L', 2, 10, 2, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(9, 'XL', 3, 10, 2, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(10, 'S', 0, 10, 3, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(11, 'M', 1, 10, 3, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(12, 'L', 2, 10, 3, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(13, 'XL', 3, 10, 3, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(14, 'S', 0, 10, 4, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(15, 'M', 1, 10, 4, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(16, 'L', 2, 10, 4, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(17, 'XL', 3, 10, 4, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(18, 'S', 0, 10, 5, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(19, 'M', 1, 10, 5, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(20, 'L', 2, 10, 5, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(21, 'XL', 3, 10, 5, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(22, 'S', 0, 10, 6, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(23, 'M', 1, 10, 6, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(24, 'L', 2, 10, 6, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(25, 'XL', 3, 10, 6, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(26, 'S', 0, 10, 7, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(27, 'M', 1, 10, 7, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(28, 'L', 2, 10, 7, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(29, 'XL', 3, 10, 7, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(30, 'S', 0, 10, 8, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(31, 'M', 1, 10, 8, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(32, 'L', 2, 10, 8, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(33, 'XL', 3, 10, 8, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(34, 'S', 0, 10, 9, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(35, 'M', 1, 10, 9, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(36, 'L', 2, 10, 9, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(37, 'XL', 3, 10, 9, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(38, 'S', 0, 10, 10, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(39, 'M', 1, 10, 10, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(40, 'L', 2, 10, 10, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(41, 'XL', 3, 10, 10, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(42, 'XS', 0, 10, 11, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(43, 'S', 1, 10, 11, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(44, 'M', 2, 10, 11, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(45, 'L', 3, 10, 11, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(46, 'XS', 0, 10, 12, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(47, 'S', 1, 10, 12, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(48, 'M', 2, 10, 12, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(49, 'L', 3, 10, 12, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(54, 'S', 0, 10, 21, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(55, 'M', 1, 10, 21, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(56, 'L', 2, 10, 21, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(57, 'XL', 3, 10, 21, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(59, 'S', 0, 10, 23, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(60, 'M', 1, 10, 23, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(61, 'L', 2, 10, 23, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(62, 'XL', 3, 10, 23, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(64, 'S', 0, 10, 24, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(65, 'M', 1, 10, 24, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(66, 'L', 2, 10, 24, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(67, 'XL', 3, 10, 24, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(69, 'S', 0, 10, 26, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(70, 'M', 1, 10, 26, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(71, 'L', 2, 10, 26, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(72, 'XL', 3, 10, 26, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(79, 'S', 0, 10, 30, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(80, 'M', 1, 10, 30, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(81, 'L', 2, 10, 30, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(82, 'XL', 3, 10, 30, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(84, '35', 35, 10, 32, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(85, '36', 36, 10, 32, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(86, '37', 37, 10, 32, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(87, '38', 38, 10, 32, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(88, '39', 39, 10, 32, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(90, 'S', 0, 10, 34, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(91, 'M', 1, 10, 34, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(92, 'L', 2, 10, 34, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(93, 'XL', 3, 10, 34, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(95, 'S', 0, 10, 36, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(96, 'M', 1, 10, 36, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(97, 'L', 2, 10, 36, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(98, 'XL', 3, 10, 36, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(100, 'S', 0, 10, 38, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(101, 'M', 1, 10, 38, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(102, 'L', 2, 10, 38, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(103, 'XL', 3, 10, 38, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(105, 'S', 0, 10, 40, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(106, 'M', 1, 10, 40, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(107, 'L', 2, 10, 40, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(108, 'XL', 3, 10, 40, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(110, 'S', 0, 10, 42, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(111, 'M', 1, 10, 42, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(112, 'L', 2, 10, 42, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(113, 'XL', 3, 10, 42, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(115, 'S', 0, 10, 44, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(116, 'M', 1, 10, 44, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(117, 'L', 2, 10, 44, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(118, 'XL', 3, 10, 44, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(120, 'S', 0, 10, 46, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(121, 'M', 1, 10, 46, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(122, 'L', 2, 10, 46, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(123, 'XL', 3, 10, 46, '2022-04-24 22:11:11', '2022-04-24 22:11:11'),
(124, '24', 24, 10, 47, '2022-05-01 22:35:06', '2022-05-01 22:35:06'),
(125, '24', 24, 10, 47, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(126, '25', 25, 10, 47, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(127, '26', 26, 10, 47, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(128, '27', 27, 10, 47, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(129, '28', 28, 10, 47, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(130, '29', 29, 10, 47, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(131, '24', 24, 10, 48, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(132, '25', 25, 10, 48, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(133, '26', 26, 10, 48, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(134, '27', 27, 10, 48, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(135, '28', 28, 10, 48, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(136, '29', 29, 10, 48, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(137, '24', 24, 10, 49, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(138, '25', 25, 10, 49, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(139, '26', 26, 10, 49, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(140, '27', 27, 10, 49, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(141, '28', 28, 10, 49, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(142, '29', 29, 10, 49, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(143, 'M', 24, 10, 50, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(144, 'L', 25, 10, 50, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(145, 'XL', 26, 10, 50, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(146, '2XL', 27, 10, 50, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(147, '3XL', 28, 10, 50, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(148, '2', 2, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(149, '4', 4, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(150, '6', 6, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(151, '8', 8, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(152, '10', 10, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(153, '12', 12, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(154, '14', 14, 10, 51, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(155, '2', 2, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(156, '4', 4, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(157, '6', 6, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(158, '8', 8, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(159, '10', 10, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(160, '12', 12, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15'),
(161, '14', 14, 10, 52, '2022-05-01 22:38:15', '2022-05-01 22:38:15');

-- --------------------------------------------------------

--
-- Table structure for table `product_sales`
--

CREATE TABLE `product_sales` (
  `id` int(11) NOT NULL,
  `percent` int(11) NOT NULL DEFAULT 0,
  `finish` datetime NOT NULL DEFAULT current_timestamp(),
  `product_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_users`
--

CREATE TABLE `product_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `replied_comments`
--

CREATE TABLE `replied_comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 0,
  `phone_number` varchar(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date NOT NULL DEFAULT current_timestamp(),
  `is_admin` tinyint(4) NOT NULL DEFAULT 0,
  `avatar` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `phone_number`, `email`, `password`, `birthday`, `is_admin`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'Duy', 'Phan', 1, '0385981195', 'duyphan2@gmail.com', '$2a$10$i3DLctabXHLq9bJLejGkoeY/Qmfx4BRRl9l4ab/7MzB7FG3h3J66i', '2001-11-09', 0, 'https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg', '2022-04-09 13:18:30', '2022-04-09 13:18:30'),
(2, 'Duy', 'Phan', 1, '0385981195', 'duyphan1@gmail.com', '$2a$10$Y7c8PfPXuKNE8XPnJQhFdOaBUgO2F9TV34uCI680QUMspHSxbisbi', '2001-11-09', 0, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1650679921/bv9jdiz8ikmrgi568azz.jpg', '2022-04-09 13:26:37', '2022-04-23 02:12:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_color_size_id` (`product_color_size_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_category_id` (`group_category_id`);

--
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collection_items`
--
ALTER TABLE `collection_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `collection_id` (`collection_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `gender_categories`
--
ALTER TABLE `gender_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_categories`
--
ALTER TABLE `group_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gender_category_id` (`gender_category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `code_id` (`code_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_color_size_id` (`product_color_size_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_color_images`
--
ALTER TABLE `product_color_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_color_id` (`product_color_id`);

--
-- Indexes for table `product_color_sizes`
--
ALTER TABLE `product_color_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_color_id` (`product_color_id`);

--
-- Indexes for table `product_sales`
--
ALTER TABLE `product_sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_users`
--
ALTER TABLE `product_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replied_comments`
--
ALTER TABLE `replied_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `collection_items`
--
ALTER TABLE `collection_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gender_categories`
--
ALTER TABLE `gender_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `group_categories`
--
ALTER TABLE `group_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `product_color_images`
--
ALTER TABLE `product_color_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `product_color_sizes`
--
ALTER TABLE `product_color_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `product_sales`
--
ALTER TABLE `product_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_users`
--
ALTER TABLE `product_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `replied_comments`
--
ALTER TABLE `replied_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_color_size_id`) REFERENCES `product_color_sizes` (`id`);

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`group_category_id`) REFERENCES `group_categories` (`id`);

--
-- Constraints for table `collection_items`
--
ALTER TABLE `collection_items`
  ADD CONSTRAINT `collection_items_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`),
  ADD CONSTRAINT `collection_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `group_categories`
--
ALTER TABLE `group_categories`
  ADD CONSTRAINT `group_categories_ibfk_1` FOREIGN KEY (`gender_category_id`) REFERENCES `gender_categories` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`code_id`) REFERENCES `codes` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_color_size_id`) REFERENCES `product_color_sizes` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `product_color_images`
--
ALTER TABLE `product_color_images`
  ADD CONSTRAINT `product_color_images_ibfk_1` FOREIGN KEY (`product_color_id`) REFERENCES `product_colors` (`id`);

--
-- Constraints for table `product_color_sizes`
--
ALTER TABLE `product_color_sizes`
  ADD CONSTRAINT `product_color_sizes_ibfk_1` FOREIGN KEY (`product_color_id`) REFERENCES `product_colors` (`id`);

--
-- Constraints for table `product_sales`
--
ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `replied_comments`
--
ALTER TABLE `replied_comments`
  ADD CONSTRAINT `replied_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `replied_comments_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`);
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_length` text COLLATE utf8_bin DEFAULT NULL,
  `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
  `col_default` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `settings_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `template_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"my-shop\",\"table\":\"product_color_images\"},{\"db\":\"my-shop\",\"table\":\"product_colors\"},{\"db\":\"my-shop\",\"table\":\"product_sales\"},{\"db\":\"my-shop\",\"table\":\"product_users\"},{\"db\":\"my-shop\",\"table\":\"comments\"},{\"db\":\"my-shop\",\"table\":\"replied_comments\"},{\"db\":\"my-shop\",\"table\":\"order_items\"},{\"db\":\"my-shop\",\"table\":\"product_color_sizes\"},{\"db\":\"my-shop\",\"table\":\"orders\"},{\"db\":\"my-shop\",\"table\":\"products\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

--
-- Dumping data for table `pma__table_info`
--

INSERT INTO `pma__table_info` (`db_name`, `table_name`, `display_field`) VALUES
('my-shop', 'replied_comments', 'content');

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Dumping data for table `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'my-shop', 'product_color_images', '{\"sorted_col\":\"`id`  DESC\"}', '2022-05-01 15:56:51'),
('root', 'my-shop', 'product_color_sizes', '{\"sorted_col\":\"`id`  DESC\"}', '2022-05-01 15:43:10'),
('root', 'my-shop', 'product_colors', '{\"sorted_col\":\"`id`  DESC\"}', '2022-05-01 15:55:02'),
('root', 'my-shop', 'products', '{\"sorted_col\":\"`products`.`id`  DESC\"}', '2022-05-01 15:00:40');

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
  `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2022-05-01 16:03:18', '{\"Console\\/Mode\":\"collapse\",\"lang\":\"en_GB\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
  `tab` varchar(64) COLLATE utf8_bin NOT NULL,
  `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
