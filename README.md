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
