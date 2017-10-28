var musicStormCtrls = angular.module('musicStormCtrls', ['ui.bootstrap']);


musicStormCtrls.controller('modalController', function ($scope, $rootScope, $uibModal) {
    var parseMusicID = "";
    var parseMusicName = "";
    var parseArtistName = ""
    $scope.openModal = function (id, music, artist) {
        var modalInstance = $uibModal.open({
            templateUrl: "songUrlModal",//script标签中定义的id
            controller: 'modalCtrl',//modal对应的Controller
            resolve: {
                parseMusicID: function () {
                    return id;
                },
                parseMusicName: function () {//data作为modal的controller传入的参数
                    return music;//用于传递数据
                },
                parseArtistName: function () {
                    return artist;
                }
            }
        })
    }
});
//模态框对应的Controller
musicStormCtrls.controller('modalCtrl', function ($scope, $uibModalInstance, parseMusicID, parseMusicName, parseArtistName, $http) {
    $scope.musicID = parseMusicID;
    $scope.musicName = parseMusicName;
    $scope.artistName = parseArtistName;

    $http.get("assets/url_result.json").success(function (response) {
        console.log(response);
        $scope.urlList = response;
    })

    //在这里处理要进行的操作
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
});

musicStormCtrls.controller('mainCtrl', function ($scope, $state) {
    $scope.searchText = "";
    $scope.pageList = [];
    $scope.items = [];

    /*
    * 跳转
    * */
    $scope.toSearch = function () {
        console.log($scope.searchText);
        $state.go('search', {searchText: $scope.searchText});
    };
    $scope.toRank = function (name) {
        console.log(name);
        $state.go('ranking-detail', {rankName: name})
    }
    $scope.toArtist = function (artistName) {
        $state.go('artist', {artistName: artistName})
    };

    /*
    * 分页封装
    * */
    $scope.funInit = function (inputData, size) {
        paginationService.getResult(inputData, size);
        paginationService.setResult();
        $scope.pageList = paginationService.pageList;
        $scope.items = paginationService.items;
        // inputData = pagination.items;
    }

    $scope.funSelect = function (page) {
        paginationService.selectPage(page);
        $scope.items = paginationService.items;
    }

    $scope.funPrevious = function () {
        paginationService.Previous();
        $scope.items = paginationService.items;
    }

    $scope.funNext = function () {
        paginationService.Next();
        $scope.items = paginationService.items;
    }

    $scope.funIsActive = function (page) {
        paginationService.isActivePage(page);
    }
});

