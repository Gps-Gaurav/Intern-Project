<!-- Customer js php -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/json/customer.js.php" ></script>
<!-- Product invoice js -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/json/product_invoice.js.php" ></script>
<!-- Invoice js -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/pos_invoice.js" type="text/javascript"></script>

<!-- Add new invoice start -->
<style>
    #bank_info_hide
    {
        display:none;
    }
    #payment_from_2
    {
        display:none;
    }       

    .fixedclasspos {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    left: 50px;
    z-index: 999;
    padding: 10px 30px;
    border-top: 1px solid #e0e0e0;
}
.cusbtn {
    font-size: 28px;
    padding: 12px 15px;
}
.pointer {cursor: pointer;}
.navbar-search .input-group .form-control {
    border-width: 2px;
    border-style: solid;
    border-right: 0;
    border-color: #37a000;
    height: 57px;
}
.input-group-addon, .input-group-btn {
    width: 20%;
    white-space: nowrap;
    vertical-align: middle;
}
.input-group-btn:last-child>.btn, .input-group-btn:last-child>.btn-group {
    z-index: 2;
    margin-left: -1px;
}
.navbar-search .input-group .btn {
    border-width: 2px;
    border-style: solid;
    border-left: 0;
    color: #fff;
    background-color: #37a000;
    padding: 12px 30px;
    font-size: 18px;
    height: 57px;
    /* border-radius: 25px; */
}
h1 .srcalrt{
    color: red;
    text-align: center;
}

.navbar-search {
    width: 75%;
    margin: 0 auto 20px;
}
.screen-reader-text {
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
}
.navbar-search > .input-group {
    width: 100%;
}
.navbar-search .form-control {
    background: #fff;
    line-height: 1.34em;
    padding: 1.01em 15px;
    border-radius: 2px;

}
.navbar-search .input-group .form-control {
    border-width: 2px;
    border-style: solid;
    border-right: 0;
    border-color: #37a000;
    height: 57px;
}
.navbar-search .input-group .input-group-addon {

    border: solid #37a000;
    border-width: 2px 0;
    background-color: #fff;
}

.navbar-search .search-categories > select {
    color: #999;
    padding: 0 1.75rem 0 .75rem;
    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAMAAACzvE1FAAAADFBMVEUzMzMzMzMzMzMzMzMKAG/3AAAAA3RSTlMAf4C/aSLHAAAAPElEQVR42q3NMQ4AIAgEQTn//2cLdRKppSGzBYwzVXvznNWs8C58CiussPJj8h6NwgorrKRdTvuV9v16Afn0AYFOB7aYAAAAAElFTkSuQmCC) no-repeat right 0.75rem center;
    background-size: 8px 10px;
    border: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 150px;
}
.navbar-search .input-group .btn {
    border-width: 2px;
    border-style: solid;
    border-left: 0;
    color: #fff;
    background-color: #37a000;
    padding: 12px 30px;
    font-size: 18px;
    height: 57px;
    /*border-radius: 25px;*/
}
.navbar-search  .input-group-btn:last-child > .btn{
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

/*---------- Product -----------*/

.product-panel {
    margin-bottom:  6px;
    cursor: pointer;
}
.product-panel .panel-body{
    padding: 8px;
}
.product-panel img{
    width: 100%;
    height: 100px;
}
.product-panel .panel-footer {
    background-color: #f7f9fa;
    border-top: 1px solid #e1e6ef;
    padding: 8px;
    font-weight: 600;
    font-size: 13px;
    min-height: 58px;
}
.actives .panel-footer{
    background-color: #37a000;
    color: #fff;
}
.actives{
    border: 1px solid #37a000;
}

.col-form-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
}
.select2-container--default .select2-selection--single {
    border-radius: 0;
    box-shadow: none;
    border: 1px solid #e4e5e7;
    height: 34px;
}
.select2-container--default .select2-selection--single .select2-selection__rendered {
    line-height: 32px;
}
.footer{
    margin-left: 250px;
}
.table thead tr th {border-bottom: 1px solid #e4e5e7; text-align: center; font-weight: bold;}
 .hiddenRow {
  display: none;
}
/*calculator css*/
header {
    letter-spacing: 6px;
    font-size: 14px;
}

table {
    width: 100%;
}

button {
    width: 100%;
    height: 50px;
    font-size: 18px;
}



.screen {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #2d2929;
    color: white;
    text-align: right;
    
}
#mainScreen{
 font-family:sans-serif;   
}

