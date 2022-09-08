-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 04, 2022 at 02:29 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `time_table`
--

-- --------------------------------------------------------

--
-- Table structure for table `college`
--

CREATE TABLE `college` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `registerer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `college`
--

INSERT INTO `college` (`id`, `name`, `registerer_id`) VALUES
(4, 'busness', 242),
(7, 'comboni', 244);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `college_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `college_id`) VALUES
(3, 'department', 4),
(4, 'cool', 4),
(5, 'lool', 4),
(6, 'kjkjkjk', 4),
(7, 'computer science', 7),
(8, 'Information Technology', 7);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_lab` tinyint(1) NOT NULL DEFAULT '0',
  `capacity` int(11) NOT NULL,
  `college_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `is_lab`, `capacity`, `college_id`) VALUES
(31, '001', 0, 30, 4),
(32, '103', 0, 25, 4),
(34, '102', 0, 35, 7);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_lab` tinyint(1) NOT NULL DEFAULT '0',
  `college_id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `semester` int(11) NOT NULL,
  `hours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `is_lab`, `college_id`, `teacher_id`, `semester`, `hours`) VALUES
(37, 'Moore', 0, 4, 247, 2, 20),
(38, 'Boolean', 0, 4, 248, 3, 30),
(39, 'Integer', 0, 4, 248, 3, 60),
(40, 'Accounting', 0, 7, 247, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `subject_with_departments`
--

CREATE TABLE `subject_with_departments` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject_with_departments`
--

INSERT INTO `subject_with_departments` (`id`, `department_id`, `subject_id`, `createdAt`, `updatedAt`) VALUES
(42, 3, 37, '2022-09-03 01:19:25', '2022-09-03 01:19:25'),
(43, 4, 37, '2022-09-03 01:19:25', '2022-09-03 01:19:25'),
(44, 3, 38, '2022-09-03 21:08:02', '2022-09-03 21:08:02'),
(45, 5, 38, '2022-09-03 21:08:02', '2022-09-03 21:08:02'),
(46, 4, 38, '2022-09-03 21:08:02', '2022-09-03 21:08:02'),
(47, 5, 39, '2022-09-03 21:08:37', '2022-09-03 21:08:37'),
(48, 4, 39, '2022-09-03 21:08:37', '2022-09-03 21:08:37'),
(49, 8, 40, '2022-09-04 11:54:25', '2022-09-04 11:54:25');

-- --------------------------------------------------------

--
-- Table structure for table `time_table`
--

