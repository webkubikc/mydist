$("#alertsDropdownHere").click(function() {
  if(dle_group == 5) {
  	DLEalert('Уведомления доступны только для авторизованных пользователей', 'Внимание');
    return false;
  }
  else {
  	$('#alertsDropdownList').toggleClass("is-active");
  }
});

function DLE_Notifications( action, notif_id = false ) {	
    $.get(dle_root+"engine/ajax/controller.php?mod=notifications", { action: action, notif_id: notif_id, user_hash: dle_login_hash }, function( data ) {
		if ( action == 'list' ) {
			$('.guest__notification').html(data.notice_count);
        	$('#alertsDropdownList').html(data.notice_list);
        	$('#alertsDropdownListMob').html(data.notice_list);
		} else if ( action == 'main_delete' ) {
			$('#delete-'+notif_id+'').hide("slow");
            DLE_Notifications('list');
		} else if ( action == 'delete' ) {
            $('#notification-'+notif_id+'').remove();
			DLE_Notifications('list');
		} else if ( action == 'full_delete' ) {
			document.location.reload();
		} else if ( action == 'read' ) {
			$('#notification-'+notif_id+'').removeClass('unread');
            $('#notreaded-'+notif_id+'').hide();
            $('#readed-'+notif_id+'').show();
		} else if ( action == 'unread' ) {
			$('#notification-'+notif_id+'').addClass('unread');
            $('#notreaded-'+notif_id+'').show();
            $('#readed-'+notif_id+'').hide();
		} else if ( action == 'full_read' ) {
			document.location.reload();
		} else {
            DLEalert(data.error, 'Внимание'); 
        }
	}, "json");
}

function PostSubscribe(post_id, action)
{	
    $.get(dle_root + "engine/ajax/controller.php?mod=notifications", { post_id: post_id, subaction: action, user_hash: dle_login_hash }, function(data){
		if ( data.status ) {
			if ( action == 'subscribe' ) {
        		$('#subscribe_to').hide();
        		$('#unsubscribe_from').show();
    		} else {
        		$('#subscribe_to').show();
        		$('#unsubscribe_from').hide();
    		}
		} else {
            DLEalert(data.error, 'Внимание'); 
        }
	}, "json");
}

$(document).ready(function(){
	if(dle_group != 5) {
        DLE_Notifications('list');
		setInterval( DLE_Notifications('list'), 60000 );
	}
});



$(document).ready(function(){
	
	var trick = false;
	
	/* ====================== BUILDING ====================== */

var timerId;



     $(document).on('click', '.favmod', function(e){
			e.preventDefault();
			var $this = $(this);
			ShowLoading('Загрузка');
			$.ajax({
				url: dle_root + 'engine/mods/favorites/ajax.php',
				type: 'POST',
				dataType: 'json',
				data: {newsid: $this.data('id')},
			})
			.done(function() {
				$this.toggleClass('active');
			})
			.fail(function(error) {
				DLEalert(error.responseText, dle_info);
			})
			.always(function() {
				HideLoading();
			});
		});

$(".iframe__season-full").each(function() {
	var _self = $(this);
	_self.find("a:first").addClass("is-active")
});

$(document).on('click','.comment-item__main--spoiler',function(){
        $(this).removeClass('comment-item__main--spoiler');
    }); 

    $("[data-showitems]").each(function() {
	var e = $(this),
		t = e.children().length,
		o = e.data("showitems");
	o < t && ($(e).children(":gt(" + o + ")").hide(), $(e).after('<div class="showitems-btn">Показать все (' + t + ")</div>"))
}); $(document).on("click", ".showitems-btn", function() {
	$(this).prev().children().show(), $(this).remove()
});


$(document).on("click", ".pmovie__translations", function() {
        $(".transl__popup").dialog({
            autoOpen: !0,
            width: 600,
            minHeight: 160,
            resizable: !1,
            buttons: {
                Ok: function() {
                    $(this).dialog("close")
                }
            },
            close: function() {
                $(".overlay").fadeOut(200)
            },
            open: function() {
                $(".overlay").fadeIn(200)
            }
        })
    });



$(document).on("click", ".filter__open", function() {
	$(".filter").slideToggle(200);
});
 

$(".js-count-rating").wRateCount(), $(".tabs-block").each(function() {
	$(this).find(".tabs-block__select span:first").addClass("is-active"), $(this).find(".tabs-block__content:first").removeClass("d-none")
}), $(".tabs-block__select").on("click", "span:not(.is-active)", function() {
	$(this).addClass("is-active").siblings().removeClass("is-active").parents(".tabs-block").find(".tabs-block__content").hide().eq($(this).index()).fadeIn(0), setTimeout(function() {
		$(window).lazyLoadXT()
	}, 300)
}), $("body").append('<div class="overlay"></div><div class="mobile-menu" id="mobile-menu"></div><div class="mobile-menu-close"><span class="fal fa-times"></span></div><div id="scrolltop"><span class="fal fa-long-arrow-up"></span></div>'), $(".js-this-in-mobile-menu").each(function() {
	$(this).clone().appendTo("#mobile-menu")
}), $(document).on("click", ".js-show-login", function() {
	return $(".overlay, .login").fadeIn(200), $("body").addClass("modal-is-opened"), setTimeout(function() {
		$(window).lazyLoadXT()
	}, 300), !1
}), $(".js-scroll-to").click(function() {
	$("html, body").animate({
		scrollTop: $(".pmovie__player").offset().top - 10
	}, 800)
}), $(".js-show-comments").click(function() {
	$(".page__comments").fadeIn(0, function() {
		$("html, body").animate({
			scrollTop: $(".page__comments").offset().top - 20
		}, 800)
	})
}), $(".js-show-mobile-menu").click(function() {
	$(".overlay").fadeIn(200), $("#mobile-menu, .mobile-menu-close").addClass("is-active"), $("body").addClass("mobile-menu-is-opened")
}), $(document).on("click", ".overlay, .login__close, .mobile-menu-close", function() {
	$(".overlay, .login").fadeOut(200), $("#mobile-menu, .mobile-menu-close").removeClass("is-active"), $("body").removeClass("modal-is-opened mobile-menu-is-opened")
}), $(document).on("click", ".form__textarea-inside textarea, .fr-wrapper", function() {
	$(".add-comments-form").find(".form__row--protect").removeClass("d-none")
}), $("#dle-content > #dle-ajax-comments").appendTo($("#page__comments-list")), $(".login__social-btns a").on("click", function() {
	var e = $(this).attr("href"),
		o = (screen.width - 820) / 2,
		t = (screen.height - 420) / 2 - 100;
	return auth_window = window.open(e, "auth_window", "width=820,height=420,top=" + t + ",left=" + o + "menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no"), !1
}), $(".js-comm-author").each(function() {
	var e = $(this),
		o = e.closest(".js-comm"),
		t = e.text().substr(0, 1),
		n = o.find(".js-comm-avatar"),
		s = n.children("img").attr("src"),
		e = ["#c57c3b", "#753bc5", "#79c53b", "#eb3b5a", "#45aaf2", "#2bcbba", "#778ca3"],
		o = Math.floor(Math.random() * e.length);
	s == "/templates/" + dle_skin + "/dleimages/noavatar.png" && n.html('<div class="comment-item__letter d-flex jc-center ai-center" style="background-color:' + e[o] + '">' + t + "</div>")
});
var gotop = $("#scrolltop");
$(window).scroll(function() {
	300 < $(this).scrollTop() ? gotop.fadeIn(200) : gotop.fadeOut(200)
}), gotop.click(function() {
	$("html, body").animate({
		scrollTop: 0
	}, "slow")
}), setTimeout(function() {
	/*$("#pmovie").append('<script async src="https://yastatic.net/share2/share.js"><\/script>'), $(".ya-share2").removeClass("not-loaded")*/
}, 3e3);
});


