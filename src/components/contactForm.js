export function contactForm() {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");
    const submitMessage = document.getElementById("submit-message");
    const fullName = document.getElementById("fullName");
    const submitButton = document.getElementById("sendBtn");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailValue = emailInput.value;
        if (validateEmail(emailValue)) {
            errorMessage.textContent = "";
            // Handle successful email submission
            fullName.textContent = ""
            emailInput.textContent = ""

            submitMessage.textContent = 'Email succesfully sent!'
            submitMessage.classList.add("bg-green-100", "h-10", "py-2");
            setTimeout(() => {
                submitMessage.textContent = "";
                submitMessage.classList.remove("bg-green-100", "h-10", "py-2");
            }, 3000);
        } else {
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.classList.add("bg-red-100", "h-10", "py-2");
            setTimeout(() => {
                errorMessage.textContent = "";
                errorMessage.classList.remove("bg-red-100", "h-10", "py-2");
            }, 3000);
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
}