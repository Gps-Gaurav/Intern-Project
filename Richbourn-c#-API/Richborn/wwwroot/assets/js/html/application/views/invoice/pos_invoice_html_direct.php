<?php
$CI = & get_instance();
$CI->load->model('Web_settings');
$Web_settings = $CI->Web_settings->retrieve_setting_editdata();
?>
<!--its for pos style css start--> 
<style type="text/css">
    BODY, TD
    {
        background-color: #ffffff;
        color: #000000;
        font-family: "Times New Roman", Times, serif;
        font-size: 10pt;
    }

</style>
<!--its for pos style css close--> 
<!-- Printable area start -->

<!-- Printable area end -->

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="header-icon">
            <i class="pe-7s-note2"></i>
        </div>
        <div class="header-title">
            <h1><?php echo display('invoice_details') ?></h1>
            <small><?php echo display('invoice_details') ?></small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#"><?php echo display('invoice') ?></a></li>
                <li class="active"><?php echo display('invoice_details') ?></li>
            </ol>
        </div>
    </section>
    <!-- Main content -->
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
                <div class="panel panel-bd">
                    <div id="printableArea">
                        <div class="panel-body">
                            <div bgcolor='#e4e4e4' text='#ff6633' link='#666666' vlink='#666666' alink='#ff6633' style='margin:0;font-family:Arial,Helvetica,sans-serif;border-bottom:1' >
                                                <table border="0" width="40%">
                                    <tr>
                                        <td>

                                            <table border="0" width="100%">
                                                
                                                <tr>
                                                    <td align="center" style="border-bottom:2px #333 solid;">
                                                        {company_info}
                                                        <span style="font-size: 17pt; font-weight:bold;">
                                                            {company_name}
                                                        </span><br>
                                                        {address}<br>
                                                        {mobile}<br>
                                                        {/company_info}
                                                        {tax_regno}
                                                    </td>
                                                </tr>
                                                
                                                
                                                <tr>
                                                    <td align="center"><b>{customer_name}</b><br>
                                                        <?php if ($customer_address) { ?>
                                                            {customer_address}<br>
                                                        <?php } ?>
                                                        <?php if ($customer_mobile) { ?>
                                                            {customer_mobile}
                                                        <?php } ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center"><nobr>
                                                    <date>
                                                        Date: <?php
                                                        echo date('d-M-Y');
                                                        ?> 
                                                    </date>
                                                </nobr></td>
                                    </tr>
                                    <tr>
                                        <td><strong><?php echo display('invoice_no'); ?> : {invoice_no}</strong></td>
                                    </tr>
                                </table>

                                <table width="100%">
                                    <tr>
                                        <td><?php echo display('sl'); ?></th>
                                        <td><?php echo display('product_name'); ?></td>
                                        <td><?php if($is_unit !=0){ echo display('unit');
                                              }?></td>
                                        <td align="right"><?php echo display('quantity'); ?></td>
                                        <td align="right"><?php if($is_discount > 0){ echo display('discount');
                                    }else{
                                            echo '';
                                        } ?></td>
                                        <td align="right"><?php echo display('rate'); ?></td>
                                        <td align="right"><?php echo display('ammount'); ?></td>
                                    </tr>
                           
                                    <?php 
                                    $sl =1;
                                    $s_total = 0;
                                    foreach($invoice_all_data as $invoice_data){?>
                                    <tr>
                                        <td align="left"><nobr><?php echo $sl;?></nobr></td>
                                    <td align="left"><nobr><?php echo $invoice_data['product_name'].'('.$invoice_data['product_model'].')';?></nobr></td>
                                    <td align="left"><nobr><?php echo $invoice_data['unit'];?></nobr></td>
                                    <td align="right"><nobr><?php echo $invoice_data['quantity'];?></nobr></td>
                                    <td align="right">
                                    <nobr>
                                        <?php 
                                        if(!empty($invoice_data['discount_per'])){
                                            $curicon = $currency;
                                        }else{
                                            $curicon = '';
                                        }
                                    if($position == 0){
                                       echo  $curicon.' '.$invoice_data['discount_per'];
                                    }else{
                                    echo $invoice_data['discount_per'].' '.$curicon;
                                    }
                                         ?>
                                    </nobr>
                                    </td>
                                    <td align="right">
                                    <nobr>
                                        <?php 
                                         if($position == 0){
                                       echo  $currency.' '.$invoice_data['rate'];
                                    }else{
                                    echo $invoice_data['rate'].' '.$currency;
                                    }
                                         ?>
                                    </nobr>
                                    </td>
                                    <td align="right">
                                    <nobr>
                                        <?php 
                                       if($position == 0){
                                       echo  $currency.' '.$invoice_data['total_price'];
                                    }else{
                                    echo $invoice_data['total_price'].' '.$currency;
                                    }
                                    $s_total += $invoice_data['total_price'];
                                         ?>
                                    </nobr>
                                    </td>
                                    </tr>
                                    <?php $sl++; }?>
                              
                                    <tr>
                                        <td colspan="7" style="border-top:#333 1px solid;"><nobr></nobr></td>
                                    </tr>
