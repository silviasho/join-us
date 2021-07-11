

const randomKey = async (secret) => {

    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.floor(Math.random() * 1000);
    return random + secret
};
module.exports = randomKey;