<template>   
<div class="row" v-on:click.stop.prevent="togglePanel">
    <div class="pv-" style="width:1400px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;">
        <div style="width:5%;"><img v-bind:src="minifig.image_url" style="width:24px;height:24px;"></div>
        <div style="width:5%;">{{ minifig.no }}</div>
        <div style="width:45%;">{{ minifig.name | decodeHTML }}</div>     
        <div v-if="minifig.subset" style="width:5%; text-align: right">{{ minifig.subset.length }}</div>  
        <div style="width:5%; text-align: right">{{ minifig.year_released }}</div> 
        <div v-if="minifig.price_stock" style="width:5%; text-align: right">{{ minifig.price_stock.total_quantity }}</div>  
        <div v-else style="width:5%; text-align: right">0</div> 
        <div v-if="minifig.price_stock" style="width:10%; text-align: right">{{ minifig.price_stock.avg_price }}</div>
        <div v-else style="width:10%; text-align: right">N/A</div> 
        <div v-if="minifig.price_sold" style="width:10%; text-align: right">{{ minifig.price_sold.avg_price }}</div>
        <div v-else style="width:10%; text-align: right">N/A</div>               
    </div>    
</div>     
<!--
    <div class="d-f fxd-r fxw-w mb-" style="width:100%;padding-bottom: 12px;border-bottom: 1px solid lightgray">


        <div class="main">
            <div><img v-bind:src="minifig.image_url" style="width:88px"></div>
        </div>
        <div class="aside">

            <table>
                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">minifig number</td>
                    <td>{{ minifig.no }}</td>
                </tr>
                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">name</td>
                    <td>{{ minifig.name | decodeHTML }}</td>                
                </tr>
                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">category</td>
                    <td>{{ minifig.category_id }}</td>                
                </tr>  
                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">year released</td>
                    <td>{{ minifig.year_released }}</td>                
                </tr> 
                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">qty</td>
                    <td v-if="minifig.price_stock">{{ minifig.price_stock.total_quantity }}</td>  
                    <td v-else>0</td>              
                </tr>     

                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">composed of</td>
                    <td v-if="minifig.subset"><a href="" v-on:click.stop.prevent="toggleSubset()">{{ minifig.subset.length }}</span> parts</a></td>                
                    <td v-else>N/A</td>              
                </tr>     
                <tr v-if="minifig.subset" v-show="showSubset">
                    <td></td>
                    <td style="padding-bottom: 12px">
                        <ul v-for="subset in minifig.subset" style="margin-left:12px">
                            <li v-for="part in subset.entries">{{part.item.name}}</li>
                        </ul>  
                    </td>
                </tr>  

                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">appears in</td>
                    <td v-if="minifig.superset"><a href="" v-on:click.stop.prevent="toggleSuperset()">{{ minifig.superset.entries.length }} sets</a></td>  
                    <td v-else>N/A</td>              
                </tr> 
                <tr v-if="minifig.superset" v-show="showSuperset">
                    <td></td>
                    <td style="padding-bottom: 12px">
                        <ul v-for="superset in minifig.superset.entries" style="margin-left:12px">
                            <li>{{superset.item.name}}</li>
                        </ul>
                    </td>
                </tr>  

                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">average price</td>
                    <td v-if="minifig.price_stock"><a href="" v-on:click.stop.prevent="togglePrice()">{{ minifig.price_stock.avg_price }}</a></td>
                    <td v-else>N/A</td>
                </tr>  
                <tr v-if="minifig.price_stock" v-show="showPrice">
                    <td></td>
                    <td style="padding-bottom: 12px">
                        <ul v-for="price in minifig.price_stock.price_detail" style="margin-left:12px">
                            <li>{{ price.quantity }} {{ price.unit_price }}</li>
                        </ul>  
                    </td>
                </tr>   

                <tr>
                    <td style="white-space: nowrap;padding-right:12px;">average price sold</td>
                    <td v-if="minifig.price_sold"><a href="" v-on:click.stop.prevent="toggleSold()">{{ minifig.price_sold.avg_price }}</a></td>
                    <td v-else>N/A</td>
                </tr>  
                <tr v-if="minifig.price_sold" v-show="showSold">
                    <td></td>
                    <td style="padding-bottom: 12px">
                        <ul v-for="price in minifig.price_sold.price_detail" style="margin-left:12px">
                            <li>{{ price.quantity }} {{ price.unit_price }} {{ price.date_ordered }} {{ price.seller_country_code }}</li>
                        </ul>  
                    </td>
                </tr>     
                 
            </table>      
        </div>        
    </div>    
    -->
</template>



<script>
    export default {
        name: 'Minifig',
        props: ['minifig'],
        data () {
            return {
                showPanel: false,
                showSubset: false,
                showSuperset: false,
                showPrice: false,
                showSold: false
            }
        },
        filters: {
            decodeHTML(html) {
                var txt = document.createElement("textarea");
                txt.innerHTML = html;
                return txt.value;
            }
        },
        methods: {
            togglePanel() {
                 this.$store.dispatch('togglePanel', this.minifig)
            },
            toggleSubset() {
                this.showSubset = !this.showSubset;
            },
            toggleSuperset() {
                this.showSuperset = !this.showSuperset;
            },
            togglePrice() {
                this.showPrice = !this.showPrice;
            },
            toggleSold() {
                this.showSold = !this.showSold;
            }                                                  
        }
    }
</script>