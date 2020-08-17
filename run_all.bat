cd c:\code\cf_backend
start "Database Server" "json-server" --watch db.json --port 3400
start "Info Backend" "npm" start
cd c:\code\cf_info
npm start