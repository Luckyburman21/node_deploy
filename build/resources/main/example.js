$undertow
    .onGet("/hello",
        {headers: {"content-type": "text/plain", "Access-Control-Allow-Origin": "*"}},
        [function ($exchange) {
            $exchange.send("Hello World");
        }]);


        $undertow.onGet("/test-route",
            { headers: { "content-type": "text/plain", "Access-Control-Allow-Origin": "*" } },
            [function ($exchange) {
                var id = 1;
                $exchange.send("Test route received ID: " + id);
            }]
        );
        
        $undertow.onGet("/test-db-connection",
            { headers: { "content-type": "application/json" } },
            ['jndi:java:jboss/datasources/ExampleDS', function ($exchange, db) {
                try {
                    // Perform a simple query to check the connection
                    var result = db.select("SELECT 1"); // Simple query to check connection
                    var jsonResult = JSON.stringify({ success: true, message: "Database connection is successful." });
        
                  
                    $exchange.send(jsonResult);
                } catch (e) {
                    var errorResult = JSON.stringify({ success: false, error: e.message });
                  
                    $exchange.send(errorResult);
                }
            }]
        );
        
        $undertow.onGet("/read-record",
            { headers: { "content-type": "application/json" } },
            ['jndi:java:jboss/datasources/ExampleDS', function ($exchange, db) {
                
        
                try {
                    var result = db.select("SELECT * FROM lucky WHERE id = 1"); // Adjust as needed
                    var jsonResult = JSON.stringify(result);
        
                    // Attempt to set headers and send response
                    $exchange.send(jsonResult);
                } catch (e) {
                    // Basic error handling
                    var errorResult = JSON.stringify({ error: e.message });
                    $exchange.send(errorResult);
                }
            }]
        );
        
    