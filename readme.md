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

dotnet ef migrations add --project ilab-authentication --startup-project raj-host --context IlabAuthentication.Data.AuthenticationDbContext
dotnet ef database update --project ilab-authentication --startup-project raj-host --context IlabAuthentication.Data.AuthenticationDbContext

##### API

dotnet ef migrations add --project raj-api --startup-project raj-host -Context RajApi.Data.ApplicationDbContext
dotnet ef database update --project raj-api --startup-project raj-host --context RajApi.Data.ApplicationDbContext
