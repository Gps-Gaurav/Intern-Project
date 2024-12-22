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
/*.bq:focus {
    box-shadow:0 0 0 10px green;
}*/
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

<!-- Customer type change by javascript start -->
<script type="text/javascript">
    function bank_info_show(payment_type)
    {
        if (payment_type.value == "1") {
            document.getElementById("bank_info_hide").style.display = "none";
        } else {
            document.getElementById("bank_info_hide").style.display = "block";
        }
    }

    function active_customer(status)
    {
        if (status == "payment_from_2") {
            document.getElementById("payment_from_2").style.display = "none";
            document.getElementById("payment_from_1").style.display = "block";
            document.getElementById("myRadioButton_2").checked = false;
            document.getElementById("myRadioButton_1").checked = true;
        } else {
            document.getElementById("payment_from_1").style.display = "none";
            document.getElementById("payment_from_2").style.display = "block";
            document.getElementById("myRadioButton_2").checked = false;
            document.getElementById("myRadioButton_1").checked = true;
        }
    }
</script>
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
            <div class="col-sm-12">
                <div class="column">
       <?php if($this->permission1->method('new_invoice','create')->access()){ ?>
                    <a href="<?php echo base_url('Cinvoice') ?>" class="btn btn-info m-b-5 m-r-2"><i class="ti-plus"> </i> <?php echo display('new_invoice') ?> </a>
                <?php }?>
