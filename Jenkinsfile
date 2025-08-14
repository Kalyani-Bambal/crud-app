


pipeline {
    agent any
    

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        SONAR_TOKEN = credentials('sonar-token')
        SONAR_ORGANIZATION = 'jenkins'
        SONAR_PROJECT_KEY = 'jenkins-project-123456'
    }

    stages {
        
        stage('Code-Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                     sh '''$SCANNER_HOME/bin/sonar-scanner -X \
     -Dsonar.organization=jenkins \
     -Dsonar.projectKey=jenkins-project-123456 \
     -Dsonar.sources=. \
     -Dsonar.host.url=https://sonarcloud.io \
     -Dsonar.login=$SONAR_TOKEN'''
          }
       } 
   }

       
        
      
       stage('Docker Build And Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-cred') {
                        def buildNumber = env.BUILD_NUMBER ?: '1'
                        def image = docker.build("kalyanibambal97/crud-123:latest")
                        image.push()
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
