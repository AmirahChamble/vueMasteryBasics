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

                    <product-tabs/>

                    // <div>
                    //     <h1> Reviews </h1>
                    //     <p v-if="!reviews.length"> There are no reviews yet. </p>

                    //     <ul>
                    //         <li v-for="review in reviews" >
                    //             <p>Name: {{ review.name }} </p>
                    //             <p>Review: {{ review.review }} </p>
                    //             <p>Ratint: {{ review.rating }} </p>
                    //          </li>
                    //     </ul>
                    
                    // </div>

                    // <product-review @review-resubmitted="addReview"/>
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
            ],
            reviews : [ ]
        }
    },
    methods:{
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id );
            
        },
        updateProduct: function(index){
            this.selectedVariant = index;
            //console.log(index);

        },
        addReview: function(productReview){
            this.reviews.push(productReview);
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

Vue.component('product-review',{
    template: ` 
        <form class="product-form" @submit.prevent="onSumbit">

            <p v-if=" errors.length ">
                <b>Please correct the following errors: </b>
                <ul>
                    <li v-for=" error in errors"> {{ error }}</li>  
                </ul>
            </p>
            <p>
                <label for="name" > Name: </label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review" > Review: </label>
                <textarea id="review" v-model="review"/>
            </p>

            <p>
                <label for="rating"> Rating: </label>
                <select id="rating" v-model.number="rating"> 
                    <option value="5" > 5 </option>
                    <option value="4" > 4 </option>
                    <option value="3" > 3 </option>
                    <option value="2" > 2 </option>
                    <option value="1" > 1 </option>
                    <option value="0" > 0 </option>
                </select>
            </p>

            <p>
                <input id="submit" type="submit" value="submit"/>
            </p>

        </form>
    `,
    data(){
        return{
            name: "",
            review: "",
            rating: "",
            errors: []
        }
    },
    methods:{
        onSumbit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name : this. name, 
                    review : this.review,
                    rating: this.rating,
                }
                this.$emit('review-resubmitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            }else{
                if(!this.name){
                    this.errors.push("name required.")
                }
                if(!this.review){
                    this.errors.push("review required.")
                }
                if(!this.rating){
                    this.errors.push("rating required.")
                }
            }
        }
        
    }
            
            
})

Vue.component('product-tabs', {
    template: `
    <div>
        <span 
            :class="{activeTab : selectedTab === tab}"
            class="tabs"
            v-for="(tab, index) in tabs"
            :key="index"
            @click = "selectedTab = tab" 
            > {{ tab }} </span>
    </div>
    `,
    data(){
        return{
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    }
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