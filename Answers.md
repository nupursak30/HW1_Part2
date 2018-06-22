# Concepts
### Answer 1)
- **Idempotency** means obtaining the same result irrespective of whether the action/operation was performed just one time or it was performed multiple times.
- **Examples of idempotent operation:** HTTP GET operation[[1]](http://restcookbook.com/HTTP%20Methods/idempotency/), touch <new_filename> 
- **Examples of non-idempotent operation:** HTTP POST operation[[1]](http://restcookbook.com/HTTP%20Methods/idempotency/), mkdir <new_directory_name> (create new directory operation in Linux systems)

### Answer 2)
- Inventory contains all the assets information which are owned by us. It includes server IP addresses, ssh keys, passwords,etc[[2]](https://docs.google.com/presentation/d/1PO_QTieMkRvW9MDEIMVS0dD5bk50fK5fvSgj5zNyPfw/edit#slide=id.g20aac8f8af_2_8).  
**Issues associated with the inventory:**
- As inventory contains passwords, ssh keys location,etc. which are important in order to gain access to the servers,*issue comes while deciding the location to store the inventory file* because anyone who comes to know about the location of the inventory file can basically gain illegal access to any of the servers, which is not at all acceptable. So, it is important while managing the inventory file that it is stored in some secure location.
- Inventory contains all the API tokens, passwords, ssh keys,etc. So all the things needed to get accessed to any server/application is contained in a single file,i.e. all the assets that we own are listed down in a single file, hence, *even a small error occuring while managing/updating the inventory(e.g. deletion/edit of an API token/key by mistake)can result into many hours of troubleshooting scenarios because of the huge inventory size*
- One more issue comes up while *deciding whom to give permissions to access/update/manage the inventory*. This is because if by any chance, the inventory file goes into the hands of a wrong person,than that can result into a *huge security threat*
- As inventory is usually updated/managed manually and not automatically, hence maintainence of such huge inventory file is prone to human-based errors. 

### Answer 3)
The two configuration models[[3]](https://docs.google.com/presentation/d/1PO_QTieMkRvW9MDEIMVS0dD5bk50fK5fvSgj5zNyPfw/edit#slide=id.g20aac8f8af_2_14) are: 1)*Push* model 2)*Pull* model
1. **Push Model**
- This model is a centralized model where any changes done on the configuration server are simply pushed to all the assets. Assets are not needed to ask the server for any updates. The configuration server will automatically push all the changes/updates to its assests.   
***Advantages***
- Easier to manage as we just need to manage the centralized server and rest all updates will be taken care by the centralized server itself.
- Designing and configuration of a push model is easy  
***Disadvantages***
- Assets can drift away from the configuraton server
- As any updates made on the configuration server are pushed into all the assets,thus any bug caused due to the updates will be passed on to all the assets.
- Maybe possible that the assets are not synchronous with the config. server as in this model, changes/updates are sent to the assests ONLY when config. server is ready to push those changes into the assets.
-Scalability is an issue as everytime a new asset comes in, the configuration server needs to make a note of that asser and thus, it needs to add an entry in its inventory and then send updates to an additional asset other than the previous assets it was sending its updates/changes to.

2. **Pull Model**
- This model is like a distributed/de-centralized model where agents are configured on all the assets and these agents are used to pull updates/changes occuring in the configuration server.  
***Advantages***
- Better at synchronizing with the server as agents continuously poll updates from the config. server and thus, is not dependent on when the config. server is ready to push its changes to the assets. 
- Asset has the capability of registering itself
- Scalable as we now just need to add another agent on an asset and it can directly start polling the updates from the configuration server  
***Disadvantages***
- Difficult to manage as now we need to manage not only the configuration server but also the agents residing on the assets
- More complex in design and configuration as now we need to configure additional agents on the assets

### Answer 4)
The following issues may arise if proper configuration management not used:  
 1. Configuration management helps to manage the dependencies properly, so if configuration management is not used to manage dependncies , then that can result into build errors due to missing dependencies issue
 2. Configuration management helps in automation. So if we are not using these tools, and suppose we want to update a application present in thousands of servers, then we will be bound to do it manually and thus, it will take a lot of human effort,time spent working on it and is all prone to human errors. Configuration Management tools like Ansible makes this job really easy by maintaining an inventory of all the servers and then updating all the servers with the changes simultaneously, thereby reducing human effort and is also less prone to human errors.
 3. Merging changes coming from different sources into the main code will be tedious and stressful job to do if there is no configuration management present to manage it.  It can even decrease the commits occuring on a daily basis, as people will try to avoid the merging issues as much as possible and thus they will avoid committing their changes on a frequent basis.
 4. The above issue can cause an effect and that will be more bugs/problems can occur at a later stage as changes were not committed on a daily basis and hence, testing will become really cumbersome
 5. Can cause long delays occuring while deploying the product as the product will likely contain more bugs/errors and troublehsooting those bugs will also take a lot of human effort and time, thereby increasing the time needed to deploy the product.
 
