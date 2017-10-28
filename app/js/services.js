var musicStormServices = angular.module('musicStormServices', []);

musicStormServices.factory('Paginator', function () {
    //虽然这是一个服务，但是每次用户调用它时都会获得一个全新的Paginator。这是因为我们会返回一个function，当它被执行时会返回一个对象


    return function (fetchFunction, pageSize) {
        var paginator = {
            hasNextVar: false,
            next: function () {
                if (this.hasNextVar) {
                    this.currentOffset += pageSize;
                    this._load();
                }
            },
            _load: function () {
                var self = this;
                fetchFunction(this.currentOffset, pageSize + 1, function (items) {
                    console.log(items);
                    self.currentPageItems = items.slice(0, pageSize);
                    self.hasNextVar = items.length === pageSize + 1;

                });
            },
            hasNext: function () {
                return this.hasNextVar;
            },
            previous: function () {
                if (this.hasPrevious()) {
                    this.currentOffset -= pageSize;
                    this._load();
                }
            },
            hasPrevious: function () {
                return this.currentOffset !== 0;
            },
            currentPageItems: [],
            currentOffset: 0
        };

        //加载第一页
        paginator._load();
        return paginator;
    };
});

musicStormServices.factory('paginationService', function () {
    return function (newResult, newSize) {
        var pagination = {
            pageSize: newSize,
            pages: [], //分页数
            newPages: [],
            pageList: [],
            selPage: 1,
            items: [],

            _init: function () {
                this.pages = Math.ceil(newResult.length / pageSize); //分页数
                this.newPages = this.pages > 5 ? 5 : this.pages,
                    this.item = newResult.slice(0, this.pageSize);
                //分页要repeat的数组
                for (var i = 0; i < this.newPages; i++) {
                    this.pageList.push(i + 1);
                }
            },
            /*_init: function (newResult) {
                this.pages = Math.ceil(newResult.length / pageSize); //分页数
                this.newPages = this.pages > 5 ? 5 : this.pages,
                this.item = newResult.slice(0, this.pageSize);
                //分页要repeat的数组
                for (var i = 0; i < this.newPages; i++) {
                    this.pageList.push(i + 1);
                }
            },*/

            //设置表格数据源(分页)
            setData: function () {
                this.items = newResult.slice((this.pageSize * (this.selPage - 1)), (this.selPage * this.pageSize));//通过当前页数筛选出表格当前显示数据
            },

            /*$scope.artWorks = $scope.artWork.slice(0, $scope.pageSize);
             //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
             }*/

            //打印当前选中页索引
            selectPage: function (page) {
                //不能小于1大于最大
                if (page < 1 || page > this.pages) return;
                //最多显示分页数5
                if (page > 2) {
                    //因为只显示5个页数，大于2页开始分页转换
                    var newpageList = [];
                    for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
                        newpageList.push(i + 1);
                    }
                    this.pageList = newpageList;
                }
                this.selPage = page;
                this.setData();
                this.isActivePage(page);
                console.log("选择的页：" + page);
            },

            //设置当前选中页样式
            isActivePage: function (page) {
                return this.selPage == page;
            },

            //上一页
            Previous: function () {
                this.selectPage(this.selPage - 1);
            },

            //下一页
            Next: function () {
                this.selectPage(this.selPage + 1);
            }
        };
        //加载第一页
        pagination._init();
        return pagination;

    };
    /*   var service = {};   //定义一个Object对象
       service.items = []; //数据转换结果
       service.pages = []; //分页数
       service.pageList = [];

       var pageSize;    //定义一个私有化变量
       //分页总数
       // var pages = []; //分页数
       var newPages = [];
       // var pageList = [];
       var selPage = 1;
       var result = {};    //数据来源


       //对私有属性写getter和setter方法
       service.getResult = function(newResult, newPageSize) {
           result = newResult;
           pageSize = newPageSize;
       };

       service.setResult = function() {

           pages = Math.ceil(result.length / pageSize); //分页数
           newPages = pages > 5 ? 5 : pages;

           //初始化表格数据源(分页)
           service.items = result.slice(0, pageSize);
           //分页要repeat的数组
           for (var i = 0; i < newPages; i++) {
               pageList.push(i + 1);
           }
       };

       //设置表格数据源(分页)
       service.setData = function () {
           service.items = result.slice((pageSize * (selPage - 1)), (selPage * pageSize));//通过当前页数筛选出表格当前显示数据
       };

       //打印当前选中页索引
       service.selectPage = function (page) {
           //不能小于1大于最大
           if (page < 1 || page > pages) return;
           //最多显示分页数5
           if (page > 2) {
               //因为只显示5个页数，大于2页开始分页转换
               var newpageList = [];
               for (var i = (page - 3) ; i < ((page + 2) > pages ? pages : (page + 2)) ; i++) {
                   newpageList.push(i + 1);
               }
               pageList = newpageList;
           }
           selPage = page;
           service.setData();
           service.isActivePage(page);
           console.log("选择的页：" + page);
       };

       //设置当前选中页样式
       service.isActivePage = function (page) {
           return (selPage == page);
       };

       //上一页
       service.Previous = function () {
           service.selectPage(selPage - 1);
       };
       //下一页
       service.Next = function () {
           service.selectPage(selPage + 1);
       };

       return service;*/
})