musicStormCtrls.controller("searchResultCtrl", function ($scope, $http, $state, $stateParams) {
    $scope.searchInput = $stateParams.searchText;
    $scope.searchText = $stateParams.searchText;
    $scope.showResult = false;
    $scope.searchResult = "";

    $scope.bySong = true;

    $scope.tabs = [
        {
            title: '歌曲',
            content: 'a',
            route: '.search.song',
            template: "partials/songResult.html",
            fun: 'funGetSong(searchText)'
        },
        {
            title: '歌手',
            content: 'b',
            route: '.search.artist',
            template: "partials/artistResult.html",
            fun: 'funGetArtist(searchText)'
        }
    ];

    $scope.filteredItems = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = 0;

    $scope.init = function () {
        if ($scope.searchText != null || $scope.searchText != undefined || $scope.searchText != "") {
            $scope.funGetSong($scope.searchText);
        } else {
            $scope.showResult = false;
        }
    };

    // $scope.toArtist = function(artistName) {
    //     $state.go('artist',{artistName: artistName})
    // };
    //$scope.funcS($scope.searchText,true);

    $scope.funSearch = function (s) {
        if ($scope.bySong == true)
            $scope.funGetSong(s);
        else if ($scope.bySong == false)
            $scope.funGetArtist(s);
    };

    $scope.funGetSong = function (s) {
        // console.log(s);
        $scope.searchText = s;
        $scope.bySong = true;
        if ($scope.searchText == null || $scope.searchText == undefined || $scope.searchText == "")
            return;
        $scope.searchResult = "";
        $http.get("assets/song_result.json").success(function (response) {
            console.log(response);      //数据源
            $scope.searchResult = response;
            $scope.totalItems = $scope.searchResult.length;
            $scope.funSetData();
            // funInit($scope.searchResult,10);
            // $scope.pagination(10);      //分页
            $scope.showResult = true;   //显示
        });
    }

    $scope.funGetArtist = function (s) {
        console.log(s);
        $scope.searchText = s;
        $scope.bySong = false;
        if ($scope.searchText == null || $scope.searchText == undefined || $scope.searchText == "")
            return;
        $scope.searchResult = "";
        $scope.bySong = false;
        $http.get("assets/artist_result.json").success(function (response) {
            console.log(response);      //数据源
            $scope.searchResult = response;
            // $scope.pagination(10);      //分页
            $scope.funSetData();
            $scope.showResult = true;   //显示
        });
    }

    $scope.numPages = function () {
        return Math.ceil($scope.searchResult.length / $scope.numPerPage);
    };

    $scope.$watch("currentPage + numPerPage", function () {
        $scope.funSetData();
    });

    $scope.funSetData = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;

        $scope.filteredItems = $scope.searchResult.slice(begin, end);
        console.log($scope.searchResult.slice(begin, end));
    }
    /*

        $scope.pagination = function($size) {
            //分页总数
            $scope.pageSize = $size;
            $scope.pages = Math.ceil($scope.searchResult.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            $scope.pageList = [];
            $scope.selPage = 1;
            //设置表格数据源(分页)
            $scope.setData = function () {
                $scope.items = $scope.searchResult.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
            }
            $scope.items = $scope.searchResult.slice(0, $scope.pageSize);
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
            //打印当前选中页索引
            $scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > $scope.pages) return;
                //最多显示分页数5
                if (page > 2) {
                    //因为只显示5个页数，大于2页开始分页转换
                    var newpageList = [];
                    for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                console.log("选择的页：" + page);
            };
            //设置当前选中页样式
            $scope.isActivePage = function (page) {
                return $scope.selPage == page;
            };
            //上一页
            $scope.Previous = function () {
                $scope.selectPage($scope.selPage - 1);
            };
            //下一页
            $scope.Next = function () {
                $scope.selectPage($scope.selPage + 1);
            };
        };
    */

});

musicStormCtrls.controller("artistCtrl", function ($scope, $http, $state, $stateParams) {
    $scope.artist = {
        artistId: 1,
        artistName: $stateParams.artistName,
        Cover: "img/welcome/logo.png",
        profile: "无"
    };
    $scope.artWork = "";

    $http.get("assets/song_result.json").success(function (response) {
        //数据源
        console.log(response);
        $scope.artWork = response;
        $scope.pagination(10);

    });

    $scope.pagination = function ($size) {
        //分页总数
        $scope.pageSize = $size;
        $scope.pages = Math.ceil($scope.artWork.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.artWorks = $scope.artWork.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
        };
        $scope.artWorks = $scope.artWork.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        };
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    }
});

musicStormCtrls.controller('welcomeCtrl', function ($scope) {
});


musicStormCtrls.controller("rankingCtrl", function ($scope, $http, $state, $stateParams) {
    $scope.toArtist = function (artistName) {
        $state.go('artist', {artistName: artistName})
    };

    $scope.rank = {
        rankId: 1,
        rankName: $stateParams.rankName,
        Cover: "img/welcome/logo.png",
    };

    $scope.rankings = "";

    $http.get("assets/song_result.json").success(function (response) {
        //数据源
        console.log(response);
        $scope.rankings = response;
    });

});

musicStormCtrls.controller("guessingCtrl", function ($scope, $http) {
    $scope.question = {};
    $scope.showQuestion = false;

    $scope.getQuestion = function () {
        $http.get("assets/guessing_question.json").success(function (response) {
            console.log(response);
            $scope.question = response;
            $scope.showQuestion = true;
        });
    };

    $scope.funIsCorrect = function (selected) {
        console.log(selected);
        console.log($scope.question[0].answer);
        if (selected == $scope.question[0].answer) {
            return true;
        }
    }
    $scope.funIsWrong = function (selected) {
        if (selected !== $scope.question[0].answer) {
            return true;
        }
    }
});