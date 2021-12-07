-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Created time: 21-11-15 06:48
-- Server version: 8.0.18
-- PHP version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `books`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `authorID` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `nationality` varchar(30) NOT NULL,
  `birthYear` int(10) UNSIGNED NOT NULL,
  `deathYear` int(10) UNSIGNED DEFAULT NULL,
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `author`
--

INSERT INTO `author` (`authorID`, `name`, `surname`, `nationality`, `birthYear`, `deathYear`, `deleteFlag`) VALUES
(1, 'Miguel', 'de Cervantes Saavedra', 'Spanish', 1547, 1616, 0),
(2, 'Charles', 'Dickens', 'British', 1812, 1870, 0),
(3, 'J.R.R.', 'Tolkien', 'British', 1892, 1973, 0),
(4, 'Antoine', 'de Saint-Exupery', 'French', 1900, 1944, 0),
(5, 'J.K.', 'Rowling', 'British', 1965, NULL, 0),
(6, 'Agatha', 'Christie', 'British', 1890, 1976, 0),
(7, 'Cao', 'Xueqin', 'Chinese', 1715, 1763, 0),
(8, 'Henry', ' Rider Haggard', 'British', 1856, 1925, 0),
(9, 'C.S.', 'Lewis', 'British', 1898, 1963, 0);

-- --------------------------------------------------------

--
-- Dumping data for table `author`
--

CREATE TABLE `book` (
  `bookID` int(10) UNSIGNED NOT NULL,
  `bookTitle` varchar(255) NOT NULL,
  `originalTitle` varchar(255) DEFAULT NULL,
  `yearofPublication` int(11) NOT NULL DEFAULT '0',
  `genre` varchar(30) NOT NULL,
  `millionsSold` int(10) UNSIGNED NOT NULL,
  `languageWritten` varchar(30) NOT NULL,
  `coverImagePath` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '/img/book.png',
  `authorID` int(10) UNSIGNED NOT NULL,
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `book`
--

INSERT INTO `book` (`bookID`, `bookTitle`, `originalTitle`, `yearofPublication`, `genre`, `millionsSold`, `languageWritten`, `coverImagePath`, `authorID`, `deleteFlag`) VALUES
(1, 'Don Quixote', 'El Ingenioso Hidalgo Don Quixote de la Mancha', 1605, 'Novel', 500, 'Spanish', '/img/book.png', 1, 0),
(2, 'A Tale of Three City', 'A Tale of Two Cities', 1900, 'History essay', 300, 'English', '/img/book.png', 2, 0),
(3, 'The Lord of the Rings', 'The Lord of the Rings', 1954, 'Fantasy/Adventure', 150, 'English', '/img/book.png', 3, 0),
(4, 'The Litle Prince', 'Le Petit Prince', 1943, 'Fable', 142, 'French', '/img/book.png', 4, 0),
(5, 'Harry Potter and the Sorcerer\'s Stone', 'Harry Potter and the Sorcerer\'s Stone', 1997, 'Fantasy Fiction', 107, 'English', '/img/book.png', 5, 0),
(6, 'And Then There Were None', 'Ten Little Niggers', 1939, 'Mystery', 100, 'English', '/img/book.png', 6, 0),
(7, 'The Dream of the Red Chamber', 'The Story of the Stone', 1792, 'Novel', 100, 'Chinese', '/img/book.png', 7, 0),
(8, 'The Hobbit ', 'There and Back Again', 1937, 'High Fantasy', 100, 'English', '/img/book.png', 3, 0),
(9, 'She: A History of Adventure', 'She', 1886, 'Fiction', 100, 'English', '/img/book.png', 8, 0),
(10, 'The Lion, the Witch and the Wardrobe', 'The Lion, the Witch and the Wardrobe', 1950, 'Fantasy', 85, 'English ', '/img/book.png', 9, 0);

-- --------------------------------------------------------

--
-- Dumping data for table `book`
--

CREATE TABLE `bookplot` (
  `bookPlotID` int(10) UNSIGNED NOT NULL,
  `plot` blob NOT NULL,
  `plotSource` varchar(255) NOT NULL,
  `bookID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bookplot`
--

CREATE TABLE `changelog` (
  `changeLogID` int(10) UNSIGNED NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateChanged` datetime DEFAULT NULL,
  `bookID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `changelog`
--

INSERT INTO `changelog` (`changeLogID`, `dateCreated`, `dateChanged`, `bookID`, `userID`) VALUES
(1, '2021-11-14 22:19:26', NULL, 1, 1),
(2, '2021-11-14 22:19:26', NULL, 2, 1),
(3, '2021-11-14 22:19:26', NULL, 3, 1),
(4, '2021-11-14 22:19:26', NULL, 4, 1),
(5, '2021-11-14 22:19:26', NULL, 5, 1),
(6, '2021-11-14 22:19:26', NULL, 6, 1),
(7, '2021-11-14 22:19:26', NULL, 7, 1),
(8, '2021-11-14 22:19:26', NULL, 8, 1),
(9, '2021-11-14 22:19:26', NULL, 9, 1),
(10, '2021-11-14 22:19:26', NULL, 10, 1),
(11, '2021-11-14 22:19:26', '2021-11-15 15:47:04', 1, 1),
(12, '2021-11-14 22:19:26', '2021-11-15 15:49:45', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessRights` varchar(200) NOT NULL,
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `email`, `username`, `password`, `accessRights`, `deleteFlag`) VALUES
(1, 'Moonsung', 'Jeong', 'ms@gmail.com', 'cat', '$2b$06$NE5i9VwX1Fuka88YvHb/H.Py/cc1ulXA0MwQsStr8TumVkcmjuI/C', 'admin', 0),
(2, 'John', 'Smith', 'js@gmail.com', 'dog', '$2b$06$2AAR.pOVG4GYA3XlaRBKpuPhubuEsihi.j1dEMKtH5nRXcFgSV1Me', 'user', 0);

--
-- Dumping index for table
--

--
-- Index for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`authorID`);

--
-- Index for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`bookID`),
  ADD KEY `fk_author` (`authorID`);

--
-- Index for table `bookplot`
--
ALTER TABLE `bookplot`
  ADD PRIMARY KEY (`bookPlotID`),
  ADD KEY `fk_bookID_P` (`bookID`);

--
-- Index for table `changelog`
--
ALTER TABLE `changelog`
  ADD PRIMARY KEY (`changeLogID`),
  ADD KEY `fk_bookID_C` (`bookID`),
  ADD KEY `fk_userID_C` (`userID`);

--
-- Index for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for table
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `authorID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `bookID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bookplot`
--
ALTER TABLE `bookplot`
  MODIFY `bookPlotID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `changelog`
--
ALTER TABLE `changelog`
  MODIFY `changeLogID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`authorID`) REFERENCES `author` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `bookplot`
--
ALTER TABLE `bookplot`
  ADD CONSTRAINT `fk_bookID_P` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `changelog`
--
ALTER TABLE `changelog`
  ADD CONSTRAINT `fk_bookID_C` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userID_C` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
