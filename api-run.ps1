dotnet restore ./src/PlanManagement.sln 
dotnet build --no-restore ./src/PlanManagement.sln 
#dotnet test --no-build --verbosity normal ./src/api-test/api-test.csproj 
dotnet watch run --project ./src/raj-host/raj-host.csproj https