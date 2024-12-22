<!-- Person ledger start -->
<script type="text/javascript">
    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        document.body.style.marginTop = "0px";
        window.print();
        document.body.innerHTML = originalContents;
    }
</script>

<!-- Person Start -->
<div class="content-wrapper">
    <section class="content-header">
        <div class="header-icon">
            <i class="pe-7s-note2"></i>
        </div>
        <div class="header-title">
            <h1><?php echo display('person_ledger') ?></h1>
            <small><?php echo display('person_ledger') ?></small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#"><?php echo display('personal_loan') ?></a></li>
                <li class="active"><?php echo display('person_ledger') ?></li>
            </ol>
        </div>
    </section>

    <section class="content">

        <div class="row">
            <div class="col-sm-12">
                <div class="column">

                    <a href="<?php echo base_url('Cloan/add1_person') ?>" class="btn btn-warning m-b-5 m-r-2"><i class="ti-plus"> </i> <?php echo display('add_person') ?> </a>
                    <a href="<?php echo base_url('Cloan/manage1_person') ?>" class="btn btn-primary m-b-5 m-r-2"><i class="ti-align-justify"> </i> <?php echo display('manage_person') ?> </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body"> 

                        <?php echo form_open('Csettings/ledger_search', array('class' => 'form-vertical', 'id' => 'person_ledger')); ?>

                        <?php
                        date_default_timezone_set("Asia/Dhaka");
                        $today = date('Y-m-d');
                        ?>


                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label"><?php echo display('name') ?> <i class="text-danger">*</i></label>
                            <div class="col-sm-6">
                                <select class="form-control" name="person_id" id="name">
                                    <option><?php echo display('select_one') ?></option>
                                    {person_details_all}
                                    <option value="{person_id}">{person_name}</option>
                                    {/person_details_all}
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-sm-3 col-form-label"><?php echo display('phone') ?> <i class="text-danger">*</i></label>
                            <div class="col-sm-6">
                                <input type="number" class="form-control phone" name="phone" id="phone" required="" placeholder="<?php echo display('phone') ?>" min="0"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="from_date" class="col-sm-3 col-form-label"><?php echo display('from') ?>: <i class="text-danger">*</i></label>
                            <div class="col-sm-6">
                                <input type="text" id="from_date" name="from_date" value="<?php echo $today; ?>" class="form-control datepicker" required/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="to_date" class="col-sm-3 col-form-label"><?php echo display('to') ?>: <i class="text-danger">*</i></label>
                            <div class="col-sm-6">
                                <input type="text" id="to_date" name="to_date" value="<?php echo $today; ?>" class="form-control datepicker" required/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="" class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-6 text-center">
                                <button type="submit" class="btn btn-primary"><?php echo display('search') ?></button>
                                <a  class="btn btn-warning" href="#" onclick="printDiv('printableArea')"><?php echo display('print') ?></a>
                            </div>
                        </div>

                        <?php echo form_close() ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-bd lobidrag">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4><?php echo display('person_ledger') ?> </h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div id="printableArea" style="margin-left:2px;">

                           
                                 <div class="row" style="border-bottom:2px #333 solid;">
                                
                                <div class="col-sm-8" style="display: inline-block;width: 64%">
                                    {company_info}
                                    <img src="<?php
                                    if (isset($Web_settings[0]['invoice_logo'])) {
                                        echo $Web_settings[0]['invoice_logo'];
                                    }
                                    ?>" class="" alt="" style="margin-bottom:10px" height="100px;">
                                    <br>
                                    <span class="label label-success-outline m-r-15 p-10" ><?php echo display('billing_from') ?></span>
                                    <address style="margin-top:10px">
                                        <strong style="font-size: 20px; ">{company_name}</strong><br>
                                        {address}<br>
                                        <abbr><b><?php echo display('mobile') ?>:</b></abbr> {mobile}<br>
                                        <abbr><b><?php echo display('email') ?>:</b></abbr> 
                                        {email}<br>
                                        <abbr><b><?php echo display('website') ?>:</b></abbr> 
                                        {website}<br>
                                         {/company_info}
                                         
                                    </address>
                                   
                                  

                                </div>
                                
                                 
                                <div class="col-sm-4 text-left" style="display: inline-block;margin-left: 5px;">
                                    <h2 class="m-t-0"><?php echo display('office_loan') ?></h2>
                                    <div></div>
                                    <div class="m-b-15"><?php echo display('billing_date') ?>: <?php echo date('Y-m-d')?></div>

                                    <span class="label label-success-outline m-r-15"><?php echo display('billing_to') ?></span>

                                    <address style="margin-top:10px;width: 200px">  
                                   {person_details}
                                        <strong style="font-size: 20px; ">{person_name} </strong><br>
                                    
                                            {person_address}
                                        
                                        <br>
                                        <abbr><b><?php echo display('mobile') ?>:</b></abbr>
                                       
                                            {person_phone}
                                        {/person_details}
                                         
                                    </address>
                                </div>
                            </div> 
                          
                            <div class="openingbal">
                                <table class="table-bordered">
                                    <tr><th style="padding:5px">Opening Balance </th><td class="text-right" style="padding:5px;width: 150px;"><b><?php echo (($position == 0) ? "$currency {opening_bal}" : "{opening_bal} $currency") ?></b></td></tr>
                                    <tr><th style="padding:5px">Current Balance </th><td class="text-right" style="padding:5px;width: 150px;"><b><?php echo (($position == 0) ? "$currency {current_balance}" : "{current_balance} $currency") ?></b></td></tr>
                                </table>
                            </div>

                            <div class="table-responsive" style="margin-top: 10px;">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th class="text-center"><?php echo display('date') ?></th>
                                            <th class="text-center"><?php echo display('details') ?></th>

                                            <th class="text-right"><?php echo display('debit') ?></th>

                                            <th class="text-right"><?php echo display('credit') ?></th>
                                            <th class="text-right"><?php echo display('balance') ?></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        if ($ledger) {
                                            ?>

                                            <?php foreach ($ledger as $value) {
                                                ?>
                                                <tr>
                                                    <td class="text-center"><?php echo $value['date'] ?></td>
                                                    <td align="center"><?php echo $value['details'] ?></td>
                                                    <td style="text-align: right;"><?php
                                                        echo (($position == 0) ? "$currency" : " $currency");
                                                        echo number_format($value['debit'], 2, '.', ',');
                                                        ?></td>
                                                    <td align="right"><?php
                                                        echo (($position == 0) ? "$currency " : " $currency");
                                                        echo number_format($value['credit'], 2, '.', ',');
                                                        ?></td>
                                                    <td align="right"><?php
                                                        echo (($position == 0) ? "$currency" : " $currency");
                                                        echo number_format($value['balance'], 2, '.', ',')
                                                        ?></td>

                                                <?php } ?>
                                                <?php
                                            }
                                            ?>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2"  align="right"><b><?php echo display('grand_total') ?>:</b></td>
                                            <td align="right"><b><?php echo (($position == 0) ? "$currency {subtotalDebit}" : "{subtotalDebit} $currency") ?></b></td>

                                            <td align="right"><b><?php echo (($position == 0) ? "$currency {subtotalCredit}" : "{subtotalCredit} $currency") ?></b></td>

                                            <td align="right"><b>
                                                <?php echo (($position == 0) ? "$currency {current_balance}" : "{current_balance} $currency") ?></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div class="text-right"><?php echo $links ?></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<!-- Person ledger End -->


<script type="text/javascript">
    //Phone select by ajax start
    $('body').on('change', '#name', function (event) {
        event.preventDefault();
        var person_id = $('#name').val();
        var csrf_test_name = $("[name=csrf_test_name]").val();
        $.ajax({
            url: '<?php echo base_url('Csettings/phone_search_by_name') ?>',
            type: 'post',
            data: {person_id: person_id, csrf_test_name: csrf_test_name},
            success: function (msg) {
                $(".phone").val(msg);
            },
            error: function (xhr, desc, err) {
                alert('failed');
            }
        });
    });
    //Phone select by ajax end
</script>
