# -------------------------
# Build Stage
# -------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY TaskManagementApp.Api.csproj ./
RUN dotnet restore TaskManagementApp.Api.csproj

# Copy the rest of the app
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# -------------------------
# Runtime Stage
# -------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Port (from launchSettings.json or Program.cs)
EXPOSE 80

# Run the app
ENTRYPOINT ["dotnet", "TaskManagementApp.Api.dll"]
# -------------------------
# Build Stage
# -------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY TaskManagementApp.Api.csproj ./
RUN dotnet restore TaskManagementApp.Api.csproj

# Copy the rest of the app
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# -------------------------
# Runtime Stage
# -------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Port (from launchSettings.json or Program.cs)
EXPOSE 80

# Run the app
ENTRYPOINT ["dotnet", "TaskManagementApp.Api.dll"]