CREATE TABLE `time_table` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `finish_time` time NOT NULL,
  `room_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `time_table`
--

INSERT INTO `time_table` (`id`, `subject_id`, `college_id`, `semester`, `start_time`, `finish_time`, `room_id`, `day`, `createdAt`, `updatedAt`) VALUES
(1357, 38, 4, 3, '08:00:00', '10:00:00', 31, 1, '2022-09-04 09:01:46', '2022-09-04 09:01:46'),
(1358, 38, 4, 3, '11:00:00', '13:00:00', 31, 3, '2022-09-04 09:01:46', '2022-09-04 09:01:46'),
(1360, 39, 4, 3, '11:00:00', '13:00:00', 31, 1, '2022-09-04 09:01:46', '2022-09-04 09:01:46'),
(1361, 39, 4, 3, '13:00:00', '15:00:00', 32, 2, '2022-09-04 09:01:46', '2022-09-04 09:01:46'),
(1362, 39, 4, 3, '11:00:00', '13:00:00', 31, 4, '2022-09-04 09:01:46', '2022-09-04 09:01:46'),
(1363, 39, 4, 3, '11:00:00', '13:00:00', 32, 5, '2022-09-04 09:01:46', '2022-09-04 09:01:46'),
(1364, 38, 4, 3, '11:00:00', '13:00:00', 31, 1, '2022-09-04 09:02:37', '2022-09-04 09:02:37'),
(1366, 37, 4, 2, '13:00:00', '15:00:00', 32, 1, '2022-09-04 10:45:57', '2022-09-04 10:45:57'),
(1367, 37, 4, 2, '08:00:00', '10:00:00', 31, 3, '2022-09-04 10:45:58', '2022-09-04 10:45:58'),
(1369, 37, 4, 2, '11:00:00', '13:00:00', 31, 6, '2022-09-04 10:45:58', '2022-09-04 10:45:58'),
(1370, 37, 4, 2, '11:00:00', '13:00:00', 32, 7, '2022-09-04 10:45:58', '2022-09-04 10:45:58'),
(1371, 37, 4, 2, '11:00:00', '13:00:00', 31, 1, '2022-09-04 10:46:11', '2022-09-04 10:46:11'),
(1385, 40, 7, 1, '08:00:00', '10:00:00', 32, 1, '2022-09-04 12:01:55', '2022-09-04 12:01:55'),
(1386, 40, 7, 1, '08:00:00', '10:00:00', 34, 2, '2022-09-04 12:01:55', '2022-09-04 12:01:55');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `college_id` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role`, `name`, `email`, `student_id`, `semester`, `department_id`, `college_id`, `password`, `createdAt`, `updatedAt`) VALUES
(242, 'registerar', 'omer', 'omer@gmail.com', NULL, NULL, NULL, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-02 19:19:10', '2022-09-02 20:56:09'),
(243, 'admin', 'admin', 'admin@gmail.com', NULL, NULL, NULL, NULL, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-02 13:32:48', NULL),
(244, 'registerar', 'ali', 'ali@gmail.com', NULL, NULL, NULL, 7, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-02 19:19:10', '2022-09-04 11:44:41'),
(247, 'teacher', 'Osama', 'osama@gmail.com', NULL, NULL, NULL, NULL, '$2b$05$0p/sS2MvShNNWxOibqgaSuPiMDRUHH16cyPfjzc5jtyZN83sApPAC', '2022-09-02 22:41:03', '2022-09-02 22:41:03'),
(248, 'teacher', 'omran', 'omran@gmail.com', NULL, NULL, NULL, NULL, '$2b$05$R6oyDIoK7B8x9nEGWpbfc.y65011gS.xR88Wkh7si7ixQdCPfw7hK', '2022-09-03 00:42:27', '2022-09-03 00:42:27'),
(249, 'student', 'Alooba', 'Alooba@gmail.com', 'G-2254885', 2, 3, 4, '$2b$05$EWjTveKx7xAeZo58glShr.S4pjtYPOKL2qwLyy.FHlKu8pQ6m40Ke', '2022-09-03 07:27:37', '2022-09-03 07:29:09'),
(250, 'student', 'ola', 'ola@gmail.com', 'G-8859665', 2, 3, 4, '$2b$05$HQ2eQdhWarFOEW3IuJHTJ.vORK9J6xmxKIEpbvPDZkkON1x/gEIiS', '2022-09-03 07:30:33', '2022-09-03 07:30:33'),
(252, 'student', 'Dana', 'divashechkin1@dmoz.org', '5N1AN0NUXDN285781', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(253, 'student', 'Somerset', 'sbrikner2@wsj.com', '1G6AX5SX6E0744154', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(254, 'student', 'Ag', 'amacgoun3@simplemachines.org', '3D7TP2HT3AG769629', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(255, 'student', 'Gladys', 'gmcorkill4@mashable.com', 'JTHDU1EF9D5140337', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(256, 'student', 'Marcos', 'mmcmillam5@sakura.ne.jp', 'KMHGN4JE7FU248762', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(257, 'student', 'Fowler', 'fbalam6@theglobeandmail.com', 'WBAUN7C52DV251854', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(258, 'student', 'Juline', 'jbeadle7@oakley.com', '5UXFG8C59CL093470', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(259, 'student', 'Emlynne', 'eelcome8@google.com.hk', 'WAUFFAFM9BA469123', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(260, 'student', 'Nadia', 'npechet9@comsenz.com', '5GAER23708J649868', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(261, 'student', 'Reeta', 'rhakonsena@vistaprint.com', 'WAUDL54F15N286761', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(262, 'student', 'Cacilie', 'cissacsonb@arstechnica.com', '3N1CE2CP2FL488157', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(263, 'student', 'North', 'nrenolsc@google.ru', 'KMHDB8AE2BU684898', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(264, 'student', 'Shermy', 'shurrand@hostgator.com', '5N1AR2MM0DC835602', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(265, 'student', 'Emmalee', 'ejanze@odnoklassniki.ru', 'WBA3F9C50EF317592', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(266, 'student', 'Shina', 'sdenleyf@sina.com.cn', 'JA32U2FU3FU750706', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(267, 'student', 'Jamison', 'jrollingsg@auda.org.au', '5N1AR1NB4CC570107', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(268, 'student', 'Regina', 'rparkynh@irs.gov', '5J6TF1H36EL830935', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(269, 'student', 'Dollie', 'dlinsayi@bloomberg.com', 'JTDZN3EU2D3251001', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(270, 'student', 'Land', 'lroberdsj@businessweek.com', '1FTSW2A56AE746676', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(271, 'student', 'Lynsey', 'lsandifordk@etsy.com', '1N4AL3AP3DC193036', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(272, 'student', 'Adriana', 'awyethl@elegantthemes.com', 'SCBZK25E12C540351', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(273, 'student', 'Trixi', 'tcorserm@taobao.com', '1GYS4EEJ3DR924603', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(274, 'student', 'Linzy', 'lmcdowalln@de.vu', 'WA1DGAFEXBD762683', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(275, 'student', 'Yolande', 'yredmaino@tamu.edu', '1VWAH7A39EC489290', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(276, 'student', 'Claudio', 'chaggettp@com.com', '2HNYD18663H887376', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(277, 'student', 'Charmine', 'cmilstedq@google.ru', 'WBAPL3C57AA091047', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(278, 'student', 'Sherwin', 'sbleacherr@myspace.com', 'WAUSF78K89A438923', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(279, 'student', 'Corbett', 'challitts@guardian.co.uk', '19UUA9F7XEA043349', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(280, 'student', 'Pasquale', 'pmanjott@slate.com', 'WBA3A5C56FF407628', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(281, 'student', 'Haze', 'hkinforthu@sourceforge.net', '2G61T5S31F9749388', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(282, 'student', 'Lynea', 'lbagnallv@rakuten.co.jp', 'WAUSF98K09N955055', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(283, 'student', 'Reider', 'rbradbeerw@mail.ru', '1G4GC5EC1BF496038', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(284, 'student', 'Buddie', 'bohlsenx@geocities.jp', 'WAUHGBFC1DN486853', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:12', NULL),
(285, 'student', 'Shannah', 'sgymbletty@tiny.cc', '1N6AA0EJ1FN196736', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(286, 'student', 'Clarisse', 'ctillettz@usnews.com', 'KL4CJGSBXDB546181', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(287, 'student', 'Ryon', 'riacovacci10@blogtalkradio.com', 'WBSWL93589P971936', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(288, 'student', 'Cecilla', 'cboyles11@reverbnation.com', '5LMJJ2H54CE546684', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(289, 'student', 'Connie', 'clewson12@elegantthemes.com', '1FTEW1C87FK297368', 3, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(290, 'student', 'Wally', 'whauxley13@linkedin.com', 'WBAFR9C59BD339988', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(291, 'student', 'Wilow', 'wbarbour14@topsy.com', 'WAULD64B43N556123', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(292, 'student', 'Louise', 'lcurgenven15@tamu.edu', 'WAUKF78E48A795668', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(293, 'student', 'Rutter', 'rlanglois16@jugem.jp', '5J8TB3H52GL233364', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(294, 'student', 'Cortney', 'chatherill17@guardian.co.uk', '1G4HA5EM5AU828950', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(295, 'student', 'Shaylynn', 'shedger18@tripadvisor.com', '5TDBY5G14BS709205', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(296, 'student', 'Dosi', 'dallerton19@home.pl', '1G4GF5E32DF434920', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(297, 'student', 'Tracey', 'tbawdon1a@miibeian.gov.cn', '2G4WC582491502785', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(298, 'student', 'Hagen', 'hpharaoh1b@soup.io', '1FTEX1C84AK181857', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(299, 'student', 'Corie', 'csopp1c@nhs.uk', '1G6DA8E55D0483978', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(300, 'student', 'Kanya', 'kbumpass1d@constantcontact.com', '19UUA66256A025491', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(301, 'student', 'Temple', 'tropert1e@marriott.com', 'WBA3X5C57ED747024', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(302, 'student', 'Wendye', 'wbernardini1f@domainmarket.com', 'JM3TB2BA8D0434429', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(303, 'student', 'Currey', 'cglentz1g@toplist.cz', '19XFB2F5XEE104979', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(304, 'student', 'Tamma', 'tbaumaier1h@state.gov', 'JN8AF5MRXFT589823', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(305, 'student', 'Gabbie', 'giacobacci1i@facebook.com', '5N1AR2MM0EC406235', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(306, 'student', 'Davey', 'dreihm1j@rakuten.co.jp', 'JN1CV6EK3AM785607', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(307, 'student', 'Bamby', 'blandor1k@stumbleupon.com', '3VW507ATXEM777780', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(308, 'student', 'Archer', 'acomsty1l@topsy.com', '2G4WC582871109577', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(309, 'student', 'Kirstin', 'klearmonth1m@is.gd', 'WA1LFBFP1DA554153', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(310, 'student', 'Timmy', 'tsowersby1n@g.co', 'WA1WMBFE2FD499425', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(311, 'student', 'Fionnula', 'fomonahan1o@php.net', '1C4RJEAG5EC478692', 3, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(312, 'student', 'Flory', 'fvasilik1p@bigcartel.com', '3VW117AU2FM376214', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(313, 'student', 'Ingram', 'itomaschke1q@cloudflare.com', 'WBANV13509C375772', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(314, 'student', 'Francklyn', 'fgrissett1r@behance.net', 'JHMZF1D6XES568406', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(315, 'student', 'Ardine', 'aslinger1s@angelfire.com', 'WA1LMAFEXDD526669', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(316, 'student', 'Hollie', 'hdrage1t@tripod.com', 'WBAXH5C5XCC425513', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(317, 'student', 'Giavani', 'gwillarton1u@sun.com', '5TFCW5F18DX184352', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(318, 'student', 'Archie', 'aspurdon1v@independent.co.uk', '5TDDK4CC6AS749912', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(319, 'student', 'Donnajean', 'dsabine1w@vinaora.com', 'WBA3C3C51FP128595', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(320, 'student', 'Rivy', 'rtine1x@globo.com', 'WA1AY74L17D494621', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(321, 'student', 'Wallache', 'wbrooke1y@ft.com', '5UXFG8C50DL652261', 4, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(322, 'student', 'Arden', 'adecayette1z@wp.com', 'KNALN4D76F5033705', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(323, 'student', 'Ronald', 'rbasden20@nytimes.com', '19UUA65656A182247', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(324, 'student', 'Ambur', 'adigger21@gmpg.org', '1FTEX1CMXDF148971', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(325, 'student', 'Hadlee', 'hshreeve22@behance.net', '1B3CB1HA8BD006183', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(326, 'student', 'Quinn', 'qchristopherson23@4shared.com', '1G6YV34AX55766856', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(327, 'student', 'Annadiane', 'akingcote24@ehow.com', 'TRUUT28N051674404', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(328, 'student', 'Phineas', 'pwarrack25@netscape.com', 'WBAKB0C5XAC644872', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(329, 'student', 'Dalila', 'dmerwe26@forbes.com', 'WBSDE93462B502758', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(330, 'student', 'Layton', 'ldarlison27@paginegialle.it', 'WAUKH98E37A479392', 3, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(331, 'student', 'Phillip', 'pscrigmour28@businessweek.com', 'WAUBC48H05K271215', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(332, 'student', 'Dunc', 'dkermath29@phpbb.com', 'WAUAF78E68A401566', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(333, 'student', 'Bria', 'bkaroly2a@behance.net', '1G6DL1E3XD0461197', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(334, 'student', 'Marie-ann', 'mgeorgiades2b@ow.ly', '1GTN1UEHXFZ837335', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(335, 'student', 'Ilka', 'icopeland2c@mapquest.com', 'WBANE53517C030898', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(336, 'student', 'Rockey', 'rpatel2d@mediafire.com', '3VWJP7AT3CM068437', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(337, 'student', 'Renell', 'rbotwright2e@diigo.com', '2T1BURHE2EC988946', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(338, 'student', 'Theo', 'twaiton2f@wufoo.com', '1G6AL5SX8D0108720', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(339, 'student', 'Bunnie', 'bpanas2g@comcast.net', 'WAUA2AFD9EN425545', 2, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(340, 'student', 'Helaina', 'hferrai2h@geocities.jp', 'WAUVT54B42N582273', 4, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(341, 'student', 'Prudi', 'pschlagtmans2i@sitemeter.com', 'WAUFFAFL0BA917286', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(342, 'student', 'Charmion', 'cvoelker2j@youku.com', '19XFB2F24CE332379', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(343, 'student', 'Ario', 'alouden2k@ox.ac.uk', '1N6AF0KY5FN009274', 2, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(344, 'student', 'Edouard', 'efilipov2l@tuttocitta.it', '1N6AF0LY4FN804895', 1, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(345, 'student', 'Griz', 'gfeavearyear2m@howstuffworks.com', '1G6DP5E30D0816339', 1, 5, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(346, 'student', 'Justine', 'jdockerty2n@latimes.com', 'KMHTC6AD4FU376240', 1, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(347, 'student', 'Franzen', 'fdufaire2o@gmpg.org', 'WA1CFAFP6BA827000', 4, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(348, 'student', 'Hamilton', 'hclawson2p@marketwatch.com', 'JH4NA21614S124028', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(349, 'student', 'Calhoun', 'cserot2q@apache.org', '1N4AB7AP9EN216769', 3, 4, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(350, 'student', 'Natalie', 'nberriman2r@salon.com', '1GKS1AEC6FR083800', 2, 3, 4, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-03 21:06:13', NULL),
(351, 'admin', 'angar', 'angar@gmail.com', NULL, NULL, NULL, NULL, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-02 13:32:48', NULL),
(353, 'registerar', 'asim', 'asim@gmail.com', NULL, NULL, NULL, NULL, '$2b$05$WANIcfiFz4CVDl0MuUUh5O3G9ApeNWuY.g79u9ooOiqgAvGe1UnX.', '2022-09-04 11:41:19', '2022-09-04 11:44:41'),
(354, 'admin', 'ahmed', 'ahmed@gmail.com', NULL, NULL, NULL, NULL, '$2b$05$uSKX0b5v3b2CPTLS6eOGwuV5Mh.cffMPmxhr.9SItoWxqvXPatIGy', '2022-09-04 11:43:26', '2022-09-04 11:43:26'),
(355, 'student', 'fatima', 'fatima@gmail.com', '2005', 1, 8, 7, '$2a$05$37Q7rfZGehBRoJUgvR0sQujt2T1wb.43DhEfU/MO5coU6aJWHHK96', '2022-09-04 11:56:04', '2022-09-04 12:04:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registerer` (`registerer_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registerer` (`college_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collage_id` (`college_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `collage_id` (`college_id`);

--
-- Indexes for table `subject_with_departments`
--
ALTER TABLE `subject_with_departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `time_table`
--
ALTER TABLE `time_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_id`),
  ADD KEY `collage_id` (`college_id`),
  ADD KEY `hall_id` (`room_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `department` (`department_id`),
  ADD KEY `collage_id` (`college_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `college`
--
ALTER TABLE `college`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `subject_with_departments`
--
ALTER TABLE `subject_with_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `time_table`
--
ALTER TABLE `time_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1387;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=356;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `college`
--
ALTER TABLE `college`
  ADD CONSTRAINT `college_ibfk_1` FOREIGN KEY (`registerer_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_ibfk_3` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subject_with_departments`
--
ALTER TABLE `subject_with_departments`
  ADD CONSTRAINT `subject_with_departments_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_with_departments_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `time_table`
--
ALTER TABLE `time_table`
  ADD CONSTRAINT `time_table_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `time_table_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `time_table_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