</style>


<!-- Customer type change by javascript end -->

<!-- Add New Invoice Start -->
<div class="content-wrapper">
    <section class="content-header">
        <div class="header-icon">
            <i class="pe-7s-note2"></i>
        </div>
        <div class="header-title">
            <h1><?php echo display('new_pos_invoice') ?></h1>
            <small><?php echo display('add_new_pos_invoice') ?></small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#"><?php echo display('Invoice') ?></a></li>
                <li class="active"><?php echo display('new_pos_invoice') ?></li>
            </ol>
        </div>
    </section>

    <section class="content">

        <!-- Alert Message -->
        <?php
        $message = $this->session->userdata('message');
        if (isset($message)) {
            ?>
            <div class="alert alert-info alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <?php echo $message ?>                    
            </div>
            <?php
            $this->session->unset_userdata('message');
        }
        $error_message = $this->session->userdata('error_message');
        if (isset($error_message)) {
            ?>
            <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <?php echo $error_message ?>                    
            </div>
            <?php
            $this->session->unset_userdata('error_message');
        }
        ?>


     <div class="row">
            
                <div class="panel panel-default">
                    <div class="panel-body"> 
                         <input name="url" type="hidden" id="posurl" value="<?php echo base_url("Cinvoice/getitemlist") ?>" />
                        <div class="col-md-6">
                                      <form class="navbar-search" method="get" action="<?php echo base_url("ordermanage/order/pos_invoice")?>">
                    <label class="sr-only screen-reader-text" for="search">Search:</label>
                    <div class="input-group">
                        <input type="text" id="product_name" class="form-control search-field" dir="ltr" value="" name="s" placeholder="Search By Product" />

                        <div class="input-group-addon search-categories">
                        <?php 
                        if(empty($categorylist)){$categorylist = array('' => '--Select--');}
                        echo form_dropdown('category_id',$categorylist,(!empty($categorylist->CategoryID)?$categorylist->CategoryID:null),'class="postform resizeselect form-control" id="category_id"') ?>
                        </div>
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-secondary" id="search_button"><i class="ti-search"></i></button>
                        </div>
                    </div>
                </form>
            <div class="product-grid"  style="overflow:scroll; height:400px;">
                    <div class="row row-m-3" id="product_search">
                    <?php $i=0;
                    foreach($itemlist as $item){
                        
                        ?>
                            <div class="col-xs-6 col-sm-4 col-md-4 col-p-4">
                            <div class="panel panel-bd product-panel select_product">
                                <div class="panel-body">
                                    <img src="<?php echo !empty($item->image)?$item->image:'assets/img/icons/default.jpg'; ?>" class="img-responsive pointer" onclick="onselectimage(<?php echo $item->product_id ?>)" alt="<?php echo $item->product_name;?>">
                                </div>
                                <div class="panel-footer"><?php echo $item->product_name;?> (<?php echo $item->product_model;?>)</div>
                            </div>
                        </div>
                       <?php } ?>
                                        </div>
                </div>
                </div>
                <div class="col-md-6"> 
                    
                   
           <div class="form-group">
       <input type="text" name="product_name" class="form-control bq" placeholder='<?php echo display('barcode_qrcode_scan_here') ?>' id="add_item" autocomplete='off' tabindex="1" value="">
        <div class="col-sm-2 grandtxt">&nbsp;</div>
       <input type="text" name="product_name_m" class="form-control bq" placeholder='Manual Input barcode' id="add_item_m" autocomplete='off' tabindex="1" value="">
 <input type="hidden" id="product_value" name="">
 <div class="col-sm-2 grandtxt">&nbsp;</div>
   <?php echo form_open_multipart('Cinvoice/manual_sales_insert', array('class' => 'form-vertical', 'id' => 'gui_sale_insert', 'name' => 'insert_pos_invoice')) ?>
   <input type="text" size="100"  name="customer_name" class="customerSelection form-control" placeholder='<?php echo display('customer_name').'/'.display('phone') ?>' id="customer_name" value="{customer_name}" tabindex="3"  onkeyup="customer_autocomplete()"/>

                                        <input id="autocomplete_customer_id" class="customer_hidden_value" type="hidden" name="customer_id" value="{customer_id}">
                                          <a href="#" class="client-add-btn" aria-hidden="true" data-toggle="modal" data-target="#cust_info"><i class="ti-plus m-r-2"></i>New Customer </a>
                                        <?php
                                        if (empty($customer_name)) {
                                            ?>
                                            <small id="emailHelp" class="text-danger"><?php echo display('please_add_walking_customer_for_default_customer') ?></small>
                                            <?php
                                        }
                                        ?>
         
          <div class="table-responsive" style="margin-top: 10px">
                            <table class="table table-bordered table-hover" id="addinvoice">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 220px"><?php echo display('item_information') ?> <i class="text-danger">*</i></th>
                                        <th class="text-center"><?php echo display('sl') ?></th>
                                        <th class="text-center"><?php echo display('available_qnty') ?></th>
                                      
                                        <th class="text-center"><?php echo display('quantity') ?> <i class="text-danger">*</i></th>
                                        <th class="text-center"><?php echo display('rate') ?> <i class="text-danger">*</i></th>
                                        <?php if ($discount_type == 1) { ?>
                                            <th class="text-center"><?php echo display('discount_percentage') ?> %</th>
                                        <?php } elseif ($discount_type == 2) { ?>
                                            <th class="text-center"><?php echo display('discount') ?> </th>
                                        <?php } elseif ($discount_type == 3) { ?>
                                            <th class="text-center"><?php echo display('fixed_dis') ?> </th>
                                        <?php } ?>
                                        <th class="text-center"><?php echo display('total') ?></th>
                                        <th class="text-center"><?php echo display('action') ?></th>
                                    </tr>
                                </thead>
                                <tbody id="addinvoiceItem">
                                    <tr></tr>
                                </tbody>
                          
                            </table>

                        </div>
                        <div class="footer">
                               <div class="form-group row" style="margin-bottom:0px;">
                                     <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('invoice_discount') ?>:</label><div class="col-sm-5"> <input type="text" onkeyup="quantity_calculate(1);"  onchange="quantity_calculate(1);" id="invoice_discount" class="form-control text-right" name="invoice_discount" placeholder="0.00"  />
                                            <input type="hidden" id="txfieldnum" value="{taxnumber}">
                                    <input type="hidden" name="paytype" value="1">
                                            </div></div>
                                    <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('total_discount') ?>:</label><div class="col-sm-5"> <input type="text" id="total_discount_ammount" class="form-control text-right" name="total_discount" value="0.00" readonly="readonly" /></div></div> 
                                        </div> 
                                <div class="form-group row hiddenRow" style="margin-bottom:0px;" id="taxdetails">
                                         <?php $x=0;
                                     foreach($taxes as $taxfldt){?>

                               <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo $taxfldt['tax_name'] ?>:</label><div class="col-sm-5">    <input id="total_tax_ammount<?php echo $x;?>" tabindex="-1" class="form-control text-right valid totalTax" name="total_tax<?php echo $x;?>" value="0.00" readonly="readonly" aria-invalid="false" type="text">
                                             
                                            </div>
                                        </div> 
                                    
                            <?php $x++;}?>

                                    </div>
                                        <div class="form-group row" style="margin-bottom:0px;">
                                            
                                              <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('total_tax') ?>:</label><div class="col-sm-5">    <input id="total_tax_amount" tabindex="-1" class="form-control text-right valid" name="total_tax" value="0.00" readonly="readonly" aria-invalid="false" type="text">
                                            </div> <a class="col-sm-2 btn btn-primary taxbutton" href="#" data-toggle="collapse" data-target="#taxdetails" aria-expanded="false" aria-controls="taxdetails"><i class="fa fa-angle-double-up"></i></a>
                                        </div> 
                                            <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo 'Shipping Cost' ?>:</label><div class="col-sm-5">  <input type="text" id="shipping_cost" class="form-control text-right" name="shipping_cost" onkeyup="quantity_calculate(1);"  onchange="quantity_calculate(1);"  placeholder="0.00"  /></div></div>
                                            
                                        </div> 
                                        <div class="form-group row" style="margin-bottom:0px;">
                                            <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('grand_total') ?>:</label><div class="col-sm-5">  <input type="text" id="grandTotal" class="form-control text-right" name="grand_total_price" value="0.00" readonly="readonly" /></div></div> 
                                            <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('previous'); ?>:</label><div class="col-sm-5">  <input type="text" id="previous" class="form-control text-right" name="previous" value="0.00" readonly="readonly" /></div></div>
                                            
                                        </div> 
                                        <div class="form-group row" style="margin-bottom:0px;">
                                            <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('net_total'); ?>:</label><div class="col-sm-5">  <input type="text" id="n_total" class="form-control text-right" name="n_total" value="0" readonly="readonly" placeholder="" />
                                        <input type="hidden" name="baseUrl" class="baseUrl" value="<?php echo base_url(); ?>" id="baseurl"/>
                                            </div></div> 
                                            <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('paid_ammount') ?>:</label><div class="col-sm-5"> <input type="text" id="paidAmount" 
                                               onkeyup="invoice_paidamount();" class="form-control text-right" name="paid_amount" placeholder="0.00" tabindex="13"/></div></div>
                                            
                                        </div> 
                                        <div class="form-group row" style="margin-bottom:0px;">
                                            <div class="col-sm-12"> <label for="date" class="col-sm-5 col-form-label"><?php echo display('due') ?>:</label><div class="col-sm-5">  <input type="text" id="dueAmmount" class="form-control text-right" name="due_amount" value="0.00" readonly="readonly"/></div></div> 

                                        </div> 
                                    </div>
                        </div>




               
                </div>
                          <div class="fixedclasspos">
                            <div class="paymentpart text-center"><span  class="btn btn-warning "><i class="fa fa-angle-double-down"></i></span></div>
                        <div class="bottomarea">
                                 <div class="row">
                                    <div class="col-sm-7">
                                    <div class="col-sm-12">
                                      
                                      <a href="#" class="btn btn-info" data-toggle="modal" data-target="#calculator"><i class="fa fa-calculator" aria-hidden="true"></i> Calculator</a> 

                                    </div>
                                    </div>
                                    <div class="col-sm-5 text-center">
                                  <input type="button" id="full_paid_tab" class="btn btn-warning" value="<?php echo display('full_paid') ?>" tabindex="14" onClick="full_paid()"/>
                                        <input type="submit" id="add_invoice" class="btn btn-success btn-large" name="add_invoice" value="Save Sale">
                                    </div>
                                 </div>
                            </div>
                    </div>
          
                </div>
                <?php echo form_close() ?>
            </div>
            
                 
        </div>

    <div class="modal fade modal-success" id="cust_info" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            <h3 class="modal-title">Add Customer</h3>
                        </div>
                        
                        <div class="modal-body">
                            <div id="customeMessage" class="alert hide"></div>
                       <?php echo form_open('Cinvoice/instant_customer', array('class' => 'form-vertical', 'id' => 'newcustomer')) ?>
                    <div class="panel-body">

                        <div class="form-group row">
                            <label for="customer_name" class="col-sm-3 col-form-label"><?php echo display('customer_name') ?> <i class="text-danger">*</i></label>
                            <div class="col-sm-6">
                                <input class="form-control" name ="customer_name" id="" type="text" placeholder="<?php echo display('customer_name') ?>"  required="" tabindex="1">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-sm-3 col-form-label"><?php echo display('customer_email') ?></label>
                            <div class="col-sm-6">
                                <input class="form-control" name ="email" id="email" type="email" placeholder="<?php echo display('customer_email') ?>" tabindex="2"> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="mobile" class="col-sm-3 col-form-label"><?php echo display('customer_mobile') ?></label>
                            <div class="col-sm-6">
                                <input class="form-control" name ="mobile" id="mobile" type="text" placeholder="<?php echo display('customer_mobile') ?>" min="0" tabindex="3">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address " class="col-sm-3 col-form-label"><?php echo display('customer_address') ?></label>
                            <div class="col-sm-6">
                                <textarea class="form-control" name="address" id="address " rows="3" placeholder="<?php echo display('customer_address') ?>" tabindex="4"></textarea>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="previous_balance" class="col-sm-3 col-form-label"><?php echo display('previous_balance') ?></label>
                            <div class="col-sm-6">
                                <input class="form-control" name="previous_balance" id="previous_balance" type="text" placeholder="<?php echo display('previous_balance') ?>" tabindex="5">
                            </div>
                        </div>

                      
                    </div>
                    
                        </div>

                        <div class="modal-footer">
                            
                            <a href="#" class="btn btn-danger" data-dismiss="modal">Close</a>
                            
                            <input type="submit" class="btn btn-success" value="Submit">
                        </div>
                        <?php echo form_close() ?>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <!-- calculator modal -->
    <div class="modal fade" id="calculator" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <a href="#" class="close" data-dismiss="modal">&times;</a>
          <h4 class="modal-title">Calculate Your Problem</h4>
        </div>
        <div class="modal-body">
            <div class="calcontainer">
         <div class="screen">
      <h1 id="mainScreen">0</h1>
    </div>
    <table>
      <tr>
        <td><button value="7" id="7" onclick="InputSymbol(7)">7</button></td>
        <td><button value="8" id="8" onclick="InputSymbol(8)">8</button></td>
        <td><button value="9" id="9" onclick="InputSymbol(9)">9</button></td>
        <td><button onclick="DeleteLastSymbol()">c</button></td>
      </tr>
      <tr>
        <td><button value="4" id="4" onclick="InputSymbol(4)">4</button></td>
        <td><button value="5" id="5" onclick="InputSymbol(5)">5</button></td>
        <td><button value="6" id="6" onclick="InputSymbol(6)">6</button></td>
        <td><button value="/" id="104" onclick="InputSymbol(104)">/</button></td>
      </tr>
      <tr>
        <td><button value="1" id="1" onclick="InputSymbol(1)">1</button></td>
        <td><button value="2" id="2" onclick="InputSymbol(2)">2</button></td>
        <td><button value="3" id="3" onclick="InputSymbol(3)">3</button></td>
        <td><button value="*" id="103" onclick="InputSymbol(103)">*</button></td>
      </tr>
      <tr>
        <td><button value="0" id="0" onclick="InputSymbol(0)">0</button></td>
        <td><button value="." id="128" onclick="InputSymbol(128)">.</button></td>
        <td><button value="-" id="102" onclick="InputSymbol(102)">-</button></td>
        <td><button value="+" id="101" onclick="InputSymbol(101)">+</button></td>
      </tr>
      <tr>
        <td colspan="2"><button onclick="ClearScreen()">Clear</button></td>
        <td colspan="2"><button onclick="CalculateTotal()">=</button></td>
      </tr>
    </table>
