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
            <h1>Transection  Details Datewise</h1>
            <small>Transection Details</small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#">Transection Details</a></li>
                <li class="active">Transaction Details</li>
            </ol>
        </div>
    </section>

    <section class="content">
        <!-- Manage Product report -->
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body"> 
                        <?php echo form_open('Cpayment/custom_search_datewise', array('class' => 'form-inline',)) ?>
                        <?php $today = date('Y-m-d'); ?>
                        <label class="select"><?php echo display('search_by_date') ?>: <?php echo display('from') ?></label>
                        <input type="text" name="from_date"  value="<?php echo $today; ?>" class="datepicker form-control"/>
                        <label class="select"><?php echo display('to') ?></label>
                        <input type="text" name="to_date" value="<?php echo $today; ?>" class="datepicker form-control"/>
                        <label class="select"> Account: </label>
                        <select name="accounts" class="form-control" data-placeholder="-- select one --"> 
                            <option value=""></option>
                            <!--<option> <?php echo display('all') ?> </option>-->
                            {category}
                            <option value="{parent_id}">{account_name}</option>
                            {/category}

                        </select>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i>
                            <?php echo display('search') ?></button>
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
                            <h4></h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div id="printableArea" style="margin-left:2px;">


                            <div class="table-responsive" style="margin-top: 10px;">
                                <p style="font-size: 17px; color: black; font-weight:bold">
                                    <?php
                                    echo display('company_name');
                                    echo "<br>";

                                    echo "<br>";
                                    echo 'Date' . ':' . date('Y-m-d');
                                    ?></p>
                                <table id="dataTableExample2" class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th><?php echo display('sl') ?></th>
                                            <th class="text-center">Name</th>
                                            <th class="text-center">Account Name</th>
                                            <th class="text-center"><?php echo display('description') ?></th>
                                            <th class="text-center"><?php echo display('date') ?></th>

                                            <th class="text-center">Receipt Amount</th>

                                            <th class="text-center">Paid Amount</th>

                                        </tr>
                                    </thead>
                                    <?php
                                    if ($ledger) {
                                        ?>
                                        <?php $sl = 1; ?>
                                        <?php
                                        $amount = $pay_amount = 0;
                                        foreach ($ledger as $row) { ?>
                                            <tbody>


                                                <tr><td><?php echo $sl; ?></td>
                                                    <td  align="left">

                                                        <?php
                                                        echo $row['person_name'];
                                                        echo $row['customer_name'];
                                                        echo $row['account_name'];
                                                        echo $row['supplier_name'];

                                                        ?>


                                                    </td>
                                                    <td align="left">
                                                        <?php
                                                        $tran_cat = $row['transection_category'];
                                                        if ($tran_cat == 1) {
                                                            echo "supplier";
                                                        } elseif ($tran_cat == 2) {
                                                            echo "customer";
                                                        } elseif ($tran_cat == 3) {
                                                            echo "Office";
                                                        } else {
                                                            echo "Loan";
                                                        }
                                                        ?>
                                                    </td>
                                                     <td><?php echo $row['description']?></td>
                                                    <td><?php echo $row['date_of_transection']?></td>
                                                    <td style="text-align: right;">
                                                        <?php
                                                             if ($row['amount']) {
                                                            echo (($position == 0) ? "$currency " : " $currency");
                                                            echo number_format($row['amount'], '2', '.', ',');
                                                            $amount += $row['amount'];
                                                        } else {
                                                            $amount += '0.00';
                                                        }

                                                        ?>
                                                    </td>
                                                    <td align="right">
                                                        <?php
                                                        if ($row['pay_amount']) {
                                                            echo (($position == 0) ? "$currency " : " $currency");
                                                            echo number_format($row['pay_amount'], '2', '.', ',');
                                                            $pay_amount += $row['pay_amount'];
                                                        } else {
                                                            $pay_amount += '0.00';
                                                        }

                                                        ?>
                                                    </td>
                                                    


                                            </tbody>
                                            <?php $sl++; ?>
                                        <?php } ?>
                                        <?php
                                    }
                                    ?>
                                    <tfoot>
                                        <tr  align="right">
                                            <td colspan="5"  align="right"><b>Total:</b></td>
                                             <td align="right"><b>
                                                    <?php
                                                    echo (($position == 0) ? "$currency " : "$currency");
                                                    echo number_format(@$amount, '2', '.', ',');
                                                    ?></b>
                                            </td>
                                            <td align="right"><b>
                                                    <?php
                                                    echo (($position == 0) ? "$currency " : "$currency");
                                                    echo number_format(@$pay_amount, '2', '.', ',');
                                                    ?></b>
                                            </td>



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

<!-- Modal start -->
<!-- Link trigger modal -->


<!-- Default bootstrap modal example -->


<!-- Modal end -->

<!-- modal popup script -->
<script type="text/javascript">

    function report_popup(transection_category)
    {
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('Cpayment/today_details'); ?>",
            data: "transection_category=" + transection_category,
            success: function (response) {
                $(".displaycontent").html(response);

            }
        });
    }
</script>

<div class="modal fade displaycontent" id="myModal">
