SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `award_category`
--

CREATE TABLE `award_category` (
  `id` int(11) NOT NULL,
  `award_name` varchar(255) DEFAULT NULL,
  `award_condition` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_alotment`
--

CREATE TABLE `car_alotment` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL DEFAULT '0',
  `route_travel_time_id` int(11) DEFAULT '0',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_delete` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_break_down`
--

CREATE TABLE `car_break_down` (
  `id` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  `report_date` date DEFAULT NULL,
  `report_date_time` int(11) DEFAULT NULL,
  `report_by` int(11) NOT NULL DEFAULT '0',
  `is_seen` int(11) NOT NULL DEFAULT '0',
  `is_action` int(11) NOT NULL DEFAULT '0',
  `action_date` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_driver_mapping`
--

CREATE TABLE `car_driver_mapping` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL DEFAULT '0',
  `car_id` int(11) NOT NULL DEFAULT '0',
  `from_date` date DEFAULT NULL,
  `till_date` date DEFAULT NULL,
  `assign` text COMMENT 'from_date and till date for ',
  `is_delete` int(11) NOT NULL DEFAULT '0',
  `start_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_drive_history`
--

CREATE TABLE `car_drive_history` (
  `id` int(11) NOT NULL,
  `route_timing_id` int(11) NOT NULL DEFAULT '0',
  `car_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `drive_date` date NOT NULL DEFAULT '1970-01-01',
  `drive_start_time` time NOT NULL DEFAULT '00:00:00',
  `drive_end_time` time DEFAULT NULL,
  `start_lat` float NOT NULL DEFAULT '0',
  `start_lon` float NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_drive_history_log`
--

CREATE TABLE `car_drive_history_log` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `route_id` int(11) NOT NULL,
  `route_timing_id` int(11) NOT NULL,
  `stoppage_id` int(11) NOT NULL,
  `travel_date` date NOT NULL,
  `travel_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_drive_time_log`
--

CREATE TABLE `car_drive_time_log` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL DEFAULT '0',
  `driver_id` int(11) NOT NULL DEFAULT '0',
  `route_id` int(11) NOT NULL DEFAULT '0',
  `route_timing_id` int(11) NOT NULL DEFAULT '0',
  `date` date NOT NULL DEFAULT '1970-01-01',
  `stoppage_id` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_master`
--

CREATE TABLE `car_master` (
  `id` int(11) NOT NULL,
  `car_type_id` int(11) NOT NULL DEFAULT '0',
  `register_date` varchar(25) NOT NULL DEFAULT '0',
  `car_insurence_last_date` varchar(25) NOT NULL DEFAULT '0',
  `car_cf_date` varchar(25) NOT NULL DEFAULT '0',
  `car_reg_no` varchar(25) NOT NULL DEFAULT '0',
  `car_rto_1` varchar(25) NOT NULL DEFAULT '0',
  `car_rto_2` varchar(25) NOT NULL DEFAULT '0',
  `car_owner_id` int(11) NOT NULL DEFAULT '0',
  `is_delete` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_owner`
--

CREATE TABLE `car_owner` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `billing_type` tinyint(4) NOT NULL COMMENT '1=FIXED, 2 = FIXED + INCENTIVE, 3= PER SEAT',
  `company_name` varchar(255) NOT NULL DEFAULT '0',
  `trade_li_no` varchar(255) NOT NULL DEFAULT '0',
  `trade_li_valid_from` varchar(25) NOT NULL DEFAULT '0',
  `trade_li_valid_till` varchar(25) NOT NULL DEFAULT '0',
  `physical_condition` text,
  `bank_account_no` varchar(25) NOT NULL DEFAULT '0',
  `ifsc_code` varchar(25) NOT NULL DEFAULT '0',
  `bank_details` text,
  `gst_no` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_owner_earning`
--

CREATE TABLE `car_owner_earning` (
  `id` int(11) NOT NULL,
  `car_allotment_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_owner_pay_in`
--

CREATE TABLE `car_owner_pay_in` (
  `id` int(11) NOT NULL,
  `car_owner_id` int(11) NOT NULL DEFAULT '0',
  `car_id` int(11) NOT NULL DEFAULT '0',
  `trip_id` int(11) NOT NULL DEFAULT '0',
  `total_no_of_booking` int(11) NOT NULL DEFAULT '0',
  `total_amount_credit` float NOT NULL DEFAULT '0',
  `credit_date` varchar(15) NOT NULL DEFAULT '0',
  `Is_debited` varchar(15) NOT NULL DEFAULT '0',
  `debited_date` varchar(15) NOT NULL DEFAULT '0',
  `start_ontime` varchar(15) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_owner_pay_out`
--

CREATE TABLE `car_owner_pay_out` (
  `id` int(11) NOT NULL,
  `car_owner_id` int(11) NOT NULL DEFAULT '0',
  `total_amount` float NOT NULL DEFAULT '0',
  `sgst` float NOT NULL DEFAULT '0',
  `cgst` float NOT NULL DEFAULT '0',
  `withdral_date` varchar(15) NOT NULL DEFAULT '0',
  `admin_user_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_owner_status`
--

CREATE TABLE `car_owner_status` (
  `id` int(11) NOT NULL,
  `car_owner_id` int(11) NOT NULL DEFAULT '0',
  `trip_id` int(11) NOT NULL DEFAULT '0',
  `ontime` float NOT NULL DEFAULT '0',
  `delay_fine` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_seat_layout_master`
--

CREATE TABLE `car_seat_layout_master` (
  `id` int(11) NOT NULL,
  `lay_out_name` varchar(255) NOT NULL DEFAULT '0',
  `no_of_seat` int(11) NOT NULL DEFAULT '0',
  `layout_matrix` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `car_type`
--

CREATE TABLE `car_type` (
  `id` int(11) NOT NULL,
  `type_name` varchar(25) NOT NULL DEFAULT '0',
  `car_short_name` varchar(65) NOT NULL DEFAULT '0',
  `layout_master_id` int(11) NOT NULL,
  `vendor_price` float(9,2) NOT NULL DEFAULT '0.00' COMMENT 'Per KM',
  `rate_per_seat` float(9,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `sortname` varchar(3) NOT NULL,
  `name` varchar(150) NOT NULL,
  `phonecode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `coupan_name` varchar(255) DEFAULT NULL,
  `validity_start` varchar(15) DEFAULT NULL,
  `validity_end` varchar(15) DEFAULT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `coupan_code` varchar(25) DEFAULT NULL,
  `coupan_type` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `coupon_type`
--

CREATE TABLE `coupon_type` (
  `id` int(11) NOT NULL,
  `coupon_type_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `driver_master`
--

CREATE TABLE `driver_master` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `contact_number` varchar(15) DEFAULT NULL,
  `driving_li_no` varchar(25) DEFAULT NULL,
  `licence_photo1` text,
  `licence_photo2` text,
  `licence_valid_till` varchar(25) DEFAULT NULL,
  `physical_condition` varchar(25) DEFAULT NULL,
  `bank_account_no` varchar(25) DEFAULT NULL,
  `ifsc_code` varchar(25) DEFAULT NULL,
  `bank_details` varchar(500) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fare_master`
--

CREATE TABLE `fare_master` (
  `id` int(11) NOT NULL,
  `kilometer_upto` float NOT NULL DEFAULT '0',
  `fare_rs` float NOT NULL DEFAULT '0',
  `vendor_price` float(9,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(10) UNSIGNED NOT NULL,
  `serial_number` int(11) NOT NULL,
  `cgst_percentage` float(9,2) NOT NULL DEFAULT '0.00',
  `sgst_percentage` float(9,2) NOT NULL DEFAULT '0.00',
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_line_item`
--

CREATE TABLE `invoice_line_item` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `quantity` tinyint(3) UNSIGNED NOT NULL,
  `amount` float(9,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_recipient_info`
--

CREATE TABLE `invoice_recipient_info` (
  `id` int(11) NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `contact_number_1` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` mediumtext NOT NULL,
  `state` varchar(50) NOT NULL,
  `pin_code` varchar(10) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `gst_no` varchar(30) NOT NULL,
  `contact_number_2` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location_coordinates`
--

CREATE TABLE `location_coordinates` (
  `id` bigint(20) NOT NULL,
  `location_master_id` int(11) NOT NULL,
  `latitude` varchar(25) NOT NULL,
  `longitude` varchar(25) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `geometry_point` point NOT NULL,
  `text_1` varchar(100) NOT NULL,
  `text_2` varchar(100) NOT NULL,
  `is_deleted` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location_master`
--

CREATE TABLE `location_master` (
  `id` int(11) NOT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_lat` varchar(25) DEFAULT NULL,
  `location_long` varchar(25) DEFAULT NULL,
  `org_location` text,
  `is_deleted` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location_master_image`
--

CREATE TABLE `location_master_image` (
  `id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `img_txt` varchar(255) NOT NULL DEFAULT '0',
  `img_path` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location_master_old`
--

CREATE TABLE `location_master_old` (
  `id` int(11) NOT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_lat` varchar(25) DEFAULT NULL,
  `location_long` varchar(25) DEFAULT NULL,
  `org_location` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `map_images`
--

CREATE TABLE `map_images` (
  `id` int(11) NOT NULL,
  `img_path` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `non_operational_dates`
--

CREATE TABLE `non_operational_dates` (
  `id` int(10) UNSIGNED NOT NULL,
  `selected_date` date NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `non_operational_departures`
--

CREATE TABLE `non_operational_departures` (
  `id` int(10) UNSIGNED NOT NULL,
  `non_operational_date_id` int(10) UNSIGNED NOT NULL,
  `route_travel_time_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notice_title` text NOT NULL,
  `notice_txt` text NOT NULL,
  `notice_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notice_img` text NOT NULL,
  `notice_type` int(11) NOT NULL DEFAULT '0',
  `is_seen` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications_to_user`
--

CREATE TABLE `notifications_to_user` (
  `id` int(11) NOT NULL,
  `notice_id` int(11) NOT NULL DEFAULT '0',
  `device_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pass_km_segment`
--

CREATE TABLE `pass_km_segment` (
  `id` int(11) NOT NULL,
  `from_distance` int(10) UNSIGNED NOT NULL COMMENT 'in Meters',
  `to_distance` int(10) UNSIGNED NOT NULL COMMENT 'in Meters'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pass_master`
--

CREATE TABLE `pass_master` (
  `id` int(11) NOT NULL,
  `is_promotional` tinyint(4) NOT NULL DEFAULT '0',
  `pass_name` varchar(100) NOT NULL,
  `pass_price` float(9,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `validity` int(11) NOT NULL COMMENT 'In Days',
  `no_of_rides` int(11) NOT NULL,
  `km_segment_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  `is_deleted` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pass_settings`
--

CREATE TABLE `pass_settings` (
  `id` int(11) NOT NULL,
  `route_id` int(11) NOT NULL,
  `validity` int(11) NOT NULL COMMENT 'In Days',
  `no_of_rides` int(11) NOT NULL,
  `pass_percentange` float(9,2) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment_gateway_transactions`
--

CREATE TABLE `payment_gateway_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'only used for detecting wallet recharg transaction',
  `tmp_booking_id` int(10) UNSIGNED DEFAULT NULL,
  `booking_id` int(10) UNSIGNED DEFAULT NULL,
  `tmp_pass_id` int(10) UNSIGNED DEFAULT NULL,
  `wallet_transaction_id` int(10) UNSIGNED DEFAULT NULL,
  `amount` float NOT NULL,
  `transaction_type` varchar(20) DEFAULT NULL,
  `transaction_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gateway_reference_number` varchar(20) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=Pending, 1=Paid, 2=Refunded, 3=Partially Refunded',
  `refund_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `razorpay_order_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pay_booking`
--

CREATE TABLE `pay_booking` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `customer_boarded` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `journy_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `drop_time` time NOT NULL,
  `actual_pickup_time` time NOT NULL,
  `actual_drop_time` time NOT NULL,
  `stoppage_start_id` int(11) NOT NULL DEFAULT '0',
  `stoppage_end_id` int(11) NOT NULL DEFAULT '0',
  `route_timing_id` int(11) NOT NULL DEFAULT '0',
  `amount` float NOT NULL DEFAULT '0' COMMENT 'including gst',
  `refund_amount` float NOT NULL DEFAULT '0',
  `is_paid` tinyint(4) NOT NULL DEFAULT '0',
  `is_cancelled` tinyint(4) NOT NULL DEFAULT '0',
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_amount` float NOT NULL DEFAULT '0',
  `distance` int(11) NOT NULL DEFAULT '0',
  `free_mode` tinyint(4) NOT NULL DEFAULT '0',
  `booking_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `qrcode_generation_time` datetime DEFAULT NULL,
  `qrcode_file_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rate_negotiation`
--

CREATE TABLE `rate_negotiation` (
  `id` int(11) NOT NULL,
  `car_owner_id` int(11) NOT NULL DEFAULT '0',
  `route_id` int(11) NOT NULL DEFAULT '0',
  `car_id` int(11) NOT NULL DEFAULT '0',
  `price_in_percentage` int(15) NOT NULL DEFAULT '0',
  `how_much_percent` varchar(10) DEFAULT NULL,
  `fixed_price` int(11) NOT NULL DEFAULT '0',
  `how_much` varchar(25) DEFAULT NULL,
  `negotiation_date` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `referral`
--

CREATE TABLE `referral` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `who_refer_id` int(11) DEFAULT '0',
  `date_of_reference` varchar(15) NOT NULL DEFAULT '0',
  `referral_master_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `referral_balance`
--

CREATE TABLE `referral_balance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `ref_master_id` int(11) NOT NULL DEFAULT '0',
  `amount` float NOT NULL DEFAULT '0',
  `in_out` int(11) NOT NULL DEFAULT '1',
  `which_pay` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `referral_master`
--

CREATE TABLE `referral_master` (
  `id` int(11) NOT NULL,
  `media_name` varchar(25) DEFAULT NULL,
  `media_id` int(11) NOT NULL DEFAULT '0',
  `ref_amout` float NOT NULL DEFAULT '0',
  `offer_start_date` varchar(15) DEFAULT NULL,
  `offer_end_date` varchar(15) DEFAULT NULL,
  `ref_icon` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `referral_setting`
--

CREATE TABLE `referral_setting` (
  `id` int(11) NOT NULL,
  `referral_settng_name` varchar(500) DEFAULT NULL,
  `using_amount` int(11) NOT NULL DEFAULT '0',
  `is_active` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `refunds`
--

CREATE TABLE `refunds` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `payment_gateway_transaction_id` int(10) UNSIGNED NOT NULL,
  `transaction_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ref_setting`
--

CREATE TABLE `ref_setting` (
  `id` int(11) NOT NULL,
  `header_image` text,
  `ref_title` text,
  `ref_text` text,
  `ref_msg` text,
  `ref_link` text,
  `ref_trm_condi` text,
  `ref_amount` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `route_travel_time`
--

CREATE TABLE `route_travel_time` (
  `id` int(11) NOT NULL,
  `route_master_id` int(11) NOT NULL DEFAULT '0',
  `booking_allowed_upto_stop_order` smallint(5) UNSIGNED NOT NULL DEFAULT '1000',
  `price_adjustment` int(11) NOT NULL DEFAULT '0' COMMENT 'in %',
  `special_fare` float(9,2) NOT NULL DEFAULT '0.00',
  `timing_name` varchar(255) DEFAULT NULL,
  `start_time` time NOT NULL DEFAULT '00:00:00',
  `end_time` time NOT NULL DEFAULT '00:00:00',
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rout_master`
--

CREATE TABLE `rout_master` (
  `id` int(11) NOT NULL,
  `route_name` varchar(100) DEFAULT NULL,
  `route_name_to` varchar(255) DEFAULT NULL,
  `start_location_id` int(11) NOT NULL DEFAULT '0',
  `end_location_id` int(11) NOT NULL DEFAULT '0',
  `start_location_coordinate_id` bigint(20) NOT NULL,
  `end_location_coordinate_id` bigint(20) NOT NULL,
  `polyline` text,
  `total_km` float NOT NULL DEFAULT '0',
  `total_drive_time` float NOT NULL DEFAULT '0',
  `route_timing_type` tinyint(3) UNSIGNED NOT NULL COMMENT '1:Before 1pm, 2:After 1pm',
  `complement_route_id` int(11) DEFAULT NULL,
  `up_down` tinyint(4) DEFAULT NULL COMMENT '1=up,2=down',
  `bookable_upto_stop_order` smallint(5) UNSIGNED NOT NULL DEFAULT '1000' COMMENT 'The last stop order upto which booking / boarding is permitted for this route',
  `flat_fare` float(5,2) NOT NULL DEFAULT '0.00',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `searches_with_no_data`
--

CREATE TABLE `searches_with_no_data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `search_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `from_location_id` int(11) NOT NULL,
  `to_location_id` int(11) NOT NULL,
  `journey_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seat_booking`
--

CREATE TABLE `seat_booking` (
  `id` int(11) NOT NULL,
  `seat_no` int(11) NOT NULL DEFAULT '0',
  `pay_booking_id` int(11) NOT NULL DEFAULT '0',
  `is_cancelled` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seat_master`
--

CREATE TABLE `seat_master` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL DEFAULT '0',
  `seat_master_map_id` int(11) NOT NULL DEFAULT '0',
  `seat_no_qr` varchar(33) NOT NULL DEFAULT '0',
  `img_path` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seat_master_map`
--

CREATE TABLE `seat_master_map` (
  `id` int(11) NOT NULL,
  `car_seat_layout_master_id` int(11) NOT NULL DEFAULT '0',
  `seat_no` int(11) NOT NULL DEFAULT '0',
  `is_window` int(11) NOT NULL DEFAULT '0',
  `is_middle1` int(11) NOT NULL DEFAULT '0',
  `is_middle2` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Service_master`
--

CREATE TABLE `Service_master` (
  `id` int(11) NOT NULL,
  `service_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `settings_up`
--

CREATE TABLE `settings_up` (
  `id` int(11) NOT NULL,
  `is_ref_offer` int(11) NOT NULL DEFAULT '1' COMMENT '1=yes 0=no',
  `app_starting_date` datetime NOT NULL,
  `ref_amount` int(11) NOT NULL DEFAULT '50',
  `is_free_ride` int(11) NOT NULL DEFAULT '1' COMMENT '1=yes 0=no',
  `free_ride_no_of_seat` int(11) NOT NULL DEFAULT '1',
  `razor_pay_key` text,
  `razor_pay_id` varchar(500) DEFAULT NULL COMMENT 'secret_key',
  `gst` int(11) NOT NULL,
  `call_center` varchar(255) NOT NULL DEFAULT '0',
  `company_email` varchar(150) NOT NULL,
  `address` text NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `company_gst_number` varchar(25) NOT NULL,
  `pin_code` varchar(10) NOT NULL,
  `state_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_app_msg`
--

CREATE TABLE `site_app_msg` (
  `id` int(11) NOT NULL,
  `reg_successful` text,
  `after_registration_free_book` text,
  `add_referral_balance` text,
  `log_by_otp` text,
  `otp` text,
  `ride_alert` text,
  `qr_varification` text,
  `qr_validation_confirm` text,
  `add_to_wallet` text,
  `successfully_booked` text,
  `booking_cancel` text,
  `booking_cancel_direct` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_content`
--

CREATE TABLE `site_content` (
  `id` int(11) NOT NULL,
  `contact_no` int(15) DEFAULT '0',
  `contact_mail` varchar(255) DEFAULT NULL,
  `copy_right` text,
  `termsconditions` longtext,
  `privacypolicy` longtext,
  `contactus` longtext,
  `referearnpageterms` longtext
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_content_pupup`
--

CREATE TABLE `site_content_pupup` (
  `id` int(11) NOT NULL,
  `noti_header` varchar(500) DEFAULT NULL,
  `noto_body` text,
  `noti_image` text,
  `noti_video` text,
  `link_txt` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_meta_tag`
--

CREATE TABLE `site_meta_tag` (
  `id` int(11) NOT NULL,
  `title` text,
  `Keywords` text,
  `Description` text,
  `page_topic` text,
  `robots` text,
  `author` text,
  `rating` text,
  `googlebot` text,
  `yahooSeeker` text,
  `msnbot` text,
  `allow_search` text,
  `revisit_after` text,
  `distribution` text,
  `expires` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `country_id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stoppage_master`
--

CREATE TABLE `stoppage_master` (
  `id` int(11) NOT NULL,
  `route_master_id` int(11) NOT NULL DEFAULT '0',
  `location_id` int(11) NOT NULL DEFAULT '0',
  `location_coordinate_id` int(11) NOT NULL,
  `stop_distance` int(10) NOT NULL DEFAULT '0',
  `stop_driving_time` float(5,2) NOT NULL DEFAULT '0.00',
  `is_active` int(11) NOT NULL DEFAULT '1',
  `stop_order` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tmp_booking`
--

CREATE TABLE `tmp_booking` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `booking_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `journy_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `drop_time` time NOT NULL,
  `stoppage_start_id` int(11) NOT NULL DEFAULT '0',
  `stoppage_end_id` int(11) NOT NULL DEFAULT '0',
  `route_timing_id` int(11) NOT NULL DEFAULT '0',
  `amount` float NOT NULL DEFAULT '0' COMMENT 'including gst',
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_amount` float NOT NULL DEFAULT '0',
  `distance` int(11) NOT NULL DEFAULT '0',
  `seats` varchar(100) NOT NULL,
  `free_mode` tinyint(4) NOT NULL DEFAULT '0',
  `wallet_amount` float(9,2) NOT NULL DEFAULT '0.00',
  `pass_amounts` text,
  `payment_gateway_amount` float(9,2) NOT NULL DEFAULT '0.00',
  `is_processed` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tmp_pass_purchase`
--

CREATE TABLE `tmp_pass_purchase` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pass_id` int(11) NOT NULL,
  `pass_price` float(9,2) NOT NULL,
  `purchase_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validity` int(10) UNSIGNED NOT NULL,
  `purchased_rides` int(11) NOT NULL,
  `renew_pass_id` int(11) DEFAULT NULL,
  `renew_pass_rides` int(11) DEFAULT NULL,
  `upgrade_pass_id` int(11) DEFAULT NULL,
  `upgrade_pass_amount` float(9,2) DEFAULT NULL,
  `wallet_amount` float(9,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tmp_reg`
--

CREATE TABLE `tmp_reg` (
  `id` int(10) UNSIGNED NOT NULL,
  `mobile` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tracking_history`
--

CREATE TABLE `tracking_history` (
  `id` bigint(11) NOT NULL,
  `route_travel_id` int(11) NOT NULL,
  `track_date` date NOT NULL,
  `lat` varchar(25) NOT NULL,
  `lng` varchar(25) NOT NULL,
  `heading` int(11) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `speed` int(10) UNSIGNED NOT NULL COMMENT 'Meter/Second'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `traval_log_file`
--

CREATE TABLE `traval_log_file` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL DEFAULT '0',
  `route_id` int(11) NOT NULL DEFAULT '0',
  `route_timing_id` int(11) NOT NULL DEFAULT '0',
  `stoppage_id` int(11) NOT NULL DEFAULT '0',
  `date` date NOT NULL DEFAULT '1970-01-01',
  `time` varchar(25) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_access_map`
--

CREATE TABLE `user_access_map` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_admin`
--

CREATE TABLE `user_admin` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `user_mail` varchar(100) NOT NULL,
  `otp` varchar(8) DEFAULT NULL,
  `user_pass` varchar(200) NOT NULL,
  `salt` varchar(200) NOT NULL,
  `user_cata` varchar(10) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_device`
--

CREATE TABLE `user_device` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL DEFAULT '0',
  `device_token` text,
  `device_details` text,
  `device_uuid` varchar(255) DEFAULT NULL,
  `active_now` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_log_file`
--

CREATE TABLE `user_log_file` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `log_in_logout_time` int(11) NOT NULL,
  `log_or_out` int(11) NOT NULL DEFAULT '0' COMMENT '1=login 2=logout'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` int(11) NOT NULL,
  `user_account_no` varchar(25) NOT NULL DEFAULT 'NA',
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `mobile` text,
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(500) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_name` varchar(50) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `pin_code` int(11) DEFAULT NULL,
  `country_id` int(11) NOT NULL DEFAULT '0',
  `photo` text,
  `user_type_id` int(11) NOT NULL DEFAULT '0',
  `referral_no` varchar(20) DEFAULT NULL,
  `gst_no` varchar(25) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(11) NOT NULL DEFAULT '0',
  `free_mode` int(11) NOT NULL DEFAULT '1' COMMENT '1=free 0=regular',
  `alter_name_no` varchar(12) NOT NULL DEFAULT '0',
  `app_version` varchar(15) DEFAULT NULL,
  `registration_device_id` varchar(100) DEFAULT NULL,
  `current_device_id` varchar(100) DEFAULT NULL,
  `device_token` text,
  `is_referral_paid` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `otp_val` int(11) NOT NULL,
  `otp_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_pass`
--

CREATE TABLE `user_pass` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pass_id` int(11) NOT NULL,
  `distance_from` int(11) NOT NULL COMMENT 'in meter',
  `distance_to` int(11) NOT NULL COMMENT 'in meter',
  `activated_on` datetime DEFAULT NULL,
  `validity` smallint(5) UNSIGNED NOT NULL COMMENT 'In Days',
  `pass_price` float(9,2) DEFAULT NULL,
  `purchased_rides` smallint(5) UNSIGNED DEFAULT NULL,
  `remaining_rides` smallint(5) UNSIGNED DEFAULT NULL,
  `purchase_date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_gateway_transaction_id` int(11) DEFAULT NULL,
  `carry_forward_pass_id` int(11) DEFAULT NULL,
  `carry_forward_rides` int(11) DEFAULT NULL,
  `upgraded_from_pass_id` int(11) DEFAULT NULL,
  `upgrade_pass_forward_amount` float(9,2) DEFAULT NULL,
  `first_purchase_rides` smallint(5) UNSIGNED DEFAULT '0',
  `is_promotional` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `wallet_transaction_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_pass_transaction_history`
--

CREATE TABLE `user_pass_transaction_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_pass_id` int(10) UNSIGNED NOT NULL,
  `booking_id` int(10) UNSIGNED DEFAULT NULL,
  `transaction_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_type` tinyint(4) DEFAULT NULL COMMENT '1-Booking, 2-Refund 3= carry_forward',
  `transaction_ride` smallint(5) UNSIGNED NOT NULL,
  `remaining_ride` smallint(5) UNSIGNED NOT NULL,
  `carry_forward_amount` float(9,2) DEFAULT NULL,
  `carry_forward_rides` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_refferal_giveaway`
--

CREATE TABLE `user_refferal_giveaway` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `no_of_total_refferal` smallint(5) UNSIGNED NOT NULL,
  `remarks` text NOT NULL,
  `reffer_user_ids` text,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_scratchcard`
--

CREATE TABLE `user_scratchcard` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `booking_id` int(10) UNSIGNED NOT NULL,
  `amount` float(9,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `other_offer` varchar(200) NOT NULL COMMENT 'static offers',
  `coupon_code` varchar(10) NOT NULL,
  `is_used` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `used_at` datetime DEFAULT NULL,
  `expire_on` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_service_taken`
--

CREATE TABLE `user_service_taken` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `service_type_id` int(11) NOT NULL DEFAULT '0',
  `from_time` varchar(25) DEFAULT NULL,
  `to_time` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_time_suggestion`
--

CREATE TABLE `user_time_suggestion` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `suggested_time` time NOT NULL,
  `pickup_location_id` int(11) NOT NULL,
  `drop_location_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_incentive_slabs`
--

CREATE TABLE `vendor_incentive_slabs` (
  `id` smallint(6) NOT NULL,
  `booking_percentage_upto` int(11) NOT NULL,
  `per_seat_incentive` float(9,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_invoice`
--

CREATE TABLE `vendor_invoice` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(30) DEFAULT NULL,
  `car_owner_id` int(11) NOT NULL COMMENT 'Vendor',
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `generated_on` datetime NOT NULL,
  `gst_no` varchar(20) NOT NULL,
  `pan_no` varchar(30) NOT NULL,
  `trade_licence_no` varchar(30) NOT NULL,
  `address` varchar(200) NOT NULL,
  `state_name` varchar(100) NOT NULL,
  `pin_code` varchar(10) NOT NULL,
  `cgst_rate` float(4,2) NOT NULL COMMENT 'percentage on generated day',
  `sgst_rate` float(4,2) NOT NULL COMMENT 'percentage on generated day',
  `total_amount` float(9,2) NOT NULL DEFAULT '0.00',
  `total_cgst_amount` float(9,2) NOT NULL DEFAULT '0.00',
  `total_sgst_amount` float(9,2) NOT NULL DEFAULT '0.00',
  `billing_type` tinyint(4) NOT NULL COMMENT '1=km, 2 = km +insentive,3= KM +per seat',
  `payment_remarks` text NOT NULL,
  `payment_date` datetime NOT NULL,
  `is_paid` tinyint(4) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_invoice_line_item`
--

CREATE TABLE `vendor_invoice_line_item` (
  `id` int(11) UNSIGNED NOT NULL,
  `vendor_invoice_id` int(11) NOT NULL,
  `route_name` varchar(255) NOT NULL,
  `vehicle_number` varchar(50) NOT NULL,
  `number_of_bookings` int(10) UNSIGNED NOT NULL,
  `total_drive_time` float NOT NULL,
  `km_driven` float NOT NULL,
  `paid_bookings` int(10) UNSIGNED NOT NULL,
  `free_bookings` int(10) UNSIGNED NOT NULL,
  `taxable_value` float(9,2) NOT NULL DEFAULT '0.00',
  `cgst` float(9,2) NOT NULL DEFAULT '0.00',
  `sgst` float(9,2) NOT NULL DEFAULT '0.00',
  `invoice_value` float(9,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_kilometre_slabs`
--

CREATE TABLE `vendor_kilometre_slabs` (
  `id` int(10) UNSIGNED NOT NULL,
  `car_type_id` int(11) NOT NULL,
  `fare_master_id` int(11) NOT NULL,
  `fixed_amount` float(9,2) NOT NULL,
  `floating_amount` float(9,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transactions`
--

CREATE TABLE `wallet_transactions` (
  `id` int(11) NOT NULL,
  `booking_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `amount` float NOT NULL DEFAULT '0',
  `transaction_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1=seat booking 2=wallet Recharge 3=Refer, 4=Refund,5=Rewards, 6=Pass Purchase, 7=Deduction',
  `comment` varchar(300) NOT NULL,
  `closing_balance` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `x_pass_master`
--

CREATE TABLE `x_pass_master` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `validity_days` int(11) NOT NULL,
  `pass_value` float(9,2) NOT NULL DEFAULT '0.00',
  `selling_price` float(9,2) NOT NULL DEFAULT '0.00',
  `created_on` datetime NOT NULL,
  `purchase_limit` int(11) NOT NULL DEFAULT '1',
  `active_from` date NOT NULL,
  `active_to` date NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `x_user_pass`
--

CREATE TABLE `x_user_pass` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pass_id` int(11) NOT NULL,
  `activated_on` date DEFAULT NULL,
  `validity` smallint(5) UNSIGNED NOT NULL COMMENT 'In Days',
  `pass_price` float(9,2) DEFAULT NULL,
  `purchased_rides` smallint(5) UNSIGNED DEFAULT NULL,
  `remaining_rides` smallint(5) UNSIGNED DEFAULT NULL,
  `purchase_date_time` datetime NOT NULL,
  `payment_gateway_transaction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `x_user_passes`
--

CREATE TABLE `x_user_passes` (
  `id` int(11) NOT NULL,
  `pass_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `no_of_rides` int(11) NOT NULL,
  `remaining_rides` int(11) NOT NULL,
  `start_stoppage_id` int(11) NOT NULL,
  `end_stoppage_id` int(11) NOT NULL,
  `payment_gateway_transaction_id` int(11) NOT NULL,
  `expiry_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `x_user_pass_transaction_history`
--

CREATE TABLE `x_user_pass_transaction_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_pass_id` int(10) UNSIGNED NOT NULL,
  `booking_id` int(10) UNSIGNED DEFAULT NULL,
  `transaction_timestamp` datetime NOT NULL,
  `transaction_ride` smallint(5) UNSIGNED DEFAULT NULL,
  `xxx` float(6,2) NOT NULL,
  `transaction_type` tinyint(4) DEFAULT NULL COMMENT '1-Booking, 2-Refund'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `award_category`
--
ALTER TABLE `award_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_alotment`
--
ALTER TABLE `car_alotment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_id` (`car_id`),
  ADD KEY `route_travel_time_id` (`route_travel_time_id`);

--
-- Indexes for table `car_break_down`
--
ALTER TABLE `car_break_down`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `car_driver_mapping`
--
ALTER TABLE `car_driver_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `car_drive_history`
--
ALTER TABLE `car_drive_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_drive_history_log`
--
ALTER TABLE `car_drive_history_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_drive_time_log`
--
ALTER TABLE `car_drive_time_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_master`
--
ALTER TABLE `car_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_owner`
--
ALTER TABLE `car_owner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_owner_earning`
--
ALTER TABLE `car_owner_earning`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_owner_pay_in`
--
ALTER TABLE `car_owner_pay_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_owner_pay_out`
--
ALTER TABLE `car_owner_pay_out`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_owner_status`
--
ALTER TABLE `car_owner_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_seat_layout_master`
--
ALTER TABLE `car_seat_layout_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_type`
--
ALTER TABLE `car_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_type`
--
ALTER TABLE `coupon_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_master`
--
ALTER TABLE `driver_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fare_master`
--
ALTER TABLE `fare_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_line_item`
--
ALTER TABLE `invoice_line_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_recipient_info`
--
ALTER TABLE `invoice_recipient_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_coordinates`
--
ALTER TABLE `location_coordinates`
  ADD PRIMARY KEY (`id`),
  ADD SPATIAL KEY `geometry_point` (`geometry_point`);

--
-- Indexes for table `location_master`
--
ALTER TABLE `location_master`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `location_master` ADD FULLTEXT KEY `location_name` (`location_name`);
ALTER TABLE `location_master` ADD FULLTEXT KEY `location_name_2` (`location_name`);

--
-- Indexes for table `location_master_image`
--
ALTER TABLE `location_master_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_master_old`
--
ALTER TABLE `location_master_old`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map_images`
--
ALTER TABLE `map_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `non_operational_dates`
--
ALTER TABLE `non_operational_dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `non_operational_departures`
--
ALTER TABLE `non_operational_departures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications_to_user`
--
ALTER TABLE `notifications_to_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pass_km_segment`
--
ALTER TABLE `pass_km_segment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pass_master`
--
ALTER TABLE `pass_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pass_settings`
--
ALTER TABLE `pass_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_gateway_transactions`
--
ALTER TABLE `payment_gateway_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tmp_booking_id` (`tmp_booking_id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `pass_id` (`tmp_pass_id`),
  ADD KEY `wallet_transaction_id` (`wallet_transaction_id`);

--
-- Indexes for table `pay_booking`
--
ALTER TABLE `pay_booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `stoppage_start_id` (`stoppage_start_id`),
  ADD KEY `stoppage_end_id` (`stoppage_end_id`),
  ADD KEY `route_timing_id` (`route_timing_id`);

--
-- Indexes for table `rate_negotiation`
--
ALTER TABLE `rate_negotiation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referral`
--
ALTER TABLE `referral`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referral_balance`
--
ALTER TABLE `referral_balance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referral_master`
--
ALTER TABLE `referral_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referral_setting`
--
ALTER TABLE `referral_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refunds`
--
ALTER TABLE `refunds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_setting`
--
ALTER TABLE `ref_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `route_travel_time`
--
ALTER TABLE `route_travel_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `route_master_id` (`route_master_id`);

--
-- Indexes for table `rout_master`
--
ALTER TABLE `rout_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `route_name` (`route_name`);

--
-- Indexes for table `searches_with_no_data`
--
ALTER TABLE `searches_with_no_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seat_booking`
--
ALTER TABLE `seat_booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pay_booking_id` (`pay_booking_id`);

--
-- Indexes for table `seat_master`
--
ALTER TABLE `seat_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seat_master_map`
--
ALTER TABLE `seat_master_map`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Service_master`
--
ALTER TABLE `Service_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings_up`
--
ALTER TABLE `settings_up`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_app_msg`
--
ALTER TABLE `site_app_msg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_content`
--
ALTER TABLE `site_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_content_pupup`
--
ALTER TABLE `site_content_pupup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_meta_tag`
--
ALTER TABLE `site_meta_tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stoppage_master`
--
ALTER TABLE `stoppage_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tmp_booking`
--
ALTER TABLE `tmp_booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `stoppage_start_id` (`stoppage_start_id`),
  ADD KEY `stoppage_end_id` (`stoppage_end_id`),
  ADD KEY `route_timing_id` (`route_timing_id`);

--
-- Indexes for table `tmp_pass_purchase`
--
ALTER TABLE `tmp_pass_purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tmp_reg`
--
ALTER TABLE `tmp_reg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- Indexes for table `tracking_history`
--
ALTER TABLE `tracking_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `traval_log_file`
--
ALTER TABLE `traval_log_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_access_map`
--
ALTER TABLE `user_access_map`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_admin`
--
ALTER TABLE `user_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_device`
--
ALTER TABLE `user_device`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_log_file`
--
ALTER TABLE `user_log_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_otp`
--
ALTER TABLE `user_otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_pass`
--
ALTER TABLE `user_pass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_pass_transaction_history`
--
ALTER TABLE `user_pass_transaction_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_pass_id` (`user_pass_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `user_refferal_giveaway`
--
ALTER TABLE `user_refferal_giveaway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_scratchcard`
--
ALTER TABLE `user_scratchcard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `user_service_taken`
--
ALTER TABLE `user_service_taken`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_time_suggestion`
--
ALTER TABLE `user_time_suggestion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_incentive_slabs`
--
ALTER TABLE `vendor_incentive_slabs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_invoice`
--
ALTER TABLE `vendor_invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_invoice_line_item`
--
ALTER TABLE `vendor_invoice_line_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_kilometre_slabs`
--
ALTER TABLE `vendor_kilometre_slabs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `x_pass_master`
--
ALTER TABLE `x_pass_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `x_user_pass`
--
ALTER TABLE `x_user_pass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `x_user_passes`
--
ALTER TABLE `x_user_passes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `x_user_pass_transaction_history`
--
ALTER TABLE `x_user_pass_transaction_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `award_category`
--
ALTER TABLE `award_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_alotment`
--
ALTER TABLE `car_alotment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_break_down`
--
ALTER TABLE `car_break_down`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_driver_mapping`
--
ALTER TABLE `car_driver_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_drive_history`
--
ALTER TABLE `car_drive_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_drive_history_log`
--
ALTER TABLE `car_drive_history_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_drive_time_log`
--
ALTER TABLE `car_drive_time_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_master`
--
ALTER TABLE `car_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_owner`
--
ALTER TABLE `car_owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_owner_earning`
--
ALTER TABLE `car_owner_earning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_owner_pay_in`
--
ALTER TABLE `car_owner_pay_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_owner_pay_out`
--
ALTER TABLE `car_owner_pay_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_owner_status`
--
ALTER TABLE `car_owner_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_seat_layout_master`
--
ALTER TABLE `car_seat_layout_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_type`
--
ALTER TABLE `car_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupon_type`
--
ALTER TABLE `coupon_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_master`
--
ALTER TABLE `driver_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fare_master`
--
ALTER TABLE `fare_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_line_item`
--
ALTER TABLE `invoice_line_item`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_recipient_info`
--
ALTER TABLE `invoice_recipient_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_coordinates`
--
ALTER TABLE `location_coordinates`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_master`
--
ALTER TABLE `location_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_master_image`
--
ALTER TABLE `location_master_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_master_old`
--
ALTER TABLE `location_master_old`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `map_images`
--
ALTER TABLE `map_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `non_operational_dates`
--
ALTER TABLE `non_operational_dates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `non_operational_departures`
--
ALTER TABLE `non_operational_departures`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications_to_user`
--
ALTER TABLE `notifications_to_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pass_km_segment`
--
ALTER TABLE `pass_km_segment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pass_master`
--
ALTER TABLE `pass_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pass_settings`
--
ALTER TABLE `pass_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_gateway_transactions`
--
ALTER TABLE `payment_gateway_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pay_booking`
--
ALTER TABLE `pay_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rate_negotiation`
--
ALTER TABLE `rate_negotiation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral`
--
ALTER TABLE `referral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_balance`
--
ALTER TABLE `referral_balance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_master`
--
ALTER TABLE `referral_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_setting`
--
ALTER TABLE `referral_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refunds`
--
ALTER TABLE `refunds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ref_setting`
--
ALTER TABLE `ref_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `route_travel_time`
--
ALTER TABLE `route_travel_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rout_master`
--
ALTER TABLE `rout_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `searches_with_no_data`
--
ALTER TABLE `searches_with_no_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat_booking`
--
ALTER TABLE `seat_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat_master`
--
ALTER TABLE `seat_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat_master_map`
--
ALTER TABLE `seat_master_map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Service_master`
--
ALTER TABLE `Service_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings_up`
--
ALTER TABLE `settings_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_app_msg`
--
ALTER TABLE `site_app_msg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_content`
--
ALTER TABLE `site_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_content_pupup`
--
ALTER TABLE `site_content_pupup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_meta_tag`
--
ALTER TABLE `site_meta_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stoppage_master`
--
ALTER TABLE `stoppage_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tmp_booking`
--
ALTER TABLE `tmp_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tmp_pass_purchase`
--
ALTER TABLE `tmp_pass_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tmp_reg`
--
ALTER TABLE `tmp_reg`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tracking_history`
--
ALTER TABLE `tracking_history`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `traval_log_file`
--
ALTER TABLE `traval_log_file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_access_map`
--
ALTER TABLE `user_access_map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_device`
--
ALTER TABLE `user_device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_log_file`
--
ALTER TABLE `user_log_file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_otp`
--
ALTER TABLE `user_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_pass`
--
ALTER TABLE `user_pass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_pass_transaction_history`
--
ALTER TABLE `user_pass_transaction_history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_refferal_giveaway`
--
ALTER TABLE `user_refferal_giveaway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_scratchcard`
--
ALTER TABLE `user_scratchcard`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_service_taken`
--
ALTER TABLE `user_service_taken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_time_suggestion`
--
ALTER TABLE `user_time_suggestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_incentive_slabs`
--
ALTER TABLE `vendor_incentive_slabs`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_invoice`
--
ALTER TABLE `vendor_invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_invoice_line_item`
--
ALTER TABLE `vendor_invoice_line_item`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_kilometre_slabs`
--
ALTER TABLE `vendor_kilometre_slabs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `x_user_pass_transaction_history`
--
ALTER TABLE `x_user_pass_transaction_history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car_alotment`
--
ALTER TABLE `car_alotment`
  ADD CONSTRAINT `fk_car_alotment_car_id` FOREIGN KEY (`car_id`) REFERENCES `car_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
