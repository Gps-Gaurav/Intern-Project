#
# TABLE STRUCTURE FOR: acc_coa
#

DROP TABLE IF EXISTS `acc_coa`;

CREATE TABLE `acc_coa` (
  `HeadCode` varchar(50) NOT NULL,
  `HeadName` varchar(100) NOT NULL,
  `PHeadName` varchar(200) NOT NULL,
  `PHeadCode` varchar(50) DEFAULT NULL,
  `HeadLevel` int(11) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `IsTransaction` tinyint(1) NOT NULL,
  `IsGL` tinyint(1) NOT NULL,
  `HeadType` char(1) NOT NULL,
  `IsBudget` tinyint(1) NOT NULL,
  `IsDepreciation` tinyint(1) NOT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `supplier_id` varchar(50) DEFAULT NULL,
  `bank_id` varchar(100) DEFAULT NULL,
  `service_id` varchar(50) DEFAULT NULL,
  `DepreciationRate` decimal(18,2) NOT NULL,
  `CreateBy` varchar(50) NOT NULL,
  `CreateDate` datetime NOT NULL,
  `UpdateBy` varchar(50) NOT NULL,
  `UpdateDate` datetime NOT NULL,
  PRIMARY KEY (`HeadCode`),
  KEY `HeadName` (`HeadName`),
  KEY `customer_id` (`customer_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('1', 'Assets', 'COA', '0', '0', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-17 09:50:20', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('11', 'Current Assets', 'Assets', '1', '1', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-17 08:27:49', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('111', 'Cash In Boxes', 'Current Assets', '11', '2', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:30:14', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('111000001', 'Cash in hand', 'Cash In Boxes', NULL, '3', '1', '1', '0', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2022-01-25 10:48:46', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('112', 'Cash in Banks', 'Current Assets', '11', '2', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:30:19', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('113', 'Account Receivable', 'Current Assets', '11', '2', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2022-01-26 06:39:24', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('1131', 'Customers', 'Account Receivable', '113', '3', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-08 09:27:45', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('113100000001', '1-walking customer', 'Customers', NULL, '4', '1', '1', '1', 'A', '0', '0', '1', NULL, NULL, NULL, '0.00', '2', '2022-01-25 12:44:37', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('1132', 'Loan Receivable', 'Account Receivable', NULL, '3', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2022-01-26 06:42:15', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('114', 'Inventory accounts', 'Current Assets', '11', '2', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:30:29', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('1141', 'Inventory', 'Inventory accounts', '114', '3', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-08 09:28:56', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('12', 'Non-current assets', 'Assets', '1', '1', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:32:23', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('122', 'Service Receive', 'Non-current assets', NULL, '2', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 06:26:39', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('13', 'Fixed assets', 'Assets', '1', '1', '1', '1', '1', 'A', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:33:05', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('2', 'Liabilities', 'COA', '0', '0', '1', '1', '1', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-17 09:50:55', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('21', 'Current Liabilities', 'Liabilities', '2', '1', '1', '1', '1', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:33:15', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('211', 'Accounts payable', 'Current Liabilities', '21', '2', '1', '1', '1', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2022-01-11 06:52:46', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('2111', 'Suppliers', 'Accounts payable', '211', '3', '1', '1', '1', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-17 09:47:03', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('21110000001', '1-justin', 'Suppliers', NULL, '4', '1', '1', '0', 'L', '0', '0', NULL, '1', NULL, NULL, '0.00', '1', '2022-03-02 13:39:14', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('2114', 'Value added tax ', 'Accounts payable', '211', '3', '1', '1', '1', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-08 10:08:56', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('2116', 'Employee Ledger', 'Accounts payable', NULL, '3', '1', '1', '1', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 07:38:06', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('22', 'Non-current liabilities', 'Liabilities', '2', '1', '1', '0', '0', 'L', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('3', 'Equity', 'COA', '0', '0', '1', '1', '1', 'O', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2022-01-26 07:38:15', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('4', 'Expenses', 'COA', '0', '0', '1', '0', '0', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('41', 'Direct Expenses', 'Expenses', '4', '1', '1', '0', '0', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('42', 'Indirect Expenses', 'Expenses', '4', '1', '1', '0', '0', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('421', 'General and administrative expenses', 'Indirect Expenses', '42', '2', '1', '1', '1', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-16 10:34:37', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('421001', 'Payroll', 'General and administrative expenses', NULL, '3', '1', '1', '1', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 07:10:48', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('421001001', 'employee salary', 'Payroll', NULL, '4', '1', '1', '1', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 07:15:17', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('421001002', 'Basic Salary', 'Payroll', NULL, '4', '1', '1', '1', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2022-01-11 06:58:42', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('421005', 'Expenses of public utilities and services', 'General and administrative expenses', NULL, '3', '1', '1', '1', 'E', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 07:26:57', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('5', 'Revenues', 'COA', '0', '0', '1', '0', '0', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('51', 'Sales revenue', 'Revenues', '5', '1', '1', '0', '0', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('511', ' sales', 'Sales revenue', '51', '2', '1', '1', '1', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 08:40:38', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('511001', 'Product sales', ' sales', NULL, '3', '1', '1', '1', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 08:43:26', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('511002', 'Service sales', ' sales', NULL, '3', '1', '1', '1', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '2', '2021-12-20 08:44:05', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('52', 'Other revenue', 'Revenues', '5', '1', '1', '0', '0', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');
INSERT INTO `acc_coa` (`HeadCode`, `HeadName`, `PHeadName`, `PHeadCode`, `HeadLevel`, `IsActive`, `IsTransaction`, `IsGL`, `HeadType`, `IsBudget`, `IsDepreciation`, `customer_id`, `supplier_id`, `bank_id`, `service_id`, `DepreciationRate`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`) VALUES ('521', 'Discount Received', 'Other revenue', '52', '2', '1', '1', '1', 'I', '0', '0', NULL, NULL, NULL, NULL, '0.00', '1', '2021-11-15 05:42:02', '', '0000-00-00 00:00:00');


#
# TABLE STRUCTURE FOR: acc_transaction
#

DROP TABLE IF EXISTS `acc_transaction`;

CREATE TABLE `acc_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `VNo` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Vtype` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `VDate` date DEFAULT NULL,
  `COAID` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Narration` text CHARACTER SET utf8 DEFAULT NULL,
  `Debit` decimal(18,2) DEFAULT NULL,
  `Credit` decimal(18,2) DEFAULT NULL,
  `IsPosted` char(10) CHARACTER SET utf8 DEFAULT NULL,
  `is_opening` int(11) NOT NULL DEFAULT 0,
  `CreateBy` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `UpdateBy` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `IsAppove` char(10) CHARACTER SET utf8 DEFAULT NULL,
  UNIQUE KEY `ID` (`ID`),
  KEY `COAID` (`COAID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('1', '20220302134146', 'Purchase', '2022-03-02', '1141', 'Inventory Debit For Supplier justin', '13125.00', '0.00', '1', '0', '1', '2022-03-02 13:41:46', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('2', '20220302134146', 'Purchase', '2022-03-02', '21110000001', 'Supplier .justin', '0.00', '13125.00', '1', '0', '1', '2022-03-02 00:00:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('3', '20220302134146', 'Purchase', '2022-03-02', '21110000001', 'Supplier .justin', '13125.00', '0.00', '1', '0', '1', '2022-03-02 00:00:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('4', '20220302134146', 'PurchasePayment', '2022-03-02', '111000001', 'Paid amount for Supplier  justin', '0.00', '13125.00', '1', '0', '1', '2022-03-02 13:41:46', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('5', '7937921641', 'INV', '2022-03-02', '1141', 'Inventory credit For Invoice No', '0.00', '1250.00', '1', '0', '1', '2022-03-02 18:42:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('6', '7937921641', 'INV', '2022-03-02', '113100000001', 'Customer debit For Invoice No -   Customer walking customer', '1575.00', '0.00', '1', '0', '1', '2022-03-02 18:42:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('7', '7937921641', 'INV', '2022-03-02', '511001', 'Product Sales revenue For Invoice NO -  Customer walking customer', '0.00', '1500.00', '1', '0', '1', '2022-03-02 18:42:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('8', '7937921641', 'INV', '2022-03-02', '2114', 'Value added tax For Invoice NO -  Customer walking customer', '75.00', '0.00', '1', '0', '1', '2022-03-02 18:42:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('9', '7937921641', 'INV', '2022-03-02', '113100000001', 'Customer credit for Paid Amount For Customer Invoice NO-  Customer- walking customer', '0.00', '1575.00', '1', '0', '1', '2022-03-02 18:42:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('10', '7937921641', 'INVOICEPayment', '2022-03-02', '111000001', 'Paid amount for customer  Invoice No -  customer -walking customer', '1575.00', '0.00', '1', '0', '1', '2022-03-02 18:42:00', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('11', '7944753175', 'INV', '2022-03-02', '1141', 'Inventory credit For Invoice No', '0.00', '1250.00', '1', '0', '1', '2022-03-02 18:43:01', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('12', '7944753175', 'INV', '2022-03-02', '113100000001', 'Customer debit For Invoice No -   Customer walking customer', '1575.00', '0.00', '1', '0', '1', '2022-03-02 18:43:01', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('13', '7944753175', 'INV', '2022-03-02', '511001', 'Product Sales revenue For Invoice NO -  Customer walking customer', '0.00', '1500.00', '1', '0', '1', '2022-03-02 18:43:01', NULL, NULL, '1');
INSERT INTO `acc_transaction` (`ID`, `VNo`, `Vtype`, `VDate`, `COAID`, `Narration`, `Debit`, `Credit`, `IsPosted`, `is_opening`, `CreateBy`, `CreateDate`, `UpdateBy`, `UpdateDate`, `IsAppove`) VALUES ('14', '7944753175', 'INV', '2022-03-02', '2114', 'Value added tax For Invoice NO -  Customer walking customer', '75.00', '0.00', '1', '0', '1', '2022-03-02 18:43:01', NULL, NULL, '1');


#
# TABLE STRUCTURE FOR: app_setting
#

DROP TABLE IF EXISTS `app_setting`;

CREATE TABLE `app_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `localhserver` varchar(250) DEFAULT NULL,
  `onlineserver` varchar(250) DEFAULT NULL,
  `hotspot` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `app_setting` (`id`, `localhserver`, `onlineserver`, `hotspot`) VALUES ('1', 'https://demo.bdtask.com', 'https://demo.bdtask.com', 'https://demo.bdtask.com');


#
# TABLE STRUCTURE FOR: attendance
#

DROP TABLE IF EXISTS `attendance`;

CREATE TABLE `attendance` (
  `att_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `sign_in` varchar(30) NOT NULL,
  `sign_out` varchar(30) NOT NULL,
  `staytime` varchar(30) NOT NULL,
  PRIMARY KEY (`att_id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: bank_add
#

DROP TABLE IF EXISTS `bank_add`;

CREATE TABLE `bank_add` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_id` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `ac_name` varchar(250) DEFAULT NULL,
  `ac_number` varchar(250) DEFAULT NULL,
  `branch` varchar(250) DEFAULT NULL,
  `signature_pic` varchar(250) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: closing_records
#

DROP TABLE IF EXISTS `closing_records`;

CREATE TABLE `closing_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `head_code` bigint(20) DEFAULT NULL,
  `opening_balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `amount_in` decimal(10,2) NOT NULL DEFAULT 0.00,
  `amount_out` decimal(10,2) NOT NULL DEFAULT 0.00,
  `closign_balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# TABLE STRUCTURE FOR: company_information
#

DROP TABLE IF EXISTS `company_information`;

CREATE TABLE `company_information` (
  `company_id` varchar(250) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `website` varchar(50) NOT NULL,
  `vat_no` varchar(50) DEFAULT NULL,
  `cr_no` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `company_information` (`company_id`, `company_name`, `email`, `address`, `mobile`, `website`, `vat_no`, `cr_no`, `status`) VALUES ('1', 'Demo Company', 'demo@mail.com', 'Company Demo Address', '123456', 'https://www.demo.com/', '', '', '1');


#
# TABLE STRUCTURE FOR: currency_tbl
#

DROP TABLE IF EXISTS `currency_tbl`;

CREATE TABLE `currency_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_name` varchar(50) NOT NULL,
  `icon` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `currency_tbl` (`id`, `currency_name`, `icon`) VALUES ('2', 'USD', '$');


#
# TABLE STRUCTURE FOR: customer_information
#

DROP TABLE IF EXISTS `customer_information`;

CREATE TABLE `customer_information` (
  `customer_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_address` varchar(255) DEFAULT NULL,
  `address2` text NOT NULL,
  `customer_mobile` varchar(100) DEFAULT NULL,
  `customer_email` varchar(100) DEFAULT NULL,
  `email_address` varchar(200) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `city` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `country` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '1=paid,2=credit',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `create_by` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `customer_information` (`customer_id`, `customer_name`, `customer_address`, `address2`, `customer_mobile`, `customer_email`, `email_address`, `contact`, `phone`, `fax`, `city`, `state`, `zip`, `country`, `status`, `create_date`, `create_by`) VALUES ('1', 'walking customer', '', '', '', '', '', '', '', '', '', '', '', '', '1', '2022-01-25 14:50:20', '2');


#
# TABLE STRUCTURE FOR: daily_banking_add
#

DROP TABLE IF EXISTS `daily_banking_add`;

CREATE TABLE `daily_banking_add` (
  `banking_id` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `bank_id` varchar(100) DEFAULT NULL,
  `deposit_type` varchar(255) DEFAULT NULL,
  `transaction_type` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: daily_closing
#

DROP TABLE IF EXISTS `daily_closing`;

CREATE TABLE `daily_closing` (
  `closing_id` int(11) NOT NULL AUTO_INCREMENT,
  `last_day_closing` float NOT NULL,
  `cash_in` float NOT NULL,
  `cash_out` float NOT NULL,
  `date` varchar(250) NOT NULL,
  `amount` float NOT NULL,
  `adjustment` float DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`closing_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: designation
#

DROP TABLE IF EXISTS `designation`;

CREATE TABLE `designation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(150) NOT NULL,
  `details` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: email_config
#

DROP TABLE IF EXISTS `email_config`;

CREATE TABLE `email_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `protocol` text NOT NULL,
  `smtp_host` text NOT NULL,
  `smtp_port` text NOT NULL,
  `smtp_user` varchar(35) NOT NULL,
  `smtp_pass` varchar(35) NOT NULL,
  `mailtype` varchar(30) DEFAULT NULL,
  `isinvoice` tinyint(4) NOT NULL,
  `isservice` tinyint(4) NOT NULL,
  `isquotation` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `email_config` (`id`, `protocol`, `smtp_host`, `smtp_port`, `smtp_user`, `smtp_pass`, `mailtype`, `isinvoice`, `isservice`, `isquotation`) VALUES ('1', 'ssmtp', 'ssl://ssmtp.gmail.com', '25', 'info@eholol.com', 'demo123456', 'html', '0', '0', '0');


#
# TABLE STRUCTURE FOR: employee_history
#

DROP TABLE IF EXISTS `employee_history`;

CREATE TABLE `employee_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `rate_type` int(11) NOT NULL,
  `hrate` float NOT NULL,
  `email` varchar(50) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `address_line_1` text NOT NULL,
  `address_line_2` text NOT NULL,
  `image` text DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: employee_salary_payment
#

DROP TABLE IF EXISTS `employee_salary_payment`;

CREATE TABLE `employee_salary_payment` (
  `emp_sal_pay_id` int(11) NOT NULL AUTO_INCREMENT,
  `generate_id` int(11) NOT NULL,
  `employee_id` varchar(50) CHARACTER SET latin1 NOT NULL,
  `total_salary` decimal(18,2) NOT NULL DEFAULT 0.00,
  `total_working_minutes` varchar(50) CHARACTER SET latin1 NOT NULL,
  `working_period` varchar(50) CHARACTER SET latin1 NOT NULL,
  `payment_due` varchar(50) CHARACTER SET latin1 NOT NULL,
  `payment_date` varchar(50) CHARACTER SET latin1 NOT NULL,
  `paid_by` varchar(50) CHARACTER SET latin1 NOT NULL,
  `salary_month` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`emp_sal_pay_id`),
  KEY `employee_id` (`employee_id`),
  KEY `generate_id` (`generate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: employee_salary_setup
#

DROP TABLE IF EXISTS `employee_salary_setup`;

CREATE TABLE `employee_salary_setup` (
  `e_s_s_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(30) CHARACTER SET latin1 NOT NULL,
  `sal_type` varchar(30) NOT NULL,
  `salary_type_id` varchar(30) CHARACTER SET latin1 NOT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `create_date` date DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `update_id` varchar(30) CHARACTER SET latin1 NOT NULL,
  `gross_salary` float NOT NULL,
  PRIMARY KEY (`e_s_s_id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: expense
#

DROP TABLE IF EXISTS `expense`;

CREATE TABLE `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `type` varchar(100) NOT NULL,
  `voucher_no` varchar(50) NOT NULL,
  `amount` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: expense_item
#

DROP TABLE IF EXISTS `expense_item`;

CREATE TABLE `expense_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expense_item_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: invoice
#

DROP TABLE IF EXISTS `invoice`;

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `total_amount` decimal(18,2) NOT NULL DEFAULT 0.00,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `due_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `prevous_due` decimal(20,2) NOT NULL DEFAULT 0.00,
  `shipping_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `invoice` bigint(20) NOT NULL,
  `offline_invoice_no` bigint(20) DEFAULT NULL,
  `invoice_discount` decimal(10,2) DEFAULT 0.00 COMMENT 'invoice discount',
  `total_discount` decimal(10,2) DEFAULT 0.00 COMMENT 'total invoice discount',
  `total_vat_amnt` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'total invoice vat',
  `total_tax` decimal(10,2) DEFAULT 0.00,
  `sales_by` varchar(50) NOT NULL,
  `invoice_details` text NOT NULL,
  `is_credit` tinyint(4) DEFAULT NULL,
  `is_fixed` int(11) NOT NULL DEFAULT 0,
  `is_dynamic` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL,
  `bank_id` varchar(30) DEFAULT NULL,
  `payment_type` int(11) NOT NULL,
  `is_online` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `invoice_id` (`invoice_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `invoice` (`id`, `invoice_id`, `customer_id`, `date`, `total_amount`, `paid_amount`, `due_amount`, `prevous_due`, `shipping_cost`, `invoice`, `offline_invoice_no`, `invoice_discount`, `total_discount`, `total_vat_amnt`, `total_tax`, `sales_by`, `invoice_details`, `is_credit`, `is_fixed`, `is_dynamic`, `status`, `bank_id`, `payment_type`, `is_online`) VALUES ('1', '7937921641', '1', '2022-03-02', '1575.00', '1575.00', '0.00', '0.00', '0.00', '1000', NULL, '0.00', '0.00', '75.00', NULL, '1', 'Thank you for shopping with us', '0', '1', '0', '1', NULL, '1', '1');
INSERT INTO `invoice` (`id`, `invoice_id`, `customer_id`, `date`, `total_amount`, `paid_amount`, `due_amount`, `prevous_due`, `shipping_cost`, `invoice`, `offline_invoice_no`, `invoice_discount`, `total_discount`, `total_vat_amnt`, `total_tax`, `sales_by`, `invoice_details`, `is_credit`, `is_fixed`, `is_dynamic`, `status`, `bank_id`, `payment_type`, `is_online`) VALUES ('2', '7944753175', '1', '2022-03-02', '1575.00', '0.00', '1575.00', '0.00', '0.00', '1001', NULL, '0.00', '0.00', '75.00', NULL, '1', 'Thank you for shopping with us', '1', '1', '0', '1', NULL, '1', '1');


#
# TABLE STRUCTURE FOR: invoice_details
#

DROP TABLE IF EXISTS `invoice_details`;

CREATE TABLE `invoice_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_details_id` varchar(100) NOT NULL,
  `invoice_id` varchar(100) NOT NULL,
  `product_id` varchar(30) NOT NULL,
  `serial_no` varchar(30) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `batch_id` varchar(30) DEFAULT NULL,
  `supplier_rate` float DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `discount_per` varchar(15) DEFAULT NULL,
  `vat_amnt` decimal(10,2) DEFAULT NULL,
  `vat_amnt_per` varchar(15) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `paid_amount` decimal(12,0) DEFAULT NULL,
  `due_amount` decimal(10,2) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

INSERT INTO `invoice_details` (`id`, `invoice_details_id`, `invoice_id`, `product_id`, `serial_no`, `description`, `quantity`, `rate`, `batch_id`, `supplier_rate`, `total_price`, `discount`, `discount_per`, `vat_amnt`, `vat_amnt_per`, `tax`, `paid_amount`, `due_amount`, `status`) VALUES ('1', '575761986862435', '7937921641', '65020469', '', NULL, '1.00', '1000.00', '111', '800', '1000.00', '0.00', '', '50.00', '5', '0.00', '1575', '0.00', '1');
INSERT INTO `invoice_details` (`id`, `invoice_details_id`, `invoice_id`, `product_id`, `serial_no`, `description`, `quantity`, `rate`, `batch_id`, `supplier_rate`, `total_price`, `discount`, `discount_per`, `vat_amnt`, `vat_amnt_per`, `tax`, `paid_amount`, `due_amount`, `status`) VALUES ('2', '689733936881326', '7937921641', '15339253', '', NULL, '1.00', '500.00', '222', '450', '500.00', '0.00', '', '25.00', '5', '0.00', '1575', '0.00', '1');
INSERT INTO `invoice_details` (`id`, `invoice_details_id`, `invoice_id`, `product_id`, `serial_no`, `description`, `quantity`, `rate`, `batch_id`, `supplier_rate`, `total_price`, `discount`, `discount_per`, `vat_amnt`, `vat_amnt_per`, `tax`, `paid_amount`, `due_amount`, `status`) VALUES ('3', '726415266878381', '7944753175', '15339253', '', NULL, '1.00', '500.00', '222', '450', '500.00', '0.00', '', '25.00', '5', '0.00', '0', '1575.00', '1');
INSERT INTO `invoice_details` (`id`, `invoice_details_id`, `invoice_id`, `product_id`, `serial_no`, `description`, `quantity`, `rate`, `batch_id`, `supplier_rate`, `total_price`, `discount`, `discount_per`, `vat_amnt`, `vat_amnt_per`, `tax`, `paid_amount`, `due_amount`, `status`) VALUES ('4', '599347812743421', '7944753175', '65020469', '', NULL, '1.00', '1000.00', '111', '800', '1000.00', '0.00', '', '50.00', '5', '0.00', '0', '1575.00', '1');


#
# TABLE STRUCTURE FOR: language
#

DROP TABLE IF EXISTS `language`;

CREATE TABLE `language` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phrase` text NOT NULL,
  `english` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1012 DEFAULT CHARSET=utf8;

INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1', 'user_profile', 'User Profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('2', 'setting', 'Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('3', 'language', 'Language');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('4', 'manage_users', 'Manage Users');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('5', 'add_user', 'Add User');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('6', 'manage_company', 'Manage Company');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('7', 'web_settings', 'Software Settings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('8', 'manage_accounts', 'Manage Accounts');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('9', 'create_accounts', 'Create Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('10', 'manage_bank', 'Manage Bank');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('11', 'add_new_bank', 'Add New Bank');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('12', 'settings', 'Settings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('13', 'closing_report', 'Closing Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('14', 'closing', 'Closing');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('15', 'cheque_manager', 'Cheque Manager');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('16', 'accounts_summary', 'Accounts Summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('17', 'expense', 'Expense');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('18', 'income', 'Income');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('19', 'accounts', 'Accounts');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('20', 'stock_report', 'Stock Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('21', 'stock', 'Stock');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('22', 'pos_invoice', 'POS Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('23', 'manage_invoice', 'Manage Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('24', 'new_invoice', 'New Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('25', 'invoice', 'Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('26', 'manage_purchase', 'Manage Purchase');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('27', 'add_purchase', 'Add Purchase');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('28', 'purchase', 'Purchase');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('29', 'paid_customer', 'Paid Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('30', 'manage_customer', 'Manage Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('31', 'add_customer', 'Add Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('32', 'customer', 'Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('33', 'supplier_payment_actual', 'Supplier Payment Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('34', 'supplier_sales_summary', 'Supplier Sales Summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('35', 'supplier_sales_details', 'Supplier Sales Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('36', 'supplier_ledger', 'Supplier Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('37', 'manage_supplier', 'Manage Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('38', 'add_supplier', 'Add Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('39', 'supplier', 'Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('40', 'product_statement', 'Product Statement');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('41', 'manage_product', 'Manage Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('42', 'add_product', 'Add Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('43', 'product', 'Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('44', 'manage_category', 'Manage Category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('45', 'add_category', 'Add Category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('46', 'category', 'Category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('47', 'sales_report_product_wise', 'Sales Report (Product Wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('48', 'purchase_report', 'Purchase Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('49', 'sales_report', 'Sales Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('50', 'todays_report', 'Todays Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('51', 'report', 'Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('52', 'dashboard', 'Dashboard');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('53', 'online', 'Online');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('54', 'logout', 'Logout');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('55', 'change_password', 'Change Password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('56', 'total_purchase', 'Total Purchase');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('57', 'total_amount', 'Total Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('58', 'supplier_name', 'Supplier Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('59', 'invoice_no', 'Invoice No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('60', 'purchase_date', 'Purchase Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('61', 'todays_purchase_report', 'Todays Purchase Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('62', 'total_sales', 'Total Sales');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('63', 'customer_name', 'Customer Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('64', 'sales_date', 'Sales Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('65', 'todays_sales_report', 'Todays Sales Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('66', 'home', 'Home');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('67', 'todays_sales_and_purchase_report', 'Todays sales and purchase report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('68', 'total_ammount', 'Total Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('69', 'rate', 'Rate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('70', 'product_model', 'Product Model');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('71', 'product_name', 'Product Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('72', 'search', 'Search');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('73', 'end_date', 'End Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('74', 'start_date', 'Start Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('75', 'total_purchase_report', 'Total Purchase Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('76', 'total_sales_report', 'Total Sales Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('77', 'total_seles', 'Total Sales');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('78', 'all_stock_report', 'All Stock Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('79', 'search_by_product', 'Search By Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('80', 'date', 'Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('81', 'print', 'Print');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('82', 'stock_date', 'Stock Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('83', 'print_date', 'Print Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('84', 'sales', 'Sales');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('85', 'price', 'Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('86', 'sl', 'SL.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('87', 'add_new_category', 'Add new category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('88', 'category_name', 'Category Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('89', 'save', 'Save');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('90', 'delete', 'Delete');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('91', 'update', 'Update');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('92', 'action', 'Action');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('93', 'manage_your_category', 'Manage your category ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('94', 'category_edit', 'Category Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('95', 'status', 'Status');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('96', 'active', 'Active');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('97', 'inactive', 'Inactive');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('98', 'save_changes', 'Save Changes');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('99', 'save_and_add_another', 'Save And Add Another');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('100', 'model', 'Model');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('101', 'supplier_price', 'Supplier Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('102', 'sell_price', 'Sale Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('103', 'image', 'Image');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('104', 'select_one', 'Select One');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('105', 'details', 'Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('106', 'new_product', 'New Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('107', 'add_new_product', 'Add new product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('108', 'barcode', 'Barcode');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('109', 'qr_code', 'Qr-Code');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('110', 'product_details', 'Product Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('111', 'manage_your_product', 'Manage your product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('112', 'product_edit', 'Product Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('113', 'edit_your_product', 'Edit your product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('114', 'cancel', 'Cancel');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('115', 'incl_vat', 'Incl. Vat');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('116', 'money', 'TK');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('117', 'grand_total', 'Grand Total');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('118', 'quantity', 'Qnty');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('119', 'product_report', 'Product Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('120', 'product_sales_and_purchase_report', 'Product sales and purchase report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('121', 'previous_stock', 'Previous Stock');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('122', 'out', 'Out');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('123', 'in', 'In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('124', 'to', 'To');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('125', 'previous_balance', 'Previous Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('126', 'customer_address', 'Customer Address');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('127', 'customer_mobile', 'Customer Mobile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('128', 'customer_email', 'Customer Email');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('129', 'add_new_customer', 'Add new customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('130', 'balance', 'Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('131', 'mobile', 'Mobile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('132', 'address', 'Address');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('133', 'manage_your_customer', 'Manage your customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('134', 'customer_edit', 'Customer Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('135', 'paid_customer_list', 'Paid Customer List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('136', 'ammount', 'Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('137', 'customer_ledger', 'Customer Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('138', 'manage_customer_ledger', 'Manage Customer Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('139', 'customer_information', 'Customer Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('140', 'debit_ammount', 'Debit Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('141', 'credit_ammount', 'Credit Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('142', 'balance_ammount', 'Balance Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('143', 'receipt_no', 'Receipt NO');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('144', 'description', 'Description');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('145', 'debit', 'Debit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('146', 'credit', 'Credit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('147', 'item_information', 'Item Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('148', 'total', 'Total');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('149', 'please_select_supplier', 'Please Select Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('150', 'submit', 'Submit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('151', 'submit_and_add_another', 'Submit And Add Another One');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('152', 'add_new_item', 'Add New Item');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('153', 'manage_your_purchase', 'Manage your purchase');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('154', 'purchase_edit', 'Purchase Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('155', 'purchase_ledger', 'Purchase Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('156', 'invoice_information', 'Sale Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('157', 'paid_ammount', 'Paid Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('158', 'discount', 'Dis./Pcs.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('159', 'save_and_paid', 'Save And Paid');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('160', 'payee_name', 'Payee Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('161', 'manage_your_invoice', 'Manage your Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('162', 'invoice_edit', 'Sale Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('163', 'new_pos_invoice', 'New POS Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('164', 'add_new_pos_invoice', 'Add new pos Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('165', 'product_id', 'Product ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('166', 'paid_amount', 'Paid Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('167', 'authorised_by', 'Authorised By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('168', 'checked_by', 'Checked By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('169', 'received_by', 'Received By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('170', 'prepared_by', 'Prepared By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('171', 'memo_no', 'Memo No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('172', 'website', 'Website');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('173', 'email', 'Email');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('174', 'invoice_details', 'Sale Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('175', 'reset', 'Reset');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('176', 'payment_account', 'Payment Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('177', 'bank_name', 'Bank Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('178', 'cheque_or_pay_order_no', 'Cheque/Pay Order No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('179', 'payment_type', 'Payment Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('180', 'payment_from', 'Payment From');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('181', 'payment_date', 'Payment Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('182', 'add_income', 'Add Income');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('183', 'cash', 'Cash');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('184', 'cheque', 'Cheque');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('185', 'pay_order', 'Pay Order');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('186', 'payment_to', 'Payment To');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('187', 'total_outflow_ammount', 'Total Expense Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('188', 'transections', 'Transections');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('189', 'accounts_name', 'Accounts Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('190', 'outflow_report', 'Expense Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('191', 'inflow_report', 'Income Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('192', 'all', 'All');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('193', 'account', 'Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('194', 'from', 'From');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('195', 'account_summary_report', 'Account Summary Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('196', 'search_by_date', 'Search By Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('197', 'cheque_no', 'Cheque No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('198', 'name', 'Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('199', 'closing_account', 'Closing Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('200', 'close_your_account', 'Close your account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('201', 'last_day_closing', 'Last Day Closing');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('202', 'cash_in', 'Cash In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('203', 'cash_out', 'Cash Out');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('204', 'cash_in_hand', 'Cash In Hand');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('205', 'add_new_bank', 'Add New Bank');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('206', 'day_closing', 'Day Closing');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('207', 'account_closing_report', 'Account Closing Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('208', 'last_day_ammount', 'Last Day Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('209', 'adjustment', 'Adjustment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('210', 'pay_type', 'Pay Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('211', 'customer_or_supplier', 'Customer,Supplier Or Others');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('212', 'transection_id', 'Transections ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('213', 'accounts_summary_report', 'Accounts Summary Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('214', 'bank_list', 'Bank List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('215', 'bank_edit', 'Bank Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('216', 'debit_plus', 'Debit (+)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('217', 'credit_minus', 'Credit (-)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('218', 'account_name', 'Account Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('219', 'account_type', 'Account Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('220', 'account_real_name', 'Account Real Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('221', 'manage_account', 'Manage Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('222', 'company_name', 'Niha International');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('223', 'edit_your_company_information', 'Edit your company information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('224', 'company_edit', 'Company Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('225', 'admin', 'Admin');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('226', 'user', 'User');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('227', 'password', 'Password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('228', 'last_name', 'Last Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('229', 'first_name', 'First Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('230', 'add_new_user_information', 'Add new user information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('231', 'user_type', 'User Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('232', 'user_edit', 'User Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('233', 'rtr', 'RTR');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('234', 'ltr', 'LTR');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('235', 'ltr_or_rtr', 'LTR/RTR');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('236', 'footer_text', 'Footer Text');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('237', 'favicon', 'Favicon');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('238', 'logo', 'Logo');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('239', 'update_setting', 'Update Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('240', 'update_your_web_setting', 'Update your web setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('241', 'login', 'Login');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('242', 'your_strong_password', 'Your strong password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('243', 'your_unique_email', 'Your unique email');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('244', 'please_enter_your_login_information', 'Please enter your login information.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('245', 'update_profile', 'Update Profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('246', 'your_profile', 'Your Profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('247', 're_type_password', 'Re-Type Password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('248', 'new_password', 'New Password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('249', 'old_password', 'Old Password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('250', 'new_information', 'New Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('251', 'old_information', 'Old Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('252', 'change_your_information', 'Change your information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('253', 'change_your_profile', 'Change your profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('254', 'profile', 'Profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('255', 'wrong_username_or_password', 'Wrong User Name Or Password !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('256', 'successfully_updated', 'Successfully Updated.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('257', 'blank_field_does_not_accept', 'Blank Field Does Not Accept !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('258', 'successfully_changed_password', 'Successfully changed password.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('259', 'you_are_not_authorised_person', 'You are not authorised person !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('260', 'password_and_repassword_does_not_match', 'Passwor and re-password does not match !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('261', 'new_password_at_least_six_character', 'New Password At Least 6 Character.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('262', 'you_put_wrong_email_address', 'You put wrong email address !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('263', 'cheque_ammount_asjusted', 'Cheque amount adjusted.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('264', 'successfully_payment_paid', 'Successfully Payment Paid.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('265', 'successfully_added', 'Successfully Added.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('266', 'successfully_updated_2_closing_ammount_not_changeale', 'Successfully Updated -2. Note: Closing Amount Not Changeable.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('267', 'successfully_payment_received', 'Successfully Payment Received.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('268', 'already_inserted', 'Already Inserted !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('269', 'successfully_delete', 'Successfully Delete.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('270', 'successfully_created', 'Successfully Created.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('271', 'logo_not_uploaded', 'Logo not uploaded !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('272', 'favicon_not_uploaded', 'Favicon not uploaded !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('273', 'supplier_mobile', 'Supplier Mobile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('274', 'supplier_address', 'Supplier Address');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('275', 'supplier_details', 'Supplier Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('276', 'add_new_supplier', 'Add New Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('277', 'manage_suppiler', 'Manage Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('278', 'manage_your_supplier', 'Manage your supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('279', 'manage_supplier_ledger', 'Manage supplier ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('280', 'invoice_id', 'Invoice ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('281', 'deposite_id', 'Deposite ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('282', 'supplier_actual_ledger', 'Supplier Payment Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('283', 'supplier_information', 'Supplier Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('284', 'event', 'Event');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('285', 'add_new_income', 'Add New Income');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('286', 'add_expese', 'Add Expense');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('287', 'add_new_expense', 'Add New Expense');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('288', 'total_inflow_ammount', 'Total Income Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('289', 'create_new_invoice', 'Create New Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('290', 'create_pos_invoice', 'Create POS Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('291', 'total_profit', 'Total Profit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('292', 'monthly_progress_report', 'Monthly Progress Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('293', 'total_invoice', 'Total Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('294', 'account_summary', 'Account Summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('295', 'total_supplier', 'Total Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('296', 'total_product', 'Total Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('297', 'total_customer', 'Total Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('298', 'supplier_edit', 'Supplier Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('299', 'add_new_invoice', 'Add New Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('300', 'add_new_purchase', 'Add new purchase');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('301', 'currency', 'Currency');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('302', 'currency_position', 'Currency Position');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('303', 'left', 'Left');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('304', 'right', 'Right');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('305', 'add_tax', 'Add TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('306', 'manage_tax', 'Manage TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('307', 'add_new_tax', 'Add new TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('308', 'enter_tax', 'Enter TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('309', 'already_exists', 'Already Exists !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('310', 'successfully_inserted', 'Successfully Inserted.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('311', 'tax', 'TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('312', 'tax_edit', 'TAX Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('313', 'product_not_added', 'Product not added !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('314', 'total_tax', 'Total TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('315', 'manage_your_supplier_details', 'Manage your supplier details.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('316', 'invoice_description', 'Lorem Ipsum is sim ply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is sim ply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('317', 'thank_you_for_choosing_us', 'Thank you very much for choosing us.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('318', 'billing_date', 'Billing Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('319', 'billing_to', 'Billing To');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('320', 'billing_from', 'Billing From');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('321', 'you_cant_delete_this_product', 'Sorry !!  You can\'t delete this product.This product already used in calculation system!');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('322', 'old_customer', 'Old Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('323', 'new_customer', 'New Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('324', 'new_supplier', 'New Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('325', 'old_supplier', 'Old Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('326', 'credit_customer', 'Credit Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('327', 'account_already_exists', 'This Account Already Exists !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('328', 'edit_income', 'Edit Income');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('329', 'you_are_not_access_this_part', 'You are not authorised person !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('330', 'account_edit', 'Account Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('331', 'due', 'Due');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('332', 'expense_edit', 'Expense Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('333', 'please_select_customer', 'Please select customer !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('334', 'profit_report', 'Profit Report (Sale Wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('335', 'total_profit_report', 'Total profit report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('336', 'please_enter_valid_captcha', 'Please enter valid captcha.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('337', 'category_not_selected', 'Category not selected.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('338', 'supplier_not_selected', 'Supplier not selected.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('339', 'please_select_product', 'Please select product.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('340', 'product_model_already_exist', 'Product model already exist !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('341', 'invoice_logo', 'Sale Logo');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('342', 'available_qnty', 'Av. Qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('343', 'you_can_not_buy_greater_than_available_cartoon', 'You can not select grater than available cartoon !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('344', 'customer_details', 'Customer details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('345', 'manage_customer_details', 'Manage customer details.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('346', 'site_key', 'Captcha Site Key');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('347', 'secret_key', 'Captcha Secret Key');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('348', 'captcha', 'Captcha');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('349', 'cartoon_quantity', 'Cartoon Quantity');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('350', 'total_cartoon', 'Total Cartoon');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('351', 'cartoon', 'Cartoon');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('352', 'item_cartoon', 'Item/Cartoon');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('353', 'product_and_supplier_did_not_match', 'Product and supplier did not match !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('354', 'if_you_update_purchase_first_select_supplier_then_product_and_then_quantity', 'If you update purchase,first select supplier then product and then update qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('355', 'item', 'Item');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('356', 'manage_your_credit_customer', 'Manage your credit customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('357', 'total_quantity', 'Total Quantity');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('358', 'quantity_per_cartoon', 'Quantity per cartoon');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('359', 'barcode_qrcode_scan_here', 'Barcode or QR-code scan here');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('360', 'synchronizer_setting', 'Synchronizer Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('361', 'data_synchronizer', 'Data Synchronizer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('362', 'hostname', 'Host name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('363', 'username', 'User Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('364', 'ftp_port', 'FTP Port');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('365', 'ftp_debug', 'FTP Debug');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('366', 'project_root', 'Project Root');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('367', 'please_try_again', 'Please try again');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('368', 'save_successfully', 'Save successfully');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('369', 'synchronize', 'Synchronize');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('370', 'internet_connection', 'Internet Connection');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('371', 'outgoing_file', 'Outgoing File');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('372', 'incoming_file', 'Incoming File');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('373', 'ok', 'Ok');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('374', 'not_available', 'Not Available');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('375', 'available', 'Available');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('376', 'download_data_from_server', 'Download data from server');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('377', 'data_import_to_database', 'Data import to database');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('378', 'data_upload_to_server', 'Data uplod to server');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('379', 'please_wait', 'Please Wait');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('380', 'ooops_something_went_wrong', 'Oooops Something went wrong !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('381', 'upload_successfully', 'Upload successfully');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('382', 'unable_to_upload_file_please_check_configuration', 'Unable to upload file please check configuration');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('383', 'please_configure_synchronizer_settings', 'Please configure synchronizer settings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('384', 'download_successfully', 'Download successfully');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('385', 'unable_to_download_file_please_check_configuration', 'Unable to download file please check configuration');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('386', 'data_import_first', 'Data import past');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('387', 'data_import_successfully', 'Data import successfully');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('388', 'unable_to_import_data_please_check_config_or_sql_file', 'Unable to import data please check config or sql file');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('389', 'total_sale_ctn', 'Total Sale Ctn');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('390', 'in_qnty', 'In Qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('391', 'out_qnty', 'Out Qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('392', 'stock_report_supplier_wise', 'Stock Report (Supplier Wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('393', 'all_stock_report_supplier_wise', 'Stock Report (Suppler Wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('394', 'select_supplier', 'Select Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('395', 'stock_report_product_wise', 'Stock Report (Product Wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('396', 'phone', 'Phone');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('397', 'select_product', 'Select Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('398', 'in_quantity', 'In Qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('399', 'out_quantity', 'Out Qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('400', 'in_taka', 'In TK.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('401', 'out_taka', 'Out TK.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('402', 'commission', 'Commission');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('403', 'generate_commission', 'Generate Commssion');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('404', 'commission_rate', 'Commission Rate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('405', 'total_ctn', 'Total Ctn.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('406', 'per_pcs_commission', 'Per PCS Commission');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('407', 'total_commission', 'Total Commission');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('408', 'enter', 'Enter');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('409', 'please_add_walking_customer_for_default_customer', 'Please add \'Walking Customer\' for default customer.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('410', 'supplier_ammount', 'Supplier Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('411', 'my_sale_ammount', 'My Sale Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('412', 'signature_pic', 'Signature Picture');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('413', 'branch', 'Branch');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('414', 'ac_no', 'A/C Number');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('415', 'ac_name', 'A/C Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('416', 'bank_transaction', 'Bank Transaction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('417', 'bank', 'Bank');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('418', 'withdraw_deposite_id', 'Withdraw / Deposite ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('419', 'bank_ledger', 'Bank Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('420', 'note_name', 'Note Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('421', 'pcs', 'Pcs.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('422', '1', '1');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('423', '2', '2');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('424', '5', '5');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('425', '10', '10');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('426', '20', '20');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('427', '50', '50');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('428', '100', '100');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('429', '500', '500');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('430', '1000', '1000');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('431', 'total_discount', 'Total Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('432', 'product_not_found', 'Product not found !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('433', 'this_is_not_credit_customer', 'This is not credit customer !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('434', 'personal_loan', 'Personal Loan');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('435', 'add_person', 'Add Person');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('436', 'add_loan', 'Add Loan');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('437', 'add_payment', 'Add Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('438', 'manage_person', 'Manage Person');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('439', 'personal_edit', 'Person Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('440', 'person_ledger', 'Person Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('441', 'backup_restore', 'Backup ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('442', 'database_backup', 'Database backup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('443', 'file_information', 'File information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('444', 'filename', 'Filename');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('445', 'size', 'Size');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('446', 'backup_date', 'Backup date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('447', 'backup_now', 'Backup now');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('448', 'restore_now', 'Restore now');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('449', 'are_you_sure', 'Are you sure ?');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('450', 'download', 'Download');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('451', 'backup_and_restore', 'Backup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('452', 'backup_successfully', 'Backup successfully');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('453', 'delete_successfully', 'successfully Deleted');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('454', 'stock_ctn', 'Stock/Qnt');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('455', 'unit', 'Unit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('456', 'meter_m', 'Meter (M)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('457', 'piece_pc', 'Piece (Pc)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('458', 'kilogram_kg', 'Kilogram (Kg)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('459', 'stock_cartoon', 'Stock Cartoon');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('460', 'add_product_csv', 'Add Product (CSV)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('461', 'import_product_csv', 'Import product (CSV)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('462', 'close', 'Close');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('463', 'download_example_file', 'Download example file.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('464', 'upload_csv_file', 'Upload CSV File');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('465', 'csv_file_informaion', 'CSV File Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('466', 'out_of_stock', 'Out Of Stock');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('467', 'others', 'Others');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('468', 'full_paid', 'Full Paid');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('469', 'successfully_saved', 'Your Data Successfully Saved');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('470', 'manage_loan', 'Manage Loan');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('471', 'receipt', 'Receipt');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('472', 'payment', 'Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('473', 'cashflow', 'Daily Cash Flow');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('474', 'signature', 'Signature');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('475', 'supplier_reports', 'Supplier Reports');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('476', 'generate', 'Generate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('477', 'todays_overview', 'Todays Overview');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('478', 'last_sales', 'Last Sales');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('479', 'manage_transaction', 'Manage Transaction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('480', 'daily_summary', 'Daily Summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('481', 'daily_cash_flow', 'Daily Cash Flow');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('482', 'custom_report', 'Custom Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('483', 'transaction', 'Transaction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('484', 'receipt_amount', 'Receipt Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('485', 'transaction_details_datewise', 'Transaction Details Datewise');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('486', 'cash_closing', 'Cash Closing');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('487', 'you_can_not_buy_greater_than_available_qnty', 'You can not buy greater than available qnty.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('488', 'supplier_id', 'Supplier ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('489', 'category_id', 'Category ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('490', 'select_report', 'Select Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('491', 'supplier_summary', 'Supplier summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('492', 'sales_payment_actual', 'Sales payment actual');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('493', 'today_already_closed', 'Today already closed.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('494', 'root_account', 'Root Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('495', 'office', 'Office');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('496', 'loan', 'Loan');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('497', 'transaction_mood', 'Transaction Mood');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('498', 'select_account', 'Select Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('499', 'add_receipt', 'Add Receipt');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('500', 'update_transaction', 'Update Transaction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('501', 'no_stock_found', 'No Stock Found !');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('502', 'admin_login_area', 'Admin Login Area');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('503', 'print_qr_code', 'Print QR Code');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('504', 'discount_type', 'Discount Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('505', 'discount_percentage', 'Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('506', 'fixed_dis', 'Fixed Dis.');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('507', 'return', 'Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('508', 'stock_return_list', 'Stock Return List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('509', 'wastage_return_list', 'Wastage Return List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('510', 'return_invoice', 'Sale Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('511', 'sold_qty', 'Sold Qty');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('512', 'ret_quantity', 'Return Qty');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('513', 'deduction', 'Deduction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('514', 'check_return', 'Check Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('515', 'reason', 'Reason');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('516', 'usablilties', 'Usability');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('517', 'adjs_with_stck', 'Adjust With Stock');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('518', 'return_to_supplier', 'Return To Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('519', 'wastage', 'Wastage');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('520', 'to_deduction', 'Total Deduction ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('521', 'nt_return', 'Net Return Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('522', 'return_list', 'Return List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('523', 'add_return', 'Add Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('524', 'per_qty', 'Purchase Qty');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('525', 'return_supplier', 'Supplier Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('526', 'stock_purchase', 'Stock Purchase Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('527', 'stock_sale', 'Stock Sale Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('528', 'supplier_return', 'Supplier Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('529', 'purchase_id', 'Purchase ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('530', 'return_id', 'Return ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('531', 'supplier_return_list', 'Supplier Return List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('532', 'c_r_slist', 'Stock Return Stock');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('533', 'wastage_list', 'Wastage List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('534', 'please_input_correct_invoice_id', 'Please Input a Correct Sale ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('535', 'please_input_correct_purchase_id', 'Please Input Your Correct  Purchase ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('536', 'add_more', 'Add More');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('537', 'prouct_details', 'Product Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('538', 'prouct_detail', 'Product Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('539', 'stock_return', 'Stock Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('540', 'choose_transaction', 'Select Transaction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('541', 'transection_category', 'Select  Category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('542', 'transaction_categry', 'Select Category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('543', 'search_supplier', 'Search Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('544', 'customer_id', 'Customer ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('545', 'search_customer', 'Search Customer Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('546', 'serial_no', 'SN');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('547', 'item_discount', 'Item Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('548', 'invoice_discount', 'Sale Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('549', 'add_unit', 'Add Unit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('550', 'manage_unit', 'Manage Unit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('551', 'add_new_unit', 'Add New Unit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('552', 'unit_name', 'Unit Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('553', 'payment_amount', 'Payment Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('554', 'manage_your_unit', 'Manage Your Unit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('555', 'unit_id', 'Unit ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('556', 'unit_edit', 'Unit Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('557', 'vat', 'Vat');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('558', 'sales_report_category_wise', 'Sales Report (Category wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('559', 'purchase_report_category_wise', 'Purchase Report (Category wise)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('560', 'category_wise_purchase_report', 'Category wise purchase report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('561', 'category_wise_sales_report', 'Category wise sales report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('562', 'best_sale_product', 'Best Sale Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('563', 'all_best_sales_product', 'All Best Sales Products');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('564', 'todays_customer_receipt', 'Todays Customer Receipt');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('565', 'not_found', 'Record not found');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('566', 'collection', 'Collection');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('567', 'increment', 'Increment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('568', 'accounts_tree_view', 'Accounts Tree View');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('569', 'debit_voucher', 'Debit Voucher');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('570', 'voucher_no', 'Voucher No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('571', 'credit_account_head', 'Credit Account Head');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('572', 'remark', 'Remark');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('573', 'code', 'Code');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('574', 'amount', 'Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('575', 'approved', 'Approved');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('576', 'debit_account_head', 'Debit Account Head');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('577', 'credit_voucher', 'Credit Voucher');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('578', 'find', 'Find');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('579', 'transaction_date', 'Transaction Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('580', 'voucher_type', 'Voucher Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('581', 'particulars', 'Particulars');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('582', 'with_details', 'With Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('583', 'general_ledger', 'General Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('584', 'general_ledger_of', 'General ledger of');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('585', 'pre_balance', 'Pre Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('586', 'current_balance', 'Current Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('587', 'to_date', 'To Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('588', 'from_date', 'From Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('589', 'trial_balance', 'Trial Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('590', 'authorized_signature', 'Authorized Signature');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('591', 'chairman', 'Chairman');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('592', 'total_income', 'Total Income');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('593', 'statement_of_comprehensive_income', 'Statement of Comprehensive Income');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('594', 'profit_loss', 'Profit Loss');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('595', 'cash_flow_report', 'Cash Flow Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('596', 'cash_flow_statement', 'Cash Flow Statement');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('597', 'amount_in_dollar', 'Amount In Dollar');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('598', 'opening_cash_and_equivalent', 'Opening Cash and Equivalent');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('599', 'coa_print', 'Coa Print');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('600', 'cash_flow', 'Cash Flow');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('601', 'cash_book', 'Cash Book');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('602', 'bank_book', 'Bank Book');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('603', 'c_o_a', 'Chart of Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('604', 'journal_voucher', 'Journal Voucher');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('605', 'contra_voucher', 'Contra Voucher');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('606', 'voucher_approval', 'Vouchar Approval');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('607', 'supplier_payment', 'Supplier Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('608', 'customer_receive', 'Customer Receive');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('609', 'gl_head', 'General Head');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('610', 'account_code', 'Account Head');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('611', 'opening_balance', 'Opening Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('612', 'head_of_account', 'Head of Account');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('613', 'inventory_ledger', 'Inventory Ledger');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('614', 'newpassword', 'New Password');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('615', 'password_recovery', 'Password Recovery');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('616', 'forgot_password', 'Forgot Password ??');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('617', 'send', 'Send');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('618', 'due_report', 'Due Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('619', 'due_amount', 'Due Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('620', 'download_sample_file', 'Download Sample File');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('621', 'customer_csv_upload', 'Customer Csv Upload');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('622', 'csv_supplier', 'Csv Upload Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('623', 'csv_upload_supplier', 'Csv Upload Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('624', 'previous', 'Previous');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('625', 'net_total', 'Net Total');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('626', 'currency_list', 'Currency List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('627', 'currency_name', 'Currency Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('628', 'currency_icon', 'Currency Symbol');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('629', 'add_currency', 'Add Currency');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('630', 'role_permission', 'Role Permission');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('631', 'role_list', 'Role List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('632', 'user_assign_role', 'User Assign Role');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('633', 'permission', 'Permission');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('634', 'add_role', 'Add Role');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('635', 'add_module', 'Add Module');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('636', 'module_name', 'Module Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('637', 'office_loan', 'Office Loan');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('638', 'add_menu', 'Add Menu');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('639', 'menu_name', 'Menu Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('640', 'sl_no', 'Sl No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('641', 'create', 'Create');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('642', 'read', 'Read');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('643', 'role_name', 'Role Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('644', 'qty', 'Quantity');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('645', 'max_rate', 'Max Rate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('646', 'min_rate', 'Min Rate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('647', 'avg_rate', 'Average Rate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('648', 'role_permission_added_successfully', 'Role Permission Successfully Added');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('649', 'update_successfully', 'Successfully Updated');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('650', 'role_permission_updated_successfully', 'Role Permission Successfully Updated ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('651', 'shipping_cost', 'Shipping Cost');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('652', 'in_word', 'In Word ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('653', 'shipping_cost_report', 'Shipping Cost Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('654', 'cash_book_report', 'Cash Book Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('655', 'inventory_ledger_report', 'Inventory Ledger Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('656', 'trial_balance_with_opening_as_on', 'Trial Balance With Opening As On');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('657', 'type', 'Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('658', 'taka_only', 'Taka Only');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('659', 'item_description', 'Desc');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('660', 'sold_by', 'Sold By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('661', 'user_wise_sales_report', 'User Wise Sales Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('662', 'user_name', 'User Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('663', 'total_sold', 'Total Sold');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('664', 'user_wise_sale_report', 'User Wise Sales Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('665', 'barcode_or_qrcode', 'Barcode/QR-code');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('666', 'category_csv_upload', 'Category Csv  Upload');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('667', 'unit_csv_upload', 'Unit Csv Upload');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('668', 'invoice_return_list', 'Sales Return list');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('669', 'invoice_return', 'Sales Return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('670', 'tax_report', 'TAX Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('671', 'select_tax', 'Select TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('672', 'hrm', 'HRM');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('673', 'employee', 'Employee');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('674', 'add_employee', 'Add Employee');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('675', 'manage_employee', 'Manage Employee');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('676', 'attendance', 'Attendance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('677', 'add_attendance', 'Attendance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('678', 'manage_attendance', 'Manage Attendance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('679', 'payroll', 'Payroll');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('680', 'add_payroll', 'Payroll');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('681', 'manage_payroll', 'Manage Payroll');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('682', 'employee_type', 'Employee Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('683', 'employee_designation', 'Employee Designation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('684', 'designation', 'Designation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('685', 'add_designation', 'Add Designation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('686', 'manage_designation', 'Manage Designation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('687', 'designation_update_form', 'Designation Update form');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('688', 'picture', 'Picture');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('689', 'country', 'Country');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('690', 'blood_group', 'Blood Group');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('691', 'address_line_1', 'Address Line 1');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('692', 'address_line_2', 'Address Line 2');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('693', 'zip', 'Zip code');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('694', 'city', 'City');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('695', 'hour_rate_or_salary', 'Houre Rate/Salary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('696', 'rate_type', 'Rate Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('697', 'hourly', 'Hourly');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('698', 'salary', 'Salary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('699', 'employee_update', 'Employee Update');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('700', 'checkin', 'Check In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('701', 'employee_name', 'Employee Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('702', 'checkout', 'Check Out');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('703', 'confirm_clock', 'Confirm Clock');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('704', 'stay', 'Stay Time');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('705', 'sign_in', 'Sign In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('706', 'check_in', 'Check In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('707', 'single_checkin', 'Single Check In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('708', 'bulk_checkin', 'Bulk Check In');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('709', 'successfully_checkout', 'Successfully Checkout');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('710', 'attendance_report', 'Attendance Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('711', 'datewise_report', 'Date Wise Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('712', 'employee_wise_report', 'Employee Wise Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('713', 'date_in_time_report', 'Date In Time Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('714', 'request', 'Request');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('715', 'sign_out', 'Sign Out');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('716', 'work_hour', 'Work Hours');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('717', 's_time', 'Start Time');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('718', 'e_time', 'In Time');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('719', 'salary_benefits_type', 'Benefits Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('720', 'salary_benefits', 'Salary Benefits');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('721', 'beneficial_list', 'Benefit List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('722', 'add_beneficial', 'Add Benefits');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('723', 'add_benefits', 'Add Benefits');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('724', 'benefits_list', 'Benefit List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('725', 'benefit_type', 'Benefit Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('726', 'benefits', 'Benefit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('727', 'manage_benefits', 'Manage Benefits');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('728', 'deduct', 'Deduct');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('729', 'add', 'Add');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('730', 'add_salary_setup', 'Add Salary Setup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('731', 'manage_salary_setup', 'Manage Salary Setup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('732', 'basic', 'Basic');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('733', 'salary_type', 'Salary Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('734', 'addition', 'Addition');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('735', 'gross_salary', 'Gross Salary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('736', 'set', 'Set');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('737', 'salary_generate', 'Salary Generate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('738', 'manage_salary_generate', 'Manage Salary Generate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('739', 'sal_name', 'Salary Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('740', 'gdate', 'Generated Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('741', 'generate_by', 'Generated By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('742', 'the_salary_of', 'The Salary of ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('743', 'already_generated', ' Already Generated');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('744', 'salary_month', 'Salary Month');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('745', 'successfully_generated', 'Successfully Generated');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('746', 'salary_payment', 'Salary Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('747', 'employee_salary_payment', 'Employee Salary Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('748', 'total_salary', 'Total Salary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('749', 'total_working_minutes', 'Total Working Hours');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('750', 'working_period', 'Working Period');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('751', 'paid_by', 'Paid By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('752', 'pay_now', 'Pay Now ');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('753', 'confirm', 'Confirm');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('754', 'successfully_paid', 'Successfully Paid');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('755', 'add_incometax', 'Add Income TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('756', 'setup_tax', 'Setup TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('757', 'start_amount', 'Start Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('758', 'end_amount', 'End Amount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('759', 'tax_rate', 'TAX Rate');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('760', 'setup', 'Setup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('761', 'manage_income_tax', 'Manage Income TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('762', 'income_tax_updateform', 'Income TAX Update form');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('763', 'positional_information', 'Positional Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('764', 'personal_information', 'Personal Information');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('765', 'timezone', 'Time Zone');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('766', 'sms', 'SMS');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('767', 'sms_configure', 'SMS Configure');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('768', 'url', 'URL');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('769', 'sender_id', 'Sender ID');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('770', 'api_key', 'Api Key');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('771', 'gui_pos', 'GUI POS');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('772', 'manage_service', 'Manage Service');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('773', 'service', 'Service');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('774', 'add_service', 'Add Service');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('775', 'service_edit', 'Service Edit');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('776', 'service_csv_upload', 'Service CSV Upload');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('777', 'service_name', 'Service Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('778', 'charge', 'Charge');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('779', 'service_invoice', 'Service Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('780', 'service_discount', 'Service Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('781', 'hanging_over', 'ETD');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('782', 'service_details', 'Service Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('783', 'tax_settings', 'TAX Settings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('784', 'default_value', 'Default Value');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('785', 'number_of_tax', 'Number of TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('786', 'please_select_employee', 'Please Select Employee');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('787', 'manage_service_invoice', 'Manage Service Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('788', 'update_service_invoice', 'Update Service Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('789', 'customer_wise_tax_report', 'Customer Wise TAX Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('790', 'service_id', 'Service Id');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('791', 'invoice_wise_tax_report', 'Invoice Wise TAX Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('792', 'reg_no', 'Reg No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('793', 'update_now', 'Update Now');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('794', 'import', 'Import');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('795', 'add_expense_item', 'Add Expense Item');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('796', 'manage_expense_item', 'Manage Expense Item');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('797', 'add_expense', 'Add Expense');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('798', 'manage_expense', 'Manage Expense');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('799', 'expense_statement', 'Expense Statement');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('800', 'expense_type', 'Expense Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('801', 'expense_item_name', 'Expense Item Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('802', 'stock_purchase_price', 'Stock Purchase Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('803', 'purchase_price', 'Purchase Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('804', 'customer_advance', 'Customer Advance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('805', 'advance_type', 'Advance Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('806', 'restore', 'Restore');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('807', 'supplier_advance', 'Supplier Advance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('808', 'please_input_correct_invoice_no', 'Please Input Correct Invoice NO');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('809', 'backup', 'Back Up');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('810', 'app_setting', 'App Settings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('811', 'local_server_url', 'Local Server Url');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('812', 'online_server_url', 'Online Server Url');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('813', 'connet_url', 'Connected Hotspot Ip/url');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('814', 'update_your_app_setting', 'Update Your App Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('815', 'select_category', 'Select Category');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('816', 'mini_invoice', 'Mini Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('817', 'purchase_details', 'Purchase Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('818', 'disc', 'Dis %');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('819', 'serial', 'Serial');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('820', 'transaction_head', 'Transaction Head');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('821', 'transaction_type', 'Transaction Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('822', 'return_details', 'Return Details');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('823', 'return_to_customer', 'Return To Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('824', 'sales_and_purchase_report_summary', 'Sales And Purchase Report Summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('825', 'add_person_officeloan', 'Add Person (Office Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('826', 'add_loan_officeloan', 'Add Loan (Office Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('827', 'add_payment_officeloan', 'Add Payment (Office Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('828', 'manage_loan_officeloan', 'Manage Loan (Office Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('829', 'add_person_personalloan', 'Add Person (Personal Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('830', 'add_loan_personalloan', 'Add Loan (Personal Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('831', 'add_payment_personalloan', 'Add Payment (Personal Loan)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('832', 'manage_loan_personalloan', 'Manage Loan (Personal)');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('833', 'hrm_management', 'Human Resource');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('834', 'cash_adjustment', 'Cash Adjustment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('835', 'adjustment_type', 'Adjustment Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('836', 'change', 'Change');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('837', 'sale_by', 'Sale By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('838', 'salary_date', 'Salary Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('839', 'earnings', 'Earnings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('840', 'total_addition', 'Total Addition');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('841', 'total_deduction', 'Total Deduction');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('842', 'net_salary', 'Net Salary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('843', 'ref_number', 'Reference Number');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('844', 'name_of_bank', 'Name Of Bank');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('845', 'salary_slip', 'Salary Slip');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('846', 'basic_salary', 'Basic Salary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('847', 'return_from_customer', 'Return From Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('848', 'quotation', 'Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('849', 'add_quotation', 'Add Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('850', 'manage_quotation', 'Manage Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('851', 'terms', 'Terms');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('852', 'send_to_customer', 'Sent To Customer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('853', 'quotation_no', 'Quotation No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('854', 'quotation_date', 'Quotation Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('855', 'total_service_tax', 'Total Service TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('856', 'totalservicedicount', 'Total Service Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('857', 'item_total', 'Item Total');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('858', 'service_total', 'Service Total');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('859', 'quot_description', 'Quotation Description');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('860', 'sub_total', 'Sub Total');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('861', 'mail_setting', 'Mail Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('862', 'mail_configuration', 'Mail Configuration');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('863', 'mail', 'Mail');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('864', 'protocol', 'Protocol');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('865', 'smtp_host', 'SMTP Host');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('866', 'smtp_port', 'SMTP Port');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('867', 'sender_mail', 'Sender Mail');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('868', 'mail_type', 'Mail Type');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('869', 'html', 'HTML');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('870', 'text', 'TEXT');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('871', 'expiry_date', 'Expiry Date');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('872', 'api_secret', 'Api Secret');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('873', 'please_config_your_mail_setting', NULL);
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('874', 'quotation_successfully_added', 'Quotation Successfully Added');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('875', 'add_to_invoice', 'Add To Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('876', 'added_to_invoice', 'Added To Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('877', 'closing_balance', 'Closing Balance');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('878', 'contact', 'Contact');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('879', 'fax', 'Fax');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('880', 'state', 'State');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('881', 'discounts', 'Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('882', 'address1', 'Address1');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('883', 'address2', 'Address2');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('884', 'receive', 'Receive');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('885', 'purchase_history', 'Purchase History');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('886', 'cash_payment', 'Cash Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('887', 'bank_payment', 'Bank Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('888', 'do_you_want_to_print', 'Do You Want to Print');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('889', 'yes', 'Yes');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('890', 'no', 'No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('891', 'todays_sale', 'Today\'s Sales');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('892', 'or', 'OR');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('893', 'no_result_found', 'No Result Found');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('894', 'add_service_quotation', 'Add Service Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('895', 'add_to_invoice', 'Add To Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('896', 'item_quotation', 'Item Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('897', 'service_quotation', 'Service Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('898', 'return_from', 'Return Form');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('899', 'customer_return_list', 'Customer Return List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('900', 'pdf', 'Pdf');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('901', 'note', 'Note');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('902', 'update_debit_voucher', 'Update Debit Voucher');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('903', 'update_credit_voucher', 'Update Credit voucher');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('904', 'on', 'On');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('905', '', '');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('906', 'total_expenses', 'Total Expense');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('907', 'already_exist', 'Already Exist');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('908', 'checked_out', 'Checked Out');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('909', 'update_salary_setup', 'Update Salary Setup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('910', 'employee_signature', 'Employee Signature');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('911', 'payslip', 'Payslip');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('912', 'exsisting_role', 'Existing Role');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('913', 'filter', 'Filter');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('914', 'testinput', NULL);
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('915', 'update_quotation', 'Update Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('916', 'quotation_successfully_updated', 'Quotation Successfully Updated');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('917', 'successfully_approved', 'Successfully Approved');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('918', 'expiry', 'Expiry');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('919', 'user_list', 'User List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('920', 'assign_roleto_user', 'Assign Role To User');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('921', 'assign_role_list', 'Assigned Role List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('922', 'application_settings', 'Application Settings');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('923', 'company_list', 'Company List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('924', 'edit_company', 'Edit Company');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('925', 'edit_user', 'Edit User');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('926', 'edit_currency', 'Edit Currency');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('927', 'mobile_no', 'Mobile No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('928', 'email_address', 'Email Address');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('929', 'customer_list', 'Customer List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('930', 'advance_receipt', 'Advance Receipt');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('931', 'supplier_list', 'Supplier List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('932', 'category_list', 'Category List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('933', 'no_record_found', 'No Record Found');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('934', 'unit_list', 'Unit List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('935', 'edit_product', 'Edit Product');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('936', 'payable_summary', 'Payable Summary');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('937', 'pad_print', 'Pad Print');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('938', 'pos_print', 'POS Print');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('939', 'pos_invoice', 'POS Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('940', 'employee_profile', 'Employee Profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('941', 'edit_beneficials', 'Edit Beneficials');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('942', 'edit_setup_update', 'Edit Salary Setup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('943', 'add_office_loan', 'Add Office Loan');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('944', 'income_tax', 'Income TAX');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('945', 'quotation_to_sale', 'Quotation To Sale');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('946', 'quotation_edit', 'Edit Quotation');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('947', 'edit_profile', 'Edit Profile');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('948', 'edit_supplier', 'Edit Supplier');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('949', 'edit_bank', 'Edit Bank');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('950', 'balance_sheet', 'Balance Sheet');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('951', 'salary_setup', 'Salary Setup');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('952', 'account_head', 'Account Head');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('953', 'add_invoice', 'Add Invoice');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('954', 'general_ledger_report', 'General Ledger Report');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('955', 'print_setting', 'Print Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('956', 'header', 'Header');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('957', 'footer', 'Footer');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('958', 'supplier_payment_receipt', 'Payment Receipt');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('959', 'welcome_back', 'Welcome Back');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('960', 'overwrite', 'Over Write');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('961', 'module', 'Module');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('962', 'purchase_key', 'Purchase Key');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('963', 'buy_now', 'Buy Now');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('964', 'module_list', 'Module List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('965', 'modules', 'Modules');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('966', 'install', 'Install');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('967', 'uninstall', 'Uninstall');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('968', 'module_added_successfully', 'Module Added Successfully');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('969', 'no_tables_are_registered_in_config', 'No table registered in config');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('970', 'tables_are_not_available_in_database', 'Table Are not Available in Database');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('971', 'addon', 'Add-ons');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('972', 'generate_qr', 'Generate QR');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('973', 'latestv', 'Latest Version');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('974', 'Current Version', NULL);
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('976', 'notesupdate', 'Note: If you want to update software,you Must have immediate previous version');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('977', 'arabic', NULL);
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('978', 'vat_no', 'VAT NO');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('979', 'new_p_method', 'Add New Payment Method');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('980', 'dis_val', 'Dis. Value');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('981', 'vat_val', 'VAT Value');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('982', 'ttl_val', 'Total VAT');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('983', 'purchase_discount', 'Purchase Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('984', 'order_time', 'Order Time');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('985', 'order_by', 'Order By');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('986', 'terms_list', 'Sales Terms List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('987', 'terms_add', 'Add Sales Terms');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('988', 'term_condi', 'Terms & Condition');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('989', 'terms_update', 'Update Seles Terms');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('990', 'add_payment_method', 'Add Payment Method');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('991', 'payment_method_list', 'Payment Method List');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('992', 'payment_method_name', 'Payment Method Name');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('993', 'batch_no', 'Batch No');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('994', 'total_with_vat', 'Total With VAT');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('995', 'invoice_time', 'Invoice Time');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('996', 'product_vat', 'Product VAT');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('997', 'service_vat', 'Service VAT');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('998', 'cr_no', 'CR NO');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('999', 'service_payment', 'Service Payment');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1000', 'vat_tax_setting', 'VAT & TAX Setting');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1001', 'qty2', 'Qty');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1002', 'batch', 'Batch');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1003', 'disc', 'Disc');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1004', 'tot_price', 'Tot Price');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1005', 'tot_before_dis', 'Total Before Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1006', 'tot_with_dis', 'Total with Discount');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1007', 'tax_vat', 'TAX Value');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1008', 'return_receipt_text', 'Please keep the receipt and bring it in case of return');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1009', 'invoice_qr_code', 'Invoice Qr-Code');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1010', 'sales_due', 'Today Sales Due');
INSERT INTO `language` (`id`, `phrase`, `english`) VALUES ('1011', 'purchase_due', 'Today Purchase Due');


#
# TABLE STRUCTURE FOR: module
#

DROP TABLE IF EXISTS `module`;

CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `directory` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('1', 'invoice', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('2', 'customer', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('3', 'product', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('4', 'supplier', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('5', 'purchase', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('6', 'stock', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('7', 'return', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('8', 'report', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('9', 'accounts', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('10', 'bank', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('11', 'tax', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('12', 'hrm_management', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('13', 'service', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('15', 'setting', NULL, NULL, NULL, '1');
INSERT INTO `module` (`id`, `name`, `description`, `image`, `directory`, `status`) VALUES ('16', 'quotation', NULL, NULL, NULL, '1');


#
# TABLE STRUCTURE FOR: module_purchase_key
#

DROP TABLE IF EXISTS `module_purchase_key`;

CREATE TABLE `module_purchase_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identity` varchar(100) DEFAULT NULL,
  `purchase_key` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# TABLE STRUCTURE FOR: payroll_tax_setup
#

DROP TABLE IF EXISTS `payroll_tax_setup`;

CREATE TABLE `payroll_tax_setup` (
  `tax_setup_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `end_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `rate` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(30) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`tax_setup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: person_information
#

DROP TABLE IF EXISTS `person_information`;

CREATE TABLE `person_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` varchar(50) NOT NULL,
  `person_name` varchar(50) NOT NULL,
  `person_phone` varchar(50) NOT NULL,
  `person_address` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: person_ledger
#

DROP TABLE IF EXISTS `person_ledger`;

CREATE TABLE `person_ledger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(50) NOT NULL,
  `person_id` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `debit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `credit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `details` text NOT NULL,
  `status` int(11) NOT NULL COMMENT '1=no paid,2=paid',
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: personal_loan
#

DROP TABLE IF EXISTS `personal_loan`;

CREATE TABLE `personal_loan` (
  `per_loan_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(30) NOT NULL,
  `person_id` varchar(30) NOT NULL,
  `debit` decimal(12,2) DEFAULT 0.00,
  `credit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `date` varchar(30) NOT NULL,
  `details` varchar(100) NOT NULL,
  `status` int(11) NOT NULL COMMENT '1=no paid,2=paid',
  PRIMARY KEY (`per_loan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: pesonal_loan_information
#

DROP TABLE IF EXISTS `pesonal_loan_information`;

CREATE TABLE `pesonal_loan_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` varchar(50) NOT NULL,
  `person_name` varchar(50) NOT NULL,
  `person_phone` varchar(30) NOT NULL,
  `person_address` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: print_setting
#

DROP TABLE IF EXISTS `print_setting`;

CREATE TABLE `print_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header` int(11) NOT NULL,
  `footer` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `print_setting` (`id`, `header`, `footer`) VALUES ('1', '200', '100');


#
# TABLE STRUCTURE FOR: product_category
#

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `product_category` (`category_id`, `category_name`, `status`) VALUES ('1', 'test', '1');


#
# TABLE STRUCTURE FOR: product_information
#

DROP TABLE IF EXISTS `product_information`;

CREATE TABLE `product_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(100) NOT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` float DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `tax` float DEFAULT NULL COMMENT 'Tax in %',
  `serial_no` varchar(200) DEFAULT NULL,
  `product_vat` float DEFAULT NULL,
  `product_model` varchar(100) DEFAULT NULL,
  `product_details` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `product_information` (`id`, `product_id`, `category_id`, `product_name`, `price`, `unit`, `tax`, `serial_no`, `product_vat`, `product_model`, `product_details`, `image`, `status`) VALUES ('1', '65020469', '1', 'Sound System', '1000', 'PCS', '0', '', '5', 'new', '', 'my-assets/image/product.png', '1');
INSERT INTO `product_information` (`id`, `product_id`, `category_id`, `product_name`, `price`, `unit`, `tax`, `serial_no`, `product_vat`, `product_model`, `product_details`, `image`, `status`) VALUES ('2', '15339253', '1', 'Sweet Chocolate', '500', 'PCS', '0', '', '5', 'BL', '', 'my-assets/image/product.png', '1');


#
# TABLE STRUCTURE FOR: product_purchase
#

DROP TABLE IF EXISTS `product_purchase`;

CREATE TABLE `product_purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` bigint(20) NOT NULL,
  `chalan_no` varchar(100) NOT NULL,
  `supplier_id` bigint(20) NOT NULL,
  `grand_total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `paid_amount` decimal(10,2) DEFAULT 0.00,
  `due_amount` decimal(10,2) DEFAULT 0.00,
  `total_discount` decimal(10,2) DEFAULT NULL,
  `invoice_discount` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'sum of product discount',
  `total_vat_amnt` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'sum of product vat',
  `purchase_date` varchar(50) DEFAULT NULL,
  `purchase_details` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `bank_id` varchar(30) DEFAULT NULL,
  `payment_type` int(11) NOT NULL,
  `is_credit` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `supplier_id` (`supplier_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `product_purchase` (`id`, `purchase_id`, `chalan_no`, `supplier_id`, `grand_total_amount`, `paid_amount`, `due_amount`, `total_discount`, `invoice_discount`, `total_vat_amnt`, `purchase_date`, `purchase_details`, `status`, `bank_id`, `payment_type`, `is_credit`) VALUES ('1', '20220302134146', '12', '1', '13125.00', '13125.00', '0.00', '0.00', '0.00', '625.00', '2022-03-02', '', '1', NULL, '1', '0');


#
# TABLE STRUCTURE FOR: product_purchase_details
#

DROP TABLE IF EXISTS `product_purchase_details`;

CREATE TABLE `product_purchase_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_detail_id` varchar(100) DEFAULT NULL,
  `purchase_id` bigint(20) DEFAULT NULL,
  `product_id` varchar(30) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `batch_id` varchar(30) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `discount` float DEFAULT NULL COMMENT 'discount percentage',
  `discount_amnt` decimal(10,2) NOT NULL DEFAULT 0.00,
  `vat_amnt_per` decimal(10,2) NOT NULL DEFAULT 0.00,
  `vat_amnt` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `product_purchase_details` (`id`, `purchase_detail_id`, `purchase_id`, `product_id`, `quantity`, `rate`, `batch_id`, `expiry_date`, `total_amount`, `discount`, `discount_amnt`, `vat_amnt_per`, `vat_amnt`, `status`) VALUES ('1', '279EWZBCCAB25P3', '20220302134146', '65020469', '10.00', '800.00', '111', '2023-01-01', '8000.00', '0', '0.00', '5.00', '400.00', '1');
INSERT INTO `product_purchase_details` (`id`, `purchase_detail_id`, `purchase_id`, `product_id`, `quantity`, `rate`, `batch_id`, `expiry_date`, `total_amount`, `discount`, `discount_amnt`, `vat_amnt_per`, `vat_amnt`, `status`) VALUES ('2', 'SYH73SPWIZWJ8HO', '20220302134146', '15339253', '10.00', '450.00', '222', '2023-01-01', '4500.00', '0', '0.00', '5.00', '225.00', '1');


#
# TABLE STRUCTURE FOR: product_return
#

DROP TABLE IF EXISTS `product_return`;

CREATE TABLE `product_return` (
  `return_id` varchar(30) CHARACTER SET latin1 NOT NULL,
  `product_id` varchar(20) CHARACTER SET latin1 NOT NULL,
  `invoice_id` varchar(20) CHARACTER SET latin1 NOT NULL,
  `purchase_id` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `date_purchase` varchar(20) CHARACTER SET latin1 NOT NULL,
  `date_return` varchar(30) CHARACTER SET latin1 NOT NULL,
  `byy_qty` float NOT NULL,
  `ret_qty` float NOT NULL,
  `customer_id` varchar(20) CHARACTER SET latin1 NOT NULL,
  `supplier_id` varchar(30) CHARACTER SET latin1 NOT NULL,
  `product_rate` decimal(10,2) NOT NULL DEFAULT 0.00,
  `deduction` float NOT NULL,
  `total_deduct` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_ret_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `net_total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `reason` text CHARACTER SET latin1 NOT NULL,
  `usablity` int(11) NOT NULL,
  KEY `product_id` (`product_id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `customer_id` (`customer_id`),
  KEY `supplier_id` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: product_service
#

DROP TABLE IF EXISTS `product_service`;

CREATE TABLE `product_service` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `service_vat` float DEFAULT NULL,
  `is_fixed` int(11) NOT NULL DEFAULT 0,
  `is_dynamic` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: quot_products_used
#

DROP TABLE IF EXISTS `quot_products_used`;

CREATE TABLE `quot_products_used` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quot_id` varchar(100) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `serial_no` varchar(30) DEFAULT NULL,
  `batch_id` varchar(10) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `used_qty` decimal(10,2) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `supplier_rate` float DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `discount_per` varchar(15) DEFAULT NULL,
  `vat_amnt` decimal(10,2) DEFAULT NULL,
  `vat_per` decimal(10,2) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `quot_id` (`quot_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: quotation
#

DROP TABLE IF EXISTS `quotation`;

CREATE TABLE `quotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quotation_id` varchar(30) NOT NULL,
  `quot_description` text NOT NULL,
  `customer_id` varchar(30) NOT NULL,
  `quotdate` date NOT NULL,
  `expire_date` date DEFAULT NULL,
  `item_total_amount` decimal(12,2) NOT NULL,
  `item_total_dicount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `item_total_vat` double(10,2) NOT NULL DEFAULT 0.00,
  `item_total_tax` decimal(10,2) DEFAULT 0.00,
  `service_total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `service_total_discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `service_total_vat` double(10,2) NOT NULL DEFAULT 0.00,
  `service_total_tax` decimal(10,2) DEFAULT 0.00,
  `quot_dis_item` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quot_dis_service` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quot_no` varchar(50) NOT NULL,
  `is_fixed` int(11) NOT NULL DEFAULT 0,
  `is_dynamic` int(11) NOT NULL DEFAULT 0,
  `create_by` varchar(30) NOT NULL,
  `create_date` date NOT NULL,
  `update_by` varchar(30) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `cust_show` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quot_no` (`quot_no`),
  KEY `quotation_id` (`quotation_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: quotation_service_used
#

DROP TABLE IF EXISTS `quotation_service_used`;

CREATE TABLE `quotation_service_used` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quot_id` varchar(20) NOT NULL,
  `service_id` int(11) NOT NULL,
  `qty` decimal(10,2) NOT NULL DEFAULT 0.00,
  `charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `vat_per` decimal(10,2) DEFAULT 0.00,
  `vat_amnt` decimal(10,2) DEFAULT 0.00,
  `tax` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `quot_id` (`quot_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: quotation_taxinfo
#

DROP TABLE IF EXISTS `quotation_taxinfo`;

CREATE TABLE `quotation_taxinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `relation_id` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# TABLE STRUCTURE FOR: role_permission
#

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_module_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `create` tinyint(1) DEFAULT NULL,
  `read` tinyint(1) DEFAULT NULL,
  `update` tinyint(1) DEFAULT NULL,
  `delete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_module_id` (`fk_module_id`),
  KEY `fk_user_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: salary_sheet_generate
#

DROP TABLE IF EXISTS `salary_sheet_generate`;

CREATE TABLE `salary_sheet_generate` (
  `ssg_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `gdate` varchar(30) DEFAULT NULL,
  `start_date` varchar(30) CHARACTER SET latin1 NOT NULL,
  `end_date` varchar(30) CHARACTER SET latin1 NOT NULL,
  `generate_by` varchar(30) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`ssg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: salary_type
#

DROP TABLE IF EXISTS `salary_type`;

CREATE TABLE `salary_type` (
  `salary_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `sal_name` varchar(100) NOT NULL,
  `salary_type` varchar(50) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`salary_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: sec_role
#

DROP TABLE IF EXISTS `sec_role`;

CREATE TABLE `sec_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# TABLE STRUCTURE FOR: sec_userrole
#

DROP TABLE IF EXISTS `sec_userrole`;

CREATE TABLE `sec_userrole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `roleid` int(11) NOT NULL,
  `createby` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `createdate` datetime NOT NULL,
  UNIQUE KEY `ID` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# TABLE STRUCTURE FOR: seles_termscondi
#

DROP TABLE IF EXISTS `seles_termscondi`;

CREATE TABLE `seles_termscondi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO `seles_termscondi` (`id`, `description`, `status`) VALUES ('5', 'Goods purchased without the original invoice are not to be returned or exchanged', '1');


#
# TABLE STRUCTURE FOR: service_invoice
#

DROP TABLE IF EXISTS `service_invoice`;

CREATE TABLE `service_invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `voucher_no` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `employee_id` varchar(100) DEFAULT NULL,
  `customer_id` varchar(30) NOT NULL,
  `total_amount` decimal(20,2) NOT NULL DEFAULT 0.00,
  `total_discount` decimal(20,2) NOT NULL DEFAULT 0.00,
  `invoice_discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_vat_amnt` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'total invoice vat',
  `total_tax` decimal(10,2) DEFAULT 0.00,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `due_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shipping_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `previous` decimal(10,2) NOT NULL DEFAULT 0.00,
  `details` varchar(250) NOT NULL,
  `sales_by` varchar(20) DEFAULT NULL,
  `is_fixed` int(11) NOT NULL DEFAULT 0,
  `is_dynamic` int(11) NOT NULL DEFAULT 0,
  `is_credit` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: service_invoice_details
#

DROP TABLE IF EXISTS `service_invoice_details`;

CREATE TABLE `service_invoice_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `service_inv_id` varchar(30) NOT NULL,
  `qty` decimal(10,2) NOT NULL DEFAULT 0.00,
  `charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) DEFAULT 0.00,
  `discount_amount` decimal(10,2) DEFAULT 0.00,
  `vat` decimal(10,2) DEFAULT 0.00,
  `vat_amnt` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: sms_settings
#

DROP TABLE IF EXISTS `sms_settings`;

CREATE TABLE `sms_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `api_key` varchar(100) DEFAULT NULL,
  `api_secret` varchar(100) DEFAULT NULL,
  `from` varchar(100) DEFAULT NULL,
  `isinvoice` int(11) NOT NULL DEFAULT 0,
  `isservice` int(11) NOT NULL DEFAULT 0,
  `isreceive` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `sms_settings` (`id`, `api_key`, `api_secret`, `from`, `isinvoice`, `isservice`, `isreceive`) VALUES ('1', '5d6db102011', '456452dfgdf', '8801645452', '0', '0', '0');


#
# TABLE STRUCTURE FOR: sub_module
#

DROP TABLE IF EXISTS `sub_module`;

CREATE TABLE `sub_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `description` text CHARACTER SET utf8 DEFAULT NULL,
  `image` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `directory` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=latin1;

INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('1', '1', 'new_invoice', NULL, NULL, 'new_invoice', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('2', '1', 'manage_invoice', NULL, NULL, 'manage_invoice', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('3', '1', 'pos_invoice', NULL, NULL, 'gui_pos', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('4', '2', 'add_customer', NULL, NULL, 'add_customer', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('5', '2', 'manage_customer', NULL, NULL, 'manage_customer', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('6', '2', 'credit_customer', NULL, NULL, 'credit_customer', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('7', '2', 'paid_customer', NULL, NULL, 'paid_customer', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('8', '2', 'customer_ledger', NULL, NULL, 'customer_ledger', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('9', '2', 'customer_advance', NULL, NULL, 'customer_advance', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('10', '3', 'category', NULL, NULL, 'category', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('11', '3', 'manage_category', NULL, NULL, 'manage_category', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('12', '3', 'unit', NULL, NULL, 'unit', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('13', '3', 'manage_unit', NULL, NULL, 'manage_unit', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('14', '3', 'add_product', NULL, NULL, 'create_product', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('15', '3', 'import_product_csv', NULL, NULL, 'add_product_csv', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('16', '3', 'manage_product', NULL, NULL, 'manage_product', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('17', '4', 'add_supplier', NULL, NULL, 'add_supplier', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('18', '4', 'manage_supplier', NULL, NULL, 'manage_supplier', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('19', '4', 'supplier_ledger', NULL, NULL, 'supplier_ledger_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('20', '4', 'supplier_advance', NULL, NULL, 'supplier_advance', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('21', '5', 'add_purchase', NULL, NULL, 'add_purchase', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('22', '5', 'manage_purchase', NULL, NULL, 'manage_purchase', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('23', '6', 'stock_report', NULL, NULL, 'stock_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('24', '7', 'return', NULL, NULL, 'add_return', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('25', '7', 'stock_return_list', NULL, NULL, 'return_list', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('26', '7', 'supplier_return_list', NULL, NULL, 'supplier_return_list', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('27', '7', 'wastage_return_list', NULL, NULL, 'wastage_return_list', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('28', '8', 'closing', NULL, NULL, 'add_closing', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('29', '8', 'closing_report', NULL, NULL, 'closing_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('30', '8', 'todays_report', NULL, NULL, 'all_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('31', '8', 'todays_customer_receipt', NULL, NULL, 'todays_customer_receipt', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('32', '8', 'sales_report', NULL, NULL, 'todays_sales_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('33', '8', 'due_report', NULL, NULL, 'due_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('34', '8', 'purchase_report', NULL, NULL, 'todays_purchase_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('35', '8', 'purchase_report_category_wise', NULL, NULL, 'purchase_report_category_wise', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('36', '8', 'sales_report_product_wise', NULL, NULL, 'product_sales_reports_date_wise', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('37', '8', 'sales_report_category_wise', NULL, NULL, 'sales_report_category_wise', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('38', '8', 'shipping_cost_report', NULL, NULL, 'shipping_cost_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('39', '8', 'user_wise_sales_report', NULL, NULL, 'user_wise_sales_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('40', '8', 'invoice_return', NULL, NULL, 'invoice_return', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('41', '8', 'supplier_return', NULL, NULL, 'supplier_return', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('42', '8', 'tax_report', NULL, NULL, 'tax_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('43', '8', 'profit_report', NULL, NULL, 'profit_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('44', '9', 'c_o_a', NULL, NULL, 'show_tree', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('45', '9', 'supplier_payment', NULL, NULL, 'supplier_payment', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('46', '9', 'customer_receive', NULL, NULL, 'customer_receive', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('47', '9', 'opening_balance', NULL, NULL, 'opening_balance', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('48', '9', 'debit_voucher', NULL, NULL, 'debit_voucher', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('49', '9', 'credit_voucher', NULL, NULL, 'credit_voucher', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('50', '9', 'voucher_approval', NULL, NULL, 'aprove_v', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('51', '9', 'contra_voucher', NULL, NULL, 'contra_voucher', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('52', '9', 'journal_voucher', NULL, NULL, 'journal_voucher', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('53', '9', 'report', NULL, NULL, 'ac_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('54', '9', 'cash_book', NULL, NULL, 'cash_book', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('55', '9', 'Inventory_ledger', NULL, NULL, 'inventory_ledger', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('56', '9', 'bank_book', NULL, NULL, 'bank_book', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('57', '9', 'general_ledger', NULL, NULL, 'general_ledger', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('58', '9', 'trial_balance', NULL, NULL, 'trial_balance', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('59', '9', 'cash_flow', NULL, NULL, 'cash_flow_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('60', '9', 'coa_print', NULL, NULL, 'coa_print', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('61', '10', 'add_new_bank', NULL, NULL, 'add_bank', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('62', '10', 'manage_bank', NULL, NULL, 'bank_list', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('63', '10', 'bank_transaction', NULL, NULL, 'bank_transaction', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('64', '10', 'bank_ledger', NULL, NULL, 'bank_ledger', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('65', '11', 'tax_settings', NULL, NULL, 'tax_settings', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('66', '11', 'add_incometax', NULL, NULL, 'add_incometax', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('67', '11', 'manage_income_tax', NULL, NULL, 'manage_income_tax', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('68', '11', 'tax_report', NULL, NULL, 'tax_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('69', '11', 'invoice_wise_tax_report', NULL, NULL, 'invoice_wise_tax_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('70', '12', 'add_designation', NULL, NULL, 'add_designation', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('71', '12', 'manage_designation', NULL, NULL, 'manage_designation', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('72', '12', 'add_employee', NULL, NULL, 'add_employee', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('73', '12', 'manage_employee', NULL, NULL, 'manage_employee', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('74', '12', 'add_attendance', NULL, NULL, 'add_attendance', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('75', '12', 'manage_attendance', NULL, NULL, 'manage_attendance', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('76', '12', 'attendance_report', NULL, NULL, 'attendance_report', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('77', '12', 'add_benefits', NULL, NULL, 'add_benefits', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('78', '12', 'manage_benefits', NULL, NULL, 'manage_benefits', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('79', '12', 'add_salary_setup', NULL, NULL, 'add_salary_setup', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('80', '12', 'manage_salary_setup', NULL, NULL, 'manage_salary_setup', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('81', '12', 'salary_generate', NULL, NULL, 'salary_generate', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('82', '12', 'manage_salary_generate', NULL, NULL, 'manage_salary_generate', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('83', '12', 'salary_payment', NULL, NULL, 'salary_payment', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('84', '12', 'add_expense_item', NULL, NULL, 'add_expense_item', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('85', '12', 'manage_expense_item', NULL, NULL, 'manage_expense_item', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('86', '12', 'add_expense', NULL, NULL, 'add_expense', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('87', '12', 'manage_expense', NULL, NULL, 'manage_expense', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('88', '12', 'expense_statement', NULL, NULL, 'expense_statement', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('89', '12', 'add_person_officeloan', NULL, NULL, 'add1_person', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('90', '12', 'add_loan_officeloan', NULL, NULL, 'add_office_loan', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('91', '12', 'add_payment_officeloan', NULL, NULL, 'add_loan_payment', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('92', '12', 'manage_loan_officeloan', NULL, NULL, 'manage1_person', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('93', '12', 'add_person_personalloan', NULL, NULL, 'add_person', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('94', '12', 'add_loan_personalloan', NULL, NULL, 'add_loan', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('95', '12', 'add_payment_personalloan', NULL, NULL, 'add_payment', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('96', '12', 'manage_loan_personalloan', NULL, NULL, 'manage_person', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('97', '13', 'add_service', NULL, NULL, 'create_service', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('98', '13', 'manage_service', NULL, NULL, 'manage_service', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('99', '13', 'service_invoice', NULL, NULL, 'service_invoice', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('100', '13', 'manage_service_invoice', NULL, NULL, 'manage_service_invoice', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('102', '15', 'manage_company', NULL, NULL, 'manage_company', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('103', '15', 'add_user', NULL, NULL, 'add_user', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('104', '15', 'manage_users', NULL, NULL, 'manage_user', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('105', '15', 'language', NULL, NULL, 'add_language', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('106', '15', 'currency', NULL, NULL, 'add_currency', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('107', '15', 'setting', NULL, NULL, 'soft_setting', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('108', '15', 'print_setting', NULL, NULL, 'print_setting', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('109', '15', 'mail_setting', NULL, NULL, 'mail_setting', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('110', '15', 'add_role', NULL, NULL, 'add_role', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('111', '15', 'role_list', NULL, NULL, 'role_list', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('112', '15', 'user_assign_role', NULL, NULL, 'user_assign', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('113', '15', 'Permission', NULL, NULL, NULL, '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('114', '15', 'sms_configure', NULL, NULL, 'sms_configure', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('115', '15', 'backup_restore', NULL, NULL, 'back_up', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('116', '15', 'import', NULL, NULL, 'sql_import', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('117', '15', 'restore', NULL, NULL, 'restore', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('118', '16', 'add_quotation', NULL, NULL, 'add_quotation', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('119', '16', 'manage_quotation', NULL, NULL, 'manage_quotation', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('120', '16', 'add_to_invoice', NULL, NULL, 'add_to_invoice', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('121', '1', 'terms_list', NULL, NULL, 'terms_list', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('122', '1', 'terms_add', NULL, NULL, 'terms_add', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('123', '9', 'service_payment', NULL, NULL, 'service_payment', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('124', '11', 'vat_tax_setting', NULL, NULL, 'vat_tax_setting', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('125', '9', 'add_payment_method', NULL, NULL, 'add_payment_method', '1');
INSERT INTO `sub_module` (`id`, `mid`, `name`, `description`, `image`, `directory`, `status`) VALUES ('126', '9', 'payment_method_list', NULL, NULL, 'payment_method_list', '1');


#
# TABLE STRUCTURE FOR: supplier_information
#

DROP TABLE IF EXISTS `supplier_information`;

CREATE TABLE `supplier_information` (
  `supplier_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `address2` text NOT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `emailnumber` varchar(200) DEFAULT NULL,
  `email_address` varchar(200) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `city` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `country` varchar(250) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`supplier_id`),
  KEY `supplier_id` (`supplier_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `supplier_information` (`supplier_id`, `supplier_name`, `address`, `address2`, `mobile`, `emailnumber`, `email_address`, `contact`, `phone`, `fax`, `city`, `state`, `zip`, `country`, `details`, `status`) VALUES ('1', 'justin', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '1');


#
# TABLE STRUCTURE FOR: supplier_product
#

DROP TABLE IF EXISTS `supplier_product`;

CREATE TABLE `supplier_product` (
  `supplier_pr_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(30) CHARACTER SET utf8 NOT NULL,
  `products_model` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `supplier_id` bigint(20) NOT NULL,
  `supplier_price` float DEFAULT NULL,
  PRIMARY KEY (`supplier_pr_id`),
  KEY `product_id` (`product_id`),
  KEY `supplier_id` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `supplier_product` (`supplier_pr_id`, `product_id`, `products_model`, `supplier_id`, `supplier_price`) VALUES ('1', '65020469', 'new', '1', '800');
INSERT INTO `supplier_product` (`supplier_pr_id`, `product_id`, `products_model`, `supplier_id`, `supplier_price`) VALUES ('2', '15339253', 'BL', '1', '450');


#
# TABLE STRUCTURE FOR: synchronizer_setting
#

DROP TABLE IF EXISTS `synchronizer_setting`;

CREATE TABLE `synchronizer_setting` (
  `id` int(11) NOT NULL,
  `hostname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `port` varchar(10) NOT NULL,
  `debug` varchar(10) NOT NULL,
  `project_root` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: tax_collection
#

DROP TABLE IF EXISTS `tax_collection`;

CREATE TABLE `tax_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `customer_id` varchar(30) NOT NULL,
  `relation_id` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: tax_settings
#

DROP TABLE IF EXISTS `tax_settings`;

CREATE TABLE `tax_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `default_value` float NOT NULL,
  `tax_name` varchar(250) NOT NULL,
  `nt` int(11) NOT NULL,
  `reg_no` varchar(100) NOT NULL,
  `is_show` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: units
#

DROP TABLE IF EXISTS `units`;

CREATE TABLE `units` (
  `unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

INSERT INTO `units` (`unit_id`, `unit_name`, `status`) VALUES ('3', 'PCS', '1');


#
# TABLE STRUCTURE FOR: user_login
#

DROP TABLE IF EXISTS `user_login`;

CREATE TABLE `user_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(15) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  `security_code` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `user_login` (`id`, `user_id`, `username`, `password`, `user_type`, `security_code`, `status`) VALUES ('1', '1', 'admin@example.com', '41d99b369894eb1ec3f461135132d8bb', '1', NULL, '1');


#
# TABLE STRUCTURE FOR: users
#

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(15) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `logo` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `user_id`, `last_name`, `first_name`, `company_name`, `address`, `phone`, `gender`, `date_of_birth`, `logo`, `status`) VALUES ('1', '1', 'User', 'Admin', NULL, NULL, NULL, NULL, NULL, 'assets/dist/img/profile_picture/profile.jpg', '1');


#
# TABLE STRUCTURE FOR: vat_tax_setting
#

DROP TABLE IF EXISTS `vat_tax_setting`;

CREATE TABLE `vat_tax_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dynamic_tax` int(11) NOT NULL DEFAULT 0,
  `fixed_tax` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `vat_tax_setting` (`id`, `dynamic_tax`, `fixed_tax`) VALUES ('1', '0', '1');


#
# TABLE STRUCTURE FOR: web_setting
#

DROP TABLE IF EXISTS `web_setting`;

CREATE TABLE `web_setting` (
  `setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) DEFAULT NULL,
  `invoice_logo` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `timezone` varchar(150) NOT NULL,
  `currency_position` varchar(10) DEFAULT NULL,
  `footer_text` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `rtr` varchar(255) DEFAULT NULL,
  `captcha` int(11) DEFAULT 1 COMMENT '0=active,1=inactive',
  `is_qr` int(11) NOT NULL,
  `site_key` varchar(250) DEFAULT NULL,
  `secret_key` varchar(250) DEFAULT NULL,
  `discount_type` int(11) DEFAULT 1,
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `web_setting` (`setting_id`, `logo`, `invoice_logo`, `favicon`, `currency`, `timezone`, `currency_position`, `footer_text`, `language`, `rtr`, `captcha`, `is_qr`, `site_key`, `secret_key`, `discount_type`) VALUES ('1', '', '', '', '$', 'Asia/Dhaka', '0', 'Developed by  Bdtask', 'english', '0', '1', '1', '6LdiKhsUAAAAAMV4jQRmNYdZy2kXEuFe1HrdP5tt', '6LdiKhsUAAAAAMV4jQRmNYdZy2kXEuFe1HrdP5tt', '1');


