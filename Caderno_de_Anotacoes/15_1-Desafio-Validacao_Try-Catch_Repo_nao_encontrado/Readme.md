# Desafio 5 - Validação: repositório não encontrado

## src/pages/Main/index.js

```diff
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
+    error: null
  };

  ...

  handleSubmit = async e => {
    e.preventDefault();

-    this.setState({ loading: true });
+    this.setState({ loading: true, error: false });

    const { newRepo, repositories } = this.state;

+    try {
+      // validação: input vazio
+      if (newRepo === "") {
+        throw new Error("Repositório vazio");
+      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
-        loading: false,
      });
+    } catch (error) {
+      console.log(error);
+      // Deixa a borda do input vermelha
+      this.setState({
+        error: true
+      });
+    } finally {
+      this.setState({
+        loading: false
+      });
+    }
  };

  ...

  render() {
-    const { newRepo, repositories, loading } = this.state;
+    const { newRepo, repositories, loading, error } = this.state;

    ...

-  <Form onSubmit={this.handleSubmit}>
+  <Form onSubmit={this.handleSubmit} error={error}>
    <input
      type="text"
      placeholder="Adicionar repositório"
      value={newRepo}
      onChange={this.handleInputChange}
    />
```

## src/pages/Main/styles.js

```diff
  input {
    flex: 1; /* flex = 1 ocupa todo o espaço disponível */
-    border: 1px solid #eee;
+    border: ${props => (props.error ? `1px solid red;` : `1px solid #eee;`)};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
```
