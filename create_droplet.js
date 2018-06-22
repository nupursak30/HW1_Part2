//Code Reference: Provisioning workshop -https://github.ncsu.edu/CSC-DevOps-Spring2015/ServersWorkshop

var needle = require("needle");
var os   = require("os");
var config = {};
config.token = process.env.DOTOKEN;

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

// Documentation for needle:
// https://github.com/tomas/needle

var client =
{
	
	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
            // Id to ssh_key already associated with account  
			"ssh_keys":[process.env.DO_SSH_TOKEN], 
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

        console.log(`Attempting to create a droplet...`);
		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
    },
    listDroplets: function( onResponse )
	{
		needle.get(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {headers:headers}, onResponse)
	}
};

var name = "nsakhal"+os.hostname();
var region = "nyc3"; 
var image = "docker"; 
var dropletId;


client.createDroplet(name, region, image, function(error, response)
{
    
	// StatusCode 202 - Means server accepted request.
	if(!error && response.statusCode == 202)
	{   
        var dp_data=response.body;
        dropletId=dp_data.droplet.id;
        console.log(`***************ID of the Droplet**************`);
        console.log(`${dropletId}`);
        
	}
});

//Wait for 6 seconds before fetching the IP address of the droplet
setTimeout(function(){

    client.listDroplets(function(error, response)
    {
        var drp = response.body;
    
        console.log(`***************IP Address of Droplet**************`);
        
        if( drp.droplet )
        {
            console.log(drp.droplet.networks.v4[0].ip_address);
            
        }
    });
},6000);

