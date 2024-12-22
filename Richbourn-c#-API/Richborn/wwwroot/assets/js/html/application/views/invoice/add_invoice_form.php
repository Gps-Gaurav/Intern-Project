<!-- Customer js php -->
<!-- <script src="<?php echo base_url() ?>my-assets/js/admin_js/json/customer.js.php" ></script>
 --><!-- Product invoice js -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/json/product_invoice.js.php" ></script>
<!-- Invoice js -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/invoice.js" type="text/javascript"></script>

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
      .hiddenRow {
  display: none;
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
            <h1><?php echo display('new_invoice') ?></h1>
            <small><?php echo display('add_new_invoice') ?></small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#"><?php echo display('invoice') ?></a></li>
                <li class="active"><?php echo display('new_invoice') ?></li>
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
       <?php if($this->permission1->method('manage_invoice','read')->access()){ ?>
                    <a href="<?php echo base_url('Cinvoice/manage_invoice') ?>" class="btn btn-info m-b-5 m-r-2"><i class="ti-align-justify"> </i> <?php echo display('manage_invoice') ?> </a>
                    <?php }?>
         <?php if($this->permission1->method('pos_invoice','create')->access()){ ?>
                    <a href="<?php echo base_url('Cinvoice/pos_invoice') ?>" class="btn btn-primary m-b-5 m-r-2"><i class="ti-align-justify"> </i>  <?php echo display('pos_invoice') ?> </a>
                <?php }?>

                </div>
            </div>
        </div>


        <!--Add Invoice -->
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-bd lobidrag">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4><?php echo display('new_invoice'); ?></h4>
                           
                        </div>
                    </div>
                    <?php echo form_open_multipart('Cinvoice/manual_sales_insert', array('class' => 'form-vertical', 'id' => 'insert_sale', 'name' => '')) ?>
                    <div class="panel-body">
                        <div class="row">

                            <div class="col-sm-8" id="payment_from_1">
                                <div class="form-group row">
                                    <label for="customer_name" class="col-sm-3 col-form-label"><?php
                                        echo display('customer_name').'/'.display('phone');
                                        ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-6">
                                        <input type="text" size="100"  name="customer_name" class=" form-control" placeholder='<?php echo display('customer_name').'/'.display('phone') ?>' id="customer_name" tabindex="1" onkeyup="customer_autocomplete()" value="{customer_name}"/>

                                        <input id="autocomplete_customer_id" class="customer_hidden_value abc" type="hidden" name="customer_id" value="{customer_id}">
                                    </div>
                                     <?php if($this->permission1->method('add_customer','create')->access()){ ?>
                                    <div  class=" col-sm-3">
                                        <input id="myRadioButton_1" type="button" onClick="active_customer('payment_from_1')" id="myRadioButton_1" class="btn btn-success checkbox_account ac" name="customer_confirm" checked="checked" value="<?php echo display('new_customer') ?>" tabindex="2">
                                    </div>
                                <?php } ?>
                                </div>
                            </div>

                            <div class="col-sm-8" id="payment_from_2">
                                <div class="form-group row">
                                    <label for="customer_name_others" class="col-sm-3 col-form-label"><?php echo display('customer_name') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-6">
                                        <input  autofill="off" type="text"  size="100" name="customer_name_others" placeholder='<?php echo display('customer_name') ?>' id="customer_name_others" class="form-control" />
                                    </div>

                                    <div  class="col-sm-3">
                                        <input  onClick="active_customer('payment_from_2')" type="button" id="myRadioButton_2" class="checkbox_account btn btn-success" name="customer_confirm_others" value="<?php echo display('old_customer') ?>">
                                    </div>
                                </div>
                                  <div class="form-group row">
                                    <label for="customer_name_others_address" class="col-sm-3 col-form-label"><?php echo display('customer_mobile') ?> </label>
                                    <div class="col-sm-6">
                                        <input type="text"  size="100" name="customer_mobile" class=" form-control" placeholder='<?php echo display('customer_mobile') ?>' id="customer_name_others_mobile" />
                                    </div>
                                </div> 
                                <div class="form-group row">
                                    <label for="customer_name_others_address" class="col-sm-3 col-form-label"><?php echo display('address') ?> </label>
                                    <div class="col-sm-6">
                                        <input type="text"  size="100" name="customer_name_others_address" class=" form-control" placeholder='<?php echo display('address') ?>' id="customer_name_others_address" />
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
                            <div class="col-sm-6">
                                <div class="form-group row">
                                    <label for="date" class="col-sm-4 col-form-label"><?php echo display('date') ?> <i class="text-danger">*</i></label>
                                    <div class="col-sm-8">
                                        <?php
                               
                                        $date = date('Y-m-d');
                                        ?>
                                        <input class="datepicker form-control" type="text" size="50" name="invoice_date" id="date" required value="<?php echo $date; ?>" tabindex="6" />
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
                            <table class="table table-bordered table-hover" id="normalinvoice">
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

                                        <th class="text-center"><?php echo display('total') ?> 
                                        </th>
                                        <th class="text-center"><?php echo display('action') ?></th>
                                    </tr>
                                </thead>
                                <tbody id="addinvoiceItem">
                                    <tr>
                                        <td style="width: 220px">
                                            <input type="text" name="product_name" onkeypress="invoice_productList(1);" class="form-control productSelection" placeholder='<?php echo display('product_name') ?>' required="" id="product_name" tabindex="7">

                                            <input type="hidden" class="autocomplete_hidden_value product_id_1" name="product_id[]" id="SchoolHiddenId"/>

                                            <input type="hidden" class="baseUrl" value="<?php echo base_url(); ?>" />
                                        </td>
                                          <td>
                                            <input type="text" name="desc[]" class="form-control text-right "  />
                                        </td>
                                        <td  style="width: 100px">
                                             <select class="form-control" id="serial_no_1" name="serial_no[]" "  tabindex="8">
                                                <option></option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name="available_quantity[]" class="form-control text-right available_quantity_1" value="0" readonly="" />
                                        </td>
                                        <td>
                                            <input name="" id="" class="form-control text-right unit_1 valid" value="None" readonly="" aria-invalid="false" type="text">
                                        </td>
                                        <td>
                                            <input type="text" name="product_quantity[]" onkeyup="quantity_calculate(1);" onchange="quantity_calculate(1);" class="total_qntt_1 form-control text-right" id="total_qntt_1" placeholder="0.00" min="0" tabindex="8" required="required" value="1"/>
                                        </td>
                                        <td style="width: 85px">
                                            <input type="text" name="product_rate[]" id="price_item_1" class="price_item1 price_item form-control text-right" tabindex="9" required="" onkeyup="quantity_calculate(1);" onchange="quantity_calculate(1);" placeholder="0.00" min="0" />
                                        </td>
                                        <!-- Discount -->
                                        <td>
                                            <input type="text" name="discount[]" onkeyup="quantity_calculate(1);"  onchange="quantity_calculate(1);" id="discount_1" class="form-control text-right" min="0" tabindex="10" placeholder="0.00"/>
                                            <input type="hidden" value="" name="discount_type" id="discount_type_1">
                                        </td>


                                        <td style="width: 100px">
                                            <input class="total_price form-control text-right" type="text" name="total_price[]" id="total_price_1" value="0.00" readonly="readonly" />
                                        </td>

                                        <td>
                                            <!-- Tax calculate start-->
                                            <?php $x=0;
                                     foreach($taxes as $taxfldt){?>
                                            <input id="total_tax<?php echo $x;?>_1" class="total_tax<?php echo $x;?>_1" type="hidden">
                                            <input id="all_tax<?php echo $x;?>_1" class="total_tax<?php echo $x;?>" type="hidden" name="tax[]">
                                           
                                            <!-- Tax calculate end-->

                                            <!-- Discount calculate start-->
                                           
                                            <?php $x++;} ?>
                                            <!-- Tax calculate end-->

                                            <!-- Discount calculate start-->
                                            <input type="hidden" id="total_discount_1" class="" />
                                            <input type="hidden" id="all_discount_1" class="total_discount" name="discount_amount[]" />
                                            <!-- Discount calculate end -->

                                            <!--<button style="text-align: right;" class="btn btn-danger" type="button" value="<?php echo display('delete') ?>" onclick="deleteRow(this)" tabindex="11"><?php echo display('delete') ?></button>-->
                                        </td>
                                    </tr>
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
                                        <input type="hidden" id="txfieldnum">
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
                                 <td><button type="button" class="toggle btn-warning">
                <i class="fa fa-angle-double-down"></i>
              </button></td>
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

                                    <td style="text-align:right;" colspan="7"><b><?php echo display('due') ?>:</b></td>
                                    <td class="text-right">
                                        <input type="text" id="dueAmmount" class="form-control text-right" name="due_amount" value="0.00" readonly="readonly"/>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <?php echo form_close() ?>
                </div>
            </div>
             <div class="modal fade" id="printconfirmodal" tabindex="-1" role="dialog" aria-labelledby="printconfirmodal" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Print</h4>
          </div>
          <div class="modal-body">
            <?php echo form_open('Cinvoice/invoice_inserted_data_manual', array('class' => 'form-vertical', 'id' => '', 'name' => '')) ?>
            <div id="outputs" class="hide alert alert-danger"></div>
            <h3> Successfully Inserted </h3>
            <h4>Do You Want to Print ??</h4>
            <input type="hidden" name="invoice_id" id="inv_id">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="submit" class="btn btn-primary" id="yes">Yes</button>
            <?php echo form_close() ?>
          </div>
        </div>
      </div>
    </div>
        </div>
    </section>
</div>
<!-- Invoice Report End -->
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
 <script type="text/javascript">
   
$(document ).ready(function() {
    $('#normalinvoice .toggle').on('click', function() {
    $('#normalinvoice .hideableRow').toggleClass('hiddenRow');
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

    $('.ac').click(function () {
        $('.customer_hidden_value').val('');
    });
    $('#myRadioButton_1').click(function () {
        $('#customer_name').val('');
    });

    $('#myRadioButton_2').click(function () {
        $('#customer_name_others').val('');
    });
    $('#myRadioButton_2').click(function () {
        $('#customer_name_others_address').val('');
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
<script type="text/javascript">

     $(document).ready(function() {

   var frm = $("#insert_sale");
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
