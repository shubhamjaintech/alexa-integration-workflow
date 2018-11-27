import boto3

# Get the service resource.
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Task');
def lambda_handler(event,context):
    table.put_item(Item=event)
    return {"code":200, "message": "Task added succesfully"}