<?php if($this->permission1->method('manage_invoice','read')->access()){ ?>
                    <a href="<?php echo base_url('Cinvoice/manage_invoice') ?>" class="btn btn-primary m-b-5 m-r-2"><i class="ti-align-justify"> </i>  <?php echo display('manage_invoice') ?> </a>
 <?php }?>
                </div>
            </div>
        </div>

        <!-- POS Invoice report -->
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-bd lobidrag">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <span class="text-left"><?php echo display('new_pos_invoice') ?></span><span class="text-right" style="float: right;">   </span>
                        </div>
                    </div>

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group row">
                                    <label for="add_item" class="col-sm-3 col-form-label"><?php echo display('barcode') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-6">
                                        <input type="text" name="product_name" class="form-control bq" placeholder='<?php echo display('barcode_qrcode_scan_here') ?>' id="add_item" autocomplete='off' tabindex="1" value="">
                                        <input type="hidden" id="product_value" name="">
                                    </div>
                                </div>
                            </div>
                              <div class="col-sm-6">
                                <div class="form-group row">
                                    <label for="add_item" class="col-sm-4 col-form-label"><?php echo display('barcode') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-8">
                                        <input type="text" name="product_name" class="form-control bq" placeholder='Manual Input barcode' id="add_item_m" autocomplete='off' tabindex="1" value="">
                                        <input type="hidden" id="product_value" name="">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <?php echo form_open_multipart('Cinvoice/manual_sales_insert', array('class' => 'form-vertical', 'id' => 'pos_sale_insert', 'name' => 'insert_pos_invoice')) ?>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group row">
                                    <label for="invoice_date" class="col-sm-3 col-form-label"><?php echo display('date') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-6">
                                        <?php
                                       
                                        $date = date('Y-m-d');
                                        ?>
                                        <input class="form-control" type="text" size="50" id="invoice_date" name="invoice_date" required value="<?php echo $date; ?>" tabindex="2" />
                                    </div>
                                </div>
                            </div>
                                <div class="col-sm-6" id="payment_from">
                                <div class="form-group row">
                                    <label for="payment_type" class="col-sm-4 col-form-label"><?php
                                        echo display('payment_type');
                                        ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-8">
                                        <select name="paytype" class="form-control" required="" onchange="bank_paymet(this.value)">
                                            <option value="1">Cash Payment</option>
                                            <option value="2">Bank Payment</option> 
                                        </select>
                                      

                                     
                                    </div>
                                 
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6" id="payment_from_1">
                                <div class="form-group row">
                                    <label for="customer_name1" class="col-sm-3 col-form-label"><?php echo display('customer_name').'/'.display('phone') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-6">
                                        <input type="text" size="100"  name="customer_name" class="customerSelection form-control" placeholder='<?php echo display('customer_name').'/'.display('phone') ?>' id="customer_name" value="{customer_name}" tabindex="3"  onkeyup="customer_autocomplete()"/>

                                        <input id="autocomplete_customer_id" class="customer_hidden_value" type="hidden" name="customer_id" value="{customer_id}">
                                        <?php
                                        if (empty($customer_name)) {
                                            ?>
                                            <small id="emailHelp" class="text-danger"><?php echo display('please_add_walking_customer_for_default_customer') ?></small>
                                            <?php
                                        }
                                        ?>
                                    </div>
                                     <?php if($this->permission1->method('add_customer','create')->access()){ ?>
                                    <div  class="col-sm-3">
                                        <input id="myRadioButton_1" type="button" onClick="active_customer('payment_from_1')" id="myRadioButton_1" class="btn btn-success checkbox_account" name="customer_confirm" checked="checked" value="<?php echo display('new_customer') ?> " tabindex="4">
                                    </div>
                                <?php } ?>
                                </div>
                            </div>

                            <div class="col-sm-6" id="payment_from_2">
                                <div class="form-group row">
                                    <label for="customer_name_others" class="col-sm-3 col-form-label"><?php echo display('customer_name') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-6">
                                        <input  autofill="off" type="text"  size="100" name="customer_name_others" placeholder='<?php echo display('customer_name') ?>' id="customer_name_others" class="form-control" tabindex="5"/>
                                    </div>

                                    <div  class="col-sm-3">
                                        <input  onClick="active_customer('payment_from_2')" type="button" id="myRadioButton_2" class="btn btn-success checkbox_account" name="customer_confirm_others" value="<?php echo display('old_customer') ?> ">
                                    </div>
                                </div>
                                        <div class="form-group row">
                                    <label for="customer_name_others_address" class="col-sm-3 col-form-label"><?php echo display('customer_mobile') ?></label>
                                    <div class="col-sm-6">
                                        <input type="text"  size="100" name="customer_mobile" class=" form-control" placeholder='<?php echo display('customer_mobile') ?>' id="customer_mobile" tabindex="6"/>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="customer_name_others_address" class="col-sm-3 col-form-label"><?php echo display('address') ?></label>
                                    <div class="col-sm-6">
                                        <input type="text"  size="100" name="customer_name_others_address" class=" form-control" placeholder='<?php echo display('address') ?>' id="customer_name_others_address" tabindex="6"/>
                                    </div>
                                </div> 
                            </div>
                                    <div class="col-sm-6" id="bank_div" style="display: none;">
                            <div class="form-group row">
                                <label for="bank" class="col-sm-4 col-form-label"><?php
                                    echo display('bank');
                                    ?> <i class="text-danger">*</i></label>
                                <div class="col-sm-8">
                                   <select name="bank_id" class="form-control"  id="bank_id">
                                        <option value="">Select Location</option>
                                        <?php foreach($bank_list as $bank){?>
                                            <option value="<?php echo $bank['bank_id']?>"><?php echo $bank['bank_name'];?></option>
                                        <?php }?>
                                    </select>
                                 
                                </div>
                             
                            </div>
                        </div>
                        </div>

                        <div class="table-responsive" style="margin-top: 10px">
                            <table class="table table-bordered table-hover" id="addinvoice">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 220px"><?php echo display('item_information') ?> <i class="text-danger">*</i></th>
                                         <th class="text-center"><?php echo display('item_description')?></th>
                                          <th class="text-center"><?php echo display('serial_no')?></th>
                                        <th class="text-center"><?php echo display('available_qnty') ?></th>
                                        <th class="text-center"><?php echo display('unit') ?></th>
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
                                   <tfoot>
                                     <tr>
                                        <td colspan="7" rowspan="2">
                                <center><label style="text-align:center;" for="details" class="  col-form-label"><?php echo display('invoice_details') ?></label></center>
                                <textarea name="inva_details" class="form-control" placeholder="<?php echo display('invoice_details') ?>"></textarea>
                                </td>
                                    <td style="text-align:right;" colspan="1"><b><?php echo display('invoice_discount') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" onkeyup="quantity_calculate(1);"  onchange="quantity_calculate(1);" id="invoice_discount" class="form-control text-right" name="invoice_discount" placeholder="0.00"  />
                                        <input type="hidden" id="txfieldnum" value="{taxnumber}">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align:right;" colspan="1"><b><?php echo display('total_discount') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="total_discount_ammount" class="form-control text-right" name="total_discount" value="0.00" readonly="readonly" />
                                    </td>
                                </tr>
                                    <?php $x=0;
                                     foreach($taxes as $taxfldt){?>
                                    <tr class="hideableRow hiddenRow">
                                       
                                <td style="text-align:right;" colspan="8"><b><?php echo $taxfldt['tax_name'] ?></b></td>
                                <td class="text-right">
                                    <input id="total_tax_ammount<?php echo $x;?>" tabindex="-1" class="form-control text-right valid totalTax" name="total_tax<?php echo $x;?>" value="0.00" readonly="readonly" aria-invalid="false" type="text">
                                </td>
                               
                               
                                 
                                </tr>
                            <?php $x++;}?>
                                 
                    <tr>
                                    <tr>
                                <td style="text-align:right;" colspan="8"><b><?php echo display('total_tax') ?>:</b></td>
                                <td class="text-right">
                                    <input id="total_tax_amount" tabindex="-1" class="form-control text-right valid" name="total_tax" value="0.00" readonly="readonly" aria-invalid="false" type="text">
                                </td>
                                 <td><a href="#" class="toggle btn btn-warning">
                <i class="fa fa-angle-double-down"></i>
              </a></td>
                                </tr>
                               
                                 <tr>
                                    <td style="text-align:right;" colspan="8"><b><?php echo display('shipping_cost') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="shipping_cost" class="form-control text-right" name="shipping_cost" onkeyup="quantity_calculate(1);"  onchange="quantity_calculate(1);"  placeholder="0.00"  />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="8"  style="text-align:right;"><b><?php echo display('grand_total') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="grandTotal" class="form-control text-right" name="grand_total_price" value="0.00" readonly="readonly" />
                                    </td>
                                </tr>
                                 <tr>
                                    <td colspan="8"  style="text-align:right;"><b><?php echo display('previous'); ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="previous" class="form-control text-right" name="previous" value="0.00" readonly="readonly" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="8"  style="text-align:right;"><b><?php echo display('net_total'); ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="n_total" class="form-control text-right" name="n_total" value="0" readonly="readonly" placeholder="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <input type="button" id="add_invoice_item" class="btn btn-info" name="add-invoice-item"  onClick="addInputField('addinvoiceItem');" value="<?php echo display('add_new_item') ?>" tabindex="12"/>

                                        <input type="hidden" name="baseUrl" class="baseUrl" value="<?php echo base_url(); ?>"/>
                                    </td>
                                    <td style="text-align:right;" colspan="7"><b><?php echo display('paid_ammount') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="paidAmount" 
                                               onkeyup="invoice_paidamount();" class="form-control text-right" name="paid_amount" placeholder="0.00" tabindex="13" value=""/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <input type="button" id="full_paid_tab" class="btn btn-warning" value="<?php echo display('full_paid') ?>" tabindex="14" onClick="full_paid()"/>

                                        <input type="submit" id="add_invoice" class="btn btn-success" name="add-invoice" value="<?php echo display('submit') ?>" tabindex="15"/>
                                    </td>
                                    <td><a href="#" class="btn btn-info" data-toggle="modal" data-target="#calculator"><i class="fa fa-calculator" aria-hidden="true"></i> Calculator</a></td>

                                    <td style="text-align:right;" colspan="6"><b><?php echo display('due') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="dueAmmount" class="form-control text-right" name="due_amount" value="0.00" readonly="readonly"/>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <?php echo form_close() ?>
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
        </div>

    </section>
