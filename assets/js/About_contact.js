document.getElementById("sendbtn").addEventListener("click", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstname");
    const lastName = document.getElementById("secondname");
    const email = document.querySelector('input[type="email"]');
    const message = document.getElementById("message");

    const errorHandling = document.querySelectorAll('#error');

    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;

    errorHandling.forEach((error) => (error.textContent = ""));
    [firstName, lastName, email, message].forEach((input) => {
        input.classList.remove("border-red-500");
        input.classList.add("border-black");
    });

    let isValid = true;

    if (!firstName.value.trim()) {
        showError(firstName, errorHandling[0], "Enter first name");
        isValid = false;
    } else if (!nameRegex.test(firstName.value)) {
        showError(firstName, errorHandling[0], "First name must only contain letters");
        isValid = false;
    }

    if (!lastName.value.trim()) {
        showError(lastName, errorHandling[1], "Enter last name");
        isValid = false;
    } else if (!nameRegex.test(lastName.value)) {
        showError(lastName, errorHandling[1], "Last name must only contain letters");
        isValid = false;
    }

    if (!email.value.trim()) {
        showError(email, errorHandling[2], "Enter email address");
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, errorHandling[2], "Enter a valid email address");
        isValid = false;
    }

    if (!message.value.trim()) {
        showError(message, errorHandling[3], "Message cannot be empty");
        isValid = false;
    }

    if (isValid) {
        [firstName, lastName, email, message].forEach((input) => {
            input.value = "";
            input.classList.remove("border-red-500");
        });

        showSuccessAnimation();
    }
});

function showError(input, errorHandling, message) {
    input.classList.add("border-red-500");
    input.classList.remove("border-black");
    errorHandling.textContent = message;
    errorHandling.classList.add("text-red-500");
}

function showSuccessAnimation() {
    const form = document.querySelector("form");
    form.innerHTML = `
        <div class="flex flex-col items-center gap-4 animate-fade-in">
            <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11l3 3L22 4l-1.5-1.5L12 13.5 7.5 9l-1.5 1.5 3 3z"></path>
                </svg>
            </div>
            <h2 class="text-xl font-semibold text-green-600">Form submitted successfully!</h2>
            <p class="text-gray-500 text-sm">Thank you for reaching out. We'll get back to you shortly!</p>
        </div>
    `;

    setTimeout(() => {
        form.innerHTML = `
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Contact us</h1>
            <button id="sendbtn" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Submit</button>
        `;
    }, 4000);
}
