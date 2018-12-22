var app = new Vue ({
    el: "#app",
    data: {
        brand : "Your",
        product : "Basic Chucks",
        inventory: 20,
        cart: 0,
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
    },
    methods:{
        addToCart: function(){
            
            if(this.variants[this.selectedVariant].quantity > 0){
                this.cart++;
                this.variants[this.selectedVariant].quantity--;
                //console.log("quantity : " + this.variants[this.selectedVariant].quantity);
            }
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