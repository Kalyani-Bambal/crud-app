pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        SONAR_TOKEN = credentials('sonar-token')
        SONAR_ORGANIZATION = 'jenkins-12'
        SONAR_PROJECT_KEY = 'jenkins-12'
    }

    stages {

        stage('Code-Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner -X \
                        -Dsonar.organization=${SONAR_ORGANIZATION} \
                        -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://sonarcloud.io \
                        -Dsonar.login=${SONAR_TOKEN}
                    '''
                }
            }
        }

        stage('Docker Build And Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-cred') {
                        // Generate version tag like v1, v2, ...
                        def versionTag = "v${env.BUILD_NUMBER}"
                        def imageName = "kalyanibambal97/crud-123"

                        // Build Docker image with version tag
                        def image = docker.build("${imageName}:${versionTag}")

                        // Push version tag
                        image.push()

                        // Optionally, also update 'latest'
                        sh "docker tag ${imageName}:${versionTag} ${imageName}:latest"
                        sh "docker push ${imageName}:latest"

                        echo "✅ Docker image pushed: ${imageName}:${versionTag} and latest"
                    }
                }
            }
        }

       
        stage('Deploy To EC2') {
            steps {
                script {
                    sh 'docker rm -f $(docker ps -q) || true'
                    sh 'docker run -d -p 3000:3000 kalyanibambal97/crud-123:latest'
                }
            }
        }

    }
}

