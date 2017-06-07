<template>
    <div>
        <div style="width:1400px; margin:12px auto;display:flex;flex-wrap:wrap;align-items:center;">
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showAll()">ALL</a></div>
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showBat()">BAT</a></div>
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showColtlbm()">COLTLBM</a></div>
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showDim()">DIM</a></div>
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showJunior()">JUNIOR</a></div>
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showSh()">SH</a></div>        
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showSpd()">SPD</a></div>
            <div style="margin-right:12px;"><a href="" v-on:click.prevent="showTlm()">TLM</a></div>
            <div>T: {{orderedMinifigs.length}}</div>
        </div>


        <div style="background:#fff;z-index:1;margin-bottom:12px;box-shadow:0 0 2px rgba(0,0,0,.2);">
            <div style="width:1400px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;padding:12px 0">
                <div style="width:5%;text-align: left;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">image</div>
                <div style="width:5%;text-align: left;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">no</div>
                <div style="width:45%;text-align: left;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">name</div>
                <div style="width:5%;text-align: right;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">pieces</div>
                <div style="width:5%;text-align: right;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">year</div>
                <div style="width:5%;text-align: right;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">qty</div>
                <div style="width:10%;text-align: right;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">price</div>
                <div style="width:10%;text-align: right;font-weight:500;color: rgba(117,117,117,1);transition: .15s opacity;">sold</div>
            </div>   
        </div>
        <minifig v-for="minifig in orderedMinifigs" v-bind:minifig="minifig"></minifig>
        <div v-if="isLoading" style="position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.8);"><div style="margin:auto;width:100px;color:white;">Loading</div></div>



        <div v-show="isOpen" style="background:#fff;position:fixed;right:0;z-index:2;top:0;bottom:0;width:290px;overflow-y:auto;transition:.15s all;box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);">
            <a href="" v-on:click.stop.prevent="hidePanel()">X</a>
            <div><img v-bind:src="currentMinifig.image_url" style="width:232px;padding:21px"></div>
            <div v-if="currentMinifig.subset">
                <ul v-for="subset in currentMinifig.subset" style="margin-left:12px">
                    <li v-for="part in subset.entries">{{part.item.name}}</li>
                </ul>           
            </div>
            <div v-if="currentMinifig.superset">
                <ul v-for="superset in currentMinifig.superset.entries" style="margin-left:12px">
                    <li>{{superset.item.name}}</li>
                </ul>            
            </div>
            <div v-if="currentMinifig.price_stock">
                <ul v-for="price in currentMinifig.price_stock.price_detail" style="margin-left:12px">
                    <li>{{ price.quantity }} {{ price.unit_price }}</li>
                </ul>
            </div>            
            <div v-if="currentMinifig.price_sold">
                <ul v-for="price in currentMinifig.price_sold.price_detail" style="margin-left:12px">
                    <li>{{ price.quantity }} {{ price.unit_price }} {{ price.date_ordered }} {{ price.seller_country_code }}</li>
                </ul>       
            </div>
        </div> 

    </div>
</template>

<script>
    import _ from 'lodash'
    import Minifig from './Minifig.vue'

    export default {
        components: { Minifig },    
        created () {
            this.$store.dispatch('fetchSPDMinifigs', {
                count: 500
            });
        },  
        computed: {
            orderedMinifigs () {
                return _
                .chain(this.$store.state.minifigs)
                .sortBy(minifig => minifig.no)
                .value()
            },
            isLoading() {
                return this.$store.state.showLoading
            },
            isOpen() {
                return this.$store.state.showPanel
            },
            currentMinifig() {
                return this.$store.state.minifig
            }
        },
        methods: {
            showAll() {
                this.$store.dispatch('fetchMinifigs', { count: 500 })
            },    
            hidePanel() {
                 this.$store.dispatch('hidePanel')
            },                    
            showBat() {
                this.$store.dispatch('fetchBATMinifigs')
            },
            showColtlbm() {
                this.$store.dispatch('fetchCOLTLBMMinifigs')
            },
            showDim() {
                this.$store.dispatch('fetchDIMMinifigs')
            },
            showJunior() {
                this.$store.dispatch('fetchJUNIORMinifigs')
            },
            showSh() {
                this.$store.dispatch('fetchSHMinifigs')
            },            
            showSpd() {
                this.$store.dispatch('fetchSPDMinifigs')
            },
            showTlm() {
                this.$store.dispatch('fetchTLMMinifigs')
            }                 
        }
    }
</script>