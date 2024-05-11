FROM gocd/gocd-agent-docker-dind:v23.5.0


# Switch to root user to perform setup tasks
USER root

# Create a non-root user
# RUN adduser -D myuser

# Install make
RUN apk add --no-cache make docker 

# Create directories and set permissions


# Switch back to non-root user
# USER root
