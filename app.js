$(document).ready(function () {
    // global varibles
    var topics = ['hockey', 'futball', 'track', 'horse back', 'beach volleyball', 'lacrosse',
        'softball', 'swim', 'fireworks', 'kites', 'airplanes', 'shoes',
        'clothes', 'rollercoaster', 'coding', 'Denvor', 'snow'
    ];

    // functions

    // create buttons for elements
    var createBtn = function () {
        // remove all elements in topicBtn
        $('#topicBtn').empty();
        // create buttons for element in the array
        for (var i = 0; i < topics.length; i++) {
            // create new buttons
            var newBtn = $('<button>');
            // button attribute
            newBtn.attr('data-type', topics[i]);
            // add class to button
            newBtn.attr('class', 'giphy btn-success');
            // button name 
            newBtn.text(topics[i]);
            // input button on DOM
            $('#topicBtn').append(newBtn);

        }
    }

    var submit = function () {
        //    when submit btn is clicked...
        $('#submitBtn').on('click', function (event) {
            // prevent from default form/ input from happening
            event.preventDefault();
            //   get input value
            var userinputVal = $('#userInput').val();
            //  push user input to array
            topics.push(userinputVal);
            // create new buttons
            createBtn();
            //    test
            console.log(userinputVal);
            console.log(topics);

        });
    }

    var displayGiphy = function () {
        // gets value of button clicked
        var btnVal = $(this).attr('data-type');
        // api URL and key
        var apiKey = "dc6zaTOxFJmzC";
        var apiUrl = "https://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=" + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function (response) {
            // remove images when a new button is clicked
            $('.giphyImg').empty();

            for (var i = 0; i < 10; i++) {
                // still & animated images
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                // assign image element to newImg variable
                var newImg = $('<img>');
                // give image element stillUrl, animated & src attr
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('data-type', 'still')
                newImg.attr('src', stillImgUrl);
                newImg.addClass('giphyPic');
                // add image to DOM
                $('.giphyImg').append(newImg);
            }
            // test
            console.log('The button value is = ' + btnVal);
            console.log('Still image url = ' + stillImgUrl);
            console.log('Animated image url = ' + animateImgUrl);
        });
    }

    var giphyAnimate = function () {
        // set condition to still or animated
        giphyCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (giphyCondition === 'still') {
            // animates image by changing url
            $(this).attr('src', animateUrl);
            // switch the data-type to animate
            $(this).data('type', 'animate');
        } else if (giphyCondition === 'animate') {
            // change src to stil 
            $(this).attr('src', stillUrl);
            // switch data-type to still
            $(this).data('type', 'still');
            // test
            console.log(true);
        }
    }

    // main
    createBtn();
    submit();
    $(document).on('click', '.giphy', displayGiphy);
    $(document).on('click', '.giphyPic', giphyAnimate);
});