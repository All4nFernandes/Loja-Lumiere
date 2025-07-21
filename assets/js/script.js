// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVEGAÇÃO MOBILE =====
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle do menu mobile
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // ===== CARROSSEL =====
  const carousel = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const indicators = document.querySelectorAll(".indicator");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Função para atualizar o carrossel
  function updateCarousel() {
    const translateX = -currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;

    // Atualiza indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  // Próximo slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  // Slide anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Event listeners dos botões
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Event listeners dos indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Auto-play do carrossel (opcional)
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Pausa o auto-play quando o mouse está sobre o carrossel
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", function () {
    clearInterval(autoPlayInterval);
  });

  carouselContainer.addEventListener("mouseleave", function () {
    autoPlayInterval = setInterval(nextSlide, 5000);
  });

  // ===== NAVEGAÇÃO SUAVE =====
  // Adiciona scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Adiciona sombra ao header quando rola a página
    if (scrollTop > 100) {
      header.style.boxShadow = "0 2px 20px rgba(180, 149, 106, 0.3)";
    } else {
      header.style.boxShadow = "0 2px 20px rgba(180, 149, 106, 0.15)";
    }

    lastScrollTop = scrollTop;
  });

  // ===== ANIMAÇÕES DE ENTRADA =====
  // Intersection Observer para animações quando elementos entram na tela
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observa elementos para animação
  const animatedElements = document.querySelectorAll(
    ".product-card, .about-text > *, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simula envio do formulário
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = "Mensagem Enviada!";
        submitBtn.style.background = "#4CAF50";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // ===== NEWSLETTER =====
  const newsletter = document.querySelector(".newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();

      const button = this.querySelector("button");
      const input = this.querySelector("input");
      const originalHTML = button.innerHTML;

      button.innerHTML = '<i class="fas fa-check"></i>';
      button.style.background = "#4CAF50";
      input.value = "";

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = "";
      }, 2000);
    });
  }

  // ===== BOTÕES DE PRODUTO =====
  const productBtns = document.querySelectorAll(".product-btn");
  productBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const originalText = this.textContent;

      this.textContent = "Adicionado!";
      this.style.background = "#4CAF50";
      this.disabled = true;

      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = "";
        this.disabled = false;
      }, 2000);
    });
  });

  // ===== BOTÃO CTA HERO =====
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      const produtosSection = document.querySelector("#produtos");
      if (produtosSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = produtosSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  // ===== ÍCONES DE NAVEGAÇÃO =====
  const searchIcon = document.querySelector(".nav-icons .fa-search");
  const cartIcon = document.querySelector(".nav-icons .fa-shopping-bag");
  const userIcon = document.querySelector(".nav-icons .fa-user");

  if (searchIcon) {
    searchIcon.addEventListener("click", function () {
      alert("Funcionalidade de busca em desenvolvimento!");
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      alert("Carrinho de compras em desenvolvimento!");
    });
  }

  if (userIcon) {
    userIcon.addEventListener("click", function () {
      alert("Área do usuário em desenvolvimento!");
    });
  }

  // ===== TOUCH/SWIPE PARA CARROSSEL (MOBILE) =====
  let startX = 0;
  let endX = 0;

  carouselContainer.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  carouselContainer.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - próximo slide
        nextSlide();
      } else {
        // Swipe right - slide anterior
        prevSlide();
      }
    }
  }

  // ===== LOADING ANIMATION =====
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // ===== SCROLL TO TOP =====
  // Cria botão de voltar ao topo
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(180, 149, 106, 0.3);
    `;

  document.body.appendChild(scrollTopBtn);

  // Mostra/esconde botão baseado no scroll
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.visibility = "visible";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.visibility = "hidden";
    }
  });

  // Funcionalidade do botão
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  console.log("Site Lumière carregado com sucesso! ✨");
});
