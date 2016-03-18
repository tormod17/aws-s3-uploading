# AWS-s3-uploading using Hapi.js

## Step 1
Create an AWS account.

### Step 2
Then select S3 storage 

![image](https://cloud.githubusercontent.com/assets/11330267/13875960/d939ef94-ecf8-11e5-986e-1cba2c82cad0.png)

### Step 3 
Click the create a bucket choose a name and select the region , the nearest to UK being Ireland. 

### Step 4
Go to your account and select your credentials. Click the **Continue to security credential** when the pop-up menu appears. 
![image](https://cloud.githubusercontent.com/assets/11330267/13876032/52415274-ecf9-11e5-9346-ba775007d854.png)

### Step 5
Expand the **Access Keys (Access Key ID and Secret Access Key)** menu and create a new access key.Copy both credentials and store them in a config.env file or export on comand line, use the same keys as below however replace values with your credentials.  
 ```* export AWS_ACCESS_KEY_ID='AKID' ```
 
 ``` * export AWS_SECRET_ACCESS_KEY='SECRET'```
### Step 6
Add your bucket to your environment variable as well. This is the name you used to create the bucket (string), load your environment variable using ``npm module env2 `` like so 

``` require('env2')('./config.env'); ```

### Step 7
Install the ```npm module aws-sdk``` require it in to your server and configure your S3 object it like so : 

``` var AWS = require('aws-sdk'); ```

``` const s3 = new AWS.S3( {params:{Bucket :process.env.BUCKET}}); ```

### Step 8 
Now you have conneccted your node server with the S3 object and can utilise the various methods discussed [here](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html)

## How to run this example. 
 Once you have environment variables loaded clone and ```npm start ```
 
 In my example I upload using multiparty -form data save locally and then upload to the cloud after this I delete the locally stored version. I would prefer to upload directly to the cloud but haven't worked out how to do this. 
 
 ## Further Reading
 
 - Another npm module which allows manipulation of the file system in the cloud is ``s3fs``
 - I will now look at (uploadcare)[https://uploadcare.com/] as this provides integration with other services and creates cdn links for your files. 
 
 



