cd .\src\ui
npm run build
xcopy /e /i build\* C:\inetpub\sites\dev\wwwroot\* /Y