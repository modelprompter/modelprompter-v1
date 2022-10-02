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




# Setting up GPUs
## Locally
### [AUTOMATIC1111's Stable Diffusion Webgui](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)

AUTOMATIC1111's UI and server are great companions to Model Prompter, providing upscaling, img2img, and other extras.

1. Download repositories: `git submodule update --init --recursive`
2. `cd servers/AUTOMATIC1111/stable-diffusion-webui`
3. Finish setup based on your system. It's best to just do the manual setup since you'll need to manually download all the big models anyways: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki
4. Go back to the project root and run:

```bash
npm run dream-server

npm run dream-server-med

# Edge case for Nvidia 16xx
npm run dream-server-16xx

# 4GB VRAM (slow but will work with enough RAM)
npm run dream-server-low
```
