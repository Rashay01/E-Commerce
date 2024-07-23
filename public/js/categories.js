document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.getElementById('categoryDropdown');

    function fetchCategories() {
        $.ajax({
            url: '/home',  
            method: 'GET',
            success: function(categories) {
                categories.forEach(category => {
                    const li = document.createElement('li');
                    li.textContent = category.description;
                    categoryDropdown.appendChild(li);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching categories:', error);
            }
        });
    }

    fetchCategories();
});
