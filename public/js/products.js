document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('productsList');

    function fetchProducts() {
        $.ajax({
            url: '/product',
            method: 'GET',
            success: function(products) {
                productsList.innerHTML = '';  
                products.forEach(product => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <a href="product.html?id=${product.id}">
                            <img src="${product.img}" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <h5 class="card-title">${product.description}</h5>
                                <p class="card-text">Price: R ${product.price}</p>
                            </div>
                        </a>
                        <button id="addToCartBtn" class="addBtn">Add to Cart</button>
                    `;
                    productsList.appendChild(card);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching products:', error);
            }
        });
        $(document).on('click', 'a', function(event) {
            let api_url = '/product';
            if ($(this).text() === 'Jeans'){
               api_url = '/product/1';
            } else if ($(this).text() === 'T-shirts'){
                api_url = '/product/2';
            }else if ($(this).text() === 'Jackets'){
                api_url = '/product/3';
            }else if ($(this).text() === 'Headwear'){
                api_url = '/product/4';
            }else if ($(this).text() === 'Shorts'){
                api_url = '/product/5';
            }else if ($(this).text() === 'Dresses'){
                api_url = '/product/6';
            }

            $.ajax({
                url: api_url,
                method: 'GET',
                success: function(products) {
                    productsList.innerHTML = '';  
                    products.forEach(product => {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.innerHTML = `
                            <a href="product.html?id=${product.id}">
                                <img src="${product.img}" class="card-img-top" alt="Product Image">
                                <div class="card-body">
                                    <h5 class="card-title">${product.description}</h5>
                                    <p class="card-text">Price: R ${product.price}</p>
                                </div>
                            </a>
                            <button id="addToCartBtn" class="addBtn">Add to Cart</button>
                        `;
                        productsList.appendChild(card);
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching products:', error);
                }
            });
        });
       
    }

    fetchProducts();
});
