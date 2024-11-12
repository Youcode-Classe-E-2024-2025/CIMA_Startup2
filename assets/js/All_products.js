const numbre_elements_page = 16 ;
let currentpage = 1 ;

function displayproducts(page){
  
  const startindex = (page - 1)*numbre_elements_page ;
  const endindex = page + numbre_elements_page ;
  const currentproducte = product.slice(startindex,endindex) ;
}

const product_container = document.getElementById("product_container");
product_container.innerHTML = " "