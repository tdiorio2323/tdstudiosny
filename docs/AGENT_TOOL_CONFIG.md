# OpenAI Agent Tool Configuration

## Tool Definition for Agent Builder

Add this tool to your TD Studios Agent in the OpenAI platform:

```json
{
  "type": "function",
  "function": {
    "name": "log_client_intake",
    "description": "Save client intake information to the TD Studios database. Use this after collecting name, brand, goals, and budget from the client.",
    "parameters": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Client's full name"
        },
        "brand": {
          "type": "string",
          "description": "Client's business/brand name"
        },
        "goals": {
          "type": "string",
          "description": "Project goals and requirements"
        },
        "budget": {
          "type": "string",
          "description": "Budget range (e.g., '$5k-10k', 'Under $5k', '$10k+')"
        },
        "email": {
          "type": "string",
          "description": "Client's email address (optional)"
        }
      },
      "required": ["name", "brand", "goals", "budget"]
    }
  }
}
```

## HTTP Configuration

If using HTTP tool instead:

- **Method**: POST
- **URL**: `https://yourdomain.com/api/intake` (replace with your actual domain)
- **Headers**:

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- **Body**: JSON with the client data

## Agent Instructions Update

Add this to your agent instructions:

```
After collecting client information (name, business name, project goals, and budget range),
call the log_client_intake function to save their details.
Then provide them with the booking link: https://www.tdstudiosdigital.com/book
```

## Testing the Endpoint

Test locally with curl:

```bash
curl -X POST http://localhost:3000/api/intake \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "brand": "Acme Corp",
    "goals": "Modern website redesign with e-commerce",
    "budget": "$10k-20k",
    "email": "john@acme.com"
  }'
```

Expected response:

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "createdAt": "2025-10-06T18:30:00.000Z"
  }
}
```
