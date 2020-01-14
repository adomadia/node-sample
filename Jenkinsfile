// Define job properties - Note: This "will" update the Jenkins job as needed.
properties([
      parameters([
      choice(name: 'DEPLOYMENT_ENVIRONMENT',
             choices: 'prod\nonprod',
             defaultValue: 'nonprod',
             description: 'Which Environment to Deploy to?'),
      string(name: 'BRANCH',
             defaultValue: 'master',
              description: 'The Bitbucket Branch or Tag to build'),
      string(name: 'ansible_args',
             defaultValue: '',
             description: 'Additional Ansible arguments')
   ])
])

// Re-usable email method for notifications
def sendEmailAlert() {
  // Send email with log
  emailext body: '$DEFAULT_CONTENT',
           attachLog: true,
           compressLog: true,
           recipientProviders: [
              [$class: 'DevelopersRecipientProvider'],
              [$class: 'RequesterRecipientProvider']
           ],
           to: '',
           replyTo: '$DEFAULT_REPLYTO',
           subject: '$DEFAULT_SUBJECT'
}

// Wrap the output with timestamps
timestamps {
  // Run this pipeline on the Jenkins server named dayrhebfmi001
  node('docker') {
    // Clone the SCM repository
    stage('Clone') {
      try {

        // Clean the workspace before we start
        step([$class: 'WsCleanup'])

        // Call git to clone the repo
        git url: 'https://github.com/adomadia/node-sample.git',
            branch: "${params.BRANCH}"

      }
      catch (Exception e) {
        print "Pipeline failed with error: " + e.toString()
        currentBuild.result = 'FAILURE'
        //sendEmailAlert()
        throw e
      }
    }
    // Deploy the module(s)
    stage('Deploy Modules') {
      try {
        // Run deployment script

        // Execute the test
        // Display Ansible version
        sh 'ansible --version'

        // Mention where and what we are deploying
        echo "\nDeploying:\n\tDF sample-node To Environment: ${params.DEPLOYMENT_ENVIRONMENT}"

        // Run the deploy_data_factory script passing environment and any ansible arguments
        // Note: The shell script gets the other parameters from the Environment variables Jenkins sets
        // sh "chmod 0750 *.sh"
        // sh "./deploy_data_factory.sh ${params.DEPLOYMENT_ENVIRONMENT} ${params.ansible_args}"
      }
      catch (Exception e) {
        print "Deployment Pipeline failed with error: " + e.toString()
        currentBuild.result = 'FAILURE'
        //sendEmailAlert()
        throw e
      }
    }
    
    stage('Email with Status') {
      currentBuild.result = 'SUCCESS'
      //sendEmailAlert()
    }
  }
}
