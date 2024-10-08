# Rajwada project plan management

#### Plans

TODO

#### Database Migration

##### Authentication

Add-Migration -Project ilab-authentication -Startup raj-host -Context IlabAuthentication.Data.AuthenticationDbContext
Update-Database -Project ilab-authentication -StartupProject raj-host -Context IlabAuthentication.Data.AuthenticationDbContext
Update-Database -Project ilab-authentication -StartupProject raj-authentication

##### API

Add-Migration -Project raj-api -Startup raj-host -Context RajApi.Data.ApplicationDbContext
Update-Database -Project raj-api -StartupProject raj-host -Context RajApi.Data.ApplicationDbContext
Update-Database -Project raj-api -StartupProject raj-api

#### Database Migration using CLI

##### Authentication

dotnet ef migrations add --project ./src/ilab-authentication/ilab-authentication.csproj --startup-project ./src/raj-host/raj-host.csproj --context IlabAuthentication.Data.AuthenticationDbContext
dotnet ef database update --project ./src/ilab-authentication/ilab-authentication.csproj --startup-project ./src/raj-host/raj-host.csproj --context IlabAuthentication.Data.AuthenticationDbContext

##### API

dotnet ef migrations add --project ./src/raj-api/raj-api.csproj --startup-project ./src/raj-host/raj-host.csproj -Context RajApi.Data.ApplicationDbContext
dotnet ef database update --project ./src/raj-api/raj-api.csproj --startup-project ./src/raj-host/raj-host.csproj --context RajApi.Data.ApplicationDbContext
