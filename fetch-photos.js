const axios = require('axios');
const fs = require('fs');

const apiKey = process.env.FLICKR_API_KEY; // API-nyckel som en hemlighet
const userId = '60602420@N05'; // Ditt Flickr-användar-ID

async function fetchPhotos() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

    try {
        const response = await axios.get(url);
        const photos = response.data.photos.photo;
        
        const jsonContent = {
            photos: {
                photo: photos.map(photo => ({
                    id: photo.id,
                    secret: photo.secret,
                    server: photo.server,
                    title: photo.title
                }))
            }
        };

        fs.writeFileSync('photos.json', JSON.stringify(jsonContent, null, 2));
        console.log('Photos fetched and saved to photos.json');
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

fetchPhotos();

