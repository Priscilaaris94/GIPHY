
    var sports = ['futball', 'baseball', 'football', 'volleyball', 'softball', 'lacrosse', 'track', 'beach voleyball', 'swim', 'horseback'];
for (var i = 0; i <sports.length; i++) {
    document.write("<div>");
        document.write("<input type='button' value='" + sports[i] + "'/>");
}
function getGifs() {
    var input = $('#search').val().trim();
    var api_key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';
    var url = 'http://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&q=' + input + '&limit=10';
    
    $.ajax({
        url: url
    }).done(function (res) {
        var gifs = res.data;

        $('#gifs').empty();

        for (var i = 0; i < gifs.length; i++) {
            var url = gifs[i].images.downsized.url;

            $('#gifs').append($('<div>').css('background-image', 'url(' + url + ')'));
        }

    });
}

$('#submit').on('click', getGifs);
