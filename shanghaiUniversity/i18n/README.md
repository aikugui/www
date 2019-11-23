# jQuery i18n 插件

#### 使用方法

1.引入插件

```html
<script src="i18n/jquery.i18n.js"></script>
```

2.引入翻译文件

```html
<script src="i18n/landing.js"></script>
```

3.添加翻译分组 data-group \
例如：添加分组 landing 则该分组下所有翻译 key 将从 window.i18n.landing 对象中取

```html
<div class="wrapper" data-group="landing">
```

4.在要翻译的元素上添加翻译 key

```html
<div class="superapp" data-i18n="super_app">
```

#### 插件方法

1.切换语种

```js
$.fn.i18n.switch("ja");
```

### 插件事件

1.语种切换事件

```html
$(document).on('i18n-switch', event){
  // event.language
  ...
}
```

### css 独立语种样式

```css
html[lang="en"] you-custom-css {
  /* 你的样式 */
}
```

翻译文件格式 \
请参考 landing.js
