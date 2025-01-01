import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 12,
        label: 'ACCOUNTS',
        icon: 'bx-store',
        subItems: [

            {
                id: 21, label: 'Reports', link: '/ecommerce/tblStationaryReceipt', parentId: 12,
                subItems: [
                    { id: 21, label: 'Cash Book', link: '/ecommerce/Cash-Book', parentId: 12 },
                    { id: 21, label: 'Ledger', link: '/ecommerce/Ledger', parentId: 12 },
                    { id: 21, label: 'Trial Balance', link: '/ecommerce/Trial-Balance', parentId: 12 },
                    { id: 21, label: 'Voucher Printing', link: '/ecommerce/Voucher-Printing', parentId: 12 },
                    { id: 21, label: 'Balance Sheet', link: '/ecommerce/Balance-Sheet', parentId: 12 },
                    { id: 21, label: 'Cash In Hand Summary', link: '/ecommerce/Cash-In-Hand-Summary', parentId: 12 },
                
                ]
            },
            {
                id: 21, label: 'Reconcilation', link: '/ecommerce/tblStationaryReceipt', parentId: 12,
                subItems: [
                   
                ]
            },
            {
                id: 21, label: 'TDS Reports', link: '/ecommerce/tblStationaryReceipt', parentId: 12,
                subItems: [
                    { id: 21, label: 'TblStationaryOrder', link: '/ecommerce/tblStationaryOrder', parentId: 12 },
                ]
            },
            {
                id: 21, label: 'Depreciation', link: '/ecommerce/tblStationaryReceipt', parentId: 12,
                subItems: [
                    { id: 21, label: 'TblStationaryOrder', link: '/ecommerce/tblStationaryOrder', parentId: 12 },
                ]
            },
           
        ]
    },

    {
        id: 12,
        label: 'ATTENDANCE',
        icon: 'bx-store',
        subItems: [
           // { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },
    {
        id: 12,
        label: 'CLAIM',
        icon: 'bx-store',
        subItems: [
         //   { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },
    {
        id: 12,
        label: 'DAAK',
        icon: 'bx-store',
        subItems: [
            //{ id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },
    
   
    {
        id: 12,
        label: 'DAILY REPORTS',
        icon: 'bx-store',
        subItems: [
            {
                id: 21, label: 'Attendance', link: '/ecommerce/Attendance', parentId: 12,
                subItems: [
                   
                
                ]
            },
        ]
    },
    {
        id: 12,
        label: 'ENQUIRY',
        icon: 'bx-store',
        subItems: [
         //   { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },

    {
        id: 12,
        label: 'FINANCE',
        icon: 'bx-store',
        subItems: [
           // { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },

    {
        id: 12,
        label: 'FREIGHT',
        icon: 'bx-store',
        subItems: [
            { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },
    {
        id: 12,
        label: 'LETTER',
        icon: 'bx-store',
        subItems: [
            { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },
    {
        id: 12,
        label: 'MARKETING',
        icon: 'bx-store',
        subItems: [
            { id: 21, label: 'TBL_BRANCH_MASTER', link: '/master/TBL_BRANCH_MASTER', parentId: 12 },
        ]
    },
    {
        id: 12,
        label: 'MASTER',
        icon: 'bx-store',
        subItems: [


            { id: 21, label: 'BRANCH MASTER', link: '/master/branch-master', parentId: 12 },
            // { id: 21, label: 'TBL_ACCOUNT_GROUP_MASTER', link: '/master/TBL_ACCOUNT_GROUP_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_ACCOUNT_MASTER', link: '/master/TBL_ACCOUNT_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_ACCOUNT_SUB_GROUP_MASTER', link: '/master/TBL_ACCOUNT_SUB_GROUP_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_BROKER_MASTER', link: '/master/TBL_BROKER_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_CHARGE_MASTER', link: '/master/TBL_CHARGE_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_CONTRACT_MASTER', link: '/master/TBL_CONTRACT_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_DRIVER_MASTER', link: '/master/TBL_DRIVER_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_FINANCE_BANK_MASTER', link: '/master/TBL_FINANCE_BANK_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_FINANCE_CARD_MASTER', link: '/master/TBL_FINANCE_CARD_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_FINANCE_FUND_MASTER', link: '/master/TBL_FINANCE_FUND_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_FINANCE_IFSC_CODE_MASTER', link: '/master/TBL_FINANCE_IFSC_CODE_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_GROUP_MASTER', link: '/master/TBL_GROUP_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_HR_EMPLOYEE_MASTER', link: '/master/TBL_HR_EMPLOYEE_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_HR_HOLIDAY_MASTER', link: '/master/TBL_HR_HOLIDAY_MASTER', parentId: 12 },

            // { id: 21, label: 'TBL_HR_LOAN_MASTER', link: '/master/TBL_HR_LOAN_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_ITEM_GROUP_MASTER', link: '/master/TBL_ITEM_GROUP_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_ITEM_MASTER', link: '/master/TBL_ITEM_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_MISC_BROKER_MASTER', link: '/master/TBL_MISC_BROKER_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_MISC_COLLECTIONER_MASTER', link: '/master/TBL_MISC_COLLECTIONER_MASTER', parentId: 12 },
            // { id: 21, label: 'TBL_MISC_GARDEN_MASTER', link: '/master/TBL_MISC_GARDEN_MASTER', parentId: 12 },

// {  id: 21, label: 'TBL_MISC_WARE_HOUSE_MASTER',link:'/master/TBL_MISC_WARE_HOUSE_MASTER',parentId: 12 },
// {  id: 21, label: 'TBL_MODULE_DETAILS_MASTER',link:'/master/TBL_MODULE_DETAILS_MASTER',parentId: 12 },
{  id: 21, label: 'TBL_PARTY_MASTER',link:'/master/TBL_PARTY_MASTER',parentId: 12 },
//{  id: 21, label: 'TBL_PARTY_REGISTRATION_MASTER',link:'/master/TBL_PARTY_REGISTRATION_MASTER',parentId: 12 },

// {  id: 21, label: 'TBL_RENT_MASTER',link:'/master/TBL_RENT_MASTER',parentId: 12 },
// {  id: 21, label: 'TBL_STATE_MASTER',link:'/master/TBL_STATE_MASTER',parentId: 12 },
{  id: 21, label: 'TBL_STATION_MASTER',link:'/master/TBL_STATION_MASTER',parentId: 12 },
// {  id: 21, label: 'TBL_STATIONARY_ISSUE_MASTER',link:'/master/TBL_STATIONARY_ISSUE_MASTER',parentId: 12 },

// {  id: 21, label: 'TBL_STATIONARY_MASTER',link:'/master/TBL_STATIONARY_MASTER',parentId: 12 },
// {  id: 21, label: 'TBL_TRANSIT_TIME_MASTER',link:'/master/TBL_TRANSIT_TIME_MASTER',parentId: 12 },
// {  id: 21, label: 'TBL_TRUCK_GROUP_MASTER',link:'/master/TBL_TRUCK_GROUP_MASTER',parentId: 12 },
// {  id: 21, label: 'TBL_TRUCK_MASTER',link:'/master/TBL_TRUCK_MASTER',parentId: 12 },

// {  id: 21, label: 'TBL_USER_MASTER',link:'/master/TBL_USER_MASTER',parentId: 12 },
// {  id: 21, label: 'TblAccMaster',link:'/master/TblAccMaster',parentId: 12 },
   ]          
    },
  



];

