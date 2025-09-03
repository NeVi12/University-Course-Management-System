# Use OpenJDK 17 with Maven
FROM maven:3.9.3-eclipse-temurin-17-alpine

# Set working directory
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "target/course-management-0.0.1-SNAPSHOT.jar"]
