# Grocery Email Collection API

## Documentation:

### Every Response have a special `code` attribute in it to define the actual message

### **[POST]** `/signup`

### Request Body will contain

```json
{
  "email_id": "abc@email.com",
  "ip_address": "101.101.101.101",
  "city": "NY",
  "state": "NY"
}
```

### `email_id` field is mandatory to pass

### Code - 100

#### Response failed because of no email_id in request body

### Code - 200

#### Response failed because of email_id already exists in database

### Code - 300

#### Response succeded and email id signed-up
