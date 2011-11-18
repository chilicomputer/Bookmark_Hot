function bind_func() {
	$('#results_catalog li').click(function () {
		var index=$(this).index();
		$('.results_wrap').eq(index).show().siblings('.results_wrap').hide();
	});
	$('.results_wrap .page_nav a').click(function () {
		var href=$(this).attr('href');
		var index=$(this).closest('.results_wrap').index();
		$.get(href,null,function (result) {
			$('.results_wrap').eq(index).html($('.results_wrap',result).eq(index).html());
		});
		return false;
	});
}
function ajax_search() {
	var query=$(this).find('#id_query').val();
	if (query.search(/\S+/)<0) {
		$("#search_title").text("随便找了找");
	}
	else {
		$("#search_title").text("搜索结果");
	}
	$.get("/search/?query="+encodeURIComponent(query),null,function (result) {
		$('#search_results').html($('#search_results',result).html());
		bind_func();
	});
	return false;
}
$(function () {
	$("#search_torso").submit(ajax_search);
	if ($('#results_catalog').length){bind_func();}
});
