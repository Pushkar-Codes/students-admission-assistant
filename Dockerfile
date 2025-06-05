# ---------- Stage 1: Build with Maven ----------
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set working directory
WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build the project and skip tests to speed up build
RUN mvn clean package -DskipTests

# ---------- Stage 2: Run the Spring Boot App ----------
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Optional: Install required packages for Alpine compatibility (use if you face any runtime issues)
# RUN apk add --no-cache libstdc++ zlib

# Copy the JAR from the build stage
COPY --from=builder /app/target/BackendJavaERP-0.0.1-SNAPSHOT.jar BackendJavaERP.jar

# Expose Spring Boot's default port
EXPOSE 9090

# Run the application
ENTRYPOINT ["java", "-jar", "BackendJavaERP.jar"]
