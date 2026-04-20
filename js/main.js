// ハンバーガーメニュー
const hamburger = document.querySelector(".js-hamburger");
const headerNav = document.querySelector(".header__nav");

if (hamburger && headerNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("is-open");
    headerNav.classList.toggle("is-open");
    document.body.style.overflow = isOpen ? "hidden" : "";
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く"
    );
  });

  // ナビリンクをクリックしたら閉じる
  headerNav.querySelectorAll(".header__nav-item a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-open");
      headerNav.classList.remove("is-open");
      document.body.style.overflow = "";
      hamburger.setAttribute("aria-label", "メニューを開く");
    });
  });
}

// スクロールフェードイン
document.querySelectorAll("section").forEach((section) => {
  const children = section.querySelectorAll(
    ":scope > * > *:not(.section__title):not(.voice__items)"
  );
  children.forEach((el, i) => {
    el.classList.add("js-fadein");
    el.style.transitionDelay = `${i * 0.15}s`;
  });
});

// voice items を1つずつ遅延してフェードイン
document.querySelectorAll(".voice__item").forEach((item, i) => {
  item.classList.add("js-fadein");
  item.style.transitionDelay = `${i * 0.6}s`;
  item.style.transitionDuration = "1.6s";
});

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".js-fadein").forEach((el) => {
  fadeObserver.observe(el);
});

// ヘッダーナビ sticky
const headerLogo = document.querySelector(".header__logo");
if (headerLogo && headerNav) {
  const stickyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          headerNav.classList.add("is-sticky");
        } else {
          headerNav.classList.remove("is-sticky");
        }
      });
    },
    { threshold: 0 }
  );
  stickyObserver.observe(headerLogo);
}

const targets = document.querySelectorAll(".section__title");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-active");
    }
  });
});

targets.forEach((target) => observer.observe(target));

// GALLERY スワイパー
const swiper = new Swiper("#js-gallery-swiper", {
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,

  speed: 800,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// アコーディオン
// jQuery(document).ready(function () {

//   // 最初のfaqを開いた状態にする
//   $firstItem.addClass("is-open");
//   $firstItem.find(".faq-box__head-button").addClass("is-open");
//   $firstItem.find(".faq-box__body").show(); // slideDown じゃなく show で一瞬で表示
// });

// アコーディオン開閉処理
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  const $this = jQuery(this);
  const $parent = $this.parent();
  const $content = $this.next();

  if ($parent.hasClass("is-open")) {
    $parent.removeClass("is-open");
    $content.slideUp();
  } else {
    $parent.addClass("is-open");
    $content.slideDown();
  }
});

jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }
});

// Gallery モーダル
// const modal = document.getElementById("gallery-modal");
// const modalImage = document.getElementById("gallery-modal-image");
// const modalTitle = document.getElementById("gallery-modal-title");
// const modalPrice = document.getElementById("gallery-modal-price");
// const modalDesign = document.getElementById("gallery-modal-design");
// const modalDescription = document.getElementById("gallery-modal-description");
// const closeButton = document.querySelector(".gallery-modal__close");
// const overlay = document.querySelector(".gallery-modal__overlay");
// const openButtons = document.querySelectorAll(".js-gallery-open");

// if (modal && modalImage && modalTitle && modalPrice && openButtons.length) {
//   openButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       modalImage.src = button.dataset.image || "";
//       modalImage.alt = button.dataset.title || "";
//       modalTitle.textContent = button.dataset.title || "";
//       modalPrice.textContent = "¥" + button.dataset.price || "";
//       modalDesign.textContent = button.dataset.design || "";
//       modalDescription.textContent = button.dataset.description || "";

//       modal.hidden = false;
//       document.body.style.overflow = "hidden";
//     });
//   });

//   function closeModal() {
//     modal.hidden = true;
//     document.body.style.overflow = "";
//   }

//   if (closeButton) {
//     closeButton.addEventListener("click", closeModal);
//   }

//   if (overlay) {
//     overlay.addEventListener("click", closeModal);
//   }

