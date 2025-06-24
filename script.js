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


// Slider de patrocinadores

window.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.slider-sponsors');
    const images = slider.querySelectorAll('img');

    images.forEach(image => {
        const clone = image.cloneNode(true);
        slider.appendChild(clone);
    });

    const totalWidth = images.length * (images[0].offsetWidth + 20);

    slider.style.width = `${totalWidth}px`;

    let currentPosition = 0;

    const moveSlider = () => {
        currentPosition -= 1;
        if (currentPosition <= -totalWidth / 2) {
            currentPosition = 0;
        }
        slider.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(moveSlider);
    }

    requestAnimationFrame(moveSlider);
})

/* Slider Depoimentos */

window.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const controls = document.querySelectorAll('.controls-testimonial span');
    const firstTestimonial = testimonials[0];
    const firstControl = controls[0];

    testimonials.forEach(testimonial => testimonial.style.display = 'none');
    firstTestimonial.style.display = "block";

    controls.forEach(control => {
        control.addEventListener("click", () => {
            const targetSlide = control.getAttribute('data-slide');
            controls.forEach(c => c.classList.remove('active-testimonial'));
            control.classList.add('active-testimonial');

            testimonials.forEach(testimonial => testimonial.style.display = 'none');

            const testimonialShow = document.querySelector(`.testimonial[data-slide="${targetSlide}"]`);

            testimonialShow.style.display = "block"
        })
    })

    firstControl.classList.add("active-testimonial");
})

// manipulação do carrinho de produtos //

const productsArray = [];

function increaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector('.number-quantity');
    const quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

function decreaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector('.number-quantity');
    const quantity = parseInt(quantityElement.textContent);

    if (quantity > 0) {
        quantityElement.textContent = quantity - 1;
    }
}

function updateCart() {
    const cart = document.querySelector('.item-cart');
    cart.textContent = productsArray.length
}

function addProductToCart(event) {
    const productCard = event.target.closest('.card-new-products');
    const productName = productCard.querySelector('.info-product h3').textContent;
    const priceText = productCard.querySelector('.new-price').textContent;
    const price = parseFloat(priceText.replace("R$", ""));

    const quantityElement = productCard.querySelector(".number-quantity");

    let quantity = parseInt(quantityElement.textContent);

    const existingProductIndex = productsArray.findIndex((product) => product.productName === productName);

    if (quantity > 0) {
        if (existingProductIndex !== -1) {
            productsArray[existingProductIndex].quantity = quantity;
        } else {
            productsArray.push({
                productName: productName,
                price: price,
                quantity: quantity
            })
        }
    } else {
        if (existingProductIndex !== -1) {
            productsArray.splice(existingProductIndex, 1);
        }
    }

    updateCart();
}

const increaseButtons = document.querySelectorAll('.increase-quantity');
const decreaseButtons = document.querySelectorAll('.decrease-quantity');
const addCartButtons = document.querySelectorAll('.confirm-add-cart');


increaseButtons.forEach(button => {
    button.addEventListener("click", increaseQuantity)
})

decreaseButtons.forEach(button => {
    button.addEventListener("click", decreaseQuantity)
})

addCartButtons.forEach((button) => {
    button.addEventListener("click", addProductToCart);
})


// Carrinho

const inputCep = document.querySelector("#cep");
const inputStreet = document.querySelector("#street");
const inputCity = document.querySelector("#city");
const inputState = document.querySelector("#state");
const inputNeighborhood = document.querySelector("#neighborhood");
const inputNumber = document.querySelector("#number");
const searchCepBtn = document.querySelector(".search-cep");

searchCepBtn.addEventListener("click", buscarCep);

function buscarCep() {
    const typedCep = inputCep.value.trim().replace(/\D/g, "");

    if (typedCep.length !== 8) {
        alert("Digite um CEP válido com 8 números.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${typedCep}/json/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na resposta da API");
            }
            return response.json();
        })
        .then((data) => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            inputCity.value = data.localidade;
            inputState.value = data.uf;
            inputNeighborhood.value = data.bairro;
            inputStreet.value = data.logradouro;
        })
        .catch((error) => {
            console.error("Erro ao buscar CEP:", error.message);
            alert("Erro ao buscar CEP. Tente novamente.");
        });
}