</div>
<script type="text/javascript">
      function bank_paymet(val){
        if(val==2){
           var style = 'block'; 
           document.getElementById('bank_id').setAttribute("required", true);
        }else{
   var style ='none';
    document.getElementById('bank_id').removeAttribute("required");
        }
           
    document.getElementById('bank_div').style.display = style;
    }

</script>
<!-- POS Invoice Report End -->
 <script type="text/javascript">

$(document ).ready(function() {
    $('#addinvoice .toggle').on('click', function() {
    $('#addinvoice .hideableRow').toggleClass('hiddenRow');
  })
});

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
                url: '<?php echo base_url('Cinvoice/insert_pos_invoice') ?>',
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
                url: '<?php echo base_url('Cinvoice/insert_pos_invoice') ?>',
                data: {product_id: product_id},
                success: function (data) {
                    if (data == false) {
                        alert('This Product Not Found !');
                        document.getElementById('add_item').value = '';
                        document.getElementById('add_item').focus();
                        quantity_calculate(product_id);
                         calculateSum();
                        invoice_paidamount();
                    } else {
                        $("#hidden_tr").css("display", "none");
                        document.getElementById('add_item').value = '';
                        document.getElementById('add_item').focus();
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
    } else {
        alert('barcode is invalid: ' + barcodeString);
    }

    barcodeString = ''; // reset
}


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

  if (!regexp.test(prev) && !regexp.test(cur)) {
    console.log("Two math operators not allowed after each other ;)");
    return;
  }
  number = number.concat(cur);
  mainScreen.innerHTML = number;
}

function CalculateTotal() {
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

   var frm = $("#pos_sale_insert");
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