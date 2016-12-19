// 收起
$(".closeBtn").on('click', function (e) {
    e.preventDefault();
    // 收起之前，隐藏所有大图片
    $(this).parent().siblings(".img-big-wrapper").children("img").css("display", "none");

    // 拿到旋转标记，判断是否都为0，如果不全为0，要把那张图片转到正常角度
    var rotateCountL = $(this).parent().siblings(".img-big-wrapper").attr("data-rotateCountLeft");
    var rotateCountR = $(this).parent().siblings(".img-big-wrapper").attr("data-rotateCountRight");
    if (rotateCountL == 0 && rotateCountR != 0) {
        for (var i = 0; i < rotateCountR; i++) {
            $(this).siblings(".rotateL").trigger("click");
        }
        $(this).parent().siblings(".img-big-wrapper").attr("data-rotateCountRight", 0);
    } else if (rotateCountR == 0 && rotateCountL != 0) {
        for (var i = 0; i < rotateCountL; i++) {
            $(this).siblings(".rotateR").trigger("click");
        }
        $(this).parent().siblings(".img-big-wrapper").attr("data-rotateCountLeft", 0);
    }


    // 收起之前，把to-prev和to-nextshow出来，否则下次显示出不来
    $(this).parent().siblings(".img-big-wrapper").children(".to-prev").show();

    $(this).parent().parent(".gallery").toggleClass("hide");
    $(this).parent().parent(".gallery").siblings(".img-wrapper").show();

    // 将旋转计数归零
//        $(this).parent().siblings(".img-big-wrapper").attr("data-rotateCountLeft", 0).attr("data-rotateCountRight", 0);

});

// 点击大图收起
$(".img-big-wrapper > img").on("click", function () {
    $(this).parent().siblings(".u-panel").children(".closeBtn").trigger("click");
});

// 点击小图放大
$(".img-wrapper>img").on("click", function () {
    var index = $(this).index();

    // 为rotate赋值
    $(this).parent().siblings(".gallery").children(".img-big-wrapper").attr("data-rotateCountLeft", 0).attr("data-rotateCountRight", 0);

    // 目前这个变量是全局变量，现在尝试把它加到img-big-wrapper的data-currentImg属性上
    // 这样的话，每一个大图盒子就都有一个用于记录的属性了
    currentImg = index;

    // data-currentImg设置成功
    // 当点击pre和next的时候，不要用全局变量currentImg，应该用这个设置好的值，然后只需要每次更新这个值
    $(this).parent().siblings(".gallery").children(".img-big-wrapper").attr("data-currentImg", index);

    if (index == 0) {
        $(this).parent().siblings(".gallery").children(".img-big-wrapper").children(".to-prev").hide();
    }
    if (index == ($(this).parent().children().length - 1)) {
        $(this).parent().siblings(".gallery").children(".img-big-wrapper").children(".to-next").hide();
    }

    $(this).parent().hide();
    $(this).parent().siblings(".gallery").toggleClass("hide");
    $(this).parent().siblings(".gallery").children(".img-big-wrapper").children("img").eq(index).css("display", "inline");
});


// 在每个大图片盒子上有两个自定义属性：data-rotateCountLeft data-rotateCountRight
// 这两个属性的初始值是0，赋值应该是在大盒子被初始化的时候进行的，也就是点击缩略图的时候
// 在每次点击左转或右转按钮的时候，进行完所有操作之后，都应该将这两个值更新
// 将图片向左旋转90度
$(".rotateL").on("click", function (e) {
    e.preventDefault();

    var bigWrapper = $(this).parent().siblings(".img-big-wrapper");
    var rotateCountL = parseInt(bigWrapper.attr("data-rotateCountLeft"));
    var rotateCountR = parseInt(bigWrapper.attr("data-rotateCountRight"));

    var dataCurrentImg = $(this).parent().siblings(".img-big-wrapper").attr("data-currentImg");

    if (rotateCountR == 0) {
        rotateCountL++;
    } else {
        rotateCountL = 4 - rotateCountR + 1;
        rotateCountR = 0;
    }

    var imgWidth = bigWrapper.children("img").eq(dataCurrentImg).width();
    var imgHeight = bigWrapper.children("img").eq(dataCurrentImg).height();

    // 旋转奇数次，宽高互换
    if (rotateCountL % 2 != 0) {
        var temp = imgWidth;
        imgWidth = imgHeight;
        imgHeight = temp;
    }

    // 将包裹图片的盒子的高度设置成图片目前的高度
    bigWrapper.css("height", imgHeight + "px");

    var degree = 90 * rotateCountL;
    var distance = (imgHeight - imgWidth) / 2;

    if (rotateCountL % 2 == 0) {
        bigWrapper.children("img").eq(dataCurrentImg).css({
            "transform": "rotate(-" + degree + "deg)"
        });
    } else if (rotateCountL == 1) {
        bigWrapper.children("img").eq(dataCurrentImg).css({
            "transform": "rotate(-" + degree + "deg) translate(-" + distance + "px, 0px)"
        });
    } else {
        bigWrapper.children("img").eq(dataCurrentImg).css({
            "transform": "rotate(-" + degree + "deg) translate(" + distance + "px, 0px)"
        });
    }

    // 旋转4次之后，rotateCount清零
    if (rotateCountL == 4) {
        rotateCountL = 0;
    }

    bigWrapper.attr("data-rotateCountLeft", rotateCountL);
    bigWrapper.attr("data-rotateCountRight", rotateCountR);
});

