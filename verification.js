var Verification= function(){
	var defaults={
		type: 'text',
		require: true,
		valLength:[],
		RegExp:[],
		tips:[],
		formatter:function(inputResult){}
	};

	var inputResult = null;

	var extend = function(obj1, obj2){
		return Object.assign({},obj1,obj2);
    }

	var showTipsBox = function(element,tips){
		var parent = element.parentNode;
		var box = parent.querySelector(".verification-tips");
		element.style.border='1px solid #F00';
		if(box){
			box.innerHTML= tips;
		}else{
			var tipsItem = document.createElement("p");
			tipsItem.className = "verification-tips";
			tipsItem.innerHTML = tips;
			parent.appendChild(tipsItem);
		}
	}

	var hideTipBox = function(element){
		var parent = element.parentNode;
		var box = parent.querySelector(".verification-tips");
		element.style.border='1px solid #000';
		if(!!box){
			parent.removeChild(box);
		}
	}


	var require = function(element,val,tips){
		if(!val){
			showTipsBox(element,tips?tips:'该内容不能为空');
			inputResult = false
		}else{
			inputResult = true
		}
	}

	var checkLength = function(element,val,valLength,tips){
		var len = val.length;
		if(valLength instanceof Array){
			if(len<valLength[0]||len>valLength[1]){
				showTipsBox(element,tips?tips:'该内容长度为'+valLength[0]+'-'+valLength[1]+'字符');
				inputResult = false
			}else{
				inputResult = true
			}
		}
	}

	var checkRegExp = function(element,val,RegExp,tips){
		var i,
			len = RegExp.length;
		for(i=0;i<len;i++){
			if(!RegExp[i].test(val)){
				showTipsBox(element,tips[i]);
				inputResult = false
				break;
			}else{
				inputResult = true
			}
		}
	}

	var verifiInput = function(elemnt,opts,showTipsBox){
		var optsAll = extend(defaults,opts);
		var _element = elemnt,
		    _val = _element.value,
		    /*_type = optsAll.type,*/
		    _require = optsAll.require,
		    _valLength = optsAll.valLength,
		    _RegExp = optsAll.RegExp,
		    _tips = optsAll.tips,
		    _formatter = optsAll.formatter;

		if(!!_require){
			require(_element,_val);
			if(inputResult==false){return false};
		}
		if(_valLength.length>0){
			checkLength(_element,_val,_valLength);
			if(inputResult==false){return false;};
		}
		if(_RegExp.length>0){
			checkRegExp(_element,_val,_RegExp,_tips);
			if(inputResult==false){return false;};
		}
		inputResult = _formatter(inputResult,showTipsBox);
		if(inputResult==false){return false;};
		hideTipBox(_element);
		return inputResult;
	}

	this.bindEvent = function(opts){
		for(let j=0;j<opts.length;j++){
			var elements = document.querySelectorAll(opts[j].name),
				len = elements.length;
			for(let i=0;i<len;i++){
				elements[i].addEventListener("blur",function(event){
					var element = event.target;
					verifiInput(element,opts[j],showTipsBox);
				},false);
			}
		}
	}

}