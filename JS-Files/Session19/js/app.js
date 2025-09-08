// Product Page Project : 

const searchInput = document.getElementById("search-input");
const product = document.querySelectorAll(".product-item");
const buttons = document.querySelectorAll(".filter");
const pricebutton = document.getElementById("search-price").querySelector("button");

const changeclass = (filter)=> 
{
    buttons.forEach(button => 
    {
        if(button.dataset.filter === filter)
        {
            button.classList.add("selected")
        }
        else 
        {
            button.classList.remove("selected")
        }
    }
    )
};
const searchhandeler = (event) =>
{
    const searchvalue = event.target.value.toLowerCase().trim();
    product.forEach((product) => {
        const productname = product.children[1].innerText.toLowerCase();
        if(productname.includes(searchvalue))
        {
            product.style.display = "block"
        }
        else  
        {
            product.style.display = "none "

        }
    })

};

const searchpricehandeler = event => 
{
    const serachprice = +event.target.parentElement.children[0].value;

    product.forEach(product => 
    {
        const productprice = product.children[2].innerText;
        const price = productprice.split(" ")[1];
       
        if(!serachprice )
        {
            product.style.display = "block";
        }
        else
        {
            serachprice === price 
            ? product.style.display = "block" 
            : product.style.display = "none";
        }
    }
    )
}

const filterhandeler = (event) => {
    const filter = event.target.dataset.filter;
    changeclass(filter);
    product.forEach(product =>
    {
        const category = product.dataset.category;
        if(filter == "all")
        {
            product.style.display = "block";
        }
        else
        {
            filter === category 
            ? (product.style.display ="block")
            : (product.style.display ="none")
        }
    }
    )
};

buttons.forEach(button => 
{
    button.addEventListener("click",filterhandeler);
}
);
searchInput.addEventListener("keyup",searchhandeler)
pricebutton.addEventListener("click",searchpricehandeler)






