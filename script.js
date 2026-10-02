//elements reference
const prodcutsId = document.getElementById("productsContainer");
const cartId = document.getElementById("cartContainer");
const feedBackId = document.getElementById("feedback");
const totalPrice = document.getElementById("totalPrice");
const clearCartId = document.getElementById("clearCart");
const sortCartByPriceId = document.getElementById("sortCartByPrice");

//default valuees
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "SmartWattch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];

const cart = [];
let timer;    //to reset previous timer
clearCartId.addEventListener("click", clearCart);
sortCartByPriceId.addEventListener("click", sortCartDetails);

function clearCart(){
   if (cart.length > 0) {
    cart.length = 0;
    renderCartDetails();
    updateActionButtons();
    handleFeedback(`All then products are removed from the cart`, "error");
  }
}
function sortCartDetails(){
  if (cart.length > 0) {
    cart.sort(function (a, b) {
      return a.price - b.price;
    });
    renderCartDetails();
  }
}
const updateActionButtons = () => {
  sortCartByPriceId.disabled = cart.length === 0;
  clearCartId.disabled = cart.length === 0;
};

const renderProducts = () => {
  products.forEach((product) => {
    //object destructuring
    const { id, name, price } = product;
    const row = `<div class="product-row">
          <span>${name} - Rs. ${price}</span>
          <button onclick="addtoCart(${id})">Add to cart</button>
        </div>`;
    prodcutsId.insertAdjacentHTML("beforeend", row);
  });
};

const addtoCart = (id) => {
  const addtoCartProd = products.find((product) => {
    return product.id === id;
  });
  const isProductAdded = cart.some((value) => {
    return value.id === id;
  });
  if (isProductAdded) {
    feedBackId.style.backgroundColor = "red";
    handleFeedback(
      `${addtoCartProd.name} is already added to the cart`,
      "error",
    );
    return; //if product is already added to the cart dont add same item to the cart
  }
  //dynamically adding html to the container (cart) if we click on Add to cart
  cart.push(addtoCartProd);
  renderCartDetails();
  updateActionButtons();
  handleFeedback(`${addtoCartProd.name} is added to the cart`, "success");
};
const renderCartDetails = () => {
  cartId.innerHTML = "";
  let total = 0;
  cart.forEach((product) => {
    const { id: productId, name, price } = product;
    total += price;

    const row = `<div class="product-row">
          <span>${name} - Rs. ${price}</span>
          <button onclick="removeFromCart(${productId})">Remove</button>
        </div>`;
    cartId.insertAdjacentHTML("beforeend", row);
  });
  totalPrice.textContent = `Total Price: Rs.${total}`;
};

const handleFeedback = (msg, type) => {

  clearTimeout(timer);
  if (type?.toLowerCase() == "success")
    feedBackId.style.backgroundColor = "green";
  else feedBackId.style.backgroundColor = "red";

  feedBackId.textContent = msg;
  feedBackId.style.display = "block";
  timer = setTimeout(() => {
    feedBackId.style.display = "none";
  }, 3000);
};

const removeFromCart = (cartId) => {
  productIndexId = cart.findIndex((product) => product.id === cartId);
  const name = cart[productIndexId]?.name;
  cart.splice(productIndexId, 1);
  renderCartDetails();
  updateActionButtons();
  handleFeedback(`${name} is removed from the cart`, "error");
};

renderProducts();
updateActionButtons();
