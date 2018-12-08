String.prototype.ref = function() {
	return this.split('\n').map(e=>{return e.trim()});
};

data = [
	{
		file: 'sister_c1',
		time: '24:32',
		artist: '언니네이발관',
		songs: `가장 보통의 존재
			너는 악마가 되어가고 있는가
			의외의 사실
			아름다운 것
			알리바이`.ref(),
	},
	{
		file: 'thorn_al1',
		time: '45:14',
		desc: '난 자꾸 말을 더듬고 잠드는 법도 잊었네 (2010)',
		artist: '쏜애플',
		songs: `@@피어나다
			오렌지의 시간
			빨간 피터
			아가미
			도롱뇽
			@@청색증
			너의 무리
			플랑크톤
			이유
			매미는 비가 와도 운다`.ref(),
	},
	{
		file: 'thorn_al2',
		time: '45:21',
		desc: '이상기후 (2014)',
		artist: '쏜애플',
		songs: `남극
			시퍼런 봄
			피난
			백치
			살아있는 너의 밤
			낯선 열대
			암실
			베란다
			아지랑이`.ref(),
	},
	{
		file: 'thorn_al3',
		time: '29:07',
		desc: '서울병 (2016)',
		artist: '쏜애플',
		songs: `한낮
			석류의 맛
			어려운 달
			장마전선
			서울`.ref(),
	},
	{
		file: 'broccoli_c1',
		time: '33:14',
		artist: '브로콜리너마저',
		songs: `춤
			##말
			##앵콜요청금지
			커뮤니케이션의 이해
			#?졸업
			잔인한 사월
			끝`.ref(),
	},
	{
		file: 'nell_c1',
		time: '39:57',
		desc: "Let it Rain (2003) ~ Healing Process (2006)",
		artist: '넬',
		songs: `유령의 노래
			Stay
			낙엽의 비
			백색왜성
			현실의 현실
			Good Night
			Counting Pulses
			51분 전
			마음을 잃다
			1분만 닥쳐줄래요`.ref(),
	},
	{
		file: 'nell_c2',
		time: '35:30',
		desc: "Let's Take a Walk (2007) ~ Separation Anxiety (2008)",
		artist: '넬',
		songs: `연어가 되지 못한 채
			Separation Anxiety
			Moonlight Punch Romance
			기억을 걷는 시간
			Promise Me
			1:03
			Fisheye Lens
			Afterglow`.ref(),
	},
	{
		file: 'nell_c3',
		time: '27:07',
		desc: "Slip Away (2012) ~ C (2016)",
		artist: '넬',
		songs: `그리고, 남겨진 것들
			타인의 기억
			환생의 밤
			백야
			Holding Onto Gravity
			Dream Catcher`.ref(),
	},
];

rows = data.map(file=>{
	let contentRows = file.songs.map((song, song_index)=>{
		let song_parsed = song.replace(/^@@/, '').replace(/^#[?#]?/, '');
		let val = encodeURI(`${file.artist} ${song_parsed} 가사`);
		return [
			`<tr>`,
				...[
					['song_index', song_index+1, `border-left-color: #${md5(file.file).substr(0,6)}`],
					['song', [
						song_parsed,
						(song.match(/^##/)?' <span class="song_mod">male</span>':''),
						(song.match(/^#\?/)?' <span class="song_mod">part-male</span>':''),
					].join('')],
					['lyric', song.match(/^@@/)?'no_vocal':`<a href="https://www.google.co.kr/search?q=${val}" target="_blank">가사</a>`],
					['youtube',  `<a href="https://www.youtube.com/results?search_query=${val}" target="_blank">유튜브</a>`]
				].map(e=>{return `<td class="${e[0]}" ${e[2]?`style="${e[2]}"`:''}>${e[1]}</td>`}),
			`</tr>`
		].join('');
	}).join('');
	return [
		'<tr class="fileheader">',
			...[
				['time', file.time || '', `border-left-color: #${md5(file.file).substr(0,6)}`],
				['artist', file.artist],
				['file', file.file, '', 2],
			].map(e=>{return `<td
				class="${e[0]}"
				${e[2]?`style="${e[2]}"`:''}
				${e[3]?`colspan="${e[3]}"`:''}
			>${e[1]}</td>`}),
		...(file.desc?['<tr class="fileheader fileheader_desc">',
			`<td colspan="4" style="border-left-color: #${md5(file.file).substr(0,6)}">${file.desc}</td>`,
		'</tr>']:''),
		contentRows
	].join('');
}).join('');
table = `<table>${[
].join('')}${rows}</table>`;

document.body.innerHTML = table;