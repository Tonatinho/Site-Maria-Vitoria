// ===== MENU MOBILE =====
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")

menuToggle.addEventListener("click", function () {
  this.classList.toggle("active")
  nav.classList.toggle("active")
})

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    nav.classList.remove("active")
  })
})

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll(".fade-in")

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

fadeElements.forEach((element) => {
  observer.observe(element)
})

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector(".header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)"
  }

  lastScroll = currentScroll
})

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Coleta os dados do formulário
    const formData = new FormData(this)
    const name = formData.get("name")
    const phone = formData.get("phone")
    const service = formData.get("service")
    const message = formData.get("message")

    // Monta a mensagem para o WhatsApp
    let whatsappMessage = `Olá! Meu nome é ${name}.`
    if (service) {
      whatsappMessage += ` Tenho interesse no serviço: ${service}.`
    }
    if (message) {
      whatsappMessage += ` ${message}`
    }
    if (phone) {
      whatsappMessage += ` Meu telefone: ${phone}`
    }

    // Redireciona para o WhatsApp
    const whatsappUrl = `https://wa.me/5544997168269?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")

    // Limpa o formulário
    this.reset()
  })
}
