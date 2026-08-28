// ===============================
// DARK / LIGHT MODE
// ===============================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("light-mode")) {

            icon.classList.remove("bi-moon-fill");

            icon.classList.add("bi-sun-fill");

        } else {

            icon.classList.remove("bi-sun-fill");

            icon.classList.add("bi-moon-fill");
        }

    });

}

// ===============================
// TYPING ANIMATION
// ===============================

const typingText = document.getElementById("typing-text");

const roles = [
    ".NET Full Stack Developer",
    "ASP.NET Core Developer",
    "Backend Developer",
    "Web Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex === roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();

// ===============================
// COUNTER ANIMATION
// ===============================

const counters = document.querySelectorAll(".counter");

const startCounters = () => {

    counters.forEach(counter => {

        const target =
            parseInt(counter.getAttribute("data-target"));

        let count = 0;

        const updateCounter = () => {

            const increment = target / 40;

            count += increment;

            if (count < target) {

                counter.innerText =
                    Math.ceil(count);

                setTimeout(updateCounter, 40);

            } else {

                counter.innerText = target;

            }
        };

        updateCounter();

    });
};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const aboutSection =
        document.getElementById("about");

    if (!aboutSection) return;

    const sectionTop =
        aboutSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 150 &&
        !counterStarted) {

        counterStarted = true;

        startCounters();
    }

});

// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get fields
        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");

        const successMessage =
            document.getElementById("formSuccess");


        // Error elements
        const nameError =
            document.getElementById("nameError");

        const emailError =
            document.getElementById("emailError");

        const subjectError =
            document.getElementById("subjectError");

        const messageError =
            document.getElementById("messageError");


        // Clear previous errors

        name.classList.remove("input-error");
        email.classList.remove("input-error");
        subject.classList.remove("input-error");
        message.classList.remove("input-error");

        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        successMessage.classList.remove("show");


        let isValid = true;


        // NAME

        if (name.value.trim().length < 3) {

            name.classList.add("input-error");

            nameError.textContent =
                "Please enter your name.";

            isValid = false;
        }


        // EMAIL

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            email.classList.add("input-error");

            emailError.textContent =
                "Please enter a valid email.";

            isValid = false;
        }


        // SUBJECT

        if (subject.value.trim().length < 3) {

            subject.classList.add("input-error");

            subjectError.textContent =
                "Please enter a subject.";

            isValid = false;
        }


        // MESSAGE

        if (message.value.trim().length < 10) {

            message.classList.add("input-error");

            messageError.textContent =
                "Message should contain at least 10 characters.";

            isValid = false;
        }


        // SUCCESS

        if (isValid) {

            successMessage.classList.add("show");

            contactForm.reset();

            setTimeout(() => {

                successMessage.classList.remove("show");

            }, 5000);
        }

    });

}


// ===============================
// SKILL BAR ANIMATION
// ===============================

const skillSection = document.getElementById("skills");

const skillProgress =
    document.querySelectorAll(".skill-progress");

let skillsAnimated = false;

window.addEventListener("scroll", () => {

    if (!skillSection || skillsAnimated) return;

    const sectionTop =
        skillSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 150) {

        skillsAnimated = true;

        skillProgress.forEach(skill => {

            const width =
                skill.getAttribute("data-width");

            skill.style.width = width;

        });

    }

});


// ============================================
// PORTFOLIO DYNAMIC FEATURES
// ============================================


// ============================================
// 1. SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ============================================
// 2. ACTIVE NAVBAR LINK
// ============================================

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(
    ".navbar-nav .nav-link"
);

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


// ============================================
// 3. BACK TO TOP
// ============================================

const backToTop =
    document.querySelector(".back-to-top");

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    updateBackToTop
);

updateBackToTop();


// ============================================
// 4. SCROLL REVEAL ANIMATION
// ============================================

const revealElements =
    document.querySelectorAll(
        ".project-card, " +
        ".timeline-item, " +
        ".certification-card, " +
        ".tools-card, " +
        ".journey-step, " +
        ".soft-skill, " +
        ".contact-info-card, " +
        ".contact-form-card"
    );


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-element"
    );

    revealObserver.observe(element);

});


// ============================================
// 5. HERO TYPING EFFECT
// ============================================

const typingElement =
    document.querySelector(".typing-text");


if (typingElement) {

    const words = [
        ".NET Developer",
        "Full Stack Developer",
        "ASP.NET Core Developer",
        "Web Developer"
    ];

    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;


    function typeEffect() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;


            if (
                charIndex ===
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1500
                );

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;


            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (
                    wordIndex >=
                    words.length
                ) {

                    wordIndex = 0;

                }

            }

        }


        const speed =
            deleting ? 50 : 100;

        setTimeout(
            typeEffect,
            speed
        );

    }


    typeEffect();

}


// ============================================
// 6. SKILL CARD ANIMATION
// ============================================

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


const skillObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "skill-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.2
        }

    );


skillCards.forEach(card => {

    skillObserver.observe(card);

});


// ============================================
// 7. MOBILE NAVBAR CLOSE
// ============================================

const navbarLinks =
    document.querySelectorAll(
        ".navbar-nav .nav-link"
    );

const navbarCollapse =
    document.querySelector(
        ".navbar-collapse"
    );


navbarLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            if (
                window.innerWidth < 992 &&
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {

                const toggle =
                    document.querySelector(
                        ".navbar-toggler"
                    );

                if (toggle) {

                    toggle.click();

                }

            }

        }
    );

});


// ============================================
// 8. MOUSE GLOW EFFECT
// ============================================

const glow =
    document.createElement("div");

glow.className =
    "mouse-glow";

document.body.appendChild(glow);


document.addEventListener(
    "mousemove",
    function (event) {

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);