## Building image
    docker build -t phantom_crawler .

## Running
    docker run -d -p 8000:8000 -m 300m phantom_crawler

## Testing
[http://localhost:8000/crawl?url=http%3A%2F%2Fwww.google.com](http://localhost:8000/crawl?url=http%3A%2F%2Fwww.google.com)



