import {serve} from 'bun'
serve(
    {
        fetch(request){
            const url =new URL(request.url);
            if(url.pathname ==='/')
            {
                return new Response("Hello bun", {status: 200})
            }
            else if(url.pathname ==='/login')
            {
                return new Response("Not found", {status: 404})
            }
        },
        port: 4000,
        hostname: 'localhost'
    }
);