</div>
        </div>
        <div class="modal-footer">
          
           <a href="#" class="btn btn-danger" data-dismiss="modal">close</a>
        </div>
      </div>
      
    </div>
  </div>


         <div id="detailsmodal" class="modal fade" role="dialog">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header" style="background-color:green;color:white">
                <a href="#" class="close" data-dismiss="modal">&times;</a>
                <strong><center> <?php echo display('product_details')?></center></strong>
            </div>
            <div class="modal-body">
           
   <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="panel panel-bd">
               
                <div class="panel-body"> 
             <span id="modalimg"></span><br>  
             <h4><?php echo display('product_name')?> :<span id="modal_productname"></span></h4>
            <h4><?php echo display('product_model')?> :<span id="modal_productmodel"></span></h4>
              <h4><?php echo display('price')?> :<span id="modal_productprice"></span></h4>
               <h4><?php echo display('unit')?> :<span id="modal_productunit"></span></h4>
             <h4><?php echo display('stock')?> :<span id="modal_productstock"></span></h4>
            
           

                </div>  
            </div>
        </div>
    </div>
             
    </div>
     
            </div>
            <div class="modal-footer">

            </div>

        </div>

    </div>


         <div class="modal fade" id="printconfirmodal" tabindex="-1" role="dialog" aria-labelledby="printconfirmodal" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
        <a href="" class="close" data-dismiss="modal" aria-hidden="true">&times;</a>
            <h4 class="modal-title" id="myModalLabel">Print</h4>
          </div>
          <div class="modal-body">
            <?php echo form_open('Cinvoice/pos_invoice_inserted_data_manual', array('class' => 'form-vertical', 'id' => '', 'name' => '')) ?>
            <div id="outputs" class="hide alert alert-danger"></div>
            <h3> Successfully Inserted </h3>
            <h4>Do You Want to Print ??</h4>
            <input type="hidden" name="invoice_id" id="inv_id">
          </div>
          <div class="modal-footer">
            <input type="button" name="" class="btn btn-default" data-dismiss="modal" value="No">
            <input type="submit" name="" class="btn btn-primary" id="yes" value="Yes">
            <?php echo form_close() ?>
          </div>
        </div>
      </div>
    </div>
    </section>
