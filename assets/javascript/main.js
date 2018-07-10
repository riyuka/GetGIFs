var buttonList = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

for (var i = 0; i < buttonList.length; i++) {
    var button = $('<button class="item">').text(buttonList[i]);
    $('#display').append(button);
}

$('#add').on('click', function(){
    var item = $('input').val();
    if (item !== "") {
        buttonList.push(item);
        var button = $('<button class="item">').text(item);
        $('#display').append(button);
        $('#input').val('');
    } else {
        alert('Please enter an item');
    }
});

$(document).on("click", ".item", function() {
    var clickItem = $(this).text();
    var req ="http://api.giphy.com/v1/gifs/search?q=" + clickItem + "&api_key=PzfKQiXO8B2rwUa78kIqB74sv6qcl0wU&limit=10";
    $.ajax({url: req}).then(function(response){
            console.log(response);
            for (var i=0; i<10; i++) {
                var link = response.data[i].images.fixed_height_downsampled.url;
                var state = "animate";
                var stillSrc = response.data[i].images.downsized_still.url;
                var rating = response.data[i].rating;
                var id = response.data[i].id;
                var gif = $('<img>').attr({'src': link, 'data-state': state, 'data-still': stillSrc, 'data-animate': link, 'data-id': id});
                var ratingDiv = $("<div class='rating'>").append('Rating: ' + rating);
                var favI =  $('<i class="far fa-heart" data-status="far">');
                var imgWrapper = $("<div class='gif-wrapper'>").append(gif);
                var wrapAll = $("<div class='all'>").append(ratingDiv,favI,imgWrapper);
                $('#gif-area').append( wrapAll);
            };

            $('i').on('click', function(){
                var status = $(this).attr('data-status');
                if (status === 'far'){
                    $(this).removeClass('far fa-heart');
                    $(this).addClass('fas fa-heart');
                    $(this).attr('data-status', 'fas');
                    var favLink = $(this).next().children('img').attr('src');
                    var favId = $(this).next().children('img').attr('data-id');
                    var favGif = $('<img>').attr({src: favLink, 'data-id': favId });
                    var del = $("<button class='del'>delete</button>");
                    var favWrap = $("<div class='fav-wrap'>").append(favGif, del);
                    $('#gif-fav').append(favWrap);
                };

                $(document).on('click', '.del', function(){
                    var delImgId = $(this).siblings('img').attr('data-id');
                    console.log(delImgId);
                    $("img[data-id=" + delImgId + "]").parent().siblings('i').removeClass('fas fa-heart');
                    $("img[data-id=" + delImgId + "]").parent().siblings('i').addClass('far fa-heart');
                    $("img[data-id=" + delImgId + "]").parent().siblings('i').attr('data-status', 'far');
                    $(this).parent().remove();
                })        
            });

            $('#fav-page').on('click', function(){
                $('.container').addClass('fav-page');
                $('#back').on('click', function(){
                    $('.container').removeClass('fav-page');
                })
            });

            $('.gif-wrapper').on("click", function(){
                var clickState = $(this).children('img').attr('data-state');
                var clickAnimate = $(this).children('img').attr('data-animate');
                var clickStill = $(this).children('img').attr('data-still');
                if (clickState ==='animate') {
                    $(this).children('img').attr({'src': clickStill, 'data-state': 'still'});
                    $(this).addClass('paused');
                } else if (clickState === 'still') {
                    $(this).children('img').attr({'src': clickAnimate, 'data-state': 'animate'});
                    $(this).removeClass('paused');
                };
            });
    });
    $('#gif-area').empty();
});

