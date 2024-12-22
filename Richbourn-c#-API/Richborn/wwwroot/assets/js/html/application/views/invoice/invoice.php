<!-- Customer js php -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/json/customer.js.php" ></script>
<!-- Product invoice js -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/json/product_invoice.js.php" ></script>
<!-- Invoice js -->
<script src="<?php echo base_url() ?>my-assets/js/admin_js/invoice.js" type="text/javascript"></script>
<!-- Manage Invoice Start -->
<div class="content-wrapper">
    <section class="content-header">
        <div class="header-icon">
            <i class="pe-7s-note2"></i>
        </div>
        <div class="header-title">
            <h1><?php echo display('manage_invoice') ?></h1>
            <small><?php echo display('manage_your_invoice') ?></small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#"><?php echo display('invoice') ?></a></li>
                <li class="active"><?php echo display('manage_invoice') ?></li>
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
              <?php if($this->permission1->method('pos_invoice','create')->access()){ ?>
                    <a href="<?php echo base_url('Cinvoice/pos_invoice') ?>" class="btn btn-primary m-b-5 m-r-2"><i class="ti-align-justify"> </i>  <?php echo display('pos_invoice') ?> </a>
                <?php }?>

                </div>
            </div>
        </div>

        <!-- date between search -->
        <div class="row">
            
                <div class="panel panel-default">
                    <div class="panel-body"> 
                        <div class="col-sm-7">
                        <?php echo form_open('Cinvoice/date_to_date_invoice', array('class' => 'form-inline', 'method' => 'get')) ?>
                        <?php
                        date_default_timezone_set("Asia/Dhaka");
                        $today = date('Y-m-d');
                        ?>
                        <div class="form-group">
                            <label class="" for="from_date"><?php echo display('start_date') ?></label>
                            <input type="text" name="from_date" class="form-control datepicker" id="from_date" value="<?php echo $today ?>" placeholder="<?php echo display('start_date') ?>" >
                        </div> 

                        <div class="form-group">
                            <label class="" for="to_date"><?php echo display('end_date') ?></label>
                            <input type="text" name="to_date" class="form-control datepicker" id="to_date" placeholder="<?php echo display('end_date') ?>" value="<?php echo $today ?>">
                        </div>  

                        <button type="submit" class="btn btn-success"><?php echo display('find') ?></button>

                        <?php echo form_close() ?>
                    </div>
                    <div class="col-sm-5">
                        <form action="<?php echo base_url('Cinvoice/manage_invoice_invoice_id') ?>" class="form-inline" method="post" accept-charset="utf-8">
                            <label for="invoice_no"><?php echo display('invoice_no') ?></label>
                            <input type="text" class="form-control" name="invoice_no" placeholder="<?php echo display('invoice_no') ?>">
                            <button type="submit" class="btn btn-primary btn-sm"><?php echo display('find') ?></button>     
                        </form>    
                    
            </div>
          
                </div>
            </div>
            
        </div>
        <div class="row"> 
        </div>
        <!-- Manage Invoice report -->
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-bd lobidrag">
                    <div class="panel-heading">
                        <span class="text-center">
                            <a href="<?php echo base_url('Cinvoice/sale_downloadpdf')?>" class="btn btn-warning">Pdf</a>
                            <a href="<?php echo base_url('Cinvoice/exportinvocsv'); ?>" class="btn btn-success">Export CSV </a>

                        </span>
                        <span class="text-right">
                            <?php echo form_open('Cinvoice/invoice_search', array('class' => 'form-inline', 'method' => 'get')) ?>

                            <div class="form-group">
                               <input type="text"   name="customer_name" class=" form-control" placeholder='<?php echo display('customer_name').'/'.display('phone') ?>' id="customer_name"  onkeyup="customer_autocomplete()"/>

                        <input id="autocomplete_customer_id" class="customer_hidden_value abc" type="hidden" name="customer_id">
                            </div>  

                            <button type="submit" class="btn btn-success"><?php echo display('search') ?></button>

                            <?php echo form_close() ?>
                        </span>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive" id="invoic_list">
                            <table id="dataTableExample2" class="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th><?php echo display('sl') ?></th>
                                        <th><?php echo display('invoice_no') ?></th>
                                        <th><?php echo display('invoice_id') ?></th>
                                        <th><?php echo display('customer_name') ?></th>
                                        <th><?php echo display('date') ?></th>
                                        <th><?php echo display('total_amount') ?></th>
                                        <th><?php echo display('action') ?>
                                             <?php echo form_open('Cinvoice/manage_invoice', array('class' => 'form-inline', 'method' => 'post')) ?>
                                             <input type="hidden" name="all" value="all">
                                              <button type="submit" class="btn btn-success"><?php echo display('all') ?></button>
                                             <?php echo form_close() ?>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $total = '0.00';
                                    if ($invoices_list) {
                                        foreach($invoices_list as $invoices_list){
                                        ?>
                                  
                                        <tr>
                                            <td><?php echo $invoices_list['sl']; ?></td>
                                            <td>
                                                <a href="<?php echo base_url() . 'Cinvoice/invoice_inserted_data/'.$invoices_list['invoice_id']; ?>">
                                                 
                                                    <?php echo $invoices_list['invoice']; ?>
                                                </a>
                                            </td>
                                            <td>
                                                <a href="<?php echo base_url() . 'Cinvoice/invoice_inserted_data/'.$invoices_list['invoice_id']; ?>">
                                                  <?php echo $invoices_list['invoice_id']?>  
                                                </a>
                                            </td>
                                            <td>
                                                <a href="<?php echo base_url() . 'Ccustomer/customerledger/'.$invoices_list['invoice_id']; ?>"><?php echo $invoices_list['customer_name']?></a>				
                                            </td>

                                            <td><?php echo $invoices_list['final_date']?></td>
                                            <td style="text-align: right;"><?php 
                                            if($position == 0){
                                              echo $currency.$invoices_list['total_amount'];  
                                            }else{
                                            echo $invoices_list['total_amount'].$currency; 
                                            }
                                            $total += $invoices_list['total_amount']; ?></td>
                                            <td>
                                    <center>
                                        <?php echo form_open() ?>

                                        <a href="<?php echo base_url() . 'Cinvoice/invoice_inserted_data/'.$invoices_list['invoice_id']; ?>" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo display('invoice') ?>"><i class="fa fa-window-restore" aria-hidden="true"></i></a>
<a href="<?php echo base_url() . 'Cinvoice/min_invoice_inserted_data/'.$invoices_list['invoice_id']; ?>" class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo 'Mini Invoice' ?>"><i class="fa fa-fax" aria-hidden="true"></i></a>

                                        <a href="<?php echo base_url() . 'Cinvoice/pos_invoice_inserted_data/'.$invoices_list['invoice_id']; ?>" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo display('pos_invoice') ?>"><i class="fa fa-fax" aria-hidden="true"></i></a>
                                        <?php if($this->permission1->method('manage_invoice','update')->access()){ ?>

                                        <a href="<?php echo base_url() . 'Cinvoice/invoice_update_form/'.$invoices_list['invoice_id']; ?>" class="btn btn-info btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo display('update') ?>"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                    <?php }?>
                                     <?php if($this->permission1->method('manage_invoice','delete')->access()){ ?>
                                        <a href="" class="deleteInvoice btn btn-danger btn-sm" name="<?php echo $invoices_list['invoice_id']?>" data-toggle="tooltip" data-placement="right" title="" data-original-title="<?php echo display('delete') ?> "><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                          <?php }?>
                                        <?php echo form_close() ?>
                                    </center>
                                    </td>
                                    </tr>
                                 
                                    <?php
                                }
                                }
                                ?>
                                </tbody>
                                <tfoot>
                                    <tr><td colspan="5"></td><td class="text-right"><?php
                                    $sttle =number_format($total, 2, '.', ',');
                                     if($position == 0){
                                              echo $currency.''.$sttle;  
                                            }else{
                                            echo $sttle.''.$currency; 
                                            } ?></td><td></td></tr>
                                </tfoot>
                            </table>
                            <div class="text-right"><?php echo $links ?></div>
                        </div>
                       

                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<!-- Manage Invoice End -->

<!-- Delete Invoice ajax code -->
<script type="text/javascript">
    //Delete Invoice Item 
    $(".deleteInvoice").click(function ()
    {
        var invoice_id = $(this).attr('name');
        var csrf_test_name = $("[name=csrf_test_name]").val();
        var x = confirm("Are You Sure,Want to Delete ?");
        if (x == true) {
            $.ajax
                    ({
                        type: "POST",
                        url: '<?php echo base_url('Cinvoice/invoice_delete') ?>',
                        data: {invoice_id: invoice_id, csrf_test_name: csrf_test_name},
                        cache: false,
                        success: function (datas)
                        {

                            window.reload();
                        }
                    });
        }
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
            $(this).unbind("change");
            return false;
       }
   }

   $('body').on('keydown.autocomplete', '#customer_name', function() {
       $(this).autocomplete(options);
   });

}


var doc = new jsPDF();
var specialElementHandlers = {
    '#pdf': function (element, renderer) {
        return true;
    }
};

$('#generatepdf').click(function () {
    doc.fromHTML($('#dataTableExample2').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sale.pdf');
});

</script>