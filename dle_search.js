/**
 * DLE Search
 *
 * @copyright 2021 LazyDev
 * @version   1.1.0
 * @link      https://lazydev.pro
 */

let dleSearchDelay = false;
let dleSearchValue = '';

let idDomSearch = '#story';

if ($('#ajax_search').length) {
    idDomSearch = '#ajax_search';
}

$(function($) {
    $('body').on('click', '#dosearch', function () {
        formNavigation(-1);
    });

    $('body').on('click', '#searchsuggestions a', function(e) {
        e.preventDefault();
        let url = $(this).find('a').context === undefined ? $(this)[0].href : $(this).find('a').context.href;

        if (/(\d+)\-(\w+)\.html/i.test(url) || /(\d+)\/(\d+)\/(\d+)\/(\w+)\.html/i.test(url)) {
            $.post(dle_root + 'engine/lazydev/dle_search/ajax.php', {
                news: url,
                dle_hash: dle_login_hash
            }, function (data) {
                window.location.href = url;
            });
        } else {
            window.location.href = url;
        }
    });

    if (dleSearchPage == 'search') {
        $('body').on('click', '#dle-content a:not([onclick])', function(e) {
            e.preventDefault();
            let url = $(this).find('a').context === undefined ? $(this)[0].href : $(this).find('a').context.href;

            if (/(\d+)\-(\w+)\.html/i.test(url) || /(\d+)\/(\d+)\/(\d+)\/(\w+)\.html/i.test(url)) {
                $.post(dle_root + 'engine/lazydev/dle_search/ajax.php', {
                    news: url,
                    dle_hash: dle_login_hash
                }, function (data) {
                    window.location.href = url;
                });
            } else {
                window.location.href = url;
            }
        });
    }
});

function formNavigation(page) {
    page = page < 0 ? 0 : page;

    $('#from_page').val(page);
    $('#fullsearch').submit();

    return false;
}

function dleSearch() {
    $(idDomSearch).attr('autocomplete', 'off');

    $(idDomSearch).blur(function() {
        //$('#searchsuggestions').fadeOut();
    });

    $(idDomSearch).keyup(function() {
        let inputString = $(this).val();

        if (inputString.length === 0) {
            //$('#searchsuggestions').fadeOut();
        } else if (dleSearchValue !== inputString && inputString.length > 1) {
            clearInterval(dleSearchDelay);
            dleSearchDelay = setInterval(function() {
                dleSearchInterval(inputString);
            }, 200);
            $('.search-btn').addClass('ls-loading');
        }
    });
}

function dleSearchInterval(inputString) {
    clearInterval(dleSearchDelay);

    $('#searchsuggestions, .overlay__search, .search-ext__close').remove();
    $('body').removeClass('body__lightsearch');
    $('.header__search').append("<div id='searchsuggestions'></div>");
    $('.header__search').append('<div class="ajaxcustomblock"><span class="ajaxcustomblocktext">Загрузка</span><span class="fal fa-spinner fa-spin"></span></div>');
    

    $.post(dle_root + 'engine/lazydev/dle_search/ajax.php', {story: inputString, dle_hash: dle_login_hash, thisUrl: dleSearchConfig.page}, function(data) {
        data = $.parseJSON(data);
        if (data.content !== 'return' && !data.error) {
            $('.search-btn').removeClass('ls-loading');
            $('#searchsuggestions').html(data.content).fadeIn().css({
                'position': 'absolute',
                top: 0,
                left: 0
            }).position({
                my: 'left top',
                at: 'left bottom',
                of: idDomSearch,
                collision: 'fit flip'
            });
        }

    });

    $('body').addClass('body__lightsearch');
    $('.header__search').append('<div class="overlay__search"></div>');
    $('.search-btn').after('<div class="btn search-ext__close"><span class="fal fa-times"></span></div>');
    $('.overlay__search').fadeIn(200);
    $('.ajaxcustomblock').remove();


    dleSearchValue = inputString;

}

if (dleSearchConfig.ajax === 0) {
    dleSearch();
}

if (dleSearchConfig.url === 1) {
    $('body').on('submit', 'form', function(e) {
        if ($(this).find(idDomSearch).length > 0) {
            e.preventDefault();
            let val = $(this).find(idDomSearch).val().trim();
            if (val) {
                $.post(dle_root + 'engine/lazydev/dle_search/ajax.php', {
                    story: val,
                    gu: 1,
                    dle_hash: dle_login_hash
                }, function (data) {
                    window.location.href = '/search/' + data;
                });
            }
        }
    });
}