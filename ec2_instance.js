/*Code References: 
1. https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ec2-example-creating-an-instance.html
2. https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property
3. https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ec2-example-security-groups.html
*/

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'}); //AWS Region is 'us-east-2'


//Create a new EC2 instance using the below given parameters
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//
// Variable to hold a ID of a VPC
var vpc = null;

// Retrieve the ID of a VPC
ec2.describeVpcs(function(err, data) {
   if (err) {
     console.log("Cannot retrieve a VPC", err);
   } else {
     vpc = data.Vpcs[0].VpcId;
     var paramsSecurityGroup = {
        Description: 'Allow ping testing',
        GroupName: 'DevOps_ping_test',
        VpcId: vpc
     };
     // Create the instance
     ec2.createSecurityGroup(paramsSecurityGroup, function(err, data) {
        if (err) {
           console.log("Error", err);
        } else {
           var SecurityGroupId = data.GroupId;
           console.log("Success", SecurityGroupId);
           var paramsIngress = {
             GroupName: 'DevOps_ping_test',
             IpPermissions:[
                {
                   IpProtocol: "tcp",
                   FromPort: 80,
                   ToPort: 80,
                   IpRanges: [{"CidrIp":"0.0.0.0/0"}]
               },
               {
                   IpProtocol: "tcp",
                   FromPort: 22,
                   ToPort: 22,
                   IpRanges: [{"CidrIp":"0.0.0.0/0"}]
               },
               {
                //To allow ping(ICMP) traffic
                IpProtocol: "icmp",
                FromPort: -1,
                ToPort: -1,
                IpRanges: [{"CidrIp":"0.0.0.0/0"}]
               }
             ]
           };
           ec2.authorizeSecurityGroupIngress(paramsIngress, function(err, data) {
             if (err) {
               console.log("Error", err);
             } else {
               console.log("Ingress Successfully Set", data);
             }
          });
        }
     });

   }
});

var params = {
   ImageId: 'ami-965e6bf3', //Ubuntu Server 16.04 LTS (HVM)
   InstanceType: 't2.micro', 
   MinCount: 1,
   MaxCount: 1,
   SecurityGroups: ["DevOps_ping_test"]
};

var instanceId;
//Create an EC2 instance with tagname 'devOps_VM123'
setTimeout(function(){
    ec2.runInstances(params, function(err, data) {
        if (err) {
           console.log("Could not create instance", err);
           return;
        }
        instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
        // Add tags to the instance
      params = {Resources: [instanceId], Tags: [
        {Key: 'Name', Value: 'devOps_VM123'}
      ]};
      ec2.createTags(params, function(err) {
        console.log("Tagging instance", err ? "failure" : "success");
      }); 
     });
},5000); 


var params1 = {
    Filters: [{Name:'tag:Name',Values:['devOps_VM123']}],
    InstanceIds: [instanceId]
};

//Wait for 5 seconds before fetching the IP addresses of the 'devOps_VM123' EC2 instance 
setTimeout(function(){
    ec2.describeInstances(params1, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else    {
            // successful response
            //console.log(JSON.stringify(data));
            private_ip=data.Reservations[0].Instances[0].PrivateIpAddress;
            public_ip=data.Reservations[0].Instances[0].PublicIpAddress;
            instance_tag=data.Reservations[0].Instances[0].Tags[0].Value;
            console.log(JSON.stringify(`Private IP address of the '${instance_tag}' instance: ${private_ip}`));
            console.log(JSON.stringify(`Public IP address of the '${instance_tag}' instance: ${public_ip}`));
        }             
      });
},15000);
  
  


