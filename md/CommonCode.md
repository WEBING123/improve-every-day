### 1. 点击元素添加样式同级元素移除样式

```javascript
mui('.mui-table-view').on('tap', 'li', function (e) {
    $(this).addClass('active').siblings().removeClass('active');
});
```

### 2. 模糊搜索

```html
<div>
    <input type="text" id="txt">
    <button type="button" id="btn">search</button>
    <ul id="list">
    </ul>
</div>
```

```css
* {
    list-style: none;
    padding: 0;
    margin: 0;
}

div {
    text-align: center;
    padding-top: 20px;
}

ul {
    padding-top: 20px;
    width: 30%;
    margin: 0 50% 0 35%;
}

li {
    padding: 3px;
    border: 1px solid silver;
    box-shadow: 1px 1px;
}
```

```javascript
/**
 * Created by Steven on 2016-10-25.
 */
var oTxt = document.getElementById('txt');
var oBtn = document.getElementById('btn');
var oList = document.getElementById('list');

var fruits = ["桃子", "苹果", "梨子", "香蕉", "香瓜", "葡萄", "柠檬", "橘子", "草莓"];
//点击事件
oBtn.addEventListener('click', function () {
    var keyWord = oTxt.value;
    // var fruitList = searchByIndexOf(keyWord,fruits);
    console.log(fruitList);
    var fruitList = searchByRegExp(keyWord, fruits);
    renderFruits(fruitList);
}, false);
//回车查询
oTxt.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        var keyWord = oTxt.value;
        // var fruitList = searchByIndexOf(keyWord,fruits);
        var fruitList = searchByRegExp(keyWord, fruits);
        renderFruits(fruitList);
    }
}, false);

function renderFruits(list) {
    if (!(list instanceof Array)) {
        return;
    }
    oList.innerHTML = '';
    var len = list.length;
    var item = null;
    for (var i = 0; i < len; i++) {
        item = document.createElement('li');
        item.innerHTML = list[i];
        oList.appendChild(item);
    }
}
//模糊匹配的时候如果不区分大小写，可以使用toLowerCase()或者toUpperCase()转换之后去匹配。

//模糊查询1:利用字符串的indexOf方法
function searchByIndexOf(keyWord, list) {
    if (!(list instanceof Array)) {
        return;
    }
    var len = list.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (list[i].indexOf(keyWord) >= 0) {
            arr.push(list[i]);
        }
    }
    return arr;
}
//正则匹配
function searchByRegExp(keyWord, list) {
    if (!(list instanceof Array)) {
        return;
    }
    var len = list.length;
    var arr = [];
    var reg = new RegExp(keyWord);
    for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (list[i].match(reg)) {
            arr.push(list[i]);
        }
    }
    return arr;
}
renderFruits(fruits);
```

### 3. jQuery选择器

```javascript
// 选取所有 target 属性值等于 "_blank" 的 <a> 元素
$("a[target='_blank']").hide();
```