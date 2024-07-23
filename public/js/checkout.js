document.addEventListener('DOMContentLoaded', function() {
    const orderNumber = Math.floor(10000000 + Math.random() * 90000000);

    const totalAmount = localStorage.getItem('cartTotal') || '0.00';
    const deliveryFee = 50.00;
    const finalTotal = parseFloat(totalAmount) + deliveryFee;

    document.getElementById('order-number').textContent = `Order Number: ${orderNumber}`;
    document.getElementById('total-amount').textContent = `Order Total: R${parseFloat(totalAmount).toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `Delivery Fee: R${deliveryFee.toFixed(2)}`;
    document.getElementById('final-total').textContent = `Final Total: R${finalTotal.toFixed(2)}`;

    $('#to-payment-button').on('click', function() {
        window.location.href = '/paymentGateway.html';
    });
});