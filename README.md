<div align="center">
  <a href="https://modelprompter.com">
    <img src="./src/assets/branding-on-white.png" alt="Model Prompter" />
  </a>

  <p>
    <b>An open sourced AI and API prototyping platform</b>
  </p>
</div>

<p>
  Assemble blocks and chain together AI and API services to design bots, content generators, and automated workflows.
<p>

<br>

<div align="center">
  <p>
    <a class="q-mr-md" href="https://github.com/modelprompter/modelprompter" target="_blank"><img src="https://img.shields.io/github/stars/ModelPrompter/modelprompter?label=Star%20on%20GtiHub&amp;style=social"></a>&nbsp;&nbsp;<a class="q-mr-md" href="https://twitter.com/modelprompter" target="_blank"><img src="https://img.shields.io/twitter/follow/modelprompter?label=Follow%20%40ModelPrompter&amp;style=social"></a>&nbsp;&nbsp;<a class="q-mr-md" href="https://discord.gg/GFJ2ftEQWF" target="_blank"><img src="https://img.shields.io/discord/1032046629768937484?label=%F0%9F%92%AC%20Chat%20on%20Discord&amp;style=social"></a>
  </p>
  <br>
  <hr>
  <br>
  <!-- <p>
    <sub>
      Built with ❤︎ by
      <a href="https://github.com/modelprompter/modelprompter/graphs/contributors">
        contributors
      </a>
    </sub>
  </p>
  <br /> -->
</div>



![Model Prompter](https://user-images.githubusercontent.com/110780894/193438704-61face5c-08a9-4a3e-8951-993b62293856.jpeg)

<table>
  <tr>
    <td><img src="" /></td>
    <td><img src="" /></td>
  </tr>
  <tr>
    <td><img src="" /></td>
    <td><img src="" /></td>
  </tr>
</table>

<br>
<br>
<br>

# Features

### API blocks
- `GET`
- `POST`
- `PUT`
- `DELETE`
- (more coming soon)


### Customize the way results are displayed and behave

### View and share blocks as simplified forms

### Block library with synced remote libraries

### And more

<br>
<br>
<br>

# Setup

### Install
- **You'll need:**
  - Git (preinstalled on Linux/macOS): https://git-scm.com/downloads
  - NodeJS: https://nodejs.org/en/download/
- **Clone the repo:** `git clone https://github.com/modelprompter/modelprompter`
- **Install dependencies:** `npm install`
- **Start Model Prompter:**  `npm start`
  - Will automatically launch a new browser tab at http://localhost:9000

> <br>
> You're done, the rest of this README is optional 🚀
> <br>
> Check out <a href="https://modelprompter.com/blog">modelprompter.com/blog</a> for the latest
> <br>
> <br>

<br>

### CLI

```bash
# Start app in dev mode: http://localhost:9000
npm start

# (optional) Build the project into ./dist/spa
npm run build
```

### Environment Variables
To customize your local install, copy and rename `template.env` to `.env` and replace the values with your own. The following are the defaults:

```bash
# If true, it'll inject the Plausible Analytics script: https://plausible.io/
# Analytics are only applied when hosted, not while using locally
# To finish the setup, register a Plausible account and add the domain
USE_PLAUSIBLE=FALSE
```



<br>
<br>
<br>


# Data

Currently, everything is stored with `LocalStorage` as there's no backend. `LocalStorage` (with a capital L) is a wrapper around the browsers default `localStorage` that supports enums beyond strings and numbers, and is available globally.

### Library

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
