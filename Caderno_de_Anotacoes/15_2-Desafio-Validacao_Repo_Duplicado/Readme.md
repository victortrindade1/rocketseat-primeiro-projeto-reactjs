# Validação: repositório duplicado

## src/pages/Main/index.js

```diff
handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    const { newRepo, repositories } = this.state;

    try {
      // validação: input vazio
      if (newRepo === "") {
        throw new Error("Repositório vazio");
      }

+      // validação: repositório duplicado
+      const hasRepo = repositories.find(r => r.name === newRepo);
+
+      if (hasRepo) {
+        throw new Error("Repositório duplicado");
+      }

      const response = await api.get(`/repos/${newRepo}`);
```
