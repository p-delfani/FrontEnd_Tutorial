import Cart from "./models/Cart.js";
import Products from "./models/Products.js";
import { fetchData } from "./utils/httpsReq.js";

const productsNode = document.getElementById("products");
const cartListNode = document.getElementById("cart-list");
const totalPriceNode = document.getElementById("total-price").querySelector("span");

async function render() {
    const productsData = await fetchData(); 
    const cartInstance = new Cart(cartListNode , totalPriceNode);  
    const productsInstance = new Products(productsNode, productsData, cartInstance); 
    productsInstance.showProducts();
    console.log(cartInstance)
}
  
document.addEventListener("DOMContentLoaded", render);
