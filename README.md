## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Deployed option on: [https://plugin-manager-app.netlify.app](https://plugin-manager-app.netlify.app)

---

Assummptions/Actions:

- Disable/Enable all plugins: Disabling/Enabling all plugins from a tab doesn't change the
  initial "disabled" state of a specific plugin.
- tab ids don't change
- Db schema shouldn't change the original format