</div>
<script type="text/javascript">
$(document).ready(function(){

    $('#full_paid_tab').keydown(function(event) {
        if(event.keyCode == 13) {
 $('#add_invoice').trigger('click');
        }
    });
});
</script>
 <!-- =========================  ajax form submit and print preview =================== -->
 <script type="text/javascript">

     $(document).ready(function() {

   var frm = $("#gui_sale_insert");
    var output = $("#output");
    frm.on('submit', function(e) {
        e.preventDefault(); 
        $.ajax({
            url : $(this).attr('action'),
            method : $(this).attr('method'),
            dataType : 'json',
            data : frm.serialize(),
            success: function(data) 
            {
                if (data.status == true) {
                    output.empty().html(data.message).addClass('alert-success').removeClass('alert-danger').removeClass('hide');
                    $("#inv_id").val(data.invoice_id);
                  $('#printconfirmodal').modal('show');
                   if(data.status == true && event.keyCode == 13) {
        }
                } else {
                    output.empty().html(data.exception).addClass('alert-danger').removeClass('alert-success').removeClass('hide');
                }
            },
            error: function(xhr)
            {
                alert('failed!');
            }
        });
    });
     });

     $("#printconfirmodal").on('keydown', function ( e ) {
    var key = e.which || e.keyCode;
    if (key == 13) {
       $('#yes').trigger('click');
    }
});

