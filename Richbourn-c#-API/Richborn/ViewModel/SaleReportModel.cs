using System;
using System.Collections.Generic;

namespace Richborn.ViewModel
{
    
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string GSTNo { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Pincode { get; set; }
    }

    public class SaleReportModel
    {
        public int SlNo { get; set; }
        public string BillType { get; set; }
        public int PartyID { get; set; }
        public int LocationID { get; set; }
        public double DiscAmt { get; set; }
        public double RndOffAmt { get; set; }
        public double NetAmt { get; set; }
        public double DiscPer1 { get; set; }
        public double AmtAdjusted { get; set; }
        public string WayBillNo { get; set; }
        public string CNNo { get; set; }
        public string Printed { get; set; }
        public string InvNo { get; set; }
        public string BillAdd1 { get; set; }
        public string DelvAdd1 { get; set; }
        public string TransporterName { get; set; }
        public int TotalPcs { get; set; }
        public double GrossAmt { get; set; }
        public string OtherChargeDesc1 { get; set; }
        public double OtherChargeAmt1 { get; set; }
        public string OtherChargeDesc2 { get; set; }
        public double OtherChargeAmt2 { get; set; }
        public string OtherChargeDesc3 { get; set; }
        public double OtherChargeAmt3 { get; set; }
        public string Remarks { get; set; }
        public string PartyName { get; set; }
        public string TaxName { get; set; }
        public double RcvAmt { get; set; }
        public string InvDate { get; set; }
        public string DueDate { get; set; }
        public string party_address { get; set; }
        public string party_mobile { get; set; }
        public string party_gst_no { get; set; }
        public List<UsersDetail> usersDetails { get; set; }
        public List<Company> company { get; set; }
    }

    public class UsersDetail
    {
        public string ProdCode { get; set; }
        public string ProdCate { get; set; }
        public string HSNCode { get; set; }
        public double MRP { get; set; }
        public double Discount { get; set; }
        public int Qty { get; set; }
        public double Rate { get; set; }
        public double Amt { get; set; }
    }

}
