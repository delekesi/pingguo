

var todo=[
    {
        id:1,
        title:"新列表1",
        color:"#1BAEF8",
        list:[
            {
            title:"早晨8点去跑步",
            done:true
            },
            {
                title:"早晨5点去跑步",
                done:false
            },
            {
                title:"早晨7点去跑步",
                done:true
            },
            {
                title:"早晨6点去跑步",
                done:false
            }
        ]
    },
    {
        id:2,
        title:"新列表2",
        color:"#67DC3A",
        list:[
            {
                title:"早晨80点去跑步",
                done:true
            },
            {
                title:"早晨50点去跑步",
                done:false
            },
            {
                title:"早晨70点去跑步",
                done:false
            },
            {
                title:"早晨60点去跑步",
                done:true
            }
        ]
    }

]
var colors=["#1BAEF8","#67DC3A","#FF8800","#D07BE3","#F7CC00","#A3855F","#FF2762"];
var app=angular.module("app",[])
app.controller("cc",function($scope,localstg) {
    // $scope.todo=todo;
    // localstg.saveData('todo',$scope.todo)
    $scope.todo=localstg.getData("todo")
    $scope.index=$scope.todo.length-1;
    $scope.falg=false;
    $scope.optflag=false;
    $scope.title=todo.title;
    $scope.colors = colors;
    $scope.chtt = $scope.todo[$scope.index].title;
    $scope.changeColor = $scope.todo[$scope.index].color;


      $scope.select=function (i) {

         $scope.index=i;
          $scope.chtt = $scope.todo[i].title;
          $scope.changeColor = $scope.todo[i].color;
          $scope.flag=false;

      }

    $scope.down=0;


    $scope.getdown=function () {
       $scope.down=0;
        var list=$scope.todo[$scope.index].list;
        angular.forEach(list,function (v,l) {
          if(v.done){
               $scope.down+=1;
          }
        })
        localstg.saveData("todo",$scope.todo)
    }
    $scope.getdown()
    $scope.$watch("index",function () {
        $scope.getdown();
        $scope.flag=false;
        $scope.chtt = $scope.todo[$scope.index].title;
        $scope.changeColor = $scope.todo[$scope.index].color;
        localstg.saveData("todo",$scope.todo)

    })
    $scope.bianhua=function (o,f) {
          o.done=f;
        $scope.getdown()
        localstg.saveData("todo",$scope.todo)
    }
    $scope.change=function (o,text) {
        o.title=text.target.innerHTML
        localstg.saveData("todo",$scope.todo)
    }
    $scope.addItem=function () {
        $scope.ids=$scope.todo[$scope.todo.length-1].id+1
         $scope.index=$scope.todo.length;
        $scope.todo.push({
            id:$scope.ids,
        title:'新列表'+$scope.ids,
        color:colors[$scope.todo.length%7],
            list:[]
        })



        localstg.saveData("todo",$scope.todo)

    }

    $scope.add=function () {
        $scope.todo[$scope.index].list.push({
            title:'',
            done:false
        })
        $scope.getdown()
        localstg.saveData("todo",$scope.todo)
    }
    $scope.clearbox=function () {
        var list=$scope.todo[$scope.index].list;
        var shuzu=[];
        angular.forEach(list,function (v,i) {
           if(v.done==false){
               shuzu.push(v)
           }
        })

        $scope.todo[$scope.index].list=shuzu
        $scope.getdown();
        $scope.optflag=false;
        localstg.saveData("todo",$scope.todo)

    }
    $scope.sColor=function (c) {
       $scope.changeColor = c;

    }
    

    $scope.comcc = function () {
        var o = $scope.todo[$scope.index];
        o.title=$scope.chtt;
        o.color=$scope.changeColor;
        $scope.optflag=false;
        localstg.saveData("todo",$scope.todo)
    }
    $scope.dellist=function () {
        if($scope.todo.length==1){
            alert("至少保留一个")
            return;
        }

        $scope.todo.splice($scope.index,1);
        $scope.index=$scope.todo.length-1;
        $scope.optflag=false

        localstg.delData('todo');


    }

})


app.factory("localstg",function(){
    return {
        getData:function (key) {
        var d=localStorage.getItem(key);
            return d==null?[]:JSON.parse(d);
        },
        saveData:function (key,data) {
          localStorage.setItem(key,JSON.stringify(data))
        },
        delData:function (key) {
           localStorage.removeItem(key);
        }
    }
})