<!--                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="4"><nobr>Sub Total</nobr></td>
                                    <td align="right"><nobr>944.00</nobr></td>
                                    </tr>-->
                                    <tr>
                                        <td colspan="7" style="border-top:#333 1px solid;"><nobr></nobr></td>
                                    </tr>
                                       <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('total') ?></nobr></td>
                                    <td align="right">
                                    <nobr>
                                        <?php if($position == 0){
                                       echo  $currency.' '.number_format($s_total, 2, '.', ',');
                                    }else{
                                    echo number_format($s_total, 2, '.', ',').' '.$currency;
                                    } ?>
                                    </nobr>
                                    </td>
                                    </tr>
                                    <?php if($total_tax > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('tax') ?></nobr></td>
                                    <td align="right">
                                    <nobr>
                                        <?php echo (($position == 0) ? "$currency {total_tax}" : "{total_tax} $currency") ?>
                                    </nobr>
                                    </td>
                                    </tr>
                                    <?php }?>
                                     <?php if($invoice_discount > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('invoice_discount'); ?></nobr></td>
                                    <td align="right"><nobr>
                                        <?php echo (($position == 0) ? "$currency {invoice_discount}" : "{invoice_discount} $currency") ?>
                                    </nobr></td>
                                    </tr>
                                    <?php }?>
                                    <?php if($total_discount > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('total_discount') ?></nobr></td>
                                    <td align="right">
                                    <nobr>
                                        <?php echo (($position == 0) ? "$currency {total_discount}" : "{total_discount} $currency") ?>
                                    </nobr></td>
                                    </tr>
                                      <?php }?>
                                       <?php if($shipping_cost > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('shipping_cost') ?></nobr></td>
                                    <td align="right"><nobr>
                                        
                                            <?php echo (($position == 0) ? "$currency {shipping_cost}" : "{shipping_cost} $currency") ?>
                                        </nobr></td>
                                    </tr>
                                    <?php }?>
                                       <?php if($previous > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('previous') ?></nobr></td>
                                    <td align="right"><nobr>
                                        
                                            <?php echo (($position == 0) ? "$currency {previous}" : "{prevous_due} $currency") ?>
                                        </nobr></td>
                                    </tr>
                                    <?php }?>
                                    <tr>
                                        <td colspan="7" style="border-top:#333 1px solid;"><nobr></nobr></td>
                                    </tr>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><strong><?php echo display('grand_total') ?></strong></nobr></td>
                                    <td align="right"><nobr>
                                        <strong>
                                            <?php echo (($position == 0) ? "$currency {total_amount}" : "{total_amount} $currency")
                                             ?>
                                        </strong></nobr></td>
                                    </tr>

                                    <tr>
                                        <td colspan="7" style="border-top:#333 1px solid;"><nobr></nobr></td>
                                    </tr>
                                     <?php if($paid_amount > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr>
                                        <?php echo display('paid_ammount') ?>
                                    </nobr></td>
                                    <td align="right"><nobr>
                                        <?php echo (($position == 0) ? "$currency {paid_amount}" : "{paid_amount} $currency") ?>
                                    </nobr></td>
                                    </tr>
                                     <?php }?>
                                    <?php if($due_amount > 0){?>
                                    <tr>
                                        <td align="left"><nobr></nobr></td>
                                    <td align="right" colspan="5"><nobr><?php echo display('due') ?></nobr></td>
                                    <td align="right"><nobr>
                                        <?php echo (($position == 0) ? "$currency {due_amount}" : "{due_amount} $currency") ?>
                                    </nobr></td>
                                    </tr>
                                <?php }?>
                                   
                                </table>
                               
                                </td>
                                </tr>
                                <tr>{company_info}
                                    <td>Powered  By: <a href="{website}"><strong>{company_name}</strong></a></td>
                                     {/company_info}
                                </tr>
                                </table>

                            </div>


                        </div>
                    </div>

                    <div class="panel-footer text-left">
                        <a  class="btn btn-danger" href="<?php echo base_url('Cinvoice/pos_invoice'); ?>"><?php echo display('cancel') ?></a>
                        <a  class="btn btn-info" href="#" onclick="printDiv('printableArea')"><span class="fa fa-print"></span></a>

                    </div>
                </div>
                 <input type="hidden" name="" id="url" value="<?php echo base_url('Cinvoice/pos_invoice');?>">
            </div>
        </div>
    </section> <!-- /.content -->
</div> <!-- /.content-wrapper -->

<script type="text/javascript">

$(window).load(function() {
      var url=document.getElementById("url").value; 
      var printContents = document.getElementById('printableArea').innerHTML;
        var originalContents = document.getElementById('printableArea').innerHTML;
        document.getElementById('printableArea').innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        document.location.href = url;
});
</script>