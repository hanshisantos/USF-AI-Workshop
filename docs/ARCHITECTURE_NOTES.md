# Architecture Notes — Service Worker & External APIs

## Overview

The Chrome extension uses a **Manifest V3 service worker** (`background.js`) to handle communication with Azure OpenAI. The content script sends messages to the background worker, which forwards requests to the API and returns responses to the chat UI.

## How `background.js` Manages API Calls

The service worker defines several constants at the top of the file:

| Constant | Purpose |
|---|---|
| `AZURE_OPENAI_ENDPOINT` | The base URL of your Azure OpenAI resource |
| `AZURE_OPENAI_KEY` | The API key used to authenticate requests |
| `AZURE_OPENAI_DEPLOYMENT` | The model deployment name (e.g., `gpt-4o`) |
| `API_VERSION` | The Azure OpenAI REST API version string |

When a user sends a message, `background.js` constructs a `fetch` request with the key passed in the `api-key` header and the user's prompt in the JSON body.

---

## Moving to Production — Azure Key Vault Integration

For any deployment beyond local development, API keys **must not** be stored in source code. Azure Key Vault provides a centralized, access-controlled secrets store.

### Step 1: Create an Azure Key Vault

```bash
# Create a resource group (if you don't have one)
az group create --name rg-usf-hackathon --location eastus

# Create the Key Vault
az keyvault create \
  --name kv-usf-hackathon \
  --resource-group rg-usf-hackathon \
  --location eastus \
  --sku standard
```

### Step 2: Store Your API Key as a Secret

```bash
az keyvault secret set \
  --vault-name kv-usf-hackathon \
  --name "azure-openai-api-key" \
  --value "<YOUR_API_KEY>"
```

### Step 3: Configure Access Policies

Grant your application's managed identity (or service principal) permission to **get** secrets:

```bash
az keyvault set-policy \
  --name kv-usf-hackathon \
  --object-id <APP_IDENTITY_OBJECT_ID> \
  --secret-permissions get
```

### Step 4: Retrieve Secrets at Runtime

In a production backend (e.g., Azure Functions, App Service), use the Azure Identity SDK to fetch the key at startup rather than bundling it in client-side code:

```javascript
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const client = new SecretClient("https://kv-usf-hackathon.vault.azure.net", credential);

async function getApiKey() {
    const secret = await client.getSecret("azure-openai-api-key");
    return secret.value;
}
```

### Step 5: Proxy Pattern for Browser Extensions

Since a Chrome extension runs entirely on the client, it **cannot** securely store secrets. The recommended production architecture is:

1. Deploy a lightweight backend (Azure Functions / App Service)
2. The backend retrieves the API key from Key Vault via managed identity
3. The extension calls **your backend**, not Azure OpenAI directly
4. The backend proxies the request to Azure OpenAI with the key server-side

```
Extension  ──►  Your Backend (Azure Function)  ──►  Azure OpenAI
                     │
                 Key Vault (managed identity)
```

This ensures the API key **never leaves the server** and is never exposed in client-side JavaScript.

---

## Additional Considerations

- **Key Rotation**: Key Vault supports versioning — rotate keys regularly and update the secret without redeploying code.
- **Network Restrictions**: Use Key Vault firewall rules and private endpoints to limit access to trusted networks.
- **RBAC vs. Access Policies**: Azure RBAC for Key Vault is the newer model and recommended for granular, identity-based access control.
- **Audit Logging**: Enable Key Vault diagnostic logging to monitor all secret access events.

---

> **Note:** This should be part of your hackathon challenge — to detect this vulnerability if not addressed and ensure you have a clear solution. This will be considered **bonus points** if identified and resolved by your team.
