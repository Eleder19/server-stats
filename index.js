require('colors');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
fetchIP();
function fetchIP() {
    rl.question('Enter server IP:\n'.green, async (data) => {
        let ans = data.trim();
        if (ans !== '') {
            fetchServerData(ans);
        } else{
            console.log('Please provide an IP address.'.red);
            fetchIP();
        };
    });
}

async function fetchServerData(ip) {
    const URL = `https://api.mcsrvstat.us/3/${ip}`;
    const response = await fetch(URL);
    const data = await response.json();
    try {
        if (data.debug.ping) {
            console.log(`Server hostname: ${data.hostname}`.yellow);
            console.log(`Server port: ${data.port}`.yellow);
            console.log(`Server raw IP: ${data.ip}`.yellow);
            console.log(`Server MOTD: ${data.motd.clean}`.yellow);
            console.log(`Server version: ${data.version}`.yellow);
            console.log(`Server software: ${data.software}`.yellow);
            console.log(`Server online: ${data.online}`.yellow);
            console.log(`Blocked: ${data.eula_blocked}`.yellow);
            console.log(`Online players count: ${data.players.online}`.yellow);
            console.log(`Max players count: ${data.players.max}`.yellow);
            fetchIP();
        } else{
            console.log(`The server IP/host name you have provided does not exist. Please double check IP address/host name`.red);
            fetchIP();
        };

    } catch (error) {
        console.error(error);
    };
};