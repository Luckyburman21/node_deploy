$undertow
    .onGet("/hello",
        {headers: {"content-type": "text/plain", "Access-Control-Allow-Origin": "*"}},
        [function ($exchange) {
            $exchange.send("Hello World");
        }]);


        
// Handle GET request for JSON response
$undertow
    .onGet("/rest/endpoint",
        {headers: {"content-type": "application/json"}},
        [function ($exchange) {
            // Send a JSON response
            $exchange.send(JSON.stringify({message: 'Hello World'}));
        }]);

// Handle POST request with string data
$undertow
    .onPost("/string",
        {headers: {"content-type": "text/plain"}},
        ['$entity', function ($exchange, entity) {
            // Handle POST request with string data
            $exchange.send("You posted: " + entity);
        }]);

// Handle POST request with JSON data
$undertow
    .onPost("/json",
        {headers: {"content-type": "text/plain"}},
        ['$entity:json', function ($exchange, entity) {
            // Handle POST request with JSON data
            $exchange.send("You posted: " + entity['name']);
        }]);

// Handle POST request with form data
$undertow
    .onPost("/form",
        {headers: {"content-type": "text/plain"}},
        ['$entity:form', function ($exchange, entity) {
            // Handle POST request with form data
            $exchange.send("You posted: " + entity.get('name'));
        }]);
