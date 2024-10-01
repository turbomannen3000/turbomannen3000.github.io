const fs = require('fs');
const axios = require('axios');

const apiKey = process.env.FLICKR_API_KEY; // API-nyckel ska ställas in i GitHub Secrets
const userId = '60602420@N05'; // Ditt Flickr-användar-ID

async function fetchPhotos() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;
    
    try {
        const response = await axios.get(url);
        const photos = response.data.photos.photo;
        const photoList = photos.map(photo => ({
            id: photo.id,
            title: photo.title,
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
        }));
        fs.writeFileSync('photos.json', JSON.stringify(photoList, null, 2));
    } catch (error) {
        console.error('Error fetching photos:', error);
        process.exit(1); // Avsluta processen med ett fel
    }
}

fetchPhotos();
