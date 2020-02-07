# Exibindo issues

## src/pages/Repository/index.js

```diff
- import { Loading, Owner } from './styles';
+ import { Loading, Owner, IssueList } from './styles';

return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

+        <IssueList>
+          {issues.map(issue => (
+            // É boa prática a key ser uma string
+            <li key={String(issue.id)}>
+              <img src={issue.user.avatar_url} alt={issue.user.login} />
+              <div>
+                <strong>
+                  <a href={issue.html_url}>{issue.title}</a>
+                  {issue.labels.map(label => (
+                    <span key={String(label.id)}>{label.name}</span>
+                  ))}
+                </strong>
+                <p>{issue.user.login}</p>
+              </div>
+            </li>
+          ))}
+        </IssueList>
      </Container>
    );
```

## src/pages/Repository/styles.js

```diff
+ export const IssueList = styled.ul`
+   padding-top: 30px;
+   margin-top: 30px;
+   border-top: 1px solid #eee;
+   list-style: none;
+
+   li {
+     display: flex;
+     padding: 15px 10px;
+     border: 1px solid #eee;
+     border-radius: 4px;
+
+     & + li {
+       margin-top: 10px;
+     }
+
+     img {
+       width: 36px;
+       height: 36px;
+       border-radius: 50%;
+       border: 2px solid #eee;
+     }
+
+     div {
+       flex: 1;
+       margin-left: 15px;
+
+       strong {
+         font-size: 16px;
+
+         a {
+           text-decoration: none;
+           color: #333;
+
+           &:hover {
+             color: #7159c1;
+           }
+         }
+
+         span {
+           background: #eee;
+           color: #333;
+           border-radius: 2px;
+           font-size: 12px;
+           font-weight: 600;
+           height: 20px;
+           padding: 3px 4px;
+           margin-left: 10px;
+         }
+       }
+
+       p {
+         margin-top: 5px;
+         font-size: 12px;
+         color: #999;
+       }
+     }
+   }
+ `;
```
