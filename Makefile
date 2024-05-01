DOCKER_HUB_USERNAME := akashkumar12
DOCKER_HUB_PASSWORD := Dockerhub*098
DOCKER_IMAGE_NAME := todo-frontend
DOCKER_IMAGE_TAG := 1.02

.PHONY: login dockerize publish

login:
	@echo "Logging in to Docker Hub..."
	@docker login -u $(DOCKER_HUB_USERNAME) -p $(DOCKER_HUB_PASSWORD)

dockerize: login
	@echo "Dockerizing your application..."
	@docker build -t $(DOCKER_HUB_USERNAME)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) .

publish: login
	@echo "Publishing Docker image to Docker Hub..."
	@docker push $(DOCKER_HUB_USERNAME)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)
