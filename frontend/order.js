document.addEventListener("DOMContentLoaded", () => {
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const checkoutForm = document.getElementById("checkoutForm");
  const successModal = document.getElementById("successModal");
  const confirmPhone = document.getElementById("confirmPhone");
  const orderNumber = document.getElementById("orderNumber");
  const countdownEl = document.getElementById("countdown");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const convince = document.getElementById("Convince").value;
  subtotalEl.textContent = new URLSearchParams(window.location.search).get(
    "price"
  );
  
  totalEl.textContent = subtotalEl.textContent * 1 + 0 * 1;
  placeOrderBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      class: document.getElementById("class").value.trim(),
      division: document.getElementById("division").value.trim(),
      phoneNumber: document.getElementById("phoneNumber").value.trim(),
      email: document.getElementById("email").value.trim(),
      school: document.getElementById("school").value.trim(),
      notes: document.getElementById("notes").value.trim(),
      orderName: new URLSearchParams(window.location.search).get("product"),
      orderPrice: new URLSearchParams(window.location.search).get("price"),
      orderDetails: "Product order from website",
    };


    // Quick validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.class ||
      !formData.division ||
      !formData.phoneNumber
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://expotech1-7.onrender.com/Orders/placeorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      
        if (response.ok) {
        alert("✅ " + result.message);
        // ✅ Show success modal
        successModal.style.display = "flex";
        confirmPhone.textContent = formData.phoneNumber;
        orderNumber.textContent = Math.floor(Math.random() * 100000); // fake order ID

        // Reset form
        checkoutForm.reset();

        // Redirect countdown
        let counter = 5;
        const timer = setInterval(() => {
          counter--;
          countdownEl.textContent = counter;
          if (counter <= 0) {
            clearInterval(timer);
            redirectToHome();
          }
        }, 1000);
      } else {
        alert("❌ Error: " + (result.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Could not connect to server");
    }
  });
});

function redirectToHome() {
  window.location.href = "./index.html"; // redirect to homepage
}
