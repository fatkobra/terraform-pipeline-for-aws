provider "aws" {
  region = var.region
}

resource "aws_instance" "web_test" {
  ami                    = "ami-0c94855ba95c71c99" # Amazon Linux 2
  instance_type          = "t2.micro"
  key_name               = var.key_name
  associate_public_ip_address = true

  tags = {
    Name = "playwright-test-instance"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -",
      "sudo yum install -y nodejs git",
      "git clone https://github.com/your-org/web-app.git",
      "cd web-app && npm install && npm start &"
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file(var.private_key_path)
      host        = self.public_ip
    }
  }
}

output "app_url" {
  value = "http://${aws_instance.web_test.public_ip}:3000"
}
