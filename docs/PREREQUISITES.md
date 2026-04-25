# Prerequisites

Complete the following setup **before** the workshop begins. Each section includes step-by-step instructions.

---

## 1. Visual Studio Code

VS Code is the editor you will use to build and edit the extension.

### Install

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com).
2. Download the installer for your operating system (Windows, macOS, or Linux).
3. Run the installer and accept the defaults.
4. Launch VS Code to confirm it opens successfully.

### Recommended Settings

- Enable **Auto Save**: `File` → `Auto Save`
- Install the **Edge DevTools** extension (optional, helpful for debugging): search `ms-edgedevtools.vscode-edge-devtools` in the Extensions panel.

---

## 2. GitHub Account with GitHub Copilot

GitHub Copilot is the AI coding assistant you will use to generate extension code from a single prompt.

### Create a GitHub Account (if you don't have one)

1. Go to [https://github.com](https://github.com).
2. Click **Sign up** and follow the prompts.
3. Verify your email address.

### Activate GitHub Copilot (Free for Students)

1. Apply for the **GitHub Student Developer Pack** at [https://education.github.com/pack](https://education.github.com/pack).
   - You will need to verify your student status with your USF email (`@usf.edu`).
   - Approval is usually instant but can take up to a few days.
2. Once approved, GitHub Copilot is included at no cost.

### Install GitHub Copilot in VS Code

1. Open VS Code.
2. Go to the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **GitHub Copilot** and click **Install**.
4. Search for **GitHub Copilot Chat** and click **Install**.
5. Sign in when prompted — use your GitHub account with Copilot access.
6. Verify it is working: open a new file, start typing a comment, and Copilot should suggest a completion.

---

## 3. Azure Free Trial Subscription

You need an Azure subscription to access Azure OpenAI and other AI services.

### Create an Azure Free Account

1. Go to [https://azure.microsoft.com/en-us/free/](https://azure.microsoft.com/en-us/free/).
2. Click **Start free**.
3. Sign in with a Microsoft account (or create one).
4. Complete the registration:
   - **Phone verification** — Enter your phone number for SMS or call verification.
   - **Credit card** — Required for identity verification. You will **not** be charged unless you manually upgrade.
5. Once complete, you will have:
   - **$200 in Azure credits** valid for 30 days.
   - **12 months** of select free services.

### Verify Your Subscription

1. Go to the [Azure Portal](https://portal.azure.com).
2. In the search bar, type **Subscriptions** and select it.
3. Confirm you see a subscription listed (e.g., "Azure subscription 1" or "Free Trial").

---

## 4. Azure OpenAI Resource & API Key

Azure OpenAI is the AI service that powers the extension's chatbot.

### Create an Azure OpenAI Resource

1. Go to the [Azure Portal](https://portal.azure.com).
2. Click **+ Create a resource**.
3. Search for **Azure OpenAI** and select it.
4. Click **Create** and fill in the details:
   - **Subscription**: Select your free trial subscription.
   - **Resource group**: Click **Create new** → name it `rg-usf-hackathon`.
   - **Region**: Select `East US` (or the closest available region).
   - **Name**: Choose a unique name (e.g., `usf-ai-openai`).
   - **Pricing tier**: Select `Standard S0`.
5. Click **Review + create** → **Create**.
6. Wait for the deployment to complete (usually 1–2 minutes).

### Deploy a GPT-4o Model

1. Once the resource is created, click **Go to resource**.
2. In the left menu, click **Model deployments** → **Manage Deployments** (this opens Azure AI Foundry).
3. Click **+ Create new deployment**.
4. Select:
   - **Model**: `gpt-4o`
   - **Deployment name**: `gpt-4o`
   - **Deployment type**: Standard
5. Click **Create**.

### Get Your API Key and Endpoint

1. Go back to your Azure OpenAI resource in the [Azure Portal](https://portal.azure.com).
2. In the left menu, click **Keys and Endpoint**.
3. Copy the following values — you will need them during the workshop:

| Value | Where to Find It |
|---|---|
| **Endpoint** | Shown at the top (e.g., `https://usf-ai-openai.openai.azure.com`) |
| **Key 1** | Click the copy icon next to KEY 1 |

> **Keep your API key private.** Do not commit it to a public repository or share it in chat.

---

## 5. A Chromium-Based Browser

The extension works on any Chromium-based browser.

### Supported Browsers

- **Microsoft Edge** (recommended) — [Download](https://www.microsoft.com/edge)
- **Google Chrome** — [Download](https://www.google.com/chrome/)
- **Brave** — [Download](https://brave.com/)
- **Vivaldi, Opera, Arc** — Also supported

### Enable Developer Mode

1. Open your browser and navigate to:
   - **Edge**: `edge://extensions`
   - **Chrome**: `chrome://extensions`
2. Toggle **Developer mode** (top-right corner) to **ON**.
3. You will use the **Load unpacked** button during the workshop to install your extension.

---

## Checklist

Before the workshop, confirm you have the following ready:

- [ ] VS Code installed and running
- [ ] GitHub account with Copilot enabled
- [ ] GitHub Copilot + Copilot Chat extensions installed in VS Code
- [ ] Azure free trial subscription active
- [ ] Azure OpenAI resource created with a `gpt-4o` deployment
- [ ] API key and endpoint copied and saved securely
- [ ] Chromium-based browser with Developer mode enabled

> If you run into issues with any of these steps, refer to the workshop's [troubleshooting guide](TROUBLESHOOTING.md) or ask your Hacker Leader for help.