</script>
<!-- POS Invoice Report End -->
 <script type="text/javascript">

    function customer_due(id){
        $.ajax({
            url: '<?php echo base_url('Cinvoice/previous')?>',
            type: 'post',
            data: {customer_id:id}, 
            success: function (msg){
                $("#previous").val(msg);
            },
            error: function (xhr, desc, err){
                 alert('failed');
            }
        });        
    }

    
</script>
<script type="text/javascript">

    //Onload filed select
    window.onload = function () {
        var text_input = document.getElementById('add_item');
        text_input.focus();
        text_input.select();

        $('body').addClass("sidebar-mini sidebar-collapse");
    }
    var barcodeScannerTimer;
    var barcodeString = '';
           $('#add_item_m').keydown(function (e) {
        if (e.keyCode == 13) {
            var product_id = $(this).val();
        var product_id = $(this).val();
        var exist = $("#SchoolHiddenId_" + product_id).val();
         var qty = $("#total_qntt_" + product_id).val();
         var add_qty = parseInt(qty)+1;
         if(product_id == exist){
            $("#total_qntt_" + product_id).val(add_qty);
           quantity_calculate(product_id);
            calculateSum();
            invoice_paidamount();
           document.getElementById('add_item_m').value = '';
           document.getElementById('add_item_m').focus();       
         }else{
            $.ajax({
                type: "post",
                async: false,
             url: '<?php echo base_url('Cinvoice/gui_pos_invoice') ?>',
                data: {product_id: product_id},
                success: function (data) {
                    if (data == false) {
                        alert('This Product Not Found !');
                        document.getElementById('add_item_m').value = '';
                        document.getElementById('add_item_m').focus();
                        quantity_calculate(product_id);
                         calculateSum();
                        invoice_paidamount();
                    } else {
                        $("#hidden_tr").css("display", "none");
                        document.getElementById('add_item_m').value = '';
                        document.getElementById('add_item_m').focus();
                        $('#addinvoice tbody').append(data);
                         quantity_calculate(product_id);
                        calculateSum();
                        invoice_paidamount();
                    }
                },
                error: function () {
                    alert('Request Failed, Please check your code and try again!');
                }
            });
        }
        }
    });


