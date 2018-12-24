Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:   `
    <div>
    <div class="product">
    <h1 class="page-title"> {{ title }} </h1>
</div>

<div class="product-section">

    <div class="product-image">
        <img v-bind:src="image"/>

        <div class="variants">
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id"
                class="variants-options"
                v-bind:style = "{backgroundColor: variant.color}"
                @mouseover="updateProduct(index)"
            ></div>
        </div>
    </div>

    <div class="product-info">
        <h1 > {{ product }} ( {{ variants[selectedVariant].color }} ) </h1>
        <p v-if="variants[selectedVariant].quantity > 10 ">In Stock</p>
        <p v-else-if="10 >= variants[selectedVariant].quantity && variants[selectedVariant].quantity > 0 "> Almost Sold Out !</p>
        <p v-else>Out of Stock</p>
        <p>Premium Member : {{ premium  }}</p>
        <p v-if="premium"> Shipping is $2.99 </p>
        <p v-else> Shipping is $4.99 </p>

        <ul>
            <li v-for="detail in details"> {{ detail }} </li>
        </ul>


        <div class="cart">
            <button 
                @click="addToCart"
                v-bind:disabled ="!inStock"
            > Add to Cart </button>
           
            
        </div>
    </div>
</div>
    </div>
    `,
    data(){
        return {
            brand : "Your",
            product : "Basic Chucks",
            inventory: 20,
            details: ["awesome", "super cool", "such a great deal", "buy it all ready"],
            selectedVariant: 0,
            variants: [
                {
                    id: '0',
                    font: 'white',
                    color: 'RED',
                    quantity: '20',
                    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80',
                },
                {
                    id: '1',
                    font: 'black',
                    color: 'WHITE',
                    quantity: '20',
                    img: 'https://images.unsplash.com/photo-1526765992122-6abcb1e0f4fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
                }
            ]
        }
    },
    methods:{
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id );
            
        },
        updateProduct: function(index){
            this.selectedVariant = index;
            //console.log(index);

        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].img;
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity;
        }
    },
})


var app = new Vue ({
    el: "#app",
    data: {
        cart: [ ],
        premium: true
    },
    methods:{
        updateCart(id){
                this.cart.push(id);
        }
    }

  
})