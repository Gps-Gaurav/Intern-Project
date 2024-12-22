<!-- Manage Product Start -->
<div class="content-wrapper">
    <section class="content-header">
        <div class="header-icon">
            <i class="pe-7s-note2"></i>
        </div>
        <div class="header-title">
            <h1><?php echo display('manage_product') ?></h1>
            <small><?php echo display('manage_your_product') ?></small>
            <ol class="breadcrumb">
                <li><a href="#"><i class="pe-7s-home"></i> <?php echo display('home') ?></a></li>
                <li><a href="#"><?php echo display('product') ?></a></li>
                <li class="active"><?php echo display('manage_product') ?></li>
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
         <?php if($this->permission1->method('create_product','create')->access()){ ?>
                    <a href="<?php echo base_url('Cproduct') ?>" class="btn btn-info m-b-5 m-r-2"><i class="ti-plus"> </i> <?php echo display('add_product') ?> </a>
<?php }?>
<?php if($this->permission1->method('add_product_csv','create')->access()){ ?>
                    <a href="<?php echo base_url('Cproduct/add_product_csv') ?>" class="btn btn-primary m-b-5 m-r-2"><i class="ti-plus"> </i>  <?php echo display('add_product_csv') ?> </a>
                    <?php }?>

                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body"> 

                        <form action="<?php echo base_url('Cproduct/product_by_search') ?>" class="form-inline" method="post" accept-charset="utf-8">

                            <label class="select"><?php echo display('product_name') ?>:</label>

                            <select class="form-control" name="product_id" style="width: 300px;">
                                <option value="">Select One</option>
                                {all_product_list}
                                <option value="{product_id}">{product_name}-({product_model})</option>
                                {/all_product_list}
                            </select>

                            <button type="submit" class="btn btn-primary"><?php echo display('search') ?></button>

                        </form>		            
                    </div>
                </div>
            </div>
        </div>

        <!-- Manage Product report -->
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-bd lobidrag">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4><?php echo display('manage_product') ?></h4>


                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table id="dataTableExample2" class="table table-bordered table-striped table-hover"> <span class="text-center"><a href="<?php echo base_url() . 'Cproduct/exportCSV'; ?>" class="btn btn-success">Export CSV </a> <a href="<?php echo base_url('Cproduct/product_downloadpdf')?>" class="btn btn-warning">Pdf</a> </span>
                                <thead>
                                    <tr>
                                        <th><?php echo display('sl') ?></th>
                                        <th><?php echo display('product_name') ?></th>
                                        <th><?php echo display('product_model') ?></th>
                                        <th><?php echo display('supplier_name') ?></th>
                                        <th><?php echo display('price') ?></th>
                                        <th><?php echo display('supplier_price') ?></th>
                                        <th><?php echo display('image') ?>s</th>
                                        <th style="width : 130px"><?php echo display('action') ?> <?php echo form_open('Cproduct/manage_product', array('class' => 'form-inline', 'method' => 'post')) ?>
                                             <input type="hidden" name="all" value="all">
                                              <button type="submit" class="btn btn-success"><?php echo display('all') ?></button>
                                             <?php echo form_close() ?>
                                            
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    if ($products_list) {
                                        ?>
                                        {products_list}
                                        <tr>
                                            <td>{sl}</td>
                                            <td>
                                                <a href="<?php echo base_url() . 'Cproduct/product_details/{product_id}'; ?>">
                                                    {product_name}
                                                    <br><small> {serial}</small>
                                                </a>			
                                            </td>
                                            <td><a href="<?php echo base_url() . 'Cproduct/product_details/{product_id}'; ?>">{product_model} </a></td>
                                            <td>{supplier_name}</td>
                                            <td style="text-align: right;">
                                                <?php echo (($position == 0) ? "$currency {price}" : "{price} $currency") ?>
                                            </td>
                                            <td style="text-align: right;">
                                                <?php echo (($position == 0) ? "$currency {supplier_price}" : "{supplier_price} $currency") ?>
                                            </td>
                                            <td class="text-center">
                                                <img src="{image}" class="img img-responsive center-block" height="50" width="50">
                                            </td>
                                            <td>
                                    <center>
                                        <?php echo form_open() ?>

                                        <a href="<?php echo base_url() . 'Cqrcode/qrgenerator/{product_id}'; ?>" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo display('qr_code') ?>"><i class="fa fa-qrcode" aria-hidden="true"></i></a>

                                        <a href="<?php echo base_url() . 'Cbarcode/barcode_print/{product_id}'; ?>" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo display('barcode') ?>"><i class="fa fa-barcode" aria-hidden="true"></i></a>
                                      <?php if($this->permission1->method('manage_product','update')->access()){ ?>
                                        <a href="<?php echo base_url() . 'Cproduct/product_update_form/{product_id}'; ?>" class="btn btn-info btn-sm" data-toggle="tooltip" data-placement="left" title="<?php echo display('update') ?>"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                    <?php }?>
                         <?php if($this->permission1->method('manage_product','delete')->access()){ ?>
                                       <a href="<?php echo base_url("Cproduct/product_delete/{product_id}") ?>" class=" btn btn-danger btn-sm" onclick="return confirm('<?php echo display('are_you_sure') ?>') "><i class="fa fa-trash-o" aria-hidden="true"></i>            
</a>                                      
                                       <?php }?>
                                        <?php echo form_close() ?>
                                    </center>
                                    </td>
                                    </tr>
                                    {/products_list}
                                    <?php
                                }
                                ?>
                                </tbody>
                            </table>
                            <div class="text-right"><?php
                                if ($links) {
                                    echo $links;
                                }
                                ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<!-- Manage Product End -->
