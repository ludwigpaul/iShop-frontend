export const encryptData = (data) => {
    try {
        // Convert the data to base64
        return btoa(JSON.stringify(data));
    } catch (error) {
        console.error('Encryption error');
        throw error;
    }
};