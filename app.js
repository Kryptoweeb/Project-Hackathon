const form = document.getElementById("check-form");
const urlInput = document.getElementById("url-input");
const emailCheckbox = document.getElementById("email-checkbox");
const emailInput = document.getElementById("email-input");
const submitBtn = document.getElementById("submit-btn");
const responseContainer = document.getElementById("response");
const responsePre = document.getElementById("response-pre");
const errorContainer = document.getElementById("error");
const errorMessage = document.getElementById("error-message");

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();  // Prevent form submission

  const url = urlInput.value;
  const email = emailCheckbox.checked ? emailInput.value : null;

  submitBtn.disabled = true;  // Disable submit button
  submitBtn.textContent = "Processing...";

  // Reset previous response and error
  responseContainer.classList.add("hidden");
  errorContainer.classList.add("hidden");

  try {
    const res = await fetch("http://localhost:5000/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, email })
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle API error
      errorContainer.classList.remove("hidden");
      errorMessage.textContent = data.message || "Something went wrong.";
    } else {
      // Handle success response
      responseContainer.classList.remove("hidden");
      responsePre.textContent = JSON.stringify(data, null, 2);
    }
  } catch (error) {
    // Handle network errors
    console.error("Network error:", error);  // Log the full error for debugging
    errorContainer.classList.remove("hidden");
    errorMessage.textContent = `Network error: ${error.message}. Please try again.`;
  }

  // Re-enable submit button
  submitBtn.disabled = false;
  submitBtn.textContent = "Enter";
});