//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && !modal.hidden) {
//       closeModal();
//     }
//   });
// }

//Gallery モーダルのセレクトボックス
// const allSelects = document.querySelectorAll("select");

// allSelects.forEach((select) => {
//   select.addEventListener("change", () => {
//     if (select.value !== "") {
//       select.classList.add("is-selected");
//     } else {
//       select.classList.remove("is-selected");
//     }
//   });
// });

// const form = document.querySelector(".gallery__container-form");

// if (form) {
//   const formSelects = form.querySelectorAll("select");

//   formSelects.forEach((select) => {
//     select.addEventListener("change", () => {
//       form.submit();
//     });
//   });
// }

//Gallery select ボタン
{
  /* <script>
  const designSelect = document.getElementById("designSelect");
  const priceSelect = document.getElementById("priceSelect");
  const galleryCards = document.querySelectorAll(".gallery-card");
  const noResultMessage = document.getElementById("noResultMessage");

  function filterGallery() {
    const selectedDesign = designSelect.value;
    const selectedPrice = priceSelect.value;
    let visibleCount = 0;

    galleryCards.forEach((card) => {
      const cardDesign = card.dataset.design;
      const cardPrice = Number(card.dataset.price);

      const matchDesign =
        selectedDesign === "" || cardDesign === selectedDesign;

      const matchPrice =
        selectedPrice === "" || cardPrice <= Number(selectedPrice);

      if (matchDesign && matchPrice) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    noResultMessage.style.display = visibleCount === 0 ? "block" : "none";
  }

  designSelect.addEventListener("change", filterGallery);
  priceSelect.addEventListener("change", filterGallery);
</script> */
}

const modal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("gallery-modal-image");
const modalTitle = document.getElementById("gallery-modal-title");
const modalPrice = document.getElementById("gallery-modal-price");
const modalDesign = document.getElementById("gallery-modal-design");
const modalDescription = document.getElementById("gallery-modal-description");
const closeButton = document.querySelector(".gallery-modal__close");
const overlay = document.querySelector(".gallery-modal__overlay");
const openButtons = document.querySelectorAll(".js-gallery-open");

const designSelect = document.getElementById("designSelect");
const priceSelect = document.getElementById("priceSelect");
const galleryCards = document.querySelectorAll(".gallery-card");
const noResultMessage = document.getElementById("noResultMessage");

// モーダル
if (modal && modalImage && modalTitle && modalPrice && openButtons.length) {
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".gallery-card");

      modalImage.src = button.dataset.image || "";
      modalImage.alt = button.dataset.title || "";
      modalTitle.textContent = button.dataset.title || "";
      modalPrice.textContent = button.dataset.price || "";
      modalDesign.textContent = card?.dataset.design || "";
      modalDescription.textContent = button.dataset.description || "";

      modal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.hidden = true;
    modalImage.src = "";
    modalImage.alt = "";
    document.body.style.overflow = "";
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

// select の見た目変更
const allSelects = document.querySelectorAll("select");

allSelects.forEach((select) => {
  select.addEventListener("change", () => {
    if (select.value !== "") {
      select.classList.add("is-selected");
    } else {
      select.classList.remove("is-selected");
    }
  });
});

// 絞り込み
function filterGallery() {
  const selectedDesign = designSelect.value;
  const selectedPrice = priceSelect.value;
  let visibleCount = 0;

  galleryCards.forEach((card) => {
    const cardDesign = card.dataset.design;
    const cardPrice = Number(card.dataset.price);

    const matchDesign =
      selectedDesign === "" ||
      selectedDesign === "all" ||
      cardDesign === selectedDesign;

    const matchPrice =
      selectedPrice === "" ||
      selectedPrice === "all" ||
      cardPrice <= Number(selectedPrice);

    if (matchDesign && matchPrice) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResultMessage.style.display = visibleCount === 0 ? "block" : "none";
}

if (designSelect && priceSelect) {
  designSelect.addEventListener("change", filterGallery);
  priceSelect.addEventListener("change", filterGallery);
}
