$(function(){$(document).on("click",".emoji-select-adv-trigger",function(e){e.preventDefault(),$(".emoji-select-adv-area").slideToggle(200)}).on("click","body",function(e){$(e.target).parents(".emoji-select-adv").length<1&&$(".emoji-select-adv-area").fadeOut(100)}).on("click","a.rating-emoji-item",function(e){e.preventDefault(),e.stopPropagation();var t=$(this),a={news_id:t.parents(".rating-emoji").data("id"),emoji:t.data("emoji"),hash:t.parents(".rating-emoji").data("hash")};e=a,a=function(a){a.increse?t.addClass("active"):t.removeClass("active"),$(".rating-emoji-item").each(function(){var e=$(this).data("emoji");$(this).find(".rating-emoji-item-count").html(a.rating[e])})},ShowLoading(),$.ajax({url:dle_root+"engine/mods/emoji_rating/ajax.php",type:"POST",dataType:"json",data:e}).done(a).fail(function(e){DLEalert(e.responseText,"Ошибка")}).always(function(){HideLoading()})})});