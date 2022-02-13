-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 13, 2022 at 08:51 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Skooly`
--

-- --------------------------------------------------------

--
-- Table structure for table `StudentFamilyMembers`
--

CREATE TABLE `StudentFamilyMembers` (
  `id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `relationship` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `StudentFamilyMembers`
--

INSERT INTO `StudentFamilyMembers` (`id`, `student_id`, `first_name`, `last_name`, `relationship`, `nationality`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Peter', 'Parker', 'Parent', 'United Arab Emirates', '2022-02-12 13:54:46', '2022-02-13 19:30:17', NULL),
(36, 86, 'Dad', 'One', 'Parent', 'Australia', '2022-02-13 19:42:41', '2022-02-13 19:42:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `id` int(10) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending_approval',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`id`, `first_name`, `last_name`, `nationality`, `date_of_birth`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Mark', 'Parker', 'United Arab Emirates', '1995-02-15', 'pending_approval', '2022-02-12 13:53:25', '2022-02-13 15:24:37', NULL),
(36, 'Student', '1', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:08', '2022-02-13 15:24:47', NULL),
(37, 'Student', '2', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:11', '2022-02-13 15:24:47', NULL),
(38, 'Student', '3', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:13', '2022-02-13 15:24:47', NULL),
(39, 'Student', '4', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:14', '2022-02-13 15:24:47', NULL),
(40, 'Student', '5', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:16', '2022-02-13 15:24:47', NULL),
(41, 'Student', '6', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:17', '2022-02-13 15:24:47', NULL),
(42, 'Student', '7', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:18', '2022-02-13 15:24:47', NULL),
(43, 'Student', '8', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:19', '2022-02-13 15:24:47', NULL),
(44, 'Student', '9', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:21', '2022-02-13 15:24:47', NULL),
(45, 'Student', '10', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:23', '2022-02-13 15:24:47', NULL),
(46, 'Student', '11', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:24', '2022-02-13 15:24:47', NULL),
(47, 'Student', '12', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:25', '2022-02-13 15:24:47', NULL),
(48, 'Student', '13', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:26', '2022-02-13 15:24:47', NULL),
(49, 'Student', '14', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:27', '2022-02-13 15:24:47', NULL),
(50, 'Student', '15', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:28', '2022-02-13 15:24:47', NULL),
(51, 'Student', '16', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:29', '2022-02-13 15:24:47', NULL),
(52, 'Student', '17', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:29', '2022-02-13 15:24:47', NULL),
(53, 'Student', '18', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:30', '2022-02-13 15:24:47', NULL),
(54, 'Student', '19', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:32', '2022-02-13 15:24:47', NULL),
(55, 'Student', '20', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:33', '2022-02-13 15:24:47', NULL),
(56, 'Student', '21', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:35', '2022-02-13 15:24:47', NULL),
(57, 'Student', '22', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:36', '2022-02-13 15:24:47', NULL),
(58, 'Student', '23', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:14:37', '2022-02-13 15:24:47', NULL),
(59, 'Student', '24', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:08', '2022-02-13 15:24:47', NULL),
(60, 'Student', '25', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:09', '2022-02-13 15:24:47', NULL),
(61, 'Student', '26', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:10', '2022-02-13 15:24:47', NULL),
(62, 'Student', '27', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:12', '2022-02-13 15:24:47', NULL),
(63, 'Student', '28', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:13', '2022-02-13 15:24:47', NULL),
(64, 'Student', '29', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:14', '2022-02-13 15:24:47', NULL),
(65, 'Student', '30', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:16', '2022-02-13 15:24:47', NULL),
(66, 'Student', '31', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:17', '2022-02-13 15:24:47', NULL),
(67, 'Student', '32', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:18', '2022-02-13 15:24:47', NULL),
(68, 'Student', '33', 'United Arab Emirates', '1993-11-12', 'pending_approval', '2022-02-13 12:15:19', '2022-02-13 19:42:54', '2022-02-13 19:42:54'),
(84, 'Student', '34', 'United Arab Emirates', '1993-11-12', 'approved', '2022-02-13 19:03:28', '2022-02-13 19:32:06', '2022-02-13 19:32:06'),
(85, 'TestRegistrar', 'Student', 'Australia', '1995-03-13', 'approved', '2022-02-13 19:31:33', '2022-02-13 19:41:14', '2022-02-13 19:41:14'),
(86, 'TestRegistrar', 'One', 'Australia', '1995-02-23', 'approved', '2022-02-13 19:42:21', '2022-02-13 19:42:41', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `StudentFamilyMembers`
--
ALTER TABLE `StudentFamilyMembers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `StudentFamilyMembers`
--
ALTER TABLE `StudentFamilyMembers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
