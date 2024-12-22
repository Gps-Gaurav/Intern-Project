
    <section class="content">
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
                            <table  border="1" width="100%" style="margin-top:25px;border-collapse:collapse;">
                                 <caption style="text-align: center;">
                               {company_info}
                                     <address style="margin-top:10px">
                                        <strong style="font-size: 20px; ">{company_name}</strong><br>
                                        {address}<br>
                                        <abbr><b><?php echo display('mobile') ?>:</b></abbr> {mobile}<br>
                                        <abbr><b><?php echo display('email') ?>:</b></abbr> 
                                        {email}<br>
                                        <abbr><b><?php echo display('website') ?>:</b></abbr> 
                                        {website}
                                    </address>

                               {/company_info}
                           </caption>
                                <thead>
                                    <tr>
                                        <th><?php echo display('sl') ?></th>
                                        <th><?php echo display('product_name') ?></th>
                                        <th><?php echo display('product_model') ?></th>
                                        <th><?php echo display('supplier_name') ?></th>
                                        <th><?php echo display('price') ?></th>
                                        <th><?php echo display('supplier_price') ?></th>
                                        <th><?php echo display('image') ?>s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    if ($product_list) {
                                        ?>
                                        {product_list}
                                        <tr>
                                            <td>{sl}</td>
                                            <td>
                                                 {product_name}
                                                  
                                            </td>
                                            <td>{product_model}</td>
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
                                            
                                    </tr>
                                    {/product_list}
                                    <?php
                                }
                                ?>
                                </tbody>
                            </table>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
