function deleteproduct(id) {
    fetch(`http://localhost:5001/api/product/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ id }) // body data type must match "Content-Type" header
    }).then(() => {
        location.href = "viewproduct"
    });
}

function deletecategory(id) {
    fetch(`http://localhost:5001/api/category/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ id }) // body data type must match "Content-Type" header
    }).then(() => {
        location.href = "viewproduct"
    });
}