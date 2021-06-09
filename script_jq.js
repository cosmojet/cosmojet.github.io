$(function(){


//navメニュー
//ハンドルのクリックでnavメニューの開閉

$('#nav-button').on('click',()=>{

	if($('.registration-nav').hasClass('nav-open')){
		$('.registration-nav').removeClass('nav-open');
		$('#nav-button').html('<span>↑<span>')
		
	}else{
		$('.registration-nav').addClass('nav-open');
		$('#nav-button').html('<span>↓<span>')
	}
});


//navメニューの外側をクリックしてメニューを閉じる

$('body').on('click',(event)=> {
	//.registration-navの外側がクリックされた場合
	if(! $(event.target).closest('nav').hasClass('registration-nav')) {
		if($('.registration-nav').hasClass('nav-open')){
			console.log($(event.target));
			// .registration-navから.nav-openを削除
			$('.registration-nav').removeClass('nav-open');
			$('#nav-button').html('<span>↑<span>')
		}
	}
});


//新規トピックの登録ボタン
$('#group-input').on('input',()=>{
	//何も入力されていない時
	if($('#group-input').val().trim() == ''){
		console.log('aaa');
		$('#group-registration').removeClass('input-active');

	//何かが入力されているとき
	//(日本語のIME変換終了後に実行したかったが方法不明。保留。)
	}else{
		console.log('BBB');
		$('#group-registration').addClass('input-active');
	}
});





//themeのhoverイベント
$('.theme').find('.one-letter').hover((event)=>{
	$(event.currentTarget).addClass('theme-disappear');
},(event)=>{
	$(event.currentTarget).removeClass('theme-disappear');
});




//各々のトピックに属する本
//ページ更新時（ページを開いた時）
let $currentGroupingCards = $(`.${$('#group-selection').val()}`);
for(let i=0; i < $currentGroupingCards.length; i++){
	let $currentId = $currentGroupingCards.eq(i).attr('id');
	let $currentGroupingCard = $(`li[value="${$currentId}"]`);
	$currentGroupingCard.addClass('grouped-books');
}

//changeイベント
$('#group-selection').on('change',(event)=>{
		$('.grouped-books').removeClass('grouped-books');
		
		$currentGroupingCards = $(`.${$(event.currentTarget).val()}`);
		for(let i=0; i < $currentGroupingCards.length; i++){
			let $currentId = $currentGroupingCards.eq(i).attr('id');
			let $currentGroupingCard = $(`li[value="${$currentId}"]`);
			$currentGroupingCard.addClass('grouped-books');
		}
	});
	
	//”トピックを削除”クリックイベント
	//（トピック削除後、selectのvalue値になっている本にaddClass('grouped-books')）
	$('#group-delete').on('click',()=>{
		$('.grouped-books').removeClass('grouped-books');
		console.log($('#group-selection').val());
		
		$currentGroupingCards = $(`.${$('#group-selection').val()}`);
		for(let i=0; i < $currentGroupingCards.length; i++){
			let $currentId = $currentGroupingCards.eq(i).attr('id');
			let $currentGroupingCard = $(`li[value="${$currentId}"]`);
			$currentGroupingCard.addClass('grouped-books');
		}
	});
	


	//本をトピックに追加・トピックから削除

	//A ダブルクリック

			$('#book-lists').on('dblclick','li',(event)=>{
				//現在選択中のトピック
				let $currentBookValue = $(event.currentTarget).attr('value');
				let $selectedBookCard = $(`#${$currentBookValue}`);
				let $currentGroupValue = $('#group-selection').val();

					//既にトピックに追加している場合
					if($(event.currentTarget).hasClass('grouped-books')){
						// 対応するcardのクラスからトピック番号を削除
						$selectedBookCard.removeClass($currentGroupValue);
						// トピックから削除された本のcssを変更(.grouped-booksクラスを削除)
						$(event.currentTarget).removeClass('grouped-books');
						$(event.currentTarget).removeClass('focused-book-i').removeClass('focused-book-o');
						
					//まだトピックに追加していない場合
					}else{
						// 対応するcardのクラスにトピック番号を追加
						$selectedBookCard.addClass($currentGroupValue);
						// トピックに追加された本のcssを変更(.grouped-booksクラスを追加)
						$(event.currentTarget).addClass('grouped-books');
						$(event.currentTarget).removeClass('focused-book-i').removeClass('focused-book-o');
					}
				
				$('#book-btn').removeClass('add-and-remove').html('本を選択してください');
				
			});


//B クリックでフォーカスした後、ボタンで追加・削除

		//book-listsの本にフォーカス
		
		$('#book-lists').on('click','li',(event)=>{
			//現在選択中の本
			let $focusedBook = $(event.currentTarget);
			//現在選択中のトピックの名前
			let $currentTopic = $(`#${$('#group-selection').val()}`).text();

			//既にトピックに追加している場合
			if($(event.currentTarget).hasClass('grouped-books')){
				$('.focused-book-i').removeClass('focused-book-i');
				$('.focused-book-o').removeClass('focused-book-o');
				
				$focusedBook.addClass('focused-book-i');
				$('#book-btn').addClass('add-and-remove').html(`『 ${$currentTopic} 』 から削除`);
				
				//まだトピックに追加していない場合
			}else{
				$('.focused-book-i').removeClass('focused-book-i');
				$('.focused-book-o').removeClass('focused-book-o');

				$focusedBook.addClass('focused-book-o');

				$('#book-btn').addClass('add-and-remove').html(`『 ${$currentTopic} 』 に追加`);
			}
			
		});
		
		
		//フォーカスの解除
		
		//book-selectionの外側をクリックして解除
		$('body').click((event)=> {
			//#book-selectionの外側がクリックされた場合
			if($(event.target).closest('div').attr('id') != 'book-selection') {
				if($('.focused-book-i').length == 1 || $('.focused-book-o').length == 1){
					// 本のリストからフォーカス(focused-bookクラス)を削除
					$('.focused-book-i').removeClass('focused-book-i');
					$('.focused-book-o').removeClass('focused-book-o');
					$('#book-btn').removeClass('add-and-remove').html('本を選択してください');
				}
			}
		});
		
		//escキーで解除
		//（*アロー関数では動作しないのか？）
		$(window).keyup(function(event){
			if(event.keyCode == 27){
				if($('.focused-book-i').length == 1 || $('.focused-book-o').length == 1){
					// 本のリストからフォーカス(focused-bookクラス)を削除
					$('.focused-book-i').removeClass('focused-book-i');
					$('.focused-book-o').removeClass('focused-book-o');
					$('#book-btn').removeClass('add-and-remove').html('本を選択してください');
				}
			}
		});



		//本をトピックに追加・削除するボタン

		$('#book-btn').click(()=>{

			let $currentGroupValue = $('#group-selection').val();
			
			//トピックの追加済みの本にフォーカスしている場合
			//削除
			if($('.focused-book-i').length == 1 && $('.focused-book-o').length == 0){
				let $iValue = $('.focused-book-i').attr('value');
				let $iCard = $(`#${$iValue}`);
				$iCard.removeClass($currentGroupValue);
				
				$('.focused-book-i').removeClass('grouped-books');
				$('.focused-book-i').removeClass('focused-book-i');
				
				//まだトピックに追加していない本にフォーカスしている場合
				//追加
			}else if($('.focused-book-i').length == 0 && $('.focused-book-o').length == 1){
				let $oValue = $('.focused-book-o').attr('value');
				let $oCard = $(`#${$oValue}`);
				$oCard.addClass($currentGroupValue);
				
				$('.focused-book-o').addClass('grouped-books');
				$('.focused-book-o').removeClass('focused-book-o');
			}
			
			$('#book-btn').removeClass('add-and-remove').html('本を選択してください');
			
		});


	//トピック分け
	//group-listのクリックイベント

	$('#group-list').on('click','li',(event)=>{
		
		//クリックしたトピック（リスト）
		let $currentListName = $(event.currentTarget).data('list');
		//クリックしたトピック（リスト）のインデックス番号
		let $currentListIndex = $('#group-list').children().index($(event.currentTarget));
		//JQueryオブジェクトでもcardを取得
		let $JQcards = $('.card');


		//クリックしたトピック（リスト） ”以外の” トピック（リスト）から
		//groupingクラスを削除し、
		//カードのアクションを解除する
		for(let i=0; i < $('#group-list').children().length; i++){

			if(i != $currentListIndex){
				$('#group-list').children().eq(i).removeClass('grouping');
				let $lastListName = $('#group-list').children().eq(i).data('list');

				for(let j=0; j < $JQcards.length; j++){
					if($JQcards.eq(j).hasClass($lastListName)){
						$JQcards.eq(j).find('dt').removeClass('group-color');
					}

				}
			}
		}


		//今回、新たにクリックしたトピックに属するカードにアクションを加える

		if($(event.currentTarget).hasClass('grouping')){
			$(event.currentTarget).removeClass('grouping');

			for(let i=0; i < $JQcards.length; i++){
				if($JQcards.eq(i).hasClass($currentListName)){
					$JQcards.eq(i).find('dt').removeClass('group-color');
				}
			}

		}else{
			$(event.currentTarget).addClass('grouping');
				for(let i=0; i < $JQcards.length; i++){
					if($JQcards.eq(i).hasClass($currentListName)){
						$JQcards.eq(i).find('dt').addClass('group-color');
					}
				}
		}

	});




	
	// サブタイトル余白
	
	let $titles = $('.title')

	for(let i=0; i < $titles.length; i ++){
		
		if($titles.eq(i).next().attr('class') == 'sub-title' && $titles.eq(i).next().text() != ''){
			//サブタイトルがタイトルの下にある時
			$('.sub-title').eq(i).css('padding-top','1.5rem');

		}else if($titles.eq(i).prev().attr('class') == 'sub-title' && $titles.eq(i).prev().text() != ''){
			//サブタイトルがタイトルの上にある時
			$('.sub-title').eq(i).css('padding-bottom','1.5rem');
		}
		
	}
	
	



	//margin-boxの高さ
	//（サブタイトルとタイトルの間に余白（1.5rem = 24px）を挿入した後で実行）

	let $mBoxes = $('.margin-box');

	for(let i=0; i<$mBoxes.length; i ++){
		let $currentMBox = $mBoxes.eq(i);
		let $prevCard = $currentMBox.prev().prev();

		if($prevCard.hasClass('card') && $currentMBox.attr('id') != 'first-margin-box'){
			//直前のカードにmargin-boxの高さを合わせる
			let $inheritHight = $prevCard.css('height');
			$currentMBox.css('height',$inheritHight);
		}

	}
	





//cardのfloatの調整
//containerの一番右端のcardまたはmargin-boxに "clear:both;"

let $marginBoxesLength	= $('.margin-box').length;
let $cardsLength = $('.card').length;
let $totalWidth = 0;
const $containerWidth = parseInt($('.container').css('width'));


	for(let i=0; i < $marginBoxesLength + $cardsLength; i++){
		
		//margin-box
		//（iが偶数の時の処理）
		if( i%2 == 0 ){
			$totalWidth += parseInt($('.margin-box').eq(i/2).css('width'));
			
			// containerのwidthを超えるのがmargin-boxの場合
			if($totalWidth > $containerWidth){
				// 現在のmargin-boxに "clear:both;"
				$('.margin-box').eq(i/2).css('clear','both');
				$totalWidth = parseInt($('.margin-box').eq(i/2).css('width'));

			}
			
			//card
			//（iが奇数の時の処理）
		}else if( i%2 != 0 ){
			$totalWidth += parseInt($('.card').eq(Math.floor(i/2)).css('width'));
			
			// containerのwidthを超えるのがcardの場合
			if($totalWidth > $containerWidth){
				// 現在のcardに "clear:both;" "clear:both;"
				$('.card').eq(Math.floor(i/2)).css('clear','both');
				$totalWidth = parseInt($('.card').eq(Math.floor(i/2)).css('width'));
			}
		}

	}




	


	// cardのクリックイベント
	
	let	$block01 = $('.vertical');
	
	$block01.click((event)=>{
		
		let $card = $(event.currentTarget).parent().parent();
		let $block02 = $card.find('.horizontal');
		//block02の幅調整
		//containerのx座標 + 15px(padding-left) + block01の幅(16px * 5rem)
		let $block02Position = $('.container').offset().left + 15 + (16 * 5);
		//containerのx座標 + containerの幅1030px(width+padding) - 15px(padding-left) - $block02Position
		let $block02Width = $('.container').offset().left + (1030 - 15) - $block02Position;
		//現在クリックしているカードのoffset().topから画面上端までの余白
		let $scrollGap = 240;
		// //現在クリックしているカードの上下のmargin-boxの高さ
		let $prevMarginBox = $card.prev().prev();
		let $nextMarginBox = $card.next().next();
		
		if($(event.currentTarget).hasClass('open')){
			$(event.currentTarget).removeClass('open');
			let $currentCardTop = $(window).scrollTop();
			$.when(
					$.when(
							//block02(グリッド)のwidthを圧縮
							$block02.animate({'width':0},1000),
							$card.css('grid-template-columns','5rem 0rem')
					).done(()=>{
							//floatのclear:bothを解除
							$card.prev('.clear-before').removeClass('card-clear');
							$card.next('.clear-after').removeClass('card-clear');
							$card.removeClass('open-card');
							$prevMarginBox.removeClass('prev-margin-box');
							$nextMarginBox.removeClass('prev-margin-box');
							$(event.currentTarget).find('.sub-title').css('display','none')
							//スクロール→float;leftになっても現在のscrollTopに固定
							//（アニメーション無しでスクロールするのを防ぐため）
							$(window).scrollTop($currentCardTop);
					})
			).done(()=>{
					//スクロール→floatで改段落されたcardまで
					let $currentCardTop01 = $card.offset().top - $scrollGap;
					$('html, body').animate({scrollTop:$currentCardTop01},1000);
			});
					
		}else{
			
			$(event.currentTarget).addClass('open');
			$.when(
					//floatにclear:both
					$card.prev('.clear-before').addClass('card-clear'),
					$card.next('.clear-after').addClass('card-clear'),
					$card.addClass('open-card'),
					$prevMarginBox.addClass('prev-margin-box'),
					$nextMarginBox.addClass('prev-margin-box'),
					$(event.currentTarget).find('.sub-title').css('display','block')
			).done(()=>{
						//スクロール→floatで改段落されたcardまで
					let $currentCardTop02 = $card.offset().top - $scrollGap;
					$('html, body').animate({scrollTop:$currentCardTop02},1000);
					//block02(グリッド)を展開
					$card.css('grid-template-columns',`5rem ${$block02Width}px`);
					$block02.animate({'width':'100%'},1000);
			});

		}

	});
			
			




});