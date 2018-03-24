## 注意事项

##### 1. postcss-viewport-units插件解析原本带有content属性样式的时候会报错


```
// 排除掉原本带有content属性的样式
plugins: [
    "postcss-viewport-units":{
      /* 过滤原本带有content属性的元素 */
      filterRule: (rule) => {          
        return rule.selector.indexOf('::after') < 0 && rule.selector.indexOf(':after') < 0 && rule.selector.indexOf('::before') < 0 && rule.selector.indexOf(':before') < 0;
      }
    }
]
```

##### 2. img标签设置宽高之后，postcss-viewport-units会添加content样式属性，在苹果手机上面img元素设置有content时，不会显示出图片

```
// 解决问题
img { 
  content: normal !important;
}
```
