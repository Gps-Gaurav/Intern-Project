import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        link: '/dashboard',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
       
    },
  
   
    {
        id: 12,
        label: 'MASTER',
        icon: 'bx-store',
        subItems: [
           
{  id: 21, label: 'Product',link:'/master/product',parentId: 12 },



{  id: 21, label: 'Item',link:'/master/item',parentId: 12 },
{  id: 21, label: 'Diamond',link:'/master/diamond',parentId: 12 },
{  id: 21, label: 'Ledger',link:'/master/ledger',parentId: 12 },

{  id: 21, label: 'OpBill_Entry',link:'/master/OpBill_Entry',parentId: 12 },
{  id: 21, label: 'Packet',link:'/master/packet',parentId: 12 },

{  id: 21, label: 'Unit_Relation',link:'/master/unit_relation',parentId: 12 },

        ]
    },

    {
        id: 12,
        label: 'INVOICES',
        icon: 'bx-store',
        subItems: [
           
{  id: 21, label: 'Detail',link:'/invoices/detail',parentId: 12 },
{  id: 21, label: 'List',link:'/invoices/list',parentId: 12 },
{  id: 21, label: 'PriceList',link:'/invoices/price-list',parentId: 12 },

        ]
    }
   
];