$(document).ready(function(){


	
	$('.frate').each(function(){
        var rate = $(this),
			rdata = rate.find('.rate-data'),
			rrate = parseInt(rdata.find('.ratingtypeplusminus').text(), 10),
			rvote = parseInt(rdata.find('span[id*=vote]').text(), 10);
			rate.append('<div class="rbar"><div class="rfill"></div></div>');
			rate.find('.rate-plus').after('<div class="rate-perc">0%</div>');
		if ( rvote >= rrate && rvote > 0 ) {
			var m = (rvote - rrate)/2, 
				p = rvote - m,
				perc = Math.round(p/rvote*100);
			rate.find('.rate-plus span.rcount').html(p);
			rate.find('.rate-minus span.rcount').html(m);
			rate.find('.rfill').css({'width':''+perc+'%'});
			rate.find('.rate-perc').html(''+perc+'%');
			perc < 49 ? rate.find('.rate-perc').addClass('low') : rate.find('.rate-perc').addClass('high'); 
		} else {
			rate.find('.rate-plus span.rcount').html('0');
			rate.find('.rate-minus span.rcount').html('0');
			
		};
		rate.addClass('done'); 
    });
	
});

function doRateLD( rate, id ) {
		ShowLoading('');
		$.get(dle_root + "engine/ajax/rating.php", { go_rate: rate, news_id: id, skin: dle_skin, user_hash: dle_login_hash }, function(data){
			HideLoading('');
			if ( data.success ) {
				var rating = data.rating;
				rating = rating.replace(/&lt;/g, "<");
				rating = rating.replace(/&gt;/g, ">");
				rating = rating.replace(/&amp;/g, "&");
				$("#ratig-layer-" + id).html(rating);
				$("#vote-num-id-" + id).html(data.votenum);
				var rt = parseInt($(rating).text()),
					m = (data.votenum - rt)/2,
					p = data.votenum - m,
					perc = Math.round(p/data.votenum*100),
					fRate = $("#frate-" + id);
				fRate.find('.rate-plus span.rcount').html(p);
				fRate.find('.rate-minus span.rcount').html(m);
				fRate.find('.rfill').css({'width':''+perc+'%'});
				fRate.find('.rate-perc').html(''+perc+'%');
			} else if (data.error) {DLEalert ( data.errorinfo, dle_info );}
		}, "json");
	};
	



jQuery.fn.wRateCount = function(){
	return this.each(function() {
		var a = $(this), b = parseInt(a.find('.ratingtypeplusminus').text(),10), c = parseInt(a.find('span[id*=vote]').text(),10);
        if ( c >= b && c > 0 ) {
			var t = Math.round((c - (c - b)/2)/c*100), tt = Math.round(t);
			a.parent().append('<div class="poster__rating-fill" style="width:'+tt+'%"></div>');
        } else {};
		a.removeClass('js-count-rating');
	});
};







/* END */



