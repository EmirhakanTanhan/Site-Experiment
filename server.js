const fetchItem = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}





