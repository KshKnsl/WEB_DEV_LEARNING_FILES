const net = require('net');
const tls = require('tls');
const { execSync } = require('child_process');

const PROXY_PORT = 8118;
const FRONTING_DOMAINS = ['azure.microsoft.com', 'windows.net', 'office.com'];
const MAX_RETRIES = 3;

const server = net.createServer((client) => {
    client.once('data', (data) => {
        const firstLine = data.toString().split('\n')[0];
        const [method, host] = firstLine.split(' ');

        if (method === 'CONNECT') {
            const [hostname, port] = host.split(':');
            handleTunnel(client, hostname, port || 443, data);
        } else {
            handleHttpRequest(client, data);
        }
    });

    client.on('error', handleError);
});

function handleTunnel(client, hostname, port, data, retries = 0) {
    const frontDomain = FRONTING_DOMAINS[Math.floor(Math.random() * FRONTING_DOMAINS.length)];

    const target = tls.connect({
        host: hostname,
        port: port,
        servername: frontDomain,
        rejectUnauthorized: false,
        ALPNProtocols: ['h2', 'http/1.1']
    });

    target.on('secureConnect', () => {
        client.write([
            'HTTP/1.1 200 Connection Established',
            'Connection: Keep-Alive',
            '',
            ''
        ].join('\r\n'));

        client.pipe(target);
        target.pipe(client);
    });

    target.on('error', (err) => {
        console.error('Target connection error:', err);
        if (retries < MAX_RETRIES) {
            console.log(`Retrying connection (${retries + 1}/${MAX_RETRIES})...`);
            handleTunnel(client, hostname, port, data, retries + 1);
        } else {
            client.end();
        }
    });
}

function handleHttpRequest(client, data) {
    const request = data.toString();
    const [method, path, protocol] = request.split(' ');

    const options = {
        hostname: path.split('/')[2],
        port: 80,
        path: path.split('/').slice(3).join('/'),
        method: method,
        headers: {
            'Host': path.split('/')[2],
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'en-US,en;q=0.8'
        }
    };

    const proxyRequest = net.request(options, (proxyResponse) => {
        client.write(`HTTP/1.1 ${proxyResponse.statusCode} ${proxyResponse.statusMessage}\r\n`);
        proxyResponse.headers.forEach((key, value) => {
            client.write(`${key}: ${value}\r\n`);
        });
        client.write('\r\n');
        proxyResponse.pipe(client);
    });

    proxyRequest.on('error', (err) => {
        console.error('Proxy request error:', err);
        client.end();
    });

    client.pipe(proxyRequest);
}

function handleError(err) {
    console.error('Client connection error:', err);
}

server.listen(PROXY_PORT, () => {
    console.log(`Server listening on port ${PROXY_PORT}`);
    try {
        execSync(`netsh winhttp set proxy 127.0.0.1:${PROXY_PORT}`);
        console.log('System proxy configured');
    } catch (err) {
        console.error('Proxy configuration error:', err);
    }
});

process.on('SIGINT', () => {
    execSync('netsh winhttp reset proxy');
    process.exit(0);
});