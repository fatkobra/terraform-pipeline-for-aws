terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket" # Replace with your S3 bucket name
    key            = "chatbot-app/terraform.tfstate"
    region         = "us-east-1" # Replace with your desired AWS region
    dynamodb_table = "your-terraform-state-lock"    # Replace with your DynamoDB table name for state locking
    encrypt        = true
  }
}
