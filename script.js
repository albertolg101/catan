/**
 * Mobile Navigation Toggle
 * Handles opening/closing the mobile navigation menu
 */

// Get DOM elements
const navToggle = document.querySelector(".nav-toggle")
const mainNav = document.querySelector(".main-nav")
const navLinks = document.querySelectorAll(".nav-list a")

// Toggle navigation menu
function toggleNav() {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true"

  // Update ARIA attribute
  navToggle.setAttribute("aria-expanded", !isOpen)

  // Toggle class on nav
  mainNav.classList.toggle("is-open")

  // Prevent body scroll when menu is open on mobile
  if (!isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
}

// Close navigation menu
function closeNav() {
  navToggle.setAttribute("aria-expanded", "false")
  mainNav.classList.remove("is-open")
  document.body.style.overflow = ""
}

// Event listeners
if (navToggle) {
  navToggle.addEventListener("click", toggleNav)
}

// Close menu when clicking on a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", closeNav)
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (mainNav.classList.contains("is-open") && !mainNav.contains(e.target) && !navToggle.contains(e.target)) {
    closeNav()
  }
})

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
    closeNav()
    navToggle.focus() // Return focus to toggle button
  }
})

// Handle window resize - close menu if resizing to desktop
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768 && mainNav.classList.contains("is-open")) {
      closeNav()
    }
  }, 250)
})

/**
 * Smooth scroll enhancement
 * Adds smooth scrolling behavior for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")

    // Don't prevent default for links that just point to #
    if (href === "#") return

    e.preventDefault()
    const target = document.querySelector(href)

    if (target) {
      const headerOffset = 80 // Account for sticky header
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

/**
 * Log initialization
 */
console.log("[v0] Modern barebones site initialized")
console.log("[v0] Mobile navigation ready")
console.log("[v0] Smooth scroll enabled")
