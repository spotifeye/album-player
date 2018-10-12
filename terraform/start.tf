provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "spotifeye-sg" {
  name        = "Security group for Spotifeye"
  description = "ports open from 3000-30005"

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3005
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

//---------------------------------
//---------------------------------
// APPLICATION SERVERS
//---------------------------------
//---------------------------------

resource "aws_instance" "spotifeye-server" {
  count                  = 5
  ami                    = "ami-0ff8a91507f77f867"
  instance_type          = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.spotifeye-sg.id}"]
  key_name               = "sdc-ec2-key-pair"

  provisioner "file" {
    source      = "../config.sh"
    destination = "/home/ec2-user/config.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -",
      "sudo yum -y install nodejs",
      "sudo yum install git -y",
      "git clone https://github.com/spotifeye/album-player.git",
      "source ./config.sh",
      "cd album-player",
      "npm install",
      "sudo npm install pm2 -g",
      "pm2 start server/index.js",
      "pm2 startup",
      "sudo env PATH=$$PATH$:/home/ec2-user/.nvm/versions/node/v10.12.0/bin /home/ec2-user/.nvm/versions/node/v10.12.0/lib/node_modules/pm2/bin/pm2 startup systemv -u ec2-user --hp /home/ec2-user",
      "pm2 save",
    ]
  }

  connection {
    user        = "ec2-user"
    private_key = "${file("/Users/davidhong/Desktop/EC2/sdc-ec2-key-pair.pem")}"
  }

  tags {
    Name = "spotifeye-server-${count.index}"
  }
}

# //---------------------------------
# //---------------------------------
# // LOAD BALANCER
# //---------------------------------
# //---------------------------------

# resource "aws_instance" "demo-load-balancer" {
#   # depends_on = ["aws_instance.demo-app-server"]
#   ami                    = "ami-0fcd5791ba781e98f" 
#   instance_type          = "t2.micro"
#   vpc_security_group_ids = ["${aws_security_group.demo-sg.id}"]
#   key_name               = "chris"
#   provisioner "file" {
#     source      = "lb-config/"
#     destination = "/home/ec2-user/"
#   }
#   provisioner "remote-exec" {
#     inline = [
#       "sudo amazon-linux-extras install -y nginx1.12",
#       "sudo touch ips.txt",
#       "sudo chmod 777 ips.txt",
#       "sudo echo ${join(",", aws_instance.demo-app-server.*.public_ip)} >> ips.txt",
#       "sudo sh genconf.sh",
#       "sudo mkdir cache",
#       "sudo nginx -c /home/ec2-user/nginx.conf"
#     ]
#   }
#   connection {
#     user        = "ec2-user"
#     private_key = "${file("/Users/davidhong/Desktop/EC2/sdc-ec2-key-pair.pem")}"
#   }

#   tags {
#     Name = "spotifeye-server-${count.index}"
#   }}

output "app-public-addresses" {
  value = ["${aws_instance.spotifeye-server.*.public_ip}"]
}
