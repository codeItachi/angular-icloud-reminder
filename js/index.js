var myapp=angular.module('reminder',[]);
//过滤器
myapp.filter('search',[function(){
  return function(e,key){
    var xx=function(items){
      for(var i=0;i<items.length;i++){
       if (items[i].title.indexOf(key)!=-1){
        return true;
       }
      }
      return false;
    }
    var r=[];
    for(var i=0;i<e.length;i++){
      if(e[i].name.indexOf(key)!=-1 ){
        r.push(e[i]);
      }else if(xx(e[i].items)){
        /*var re=[];
        for(var j=0;j<e[i].length;j++){
          if(){
            re.push()
          }
        }
        e[i].items= re;*/
        r.push(e[i])
      }
    }
    return r;
  }
}])

//angular
myapp.controller('rdctrl', ['$scope', function($scope){
  var d=localStorage.data;
  $scope.shijianliebiao=d?JSON.parse(d):[];
  
  $scope.colors=['purple','green','blue','yellow','brown','pink','orange'];
  $scope.cindex=0;
  //深拷贝
  $scope.copy=angular.copy($scope.shijianliebiao)
  $scope.countDone=function(){
    var lis=$scope.shijianliebiao[$scope.cindex].items;
    var r=0;
    for(var i=0;i<lis.length;i++){
      if(lis[i].isDone){
        r+=1;
      }
    }
    return r;
  }
  $scope.setItem=function(index){
     $scope.cindex=index;
     $scope.key=null;
  }

  $scope.addItem=function(){
  	var data={
  		name:'新列表'+($scope.shijianliebiao.length+1),
  		color:$scope.colors[$scope.shijianliebiao.length%7],
  		items:[]
  	};
  	$scope.shijianliebiao.push(data);
  	localStorage.data=JSON.stringify($scope.shijianliebiao);
  }
 

  //清空
  $scope.delete=function(){
  	var r=[];
  	for(var i=0;i<$scope.shijianliebiao.length;i++){
  		if(i!=$scope.cindex){
  			r.push($scope.shijianliebiao[i])
  		}
  		
  	}
  	$scope.shijianliebiao=r;
  	$scope.cindex=0;
  	localStorage.data = JSON.stringify($scope.shijianliebiao);//保存数据
	}
  
  

  //增加
  $scope.addTodo=function(){
  	var cu=$scope.shijianliebiao[$scope.cindex];
  	var data={
  		title:'',
  		isDone:false
  	}
  	cu.items.push(data);
  	localStorage.data=JSON.stringify($scope.shijianliebiao);
  }
  //删除
  $scope.deleteTodo=function(index){
  	var r=[];
  	var cu=$scope.shijianliebiao[$scope.cindex];
    for(var i=0;i<cu.items.length;i++){
    	if(i!=index){
    		r.push(cu.items[i])
    	}
    	
    }
    cu.items=r;
    localStorage.data = JSON.stringify(cu.items);
  }
 

  $scope.save=function(){
  	localStorage.data = JSON.stringify($scope.shijianliebiao);
  }

  //改	
}])