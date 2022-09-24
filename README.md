# Model Prompter (modelprompter)

Automate prompts to Stable Diffusion using multiple (free) cloud GPUs

# Install
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm start
```


### Build the app for production
```bash
quasar build
```

### Install Stable Diffusion locally (optional)
```bash
git submodule update --init --recursive

# See further instructions for your platform: https://github.com/AUTOMATIC1111/stable-diffusion-webui
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
