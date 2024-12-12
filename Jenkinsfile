// @NonCPS
def convertpath(String files) {
    // Load the data file
    def dataFile = load files

    // Use the parameter as the key
    def keyToRetrieve = params.VALUE

    // Retrieve the data
    def convertData = dataFile.getData(keyToRetrieve)

    // Check if the data was found
    if (convertData == null) {
        // Handle missing key
        echo "Warning: No data found for key '${keyToRetrieve}'"
        // Optionally set default values here or decide how to handle this case
        env.CONVERT_TAG = 'DEFAULT_TAG'
        // env.CONVERT_RESULT_PATH = 'DEFAULT_RESULT_PATH'
        // env.CONVERT_ROBOT_PATH = 'DEFAULT_ROBOT_PATH'
    } else {
        // Check if the data is valid
        if (convertData instanceof String) {
            error "Data retrieval failed: ${convertData}"
        }
        // Set environment variables
        env.CONVERT_TAG = convertData.tag
        // env.CONVERT_RESULT_PATH = convertData.resultpath
        // env.CONVERT_ROBOT_PATH = convertData.robotpath
        // Output the results
        echo "Converted result path: ${env.CONVERT_TAG}"
        // echo "Converted result path: ${env.CONVERT_RESULT_PATH}"
        // echo "Converted result path: ${env.CONVERT_ROBOT_PATH}"
    }
}

pipeline {
    agent any
    tools {nodejs "Node"}
    options {
        ansiColor('xterm')
    }
    stages {

      stage('Check Dependencies') {
          steps {
              bat 'npm install'
          }
      }

      stage('Covert value to run case') {
          steps {
              convertpath('jenkinsdata')
          }
      }

      stage('e2e Tests') {
          steps {
              bat 'npm run pw:test'
        }
      }
  }
}
