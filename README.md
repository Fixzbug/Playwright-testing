# Playwright and Jenkins Integration

This guide provides an overview of running Playwright tests and integrating them with Jenkins for continuous integration (CI).

## Running Playwright Tests

Inside the project directory, you can execute various Playwright commands:

### Basic Commands

- **Run all end-to-end tests:**
  ```bash
  npx playwright test
  ```

- **Interactive UI mode:**
  ```bash
  npx playwright test --ui
  ```

- **Run tests on Desktop Chrome only:**
  ```bash
  npx playwright test --project=chromium
  ```

- **Run tests from a specific file:**
  ```bash
  npx playwright test example
  ```

- **Debug mode:**
  ```bash
  npx playwright test --debug
  ```

- **Generate tests with Codegen:**
  ```bash
  npx playwright codegen
  ```

### Suggested Starting Point

We recommend starting by running:
```bash
npx playwright test
```

### Key Files to Explore

- **Example end-to-end test:** `./tests/example.spec.ts`
- **Demo Todo App test:** `./tests-examples/demo-todo-app.spec.ts`
- **Configuration file:** `./playwright.config.ts`

## Integrating with Jenkins

Follow these steps to set up Playwright tests in a Jenkins pipeline:

### Prerequisites

1. **Install Node.js and npm**
   Ensure Node.js and npm are installed on your Jenkins machine.

2. **Install Playwright**
   Add Playwright as a dependency in your project:
   ```bash
   npm install playwright
   ```

3. **Set Up Jenkins**
   Install Jenkins and ensure it has the necessary permissions and plugins for running Node.js projects.

### Jenkins Pipeline Script

Create a `Jenkinsfile` in your project root with the following content:

```groovy
pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    sh 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            script {
                archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
                junit 'test-results/**/*.xml'
            }
        }
    }
}
```

### Explanation of the Jenkinsfile

1. **Install Dependencies:** Installs all necessary packages from `package.json`.
2. **Run Playwright Tests:** Executes the Playwright tests using `npx playwright test`.
3. **Post Actions:** Archives test results and publishes them in the Jenkins interface.

### Generating Test Reports

Playwright can generate test reports in JUnit format, which Jenkins can interpret. Add the following to your `playwright.config.ts` file to enable JUnit reporting:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['junit', { outputFile: 'test-results/results.xml' }]],
});
```

### Running the Pipeline

1. Commit the `Jenkinsfile` and push it to your repository.
2. Set up a Jenkins job to point to your repository.
3. Trigger the pipeline and monitor the progress.

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Jenkins Documentation](https://www.jenkins.io/doc/)

