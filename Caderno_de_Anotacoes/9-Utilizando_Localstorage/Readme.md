# Utilizando LocalStorage

## src/pages/Main/index.js

```diff
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

+  // Carrega os dados do LocalStorage
+  componentDidMount() {
+    const repositories = localStorage.getItem('repositories');
+
+    if (repositories) {
+      this.setState({ repositories: JSON.parse(repositories) });
+    }
+  }
+
+  // Salva os dados no LocalStorage
+  componentDidUpdate(_, prevState) {
+    const { repositories } = this.state;
+
+    if (prevState.repositories !== repositories) {
+      localStorage.setItem('repositories', JSON.stringify(repositories));
+    }
+  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };
```
