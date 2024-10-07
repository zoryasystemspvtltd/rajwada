cd ./src/ui/
dir
npm install
npm run build
xcopy /e /i build\* C:\inetpub\sites\dev\wwwroot\* /Y