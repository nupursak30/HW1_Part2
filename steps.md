### Steps for provisioning servers on DigitalOcean and AWS EC2
1. **Setting up tokens and keys for accessing DigitalOcean and Amazon AWS Account**  
   1. For accessing the **DigitalOcean** account via the code API:
      1. Two things are required: 1)Access key Token(env. variable name -**DOTOKEN**) 2)ssh-key ID(env. variable name -**DO_SSH_TOKEN**)
      2. Obtain both the keyID and the access token from the DigitalOcean Account and then store them as environment variables.
   2. For accessing the **Amazon AWS** account via aws-sdk:
      1. Two things are required: 1)secret access key 2)access key ID
      2. Obtain both the secret key and the access key ID from the Amazon AWS Account(using [these](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) steps)
      3. Create a new file named **'credentials'** at the following location:  
          1. *Linux, Unix, and macOS users:* ~/.aws/credentials
          2. *Windows users:* C:\Users\\{USERNAME}\\.aws\credentials
      4. Edit the file to have the following details(refer [this](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)):  
      ```
      [default]  
      aws_access_key_id = <YOUR_ACCESS_KEY_ID>  
      aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
      ```
   3. Make sure you have **git** as well as **nodejs** installed
   4. The above steps are **pre-requisities** in order to provision servers on DigitalOcean and AWS EC2  
2. Clone this repository - `git clone https://github.ncsu.edu/nsakhal/HW1_Part2.git` and then go inside the repository folder
3. Inside the HW1_Part2 folder, Run `npm install` .This will add node_modules folder.
4. Give *executable* permissions to run the bash script: [provision-servers](provision_servers.sh)
5. Type `bash provision_servers.sh` to run the bash script. This will automatically provision servers on DigitalOcean and AWS EC2 and printout out their Public IP addresses along with other details.(Alternatively, you can also run each code-[create_droplet.js](create_droplet.js) and [ec2_instance.js](ec2_instance.js) individually by using the following commands - `node ec2_instance.js` and `node create_droplet.js`)
6. Go to both the AWS EC2 account(**us-east-2** region i.e Ohio/N.Virginia region) and DigitalOcean account,under instances/droplets sections,you will see that the servers have been created and they have the same IP address as what it is printed in the terminal
7. After both servers are up and running, ping both the IP addresses, ping should be successful.
8. For AWS EC2 server(devOps_VM123), you can also check that the server is being added to a new security group 'DevOps_ping_test' and it has inbound rules same as what has been assigned to it while creating the security group


  
  