// capture barcode scanner input
$('#add_item').on('keypress', function (e) {
    barcodeString = barcodeString + String.fromCharCode(e.charCode);

    clearTimeout(barcodeScannerTimer);
    barcodeScannerTimer = setTimeout(function () {
        processBarcode();
    }, 300);
});

function processBarcode() {

    if (!isNaN(barcodeString) && barcodeString != '') {  
         var product_id = barcodeString;
         var exist = $("#SchoolHiddenId_" + product_id).val();
         var qty = $("#total_qntt_" + product_id).val();
         var add_qty = parseInt(qty)+1;
         if(product_id == exist){
            $("#total_qntt_" + product_id).val(add_qty);
           quantity_calculate(product_id);
            calculateSum();
            invoice_paidamount();
           document.getElementById('add_item').value = '';
           document.getElementById('add_item').focus();       
         }else{
            $.ajax({
                type: "post",
                async: false,
                url: '<?php echo base_url('Cinvoice/gui_pos_invoice') ?>',
                data: {product_id: product_id},
                success: function (data) {
                    if (data == false) {
                        alert('This Product Not Found !');
                        document.getElementById('add_item').value = '';
                        document.getElementById('add_item').focus();
                        quantity_calculate();
                         calculateSum(barcodeString);
                        invoice_paidamount();
                    } else {
                        $("#hidden_tr").css("display", "none");
                        document.getElementById('add_item').value = '';
                        document.getElementById('add_item').focus();
                        $('#addinvoice tbody').append(data);
                        calculateSum();
                        invoice_paidamount();
                    }
                },
                error: function () {
                    alert('Request Failed, Please check your code and try again!');
                }
            });
        }
    } else {
        alert('barcode is invalid: ' + barcodeString);
    }

    barcodeString = ''; // reset
}

 function onselectimage(id){
        var product_id = id;
         var exist = $("#SchoolHiddenId_" + product_id).val();
         var qty = $("#total_qntt_" + product_id).val();
         var add_qty = parseInt(qty)+1;
         if(product_id == exist){
            $("#total_qntt_" + product_id).val(add_qty);
           quantity_calculate(product_id);
            calculateSum();
            invoice_paidamount();
           document.getElementById('add_item').value = '';
           document.getElementById('add_item').focus();       
         }else{
            $.ajax({
                type: "post",
                async: false,
                url: '<?php echo base_url('Cinvoice/gui_pos_invoice') ?>',
                data: {product_id: product_id},
                success: function (data) {
                    if (data == false) {
                        alert('This Product Not Found !');
                        document.getElementById('add_item').value = '';
                        document.getElementById('add_item').focus();
                        quantity_calculate();
                         calculateSum(barcodeString);
                        invoice_paidamount();
                    } else {
                        $("#hidden_tr").css("display", "none");
                        document.getElementById('add_item').value = '';
                        document.getElementById('add_item').focus();
                        $('#addinvoice tbody').append(data);
                        calculateSum();
                        invoice_paidamount();
                    }
                },
                error: function () {
                    alert('Request Failed, Please check your code and try again!');
                }
            });
        }
    

 }




 $('body').on('keyup', '#product_name', function() {
        var product_name = $(this).val();
        var category_id = $('#category_id').val();
        var myurl= $('#posurl').val();
        $.ajax({
            type: "post",
            async: false,
            url: myurl,
            data: {product_name: product_name,category_id:category_id},
            success: function(data) {
                if (data == '420') {
                    $("#product_search").html('<h1 class"srcalrt">Product not found !</h1>');
                }else{
                    $("#product_search").html(data); 
                }
            },
            error: function() {
                alert('Request Failed, Please check your code and try again!');
            }
        });
    });

  $('body').on('change', '#category_id', function() {
        var product_name = $('#product_name').val();
        var category_id = $('#category_id').val();
        var myurl= $('#posurl').val();
        $.ajax({
            type: "post",
            async: false,
            url: myurl,
            data: {product_name: product_name,category_id:category_id},
            success: function(data) {
                if (data == '420') {
                    $("#product_search").html('<h1 class"srcalrt">Product not found !</h1>');
                }else{
                    $("#product_search").html(data); 
                }
            },
            error: function() {
                alert('Request Failed, Please check your code and try again!');
            }
        });
    }); 

        $('body').on('click', '#search_button', function() {
        var product_name = $('#product_name').val();
        var category_id = $('#category_id').val();
        var myurl= $('#posurl').val();
        $.ajax({
            type: "post",
            async: false,
            url: myurl,
            data: {product_name: product_name,category_id:category_id},
            success: function(data) {
                if (data == '420') {
                    $("#product_search").html('<h1 class"srcalrt text-center">Product not found !</h1>');
                }else{
                    $("#product_search").html(data); 
                }
            },
            error: function() {
                alert('Request Failed, Please check your code and try again!');
            }
        });
    });      
