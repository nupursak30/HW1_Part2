#!/bin/sh
echo "###################Provisioning a DigitalOcean Droplet######################"
node create_droplet.js
echo "###################Provisioning an Amazon EC2 instance######################"
node ec2_instance.js