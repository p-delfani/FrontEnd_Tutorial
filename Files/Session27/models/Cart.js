class Cart{
    constructor(parent , price){
        this.parent = parent;
        this.price = price; 
        this.products = [];
        this.toShow = [];
        this.parent.addEventListener("click",this);
    }

    showProducts () {
        this.toShow = [...new Set(this.products)];
        this.parent.innerHTML = ""; 
        this.toShow.forEach((product) =>{
            const qty = this.products.filter((p)=> p.id === product.id).length;
            this.createCard(product, qty);
            this.calculateTotalPrice();
        });
    }

    createCard(data, qty){
        const cardEle = document.createElement("div"); 
        const imgEle = this.productImg(data);
        const infoEle = this.productInfo(data);
        const controlEle = this.productControl(data, qty);

        cardEle.innerHTML = imgEle;
        cardEle.innerHTML += infoEle;
        cardEle.innerHTML += controlEle;
        this.parent.appendChild(cardEle);
    }

    productImg(data){
        const {image, alt} = data;
        const imgJSX = `<img alt="${alt}" src="${image}"/>`; 
        return imgJSX;
    }

    productInfo(data){
        const {name , price} = data;
        const infoJsx = `
        <div id="cart-info">
        <h4>${name}</h4>
        <p>$ ${price}</p>
        </div>`;
        return infoJsx;
    }

    productControl(data , qty ){
        const {id} = data;
        const controlJSX = `
        <div class="cart-control">
          <div>
            <button data-id="${id}">-</button>
            <span>${qty}</span>
            <button data-id="${id}">+</button>
          </div>
          <button data-id="${id}">remove</button>
        </div>`;
        return controlJSX;
    }

    handleEvent(event){
        const tagName = event.target.tagName;
        const id = event.target.dataset.id;
        const type = event.target.innerText;

        if(tagName !== "BUTTON") return ;

        switch(type)
        {
            case "+":
                this.increase(id);
                break;
            case "-":
                this.decrease(id);
                break;
            case "remove":
                this.remove(id);
                break;        
        }
    }

    increase(id){
        const product = this.products.find((p) => p.id === +id); 
        this.products.push(product);
        this.showProducts();
    }

    decrease(id){
        const index = this.products.findIndex((p) => p.id === +id);
        if(index !== -1){
            this.products.splice(index,1);
            this.showProducts();
        }
    }

    remove(id){
        const newProducts = this.products.filter((p)=> p.id != id);
        this.products = newProducts;
        this.showProducts();
    }

    calculateTotalPrice(){
        const total = this.products.reduce((acc, cur) => acc += cur.price, 0);
        this.price.innerText = "$" + total;
    }
}

export default Cart;