</script>
<script type="text/javascript">

function customer_autocomplete(sl) {

    var customer_id = $('#customer_id').val();
    // Auto complete
    var options = {
        minLength: 0,
        source: function( request, response ) {
            var customer_name = $('#customer_name').val();
         
        $.ajax( {
          url: "<?php echo base_url('Cinvoice/customer_autocomplete')?>",
          method: 'post',
          dataType: "json",
          data: {
            term: request.term,
            customer_id:customer_name,
          },
          success: function( data ) {
            response( data );

          }
        });
      },
       focus: function( event, ui ) {
           $(this).val(ui.item.label);
           return false;
       },
       select: function( event, ui ) {
            $(this).parent().parent().find("#autocomplete_customer_id").val(ui.item.value); 
            var customer_id          = ui.item.value;
            customer_due(customer_id);

            $(this).unbind("change");
            return false;
       }
   }

   $('body').on('keydown.autocomplete', '#customer_name', function() {
       $(this).autocomplete(options);
   });

}



function detailsmodal(productname,stock,model,unit,price,image){
    $("#detailsmodal").modal('show');
    var base_url = document.getElementById("baseurl").value;
    document.getElementById("modal_productname").innerHTML = productname;
    document.getElementById("modal_productstock").innerHTML = stock;
    document.getElementById("modal_productmodel").innerHTML = model;
    document.getElementById("modal_productunit").innerHTML = unit;
    document.getElementById("modal_productprice").innerHTML = price;
     document.getElementById("modalimg").innerHTML ='<img src="' + image + '" alt="image" style="width:100px; height:60px;" />';
}



