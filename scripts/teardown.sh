#!/bin/bash
echo "Destroying environment..."
cd terraform
terraform destroy -auto-approve
