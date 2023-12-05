// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

document.getElementById("payBtn").onclick = function (e) {
    let user = firebase.auth().currentUser;
    if(user!==null) makePayment(e);
    else showToast("Please login to checkout!!")
};

function makePayment(e) {
  let grandTotal = JSON.parse(localStorage.getItem("InStyle_grandTotal"));
  let totalAmount = grandTotal.totalAmount;
  console.log(totalAmount);
  var options = {
    key: "rzp_test_p7YxIw6ziBREo3", // Enter the Key ID generated from the Dashboard
    amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    handler: function () {
      // Redirect the user to the shop.html page after the payment is completed
      showToast("Order has been placed successfully!!");
      setTimeout(() => {
        window.location.href = "./index.html";
        localStorage.removeItem("InStyle_CartItems");
      }, 2000);
    },
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  e.preventDefault();
}
