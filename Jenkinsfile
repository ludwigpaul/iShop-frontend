pipeline {
    agent any

    environment {
        GCLOUD_PROJECT = 'calvary-revival-ministries'
        GCLOUD_BUCKET = 'gs://calvaryrevival.org'
        GCLOUD_CREDENTIALS = credentials('calvary-revival-ministries-f4be12e8905e.json') // Jenkins secret ID
        NODE_VERSION = '18'
        GIT_CREDENTIALS_ID = 'gitHubCredentials'
        GIT_REPO_SSH = 'git@github.com:ludwigpaul/iShop-frontend.git'
    }

    stages {
        stage('Checkout GitHub Code') {
            steps {
                script {
                    // Clean workspace first
                    deleteDir()

                    // Checkout code with proper configuration
                    def scmVars = checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*main']], // or '*/master' if that's your default branch
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [
                            [$class: 'CleanCheckout'],
                            [$class: 'CloneOption', depth: 1, noTags: false, reference: '', shallow: true]
                        ],
                        submoduleCfg: [],
                        userRemoteConfigs: [[
                            credentialsId: "${GIT_CREDENTIALS_ID}", // Add this credential in Jenkins
                            url: "${GIT_REPO_SSH}"
                        ]]
                    ])

                   // Set Git environment variables manually
                   env.GIT_COMMIT = scmVars.GIT_COMMIT
                   env.GIT_BRANCH = scmVars.GIT_BRANCH
                   env.GIT_URL = scmVars.GIT_URL

                   // Extract branch name from GIT_BRANCH (removes origin/ prefix)
                   if (env.GIT_BRANCH) {
                       env.BRANCH_NAME = env.GIT_BRANCH.replaceAll(/^origin\//, '')
                   }

                   echo "✅ Git variables set:"
                   echo "GIT_COMMIT: ${env.GIT_COMMIT}"
                   echo "GIT_BRANCH: ${env.GIT_BRANCH}"
                   echo "BRANCH_NAME: ${env.BRANCH_NAME}"
                }
            }
        }

         stage('Environment Info') {
                    steps {
                        sh '''
                            whoami
                            id
                            echo "Node version: $(node --version)"
                            echo "NPM version: $(npm --version)"
                            echo "Build Number: ${BUILD_NUMBER}"
                            echo "Branch: ${GIT_BRANCH}"
                        '''
                    }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
                echo "Installing finished."
            }
        }
        stage('Build') {
            steps {
                echo "Building..."
                sh 'npm run build'
                echo "Finished building."
            }
        }
        stage('Authenticate to GCP') {
            steps {
                withCredentials([file(credentialsId: 'calvary-revival-ministries-f4be12e8905e.json', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project $GCLOUD_PROJECT
                    '''
                }
            }
        }
        stage('Deploy to GCS') {
            steps {
                sh 'gsutil -m rsync -r build/ $GCLOUD_BUCKET'
            }
        }
    }
}