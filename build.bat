cd ./src/ui/
nvm install 20
nvm use 20
npm install
npm run build
xcopy /e /i build\* C:\inetpub\sites\dev\wwwroot\* /Y