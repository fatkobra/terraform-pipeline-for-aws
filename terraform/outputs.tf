output "webapp_public_ip" {
  description = "Public IP address of the web application server"
  value       = aws_instance.webapp_server.public_ip
}

output "webapp_url" {
  description = "URL of the deployed web application (if accessible)"
  value       = "http://${aws_instance.webapp_server.public_ip}" # Or HTTPS if configured
}

output "db_endpoint" {
  description = "Endpoint of the RDS database"
  value       = aws_db_instance.chatbot_db.address
}
