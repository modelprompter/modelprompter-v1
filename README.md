![Model Prompter](https://user-images.githubusercontent.com/110780894/193438704-61face5c-08a9-4a3e-8951-993b62293856.jpeg)

Model Prompter is a prompt engineering and API automation tool. It uses blocks to help you design dynamic prompts that can be batched to multiple cloud GPUs.

# Setup

- **Install prerequisites:**
  - Git (preinstalled on Linux/macOS): https://git-scm.com/downloads
  - Node: https://nodejs.org/en/download/
- **Install dependencies:** `npm install`

### Commands

```bash
# Start the app in development mode (hot-code reloading, error reporting, etc.)
npm start

# Build the app for production
npm run build

# Install Stable Diffusion locally (optional)
# See further instructions for your platform: https://github.com/AUTOMATIC1111/stable-diffusion-webui
git submodule update --init --recursive
```





# Data

Currently, everything is stored with `LocalStorage` as there's no backend. `LocalStorage` (with a capital L) is a wrapper around the browsers default `localStorage` that supports enums beyond strings and numbers, and is available in your browsers devtools.

## Library

This stores all of your workspaces, as well as unsaved changes in the current workspace. Here's what it looks like with `LocalStorage.getItem('library')`:

```js
{
  library: {
    // Major changes are not compatible with each other but minor versions are
    version: 1.0,
    currentWorkspace: {/* see workspaces */},
    workspaces: [
      {
        id: '',
        meta: {
          title: '',
          description: '',
          longDescription: '',
        },
        view: {
          scale: 0,
          left: 0,
          top: 0
        },
        workspace: {},
      },
    ]
  }
}
```


# Environment Variables
To customize your local install, copy and rename `template.env` to `.env` and replace the values with your own. The following are the defaults:

```bash
# If true, it'll inject the Plausible Analytics script: https://plausible.io/
# Analytics are only applied when hosted, not while using locally
# To finish the setup, register a Plausible account and add the domain
USE_PLAUSIBLE=FALSE
```