$(".paymentpart").click(function () {

    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
        $header.html(function () {
            //change text based on condition
            return $content.is(":visible") ? "<span  class='btn btn-warning'><i class='fa fa-angle-double-down'></i></span>" : "<span  class='btn btn-warning'><i class='fa fa-angle-double-up'></i></span>";
        });
    });

});

$(document).ready(function() {
 $("#newcustomer").submit(function(e){
        e.preventDefault();
        var customeMessage   = $("#customeMessage");
        var customer_id      = $("#autocomplete_customer_id");
        var customer_name    = $("#customer_name");
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            dataType: 'json',
            data: $(this).serialize(),
            beforeSend: function()
            {
                customeMessage.removeClass('hide');
               
            },
            success: function(data)
            {
                if (data.status == true) {
                    customeMessage.addClass('alert-success').removeClass('alert-danger').html(data.message);
                    customer_id.val(data.customer_id);
                    customer_name.val(data.customer_name);
                     $("#cust_info").modal('hide');
                } else {
                    customeMessage.addClass('alert-danger').removeClass('alert-success').html(data.exception);
                }
            },
            error: function(xhr)
            {
                alert('failed!');
            }

        });

    });
 });
</script>
<script type="text/javascript">
    
    $(document).on('click', '.taxbutton', function(e) {
      var $this = $(this);
      var icon = $this.find('i');
      if (icon.hasClass('fa fa-angle-double-up')) {
        $this.find('i').removeClass('fa fa-angle-double-up').addClass('fa fa-angle-double-down');
      } else {
        $this.find('i').removeClass('fa fa-angle-double-down').addClass('fa fa-angle-double-up');
      }
    });
  
</script>
<!-- //calculator  script -->
<script type="text/javascript">
    var number = "",
  total = 0,
  regexp = /[0-9]/,
  mainScreen = document.getElementById("mainScreen");

function InputSymbol(num) {
  var cur = document.getElementById(num).value;
  var prev = number.slice(-1);
  // Do not allow 2 math operators in row
  if (!regexp.test(prev) && !regexp.test(cur)) {
    console.log("Two math operators not allowed after each other ;)");
    return;
  }
  number = number.concat(cur);
  mainScreen.innerHTML = number;
}

function CalculateTotal() {
  // Time for some EVAL magic
  total = (Math.round(eval(number) * 100) / 100);
  mainScreen.innerHTML = total;
}

function DeleteLastSymbol() {
  if (number) {
    number = number.slice(0, -1);
    mainScreen.innerHTML = number;
  }
  if (number.length === 0) {
    mainScreen.innerHTML = "0";
  }
}

function ClearScreen() {
  number = "";
  mainScreen.innerHTML = 0;
}
</script>
