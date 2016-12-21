# verification

new Verification().bindEvent({

	name:'#password-again',   //元素
	
	type: 'password',        //input的type
	
	require: false,			 //是否必填
	
	valLength:[6,18],        //填写的文本长度范围限制
	
	RegExp:[/^[A-Za-z0-9]+$/],   //正则，可填写多个
	
	tips:['重复密码必须是字母和数字组成的字符',],   //错误提示，与正则配对
	
	formatter:function(inputResult,showTipsBox){
	
		//上述校验通过后，执行该参数作回调处理
		
		//inputResult ： 校验结果，该回调参数为校验操作时，需返回inputResult
		
		<!-- showTipsBox (element,tips)：校验不通过时显示的文本提示信息
		
			element ：表单元素
			
			tips ：提示信息 -->
			
		var padAgain = document.querySelector("#password-again"),
		
			padAgainVal = padAgain.value,
			
			psdVal = document.querySelector("#password").value;
			
		if(psdVal !== padAgainVal){
		
			showTipsBox(padAgain,'密码必须与重复密码一致');
			
			inputResult = false
			
		}
		
		return inputResult;
		
	}
	
})

尚未对不同type的input作出不同处理

尚未做好默认值的处理

Object.assign()是ES2015的新内容之一




