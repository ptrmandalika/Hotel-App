-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Jun 2023 pada 10.45
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hoteldb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `booking_number` int(11) DEFAULT NULL,
  `booker_name` varchar(255) DEFAULT NULL,
  `booker_email` varchar(255) DEFAULT NULL,
  `booking_date` datetime DEFAULT NULL,
  `check_in_date` datetime DEFAULT NULL,
  `check_out_date` datetime DEFAULT NULL,
  `guest_name` varchar(255) DEFAULT NULL,
  `total_room` int(11) DEFAULT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  `booking_status` enum('new','check_in','check_out') DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_detail`
--

CREATE TABLE `booking_detail` (
  `booking_detail_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `access_date` datetime DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `room_number` int(11) DEFAULT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `room`
--

INSERT INTO `room` (`room_id`, `room_number`, `room_type_id`, `createdAt`, `updatedAt`) VALUES
(1, 101, 1, '2023-06-22 12:09:40', '2023-06-22 12:09:40'),
(2, 102, 1, '2023-06-22 12:09:43', '2023-06-22 12:09:43'),
(3, 103, 1, '2023-06-22 12:09:47', '2023-06-22 12:09:47'),
(4, 201, 2, '2023-06-22 12:09:53', '2023-06-22 12:09:53'),
(5, 202, 2, '2023-06-22 12:09:56', '2023-06-22 12:09:56'),
(6, 203, 2, '2023-06-22 12:09:59', '2023-06-22 12:09:59'),
(7, 301, 3, '2023-06-22 12:10:04', '2023-06-22 12:10:04'),
(8, 302, 3, '2023-06-22 12:10:08', '2023-06-22 12:10:08'),
(9, 303, 3, '2023-06-22 12:10:10', '2023-06-27 06:34:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `room_type`
--

CREATE TABLE `room_type` (
  `room_type_id` int(11) NOT NULL,
  `room_type_name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `room_type`
--

INSERT INTO `room_type` (`room_type_id`, `room_type_name`, `price`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Standard', 300000, 'All our guestrooms are elegantly furnished with handmade furniture include luxury en-suite facilities with complimentary amenities pack, flat screen LCD TV, tea/coffee making facilities, fan, hairdryer and the finest pure white linen and towels.', 'http://localhost:8000/roomtype/Standard Room-1687424173449.jpg', '2023-06-22 08:56:13', '2023-06-27 11:04:33'),
(2, 'Deluxe', 500000, 'All our guestrooms are elegantly furnished with handmade furniture include luxury en-suite facilities with complimentary amenities pack, flat screen LCD TV, tea/coffee making facilities, fan, hairdryer and the finest pure white linen and towels.', 'http://localhost:8000/roomtype/Deluxe Room-1687424188143.jpg', '2023-06-22 08:56:28', '2023-06-22 08:56:28'),
(3, 'Suite', 700000, 'All our guestrooms are elegantly furnished with handmade furniture include luxury en-suite facilities with complimentary amenities pack, flat screen LCD TV, tea/coffee making facilities, fan, hairdryer and the finest pure white linen and towels.', 'http://localhost:8000/roomtype/Suite Room-1687424200892.jpg', '2023-06-22 08:56:40', '2023-06-29 08:27:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230605085646-create-user.js'),
('20230605090016-create-room-type.js'),
('20230605093141-create-room.js'),
('20230605094314-create-booking.js'),
('20230605094911-create-booking-detail.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` enum('admin','receptionist') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `username`, `photo`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(7, 'Admin', 'http://localhost:8000/user/Admin-1688026921753.jpg', 'admin@gmail.com', '1718c24b10aeb8099e3fc44960ab6949ab76a267352459f203ea1036bec382c2', 'admin', '2023-06-29 08:22:01', '2023-06-29 08:22:01'),
(8, 'Receptionist', 'http://localhost:8000/user/Resepsionis-1688026942786.png', 'receptionist@gmail.com', '1718c24b10aeb8099e3fc44960ab6949ab76a267352459f203ea1036bec382c2', 'receptionist', '2023-06-29 08:22:22', '2023-06-29 08:22:22');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indeks untuk tabel `booking_detail`
--
ALTER TABLE `booking_detail`
  ADD PRIMARY KEY (`booking_detail_id`);

--
-- Indeks untuk tabel `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indeks untuk tabel `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`room_type_id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `booking_detail`
--
ALTER TABLE `booking_detail`
  MODIFY `booking_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT untuk tabel `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `room_type`
--
ALTER TABLE `room_type`
  MODIFY `room_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
