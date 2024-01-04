---
{ "title": "Hello world", "editLink": true ,layout:"page"}

---

<script setup>
    import { useData } from 'vitepress'
    const { frontmatter } = useData()
</script>

# helloworld

this is hello world

## 链接


-   外部链接[Link to baidu](https://www.baidu.com){target="\_self"}

## 动态路由



## YAML frontmatter

输入

```md
---
{ "title": "Blogging Like a Hacker", "editLink": true }
---
```

-   title-{{frontmatter.title}}
-   editLink - {{frontmatter.editLink}}
