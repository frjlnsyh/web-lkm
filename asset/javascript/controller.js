const aside = document.querySelector(".right-aside");
const navDesk = document.querySelector(".nav-desk");
const headContent = document.querySelector(".head-content");
const bodyAside = document.querySelector(".body-right-aside");

/* HOVER — DIPASANG SEKALI */
aside.addEventListener("mouseover", function () {
    if (!bodyAside.classList.contains("clicked") && window.scrollY > 80) {
        this.classList.remove("collapsed");
    }
});

aside.addEventListener("mouseout", function () {
    if (!bodyAside.classList.contains("clicked") && window.scrollY > 80) {
        this.classList.add("collapsed");
    }
});

window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
        document.querySelector(".nav-wrapper").classList.add("scroll");
    } else {
        document.querySelector(".nav-wrapper").classList.remove("scroll");
    }
    
    // ⛔ JIKA BODY ASIDE DICLICK → STOP
    if (bodyAside && bodyAside.classList.contains("clicked")) {
        return;
    }

    if (window.scrollY > 80) {

        aside.classList.add("collapsed");

        document.querySelector(".nav-desk").classList.add("scroll");
        document.querySelector(".head-content").classList.add("scroll");
        
    } else {

        aside.classList.remove("collapsed");

        document.querySelector(".nav-desk").classList.remove("scroll");
        document.querySelector(".head-content").classList.remove("scroll");

    }
});

const menuLinks = document.querySelectorAll(".right-aside a");
const panels = document.querySelectorAll(".content-panel");

menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = this.dataset.target;

        // HAPUS ACTIVE SEMUA
        panels.forEach(panel => panel.classList.remove("active"));
        menuLinks.forEach(l => l.classList.remove("active"));

        // AKTIFKAN YANG DIKLIK
        document.querySelector(".body-right-aside").classList.add("clicked");
        document.getElementById(target).classList.add("active");
        this.classList.add("active");
    });
    
    document.addEventListener("click", function (e) {
        if (!aside.contains(e.target)) {
            menuLinks.forEach(l => l.classList.remove("active"));
            bodyAside.classList.remove("clicked");
            // kalau mau panel juga ikut hilang, buka komentar ini:
            // panels.forEach(p => p.classList.remove("active"));
        }
    });
});


// Navbar Controller
document.addEventListener('DOMContentLoaded', function() {
    var click = document.getElementById('nav-bar');

    var bars1 = document.getElementsByClassName('bar-1');
    var bars2 = document.getElementsByClassName('bar-2');
    var bars3 = document.getElementsByClassName('bar-3');

    var bodNavMob = document.getElementsByClassName('body-nav-mob');
    var searchBarTopMob = document.getElementById('search-bar-top-mob');

    var body = document.getElementsByTagName('body');
    
    let isAnimating = false;

    click.addEventListener('click', function () {


        // 🚫 Cegah klik berulang saat animasi
        if (isAnimating) return;
        isAnimating = true;

        const nav = bodNavMob[0];
        const isOpen = nav.classList.contains('active-body-nav-mob');

        // === Toggle icon ===
        [...bars1].forEach(el => el.classList.toggle('active-bar1'));
        [...bars2].forEach(el => el.classList.toggle('active-bar2'));
        [...bars3].forEach(el => el.classList.toggle('active-bar3'));

        [...body].forEach(el => el.classList.toggle('no-scroll'));

        if (!isOpen) {
            // === OPEN ===
            nav.classList.add('active-body-nav-mob');
            searchBarTopMob.classList.add('active-search-bar-top-mob');

            setTimeout(() => {
                nav.classList.add('show-items');
            }, 200);

        } else {
            // === CLOSE ===
            nav.classList.remove('show-items');

            setTimeout(() => {
                nav.classList.remove('active-body-nav-mob');
                searchBarTopMob.classList.remove('active-search-bar-top-mob');
            }, 400);
        }
        
        // unlock setelah animasi selesai
        setTimeout(() => {
            isAnimating = false;
        }, 700);
    });

});

const texts = [
    "Cari produk terbaik...",
    "Cari layanan LKM...",
    "Cari promo terbaru...",
    "Cari informasi lainnya..."
];

const input = document.getElementById("search_head");
const placeholder = document.querySelector(".typing-placeholder");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingInterval;

function startTyping() {
    typingInterval = setInterval(() => {
        const currentText = texts[textIndex];

        if (!isDeleting) {
            charIndex++;
            placeholder.textContent = currentText.slice(0, charIndex);

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(() => {}, 1000);
            }
        } else {
            charIndex--;
            placeholder.textContent = currentText.slice(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
    }, 80);
}

/* STOP saat user fokus */
input.addEventListener("focus", () => {
    placeholder.style.opacity = "0";
});

/* LANJUT saat kosong */
input.addEventListener("blur", () => {
    if (!input.value) {
        placeholder.style.opacity = "1";
    }
});

startTyping();