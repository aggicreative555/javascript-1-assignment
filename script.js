const apiUrl = 'https://api.noroff.dev/api/v1/gamehub';

function doFetch(url) {
    try {
        const data = fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Data', data);
                return data;
            });
    } catch (error) {
        console.log('Error', error);
    }
}
