$(document).ready(function() {
    function loadCartData() {
        $.ajax({
            url: '/api/cart',
            method: 'GET',
            success: function(response) {
                if (response.status === 'success') {
                    let cartList = $('#cart-list');
                    cartList.empty();
                    let total = 0;

                    response.data.forEach(item => {
                        let itemTotal = item.quantity * parseFloat(item.totalPerProduct);
                        total += itemTotal;

                        let listItem = `
                            <li class="cart-item">
                                <img src="${item.img || 'defaul.png'}" alt="${item.product_description || 'No Description'}" />
                                <p>Product: ${item.product_description || 'No Descrition'}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Total per Product: R${parseFloat(item.totalPerProduct).toFixed(2)}</p>
                                <p>Item Total: R${itemTotal.toFixed(2)}</p>
                                <button class="remove-btn" data-id="${item.id}">Remove</button>
                            </li>
                        `;
                        cartList.append(listItem);
                    });

                    $('#order-total').text(`Order Total: R${total.toFixed(2)}`);
                    localStorage.setItem('cartTotal', total.toFixed(2));
                } else {
                    console.error('Failed to fetch cart data:', response.error);
                }
            },
            error: function(status, error) {
                console.error('AJAX error:', status, error);
            }
        });
    }

    function removeCartItem(id) {
        $.ajax({
            url: `/api/cart/${id}`,
            method: 'DELETE',
            success: function(response) {
                if (response.status === 'success') {
                    alert('Item removed successfully');
                    loadCartData();
                } else {
                    console.error('Failed to delete item:', response.error);
                }
            },
            error: function(status, error) {
                console.error('AJAX error:', status, error);
            }
        });
    }

    $('#checkout-button').on('click', function() {
        window.location.href = '/checkout.html';
    });

    loadCartData();

    $(document).on('click', '.remove-btn', function() {
        const id = $(this).data('id');
        removeCartItem(id);
    });
});


