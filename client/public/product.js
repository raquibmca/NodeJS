function deleteentity(url) {
    fetch(url, {
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