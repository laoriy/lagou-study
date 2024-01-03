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

-   内部链接[Getting Started](./)

-   外部链接[Link to baidu](https://www.baidu.com){target="\_self"}

## 动态路由

-   [foo](./pcks/foo)
-   [bar](./pcks/bar)

## YAML frontmatter

输入

```md
---
{ "title": "Blogging Like a Hacker", "editLink": true }
---
```

-   title-{{frontmatter.title}}
-   editLink - {{frontmatter.editLink}}
