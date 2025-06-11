const baseURL="https://opensource-demo.orangehrmlive.com/web/index.php/"

const loginTestData={
    username:"Admin",
    password:"admin123"
}

function generateRandomName(minLength = 5) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const nameLength = Math.floor(Math.random() * 5) + minLength; // Random length from 5 to 9
    let name = "";

    for (let i = 0; i < nameLength; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        name += i === 0 ? randomChar.toUpperCase() : randomChar; // Capitalize the first letter
    }

    return name;
}
const UserName = generateRandomName();




export {baseURL, loginTestData, UserName}