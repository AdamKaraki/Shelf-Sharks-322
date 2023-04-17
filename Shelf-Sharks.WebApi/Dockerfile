FROM mcr.microsoft.com/dotnet/sdk:7.0 as build

WORKDIR /app
COPY [".", "."]
RUN dotnet restore

COPY [".", "."]
RUN dotnet build -c Release -o out
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0 as final

WORKDIR /app
COPY --from=build /app/out .

EXPOSE 80

ENTRYPOINT [ "dotnet", "Shelf-Sharks.WebApi.dll" ]
