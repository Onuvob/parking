-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2018 at 10:51 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking`
--

-- --------------------------------------------------------

--
-- Table structure for table `garage`
--

CREATE TABLE `garage` (
  `garage_id` int(255) NOT NULL,
  `garage_name` varchar(100) DEFAULT NULL,
  `garage_lat` varchar(255) DEFAULT NULL,
  `garage_lng` varchar(255) DEFAULT NULL,
  `garage_hourly_price` varchar(100) DEFAULT NULL,
  `user_mnumber` varchar(50) DEFAULT NULL,
  `garage_address` varchar(255) DEFAULT NULL,
  `garage_availability` varchar(10) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `garage`
--

INSERT INTO `garage` (`garage_id`, `garage_name`, `garage_lat`, `garage_lng`, `garage_hourly_price`, `user_mnumber`, `garage_address`, `garage_availability`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, '1'),
(11, NULL, NULL, NULL, NULL, NULL, NULL, '1'),
(12, NULL, NULL, NULL, NULL, NULL, NULL, '1'),
(13, 'Sonjoy Test1 Dhanmondi', '23.750079191411', '90.376269992065', '20', '01515697888', 'Road/5', '1'),
(14, 'Sonjoy Test 2 Dhn', '23.751336173611', '90.373652156067', '10', '01515697888', '7', '1'),
(15, '55555', '23.738962226975', '90.378716166687', '55', '55555555555', '55555', '1');

-- --------------------------------------------------------

--
-- Table structure for table `garage_images`
--

CREATE TABLE `garage_images` (
  `garage_image_id` int(255) NOT NULL,
  `garage_image` blob,
  `garage_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `request_process`
--

CREATE TABLE `request_process` (
  `req_id` int(255) NOT NULL,
  `garage_id` int(255) DEFAULT NULL,
  `user_mnumber` varchar(50) DEFAULT NULL,
  `provider_mnumber` varchar(50) DEFAULT NULL,
  `check_in_time` varchar(100) DEFAULT NULL,
  `check_out_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_mnumber` varchar(50) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_image` blob,
  `user_address` varchar(100) DEFAULT NULL,
  `user_onesignal_id` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_mnumber`, `user_name`, `user_image`, `user_address`, `user_onesignal_id`, `user_password`) VALUES
('', '', NULL, '', '', ''),
('00000000000', 'Test1', NULL, '00000', 'default', '00000'),
('01515697888', 'Sonjoy Tripura', NULL, 'East nakhal para, Tejgaon, Dhaka 1215', 'default', '01515'),
('01739337780', 'Onuvob Tripura', NULL, 'East nakhal para, Tejgaon, Dhaka', 'default', '01515'),
('11111111111', 'Anonymous', NULL, '11111', 'default', '11111'),
('22222222222', 'Test2', NULL, '22222', 'default', '22222'),
('55555555555', 'Test4', NULL, '55555', 'default', '55555');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`garage_id`),
  ADD KEY `user_mnumber` (`user_mnumber`);

--
-- Indexes for table `garage_images`
--
ALTER TABLE `garage_images`
  ADD PRIMARY KEY (`garage_image_id`),
  ADD KEY `garage_id` (`garage_id`);

--
-- Indexes for table `request_process`
--
ALTER TABLE `request_process`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `user_mnumber` (`user_mnumber`),
  ADD KEY `provider_mnumber` (`provider_mnumber`),
  ADD KEY `garage_id` (`garage_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_mnumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `garage`
--
ALTER TABLE `garage`
  MODIFY `garage_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `garage_images`
--
ALTER TABLE `garage_images`
  MODIFY `garage_image_id` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `request_process`
--
ALTER TABLE `request_process`
  MODIFY `req_id` int(255) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `garage`
--
ALTER TABLE `garage`
  ADD CONSTRAINT `garage_ibfk_1` FOREIGN KEY (`user_mnumber`) REFERENCES `user` (`user_mnumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `garage_images`
--
ALTER TABLE `garage_images`
  ADD CONSTRAINT `garage_images_ibfk_1` FOREIGN KEY (`garage_id`) REFERENCES `garage` (`garage_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request_process`
--
ALTER TABLE `request_process`
  ADD CONSTRAINT `request_process_ibfk_1` FOREIGN KEY (`user_mnumber`) REFERENCES `user` (`user_mnumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_process_ibfk_2` FOREIGN KEY (`provider_mnumber`) REFERENCES `user` (`user_mnumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_process_ibfk_3` FOREIGN KEY (`garage_id`) REFERENCES `garage` (`garage_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