// 将图片向右旋转90度
$(".rotateR").on("click", function (e) {
    e.preventDefault();

    var bigWrapper = $(this).parent().siblings(".img-big-wrapper");
    var rotateCountL = parseInt(bigWrapper.attr("data-rotateCountLeft"));
    var rotateCountR = parseInt(bigWrapper.attr("data-rotateCountRight"));

    var dataCurrentImg = $(this).parent().siblings(".img-big-wrapper").attr("data-currentImg");

    if (rotateCountL == 0) {
        rotateCountR++;
    } else {
        rotateCountR = 4 - rotateCountL + 1;
        rotateCountL = 0;
    }

    var imgWidth = bigWrapper.children("img").eq(dataCurrentImg).width();
    var imgHeight = bigWrapper.children("img").eq(dataCurrentImg).height();

    // 旋转奇数次，宽高互换
    if (rotateCountR % 2 != 0) {
        var temp = imgWidth;
        imgWidth = imgHeight;
        imgHeight = temp;
    }

    // 将包裹图片的盒子的高度设置成图片目前的高度
    bigWrapper.css("height", imgHeight + "px");

    var degree = 90 * rotateCountR;
    var distance = (imgHeight - imgWidth) / 2;

    if (rotateCountR % 2 == 0) {
        bigWrapper.children("img").eq(dataCurrentImg).css({
            "transform": "rotate(" + degree + "deg)"
        });
    } else if (rotateCountR == 1) {
        bigWrapper.children("img").eq(dataCurrentImg).css({
            "transform": "rotate(" + degree + "deg) translate(" + distance + "px, 0px)"
        });
    } else {
        bigWrapper.children("img").eq(dataCurrentImg).css({
            "transform": "rotate(" + degree + "deg) translate(-" + distance + "px, 0px)"
        });
    }

    // 旋转4次之后，rotateCount清零
    if (rotateCountR == 4) {
        rotateCountR = 0;
    }

    bigWrapper.attr("data-rotateCountLeft", rotateCountL);
    bigWrapper.attr("data-rotateCountRight", rotateCountR);
});

// 上一张
$(".to-prev").on("click", function () {
    var dataCurrentImg = $(this).parent().attr("data-currentImg");

    // 取代下面函数的功能
    $(this).siblings("img").eq(dataCurrentImg).css({
        "transform": "rotate(0deg)"
    });
    // 将包裹图片的盒子的高度设置成图片目前的高度
    $(this).parent().css("height", "auto");

    $(this).parent().children("img").eq(dataCurrentImg).css("display", "none");
    $(this).parent().css("height", "auto");
    dataCurrentImg -= 1;
    if (dataCurrentImg == 0) {
        $(this).hide();
    }
    $(this).parent().children("img").eq(dataCurrentImg).css("display", "block");

    //最后要更新这个值
    $(this).parent().attr("data-currentImg", dataCurrentImg);

    // 如果一开始点开了最后一张，这时候next被隐藏，然后用户点击了前一张，这时候就应该把next show出来
    if (dataCurrentImg != $(this).parent().children("img").length - 1) {
        $(".to-next").show();
    }
});

// 下一张
$(".to-next").on("click", function () {
    var bigWrapper = $(this).parent();

    var dataCurrentImg = parseInt($(this).parent().attr("data-currentImg"));

    // 大图归位
    $(this).siblings("img").eq(dataCurrentImg).css({
        "transform": "rotate(0deg)"
    });
    // 将包裹图片的盒子的高度设置成图片目前的高度
    $(this).parent().css("height", "auto");

    bigWrapper.children("img").eq(dataCurrentImg).css("display", "none");

    bigWrapper.css("height", "auto");
    dataCurrentImg = dataCurrentImg + 1;

    if (dataCurrentImg == bigWrapper.children("img").length - 1) {
        $(this).hide();
    }

    bigWrapper.children("img").eq(dataCurrentImg).css("display", "block");

    //最后要更新这个值
    bigWrapper.attr("data-currentImg", dataCurrentImg);

    // 如果一开始点开了第一张，这时候pre被隐藏，然后用户点击了后一张，这时候就应该把pre show出来
    if (dataCurrentImg != 0) {
        $(".to-prev").show();
    }
});