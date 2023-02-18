styled-component

补充: styled-component

:computer: [b站styled-component](https://www.bilibili.com/video/BV1w3411s7cD/?spm_id_from=333.337.search-card.all.click&vd_source=c6866d088ad067762877e4b6b23ab9df)

可以在vscode extension下载styled-component插件, auto complete



好处

+ 利用ES6的模版字符串语法, 使得我们可以在JS中直接写css, 结合jsx可以完全实现在js中写三大件

+ 可以动态生成className, 避免className命名冲突

+ 可以解决浏览器兼容问题



Feature

+ 甚至还结合了SCSS的嵌套语法: `&` 代表自己,
+ css变量管理: 根据标签的props实现conditional style
+ Mixi
+ 全局样式

```react
import styled from 'styled-components'

const MyButton = styled.a`
 	border: 1px solid;
 	height: ${props => props.size || 'auto'}
 	
 	& span{
 		font-weight: 700;
 		
 	}
 	
 	&:hover{
 		background: #000;
 	}
 		
 	& ~ &{
 	
 	}
 	
 	// 紧挨着
 	& + &{
 	
 	}
 	
 	& .red{
 		border: red;
 	
 	}
 	
 	// conditioanl style
 	&{props => props.disabled && css`
		color: #777;
    border: #777;
		cursor: not-allowed;
		`
 	}
`

// mixin
const BigButton = styled(MyButton)`
	height: 56px;
	line-height: 56px;
	font-size: 36px;
`
    
    
function App(){
  return (
    <div>
    	<MyButton>hello</MyButton>
      <button>X<button>
      <MyButton size="24px">hello</MyButton>
      <MyButton className="red">hello</MyButton>
    </div>
  )
  
}

```





global style

```react
import {createGlobalStyle} from 'styled-component'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;

    .debug-r{
      outline: 2px solid #f00;
    }


  }
`

```

然后在entry 的index.tsx中调用GlobalStyle组件即可使全局获得上述global style的修饰