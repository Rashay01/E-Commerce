document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const cardContent = document.querySelector('.card-content');

    function fetchCategories() {
        $.ajax({
            url: '/category',  
            method: 'GET',
            success: function(categories) {
                categories.forEach(category => {
                    // Add to dropdown
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.className = 'dropdown-item';
                    a.href = '#';
                    a.textContent = category.name;
                    li.appendChild(a);
                    categoryDropdown.appendChild(li);

                    // Add to card content
                    const card = document.createElement('div');
                    card.className = 'card';
                    const h3 = document.createElement('h3');
                    h3.textContent = category.name;
                    card.appendChild(h3);
                    cardContent.appendChild(card);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching categories:', error);
            }
        });
    }

    fetchCategories();
});
