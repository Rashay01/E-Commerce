document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    function fetchProductDetails() {
        $.ajax({
            url: `/product/${productId}`,
            method: 'GET',
            success: function(product) {
                document.getElementById('productImg').src = product.img;
                document.getElementById('productName').textContent = product.description;
                document.getElementById('productCategory').textContent = product.category;
                document.getElementById('productDescription').textContent = product.description;
                document.getElementById('productPrice').textContent = `R ${product.price}`;
            },
            error: function(xhr, status, error) {
                console.error('Error fetching product details:', error);
            }
        });
    }

    fetchProductDetails();
});
