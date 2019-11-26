注意事项
1.[很多】公司面试题都是常年不更新的，[可能】你搜该公司往年的面经，就能猜到今年的题目。

2.很多面试官的知识也是常年不更新的，你不要答得太【偏激]，应该了解大众的想法。

3.本押题主要强调答题思路，具体答案都可以搜到（不要用百度）技巧

1.遇到比较抽象的题目就具体化（举例），遇到比较具体的题目就抽象化（阐述）

2.抽象题目搜知乎，代码题目搜 Stackoverflow或博客

3.[XXx的原理】这种题目一般都是说源代码思路，但你不需要看源码，直接看别人的博客即可（再次强调，不要用百度）HTML

1.必考：你是如何理解HTML语义化的？
举例

2.meta viewport是做什么用的，怎么写？
举例

3.你用过哪些HTML5标签？
举例

4.H5是什么？
阐述

CSS

1.必考：两种盒模型分别说一下。
举例

2.必考：如何垂直居中？
分情况讨论

3.必考：flex怎么用，常用属性有哪些？
举例

4.必考：BFC是什么？
举例

5.CSS选择器优先级
1.越具体优先级越高
2.写在后面的，覆盖写在前面的
3.important！最高，少用

6.清除浮动说一下
```css
.clearfix{
    content:''；
    display:block/table；
    clear:both；
}
.clearfix加到容器上，里面的子元素的浮动就被清除了
```

原生JS

1.必考：ES6语法知道哪些，分别怎么用？
举例（let const class 展开运算等）

2.必考Promise.Promise.all、Promise.race分别怎么用？
举例

3.必考：手写函数防抖和函数节流代码

4.必考：手写AJAX代码

```javascript
AJAX 
var request=new XMLHttpRequest（）
request.open（'GET'，'/xxxx'）
request.onreadystatechange=function（）{
if（request.readyState ===4）{
console.log（'请求完成’）if（request.response.status >=200&&request.response.status<300）{
console.log（’请求成功’）
}else{
request.send（）

var request=new XMLHttpRequest（）
request.open（'GET'，'/xxxx'）
request.onload=（）=>{console.log（'请求成功）}
request.send（）
```

5.必考：这段代码里的this是什么？
看调用
```javascript
1.fn（）
this =>window/global
2.obj.fn（）
this=>obj
3.fn.call（xx）
this =>xx
4.fn.apply（xx）
this =>xx
5.fn.bind（xx）
this =>xx
6.new Fn（）
this=>新的对象
7.fn=（）=>{}
this=>外面的this
```

6.必考：闭包/立即执行函数是什么？
阐述

7.必考：什么是JSONP，什么是CORS，什么是跨域？
举例

8.常考：async/await 怎么用，如何捕获异常？
举例

9.常考：如何实现深拷贝？
代码

10.常考：如何用正则实现trim0？
代码

11.常考：不用class如何实现继承？用class又如何实现？
代码

12.常考：如何实现数组去重？
代码

13.放弃：==相关题目（反着答）性价比

14.送命题：手写一个Promise