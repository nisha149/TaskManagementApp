# --------------------------------------
# Build Stage
# --------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the project file and restore
COPY TaskManagementApp.Api.csproj ./
RUN dotnet restore TaskManagementApp.Api.csproj

# Copy the rest of the source code
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# --------------------------------------
# Runtime Stage
# --------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose the default port
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "TaskManagementApp.Api.dll"]
