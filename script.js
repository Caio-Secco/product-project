document.addEventListener("DOMContentLoaded", function () {
    // MENU MOBILE
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');

    if (mobileMenuIcon && menu) {
        mobileMenuIcon.addEventListener("click", function () {
            menu.classList.toggle('mobile-menu-open');
        });
    }

    // FILTRO DE PRODUTOS
    const sections = document.querySelectorAll('.products-code-start');

    sections.forEach(section => {
        const menu = section.querySelector('.product-filter-brands ul');
        const menuItems = section.querySelectorAll('.product-filter-brands ul li');
        const productCards = section.querySelectorAll('.card-new-products');

        const state = {
            activeBrand: "todos",
            activeType: "todos"
        };

        function updateCards() {
            productCards.forEach(card => {
                const brand = card.getAttribute('data-brand');
                const type = card.getAttribute('data-products-type');

                if (
                    (state.activeBrand === 'todos' || state.activeBrand === brand) &&
                    (state.activeType === 'todos' || state.activeType === type)
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                menuItems.forEach(menuItem => {
                    menuItem.classList.remove('product-brand-active');
                });

                item.classList.add("product-brand-active");

                state.activeBrand = item.getAttribute('data-brand');
                state.activeType = item.getAttribute('data-products-type');

                updateCards();
            });
        });

        updateCards();
    });
});
