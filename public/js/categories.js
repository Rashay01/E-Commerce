document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const categoryList = document.querySelector('.nav-pills'); // Adjusted selector for the <ul> in the content section

    function fetchCategories() {
        $.ajax({
            url: '/category',
            method: 'GET',
            success: function(categories) {
                categories.forEach(category => {
                    // Split category description by '/'
                    const parts = category.name.split('/').map(part => part.trim());

                    // Create category items for the dropdown menu
                    parts.forEach(part => {
                        const dropdownItem = document.createElement('a');
                        dropdownItem.className = 'dropdown-item';
                        dropdownItem.textContent = part;
                        dropdownItem.href = `#`;  // Replace with actual URL if needed
                        categoryDropdown.appendChild(dropdownItem);
                    });

                    // Create category items for the content section
                    parts.forEach(part => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = part;
                        link.href = `#`;  // Replace with actual URL if needed
                        listItem.appendChild(link);
                        link.style.color = '#000';
                        categoryList.appendChild(listItem);
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching categories:', error);
            }
        });
    }

    fetchCategories();
});
