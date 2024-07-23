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
                         <button class="addBtn"  data-product-id="${product.id}" data-product-description="${product.description}" data-product-price="${product.price}">Add to Cart</button>
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
                         <button class="addBtn"  data-product-id="${product.id}" data-product-description="${product.description}" data-product-price="${product.price}">Add to Cart</button>
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

    function addToCart(id,description, price) {
        console.log(id,description,price)
        $.ajax({
            url: `/api/cart/`,
            method: 'POST',
            data: JSON.stringify({ productId:id, quantity: 1, totalPerProduct: price*1 }),
            contentType: 'application/json',
            success: function(response) {
                if (response.status === 'success') {
                    alert('Item added to cart successfully');
                } else {
                    console.error('Failed to add item:', response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX error:', status, error);
            }
        });
    }
   
    $(document).ready(function() {
        console.log('Hi')
        $(document).on('click', '.addBtn', function() {
            console.log('Clicked')
            var id = $(this).data('product-id');
            var description = $(this).data('product-description');
            var price = $(this).data('product-price');
            addToCart(id,description, price);
            alert('Product '+description+' In Cart')
        });
    })
});
