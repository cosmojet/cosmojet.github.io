'use strict';



//最小値・最大値を引数とする乱数生成の関数
//10とばしで生成
		const $random = (min,max)=>{
			return (Math.floor(Math.random() * (max +1 - min)) + min) * 10;
		}	;

		let $marginBoxes = document.querySelectorAll('.margin-box');


//margin-boxのwidthをランダムに設定

		let $randomWidthValues = [];
		const minRandomWidth = 5;
		const maxRandomWidth = 15;

		let $currentRandomWidth = 0;

		for(let i = 0; $randomWidthValues.length < $marginBoxes.length ; i++){
			let $nextRandom = $random(minRandomWidth,maxRandomWidth);
			//条件：隣り合うランダムな値の差異
			if(Math.abs($currentRandomWidth - $nextRandom) >= 20){
				$currentRandomWidth = $nextRandom;
				$randomWidthValues.push($currentRandomWidth);
			}
		}

		//margin-boxのwidthをランダムに指定
		for(let i=0; i < $marginBoxes.length; i++){
			$marginBoxes[i].style.width = $randomWidthValues[i] + 'px';
		}




//cardのmargin-topをランダムに設定

		let $cards = document.querySelectorAll('.card');


		let $randomMarginTopValues = [];
		const minRandomMarginTop = 1;
		const maxRandomMarginTop = 20;

		let $currentRandomMarginTop = 0;

		for(let i = 0; $randomMarginTopValues.length < $cards.length ; i++){
			let $nextRandom = $random(minRandomMarginTop,maxRandomMarginTop);
			//条件：隣り合うランダムな値の差異
			if(Math.abs($currentRandomMarginTop - $nextRandom) >= 40){
				$currentRandomMarginTop = $nextRandom;
				$randomMarginTopValues.push($currentRandomMarginTop);
			}
		}

		//margin-boxのwidthをランダムに指定
		for(let i=0; i < $cards.length; i++){
			$cards[i].style.marginTop = $randomMarginTopValues[i] + 'px';
		}






//本のトピック作成

//本のトピック登録

let $clickCount = document.querySelectorAll('.book-group-option').length;

const groupInput = ()=>{
	$clickCount ++;
	const $input = document.getElementById('group-input');
	const $inputText = $input.value;

	if($inputText.trim() == ''){
		//空文字だった場合、フォームの中身を削除
		$input.value = '';
	}else{
		//オプション追加
		const $groupSelection = document.getElementById('group-selection');
		const $newOption = document.createElement('option');
		//自動的にトピック名登録：book-groupN
		$newOption.setAttribute('value','book-group' + $clickCount);
		$newOption.setAttribute('id','book-group' + $clickCount);
		$newOption.setAttribute('class','book-group-option');
		$newOption.innerHTML = $inputText;
		$groupSelection.appendChild($newOption);


		//リスト追加
		const $groupList = document.getElementById('group-list');
		const $newList = document.createElement('li');
		//自動的にトピック名登録：book-groupN
		$newList.setAttribute('class','book-group-list');
		$newList.setAttribute('data-list','book-group' + $clickCount);
		$newList.innerHTML = $inputText;
		$groupList.appendChild($newList);

		//オプション追加後にフォームの中身を削除
		$input.value = '';
	}

}




//本のトピック削除
	
const deleteInput = ()=>{
	let $currentGroupValue = document.getElementById('group-selection').value;
	let $currentGroupOption = document.getElementById($currentGroupValue);
	let $currentGroupList = document.querySelector("li[data-list='" + $currentGroupValue + "']");
	//削除されたトピックの番号を取得
	let $removeGroupNumber = Number($currentGroupValue.replace('book-group',''));
	
	let $removeGroupCards = document.getElementsByClassName('book-group' + $removeGroupNumber);
	

	//選択したトピックの削除
	//option
		$currentGroupOption.remove();
	//list
		$currentGroupList.remove();
	//card
		let $TemporaryArray01 =[];

		for(let i = 0; i < $removeGroupCards.length; i++){
			$TemporaryArray01.push($removeGroupCards[i]);
		}

		for(let j = 0; j < $TemporaryArray01.length; j++){
			//一時的に$removeGroupCardsを$TemporaryArray01に格納しないと、
			//remove()が実行される度に$removeGroupCardsの中身が減っていってしまう
			$TemporaryArray01[j].classList.remove('book-group' + $removeGroupNumber);

			//削除するトピックに分類されたカードのアクションを解除
			let $dt = $TemporaryArray01[j].querySelectorAll('dt');
			let $TemporaryArray02 =[];
				for(let k = 0; k < $dt.length; k++){
					$TemporaryArray02.push($dt[k]);
				}

				for(let l=0; l < $TemporaryArray02.length; l++){
					$TemporaryArray02[l].classList.remove('group-color');
				}
		}

}
	



//トピックに追加したい本の一覧
//selectに全ての本をoptionとして追加

for(let i = 0; i < $cards.length; i++){
	const $bookUl = document.getElementById('book-lists');
	const $newBookList = document.createElement('li');

	$newBookList.setAttribute('value',$cards[i].getAttribute('id'));
	$newBookList.setAttribute('class','book-list');

	let $listDt = $cards[i].querySelectorAll('dt');
	let $bookTitle = '';
	for(let j=0; j < $listDt.length; j++){
		$bookTitle += $listDt[j].innerHTML + '  ';
	}

	$newBookList.innerHTML = '<span>' + $bookTitle + '</span>';
	$bookUl.appendChild($newBookList);
}



