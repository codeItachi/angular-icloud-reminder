var reminder = angular.module('myapp',[]);
reminder.filter('search',[function(){
	return function(data,key){
	    var xx = function(items){
	    	for(var i = 0;i<items.length;i++){
	    		if(items[i].title.indexOf(key) != -1){
                  return true;
	    		}
	    	}
	    	return false;
	    }
      var r = [];
      for(var i =0;i<data.length;i++){
      	if(data[i].name.indexOf(key) != -1){
      		r.push(data[i]);
      	}
      	if(xx(data[i].items)){
      		r.push(data[i]);
      	}
      }
      return r;
	}
}])
reminder.controller('rdctrl', ['$scope', function($scope){
	var d = localStorage.data;
	$scope.shijianliebiao = d?JSON.parse(d):[];

	$scope.colors = ['purple','green','blue','yellow','brow','pink','orange'];

	$scope.cindex = 0;

	$scope.setItem = function(index) {
		$scope.cindex = index;
	}
    $scope.save = function(){
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.addItem = function() {
		var data = {
			name:'新列表 ' + ($scope.shijianliebiao.length+1),
			color:$scope.colors[$scope.shijianliebiao.length%7],
			items:[]
		};
		$scope.shijianliebiao.push(data);
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}

	$scope.deleteItem = function() {
		var r = [];
		for(var i=0; i<$scope.shijianliebiao.length; i++){
			if(i != $scope.cindex){
				r.push($scope.shijianliebiao[i]);
			}
		}
		$scope.shijianliebiao = r;
		$scope.cindex = 0;
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.countDone = function(){
		var lis = $scope.shijianliebiao[$scope.cindex].items;
		var r = 0;
		for(var i = 0;i < lis.length;i++){
			if(lis[i].isDone){
				r += 1;
			}
		}
		return r;
	}
	$scope.addTodo = function(){
		var cu = $scope.shijianliebiao[$scope.cindex];
		var data = {title:'新条目'+(cu.items.length+1),isDone:false}
		cu.items.push(data)
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.deleteTodo = function(index){
        var r = [];
        var cu = $scope.shijianliebiao[$scope.cindex];
        for(var i = 0;i<cu.items.length;i++){
           if(i != index){
           	 r.push(cu.items[i])
           }
        }
        cu.items = r;
        localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
}])