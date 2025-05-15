  // Firebase 초기화
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaPk-3NwSVd28tFK3BhcEJyjFFBlBHw0I",  // 네 값으로 대체
  authDomain: "dream-a5ea7.firebaseapp.com",
  projectId: "dream-a5ea7",
  storageBucket: "dream-a5ea7.appspot.com",
  messagingSenderId: "415046137671",
  appId: "1:415046137671:web:b7fc400127acfd13c23e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const imageMap = {
  "강물 위를 걷는 꿈": "river_walk.png",
  "강에서 헤엄치는 꿈": "river_swim.png",
  "맑은 강물이나 호수에 손이나 발을 담근 꿈": "river_hand.png",
  "물에 빠지는 꿈": "sea_help.png",
  "잔잔한 맑은 바다를 바라보는 꿈": "sea.png",
  "높은 산에 오르는 꿈": "mountain.png",
  "산에서 굴러 떨어지는 꿈": "mountain_fall.png",
  "해를 보고 절을 하는 꿈": "sun_hi.png",
  "머리 위에 해를 얹고 있는 꿈": "sun_head.png",
  "보름달을 보는 꿈": "moon_full.png",
  "반달을 보는 꿈": "moon_half.png",
  "머리카락이 빠지는 꿈": "hair_runaway.png",
  "치아가 흔들리는 꿈": "teeth_shaking.png",
  // ... (계속 추가)
};



  const data = {
      '자연': {
        '강/호수': ['맑은 강물이나 호수에 손이나 발을 담근 꿈','강물 위를 걷는 꿈','강에서 헤엄치는 꿈'],
        '바다': [ '잔잔한 맑은 바다를 바라보는 꿈'],
        '산': ['높은 산에 오르는 꿈','산에서 굴러 떨어지는 꿈'],
        '해': ['해를 보고 절을 하는 꿈','머리 위에 해를 얹고 있는 꿈'],
        '달': ['보름달을 보는 꿈','반달을 보는 꿈'],
        '지진/홍수': ['지진이 일어나는 꿈'],
        '불': ['집에 불이 나는 꿈','학교에 불나는 꿈'],
        '벼락/천둥': ['천둥소리를 듣는 꿈',],

      },
      '신체': {
        '머리': ['머리카락이 빠지는 꿈'],
        '얼굴': ['얼굴 다치는 꿈','주름이 생기는 꿈'],
        '코': ['코가 부러지는 꿈','코에서 피가 나는 꿈'],
        '손':['손가락이 잘리는 꿈'],
        '발': ['발이 부러지는 꿈','발에 상처가 나는 꿈'],
        '치아': ['치아가 흔들리는 꿈','앞니가 빠지는 꿈','아랫니가 빠지는 꿈','치아가 모두 빠지는 꿈','치아가 자라나는 꿈'],

      },
      '동물/식물': {
        '개': ['개를 키우는 꿈','개에게 물리는 꿈'],
        '고양이': ['고양이를 안는 꿈','고양이가 자신을 무는 꿈'],
        '뱀': ['뱀을 보는 꿈'],
        '돼지': ['돼지를 보는 꿈'],
        '그 외': [,'흰색 쥐를 보는 꿈','호랑이를 만나는 꿈'],
      },
      '감정/상황': {
        '먹는 것': ['과일을 먹는 꿈', '계란을 먹는 꿈', '매운 음식을 먹는 꿈', '술을 마시는 꿈', '물을 마시는 꿈'],
        '죽음/질병/사고': ['사람을 때려서 죽이는 꿈', '가족이 사람을 죽이는 꿈', '모르는 사람이 살인하는 꿈','병원에 입원하는 꿈','전염병에 걸리는 꿈','열이 나는 꿈','암에 걸리는 꿈','반려동물이 아픈 꿈',
        '물에 빠지는 꿈',],
        '쫓김': ['쫓기는 꿈', '괴물에게 쫓기는 꿈', '경찰에게 쫓기는 꿈'],
        '도망': ['도망치는 꿈', '숨는 꿈'],
        '불안': ['도둑을 맞는 꿈', '늦게 도착하는 꿈'],
        '공포': ['귀신이 나오는 꿈',],
        '긴장': ['시험 보는 꿈', '무대에 서는 꿈'],
        '높이': ['높은 곳에서 떨어지는 꿈','하늘을 나는 꿈','비행기에서 높이 나는 꿈','높이 나는 도중 떨어지는 꿈',],
        '배설': ['오줌을 싸는 꿈','똥을 싸는 꿈',],
      },
      '상징/사물': {
        '돈/보석': ['돈 받는 꿈', '동전 받는 꿈','조상에게 돈을 받는 꿈','가게에서 돈을 내고 물건을 사는 꿈','남의 돈을 뺏는 꿈'],
        '거울': ['거울이 깨지는 꿈','거울에 비친 얼굴이 일그러진 꿈','거울에 용이 비치는 꿈','거울에 비친 모습이 다른 사람으로 보이는 꿈'],
        '가구': ['가구를 사는 꿈','가구를 고치는 꿈','침대가 딱딱하여 불편한 꿈','다른 사람 책상에 앉는 꿈','자신의 의자에 다른 사람이 앉아있는 꿈'],
      },
      '인물': {
        '가족': ['온 가족이 한 자리에 모이는 꿈', '부모님께 걱정을 끼치는 꿈','부모님이 병으로 앓아누워 계시는 꿈','부모님을 해치는 꿈','모르는 사람이 가족 행세를 하는 꿈','조상이 나오는 꿈'],
        '친구': ['친구와 노는 꿈','옛 친구가 나오는 꿈','친구가 화를 내는 꿈','친구들에게 구타당하는 꿈'],
        '연예인': ['연예인이 집안으로 들어오는 꿈','연예인과 결혼하는 꿈','자신이 유명한 연예인이 되는 꿈','유명한 연예인을 만나는 꿈'],
        '정치인': ['내가 정치인이 되는 꿈','정치인과 인사하는 꿈','정치인에게 상을 받는 꿈','정치인이 죽는 꿈'],
      },
      '기타/초현실': {
        '전쟁': ['군대가 정렬하여 전쟁터로 향하는 꿈', '전쟁터에서 자신이 전사하는 꿈','전쟁이 나서 피난을 가는 꿈'],
        '별자리': ['별자리가 보이는 꿈','북두칠성을 본 꿈']
      },
    };

    const cardTexts = {
      '개를 키우는 꿈': '개를 키우는 꿈은 책임감과 돌봄을 상징합니다.',
      '개에게 물리는 꿈': '현재 자기 자신에게 만족하지 못하고 있음을 의미합니다. 또한 내리기 힘든 결정을 고민하고 있음을 뜻하기도 합니다.',
      '고양이를 안는 꿈': '고양이를 안는 꿈은 위로와 정서적 안정감을 의미합니다.',
      '흰색 쥐를 보는 꿈': '금전적으로 부유해지거나 재산이 늘어나게 될 것을 암시합니다.',
      '고양이가 자신을 무는 꿈': '현실의 누군가에게 강한 질투심을 가지고 있다는 것을 의미합니다.',
      '폭풍 우는 꿈': '억눌린 감정이 터져 나오는 것을 뜻합니다.',
      '웃는 꿈': '긍정적 변화나 자신감의 신호일 수 있어요.',
      '사자에게 쫓기는 꿈': '강한 권력이나 두려움에서 도망치고 싶다는 의미합니다.',
      '호랑이를 만나는 꿈': '도전과 위협, 또는 새로운 기회와의 만남을 의미합니다.',
      '바다에 빠지는 꿈': '위험, 압도당하는 감정을 의미하고, 현재 삶에서 스트레스를 받고 있다는걸 의미합니다.',
      '잔잔한 맑은 바다를 바라보는 꿈': '자신의 마음이 바다와 같이 안정되고, 편안함을 얻게 되는 것을 암시합니다.',
      '맑은 강물이나 호수에 손이나 발을 담근 꿈': '자신이 하는 일에 만족감을 느끼게 되며 사회적으로나 가정적으로 모두 화기애애하며 원하던 일이 이루어질 것을 암시합니다.',
      '강물 위를 걷는 꿈': '큰 행운이 찾아온다는 것을 의미하는 길몽입니다.',
      '강에서 헤엄치는 꿈': '강이 깨끗하고 맑다면 길몽이지만, 반대로 더럽다면 흉몽입니다.',
      '높은 산에 오르는 꿈': '어떤 것을 이루기 위해 노력하는 과정을 나타낸 꿈입니다. 목표 달성에 대한 노력과 의지를 나타낼 수 있습니다.',
      '산에서 굴러 떨어지는 꿈': '잘 풀려가던 일에 갑작스러운 문제가 생길 수 있습니다. 다음에 더 좋은 기회가 올 때까지 버텨보세요!',
      '흰 족제비 보는 꿈': '다른 사람들의 질투나 시기로 인해 심적으로 힘든 시간을 보내게 될 수 있습니다.',
      '해를 보고 절을 하는 꿈': '자신이 원하는 일이 이루어진다는 암시입니다.',
      '머리 위에 해를 얹고 있는 꿈': '입학, 취업, 승진 등 원하던 일이 이루어진다는 의미입니다.',
      '보름달을 보는 꿈': '당신의 삶에서 긍정적인 변화와 풍요로운 기회가 찾아올 것이라는걸 암시합니다. 또한 당신이 현재 안정적인 삶을 살고 있다는걸 의미합니다.',
      '반달을 보는 꿈': '자신이 하고 있는 일이 아직은 준비 단계지만 점차 발전하여 성공하게 될 것을 암시합니다.',
      '지진이 일어나는 꿈': '큰 변화의 전조를 의미합니다. 부정적인 변화, 긍정적인 변화 모두 가능성이 있습니다.',
      '집에 불이 나는 꿈': '금전운이 상승해 삶이 풍요로워진다는 것을 암시하는 길몽입니다. 불길이 거셀수록 영향력이 크게 작용합니다. 만약 불을 끄게되면 어려운 상황이 찾아올 수도 있습니다.',
      '학교에 불나는 꿈': '인간관에 많은 갈등이 생겨날 징조입니다. 원만히 잘 해결한다면 자신이 바라던 바를 이룰 수 있게 됩니다.',
      '천둥소리를 듣는 꿈': '모든 일들이 자신이 원하는 대로 잘 진행되며 소원을 성취하게 됩니다.',
      '머리카락이 빠지는 꿈': '자신의 능력이나 지위가 하락할 것을 의미합니다. 지금 하고 있는 일이 잘 안풀리거나, 어려움을 겪게 될 수도 있습니다.',
      '얼굴 다치는 꿈': '군중이 많이 모인 가운데 인신공격을 당하고 모멸감을 느끼게 됩니다.',
      '주름이 생기는 꿈': '인생의 변화와 성장을 의미합니다. 주변 사람들에게 인정받을 일이 생긴다.',
      '발이 부러지는 꿈': '여행이나 이동 중에 어려움을 겪을 가능성을 의미합니다.',
      '발에 상처가 나는 꿈': '일이나 사업에서 장애물을 만나거나 방해을 받을 수 있음을 암시합니다.',
      '등에 날개가 생기는 꿈': '신분이 상승하거나 명성과 재물이 생길 징조입니다.',
      '코가 부러지는 꿈': '자존감이 꺾이거나, 체면이 구겨지는 사건을 암시합니다. 진행하고 있는 일이나 인간관계를 돌아보는 것이 좋습니다.',
      '코에서 피가 나는 꿈': '재물운을 상징합니다. 코피의 양이 많을수록 운세가 더 상승되는 것을 의미합니다. 하지만 검은색에 가까운 코피의 경우에는 오히려 재물운에 문제가 생길 수 있으니 주의가 필요합니다.',
      '손가락이 잘리는 꿈': '가까운 주변 사람을 잃게 되거나, 관계가 멀어지게 될 것을 암시합니다.',
      '치아가 흔들리는 꿈': '현재 상황이 위태롭거나 불안하다는 것을 의미합니다. 또ㄴ 신변에 위험이 닥칠수도 있으니 각별한 주의가 필요합니다.',
      '앞니가 빠지는 꿈': '자신이나 가까운 가족에게 좋지 않은 일이 생긴다는 것을 의미합니다. ',
      '아랫니가 빠지는 꿈': '자신보다 아랫사람(동생, 후배, 자녀 등)에게 좋지 않은 일이 생긴다는 것을 의미합니다. ',
      '치아가 모두 빠지는 꿈': '인생에 예상치 못한 큰 변화가 생긴다는 것을 암시합니다. 긍정적인 변화일수도, 부정적인 변화일수도 있습니다. ',
      '치아가 자라나는 꿈': '새로운 시작과 성장, 변화를 의미합니다. 계획했던 일이 순조롭게 진행되고 건강도 좋아질 수 있습니다.',
      '물에 빠지는 꿈': '불안과 스트레스 같은 감정에 압도당하거나, 감당할 수 없는 상황에 휩쓸리고 있다는 것을 의미합니다.',

    };

// 👉 main.js 내용
const categoryBar = document.getElementById('categoryBar');
const subcategoryBar = document.getElementById('subcategoryBar');
const cardGrid = document.getElementById('cardGrid');
const guestbook = document.getElementById("guestbookSection");
const homeBtn = document.getElementById("homeButton");

// 카테고리 렌더링
function renderCategories() {
  categoryBar.innerHTML = '';
  const firstCat = Object.keys(data)[0];
  Object.keys(data).forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => {
      document.querySelectorAll('.category-bar button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubcategories(cat);
    };
    if (idx === 0) btn.classList.add('active');
    categoryBar.appendChild(btn);
  });
  renderSubcategories(firstCat); // ✅ 여기에 renderCards(cat, sub) 내부적으로 자동 호출됨
}


// 서브카테고리 렌더링
function renderSubcategories(cat) {
  subcategoryBar.innerHTML = '';
  Object.keys(data[cat]).forEach((sub, idx) => {
    const btn = document.createElement('button');
    btn.textContent = sub;
    btn.onclick = () => {
      document.querySelectorAll('.subcategory-bar button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(cat, sub); // 소분류 클릭 시엔 sub 포함해서 렌더
    };
    subcategoryBar.appendChild(btn);
  });

  renderCards(cat); // 대분류 클릭 시에는 전체 소분류 카드 보여줌
}


// 카드 렌더링
function renderCards(cat, sub) {
  cardGrid.innerHTML = '';
  const keys = sub ? data[cat][sub] : Object.values(data[cat]).flat();

  keys.forEach(text => {
    const card = document.createElement('div');
    card.className = 'card';

    const thumb = document.createElement('div');
    thumb.className = 'thumb';

    // ✅ 이미지 매칭은 이 안에서!
    if (imageMap[text]) {
      thumb.style.backgroundImage = `url('./images/${imageMap[text]}')`;
      thumb.style.backgroundSize = 'contain';
      thumb.style.backgroundPosition = 'center';
      thumb.style.backgroundRepeat = 'no-repeat';
      thumb.style.backgroundColor = 'white';
    } else {
      thumb.style.background = '#ccc';
    }

    const p = document.createElement('p');
    p.textContent = text;

    card.appendChild(thumb);
    card.appendChild(p);
    card.onclick = () => openModal(text, cardTexts[text] || '해몽 준비중입니다.');
    cardGrid.appendChild(card);
  });
}


// 모달 열기
function openModal(title, desc) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("modal").style.display = "flex";

  const modalThumb = document.querySelector("#modal .thumb");

  if (imageMap[title]) {
    modalThumb.style.backgroundImage = `url('./images/${imageMap[title]}')`;
    modalThumb.style.backgroundSize = 'contain';
    modalThumb.style.backgroundPosition = 'center';
    modalThumb.style.backgroundRepeat = 'no-repeat';
    modalThumb.style.backgroundColor = 'white';
  } else {
    modalThumb.style.background = '#ccc';
    modalThumb.style.backgroundImage = 'none'; // 이전 이미지 제거
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";

  // 👉 썸네일 이미지도 초기화
  const modalThumb = document.querySelector("#modal .thumb");
  modalThumb.style.backgroundImage = "none";
  modalThumb.style.backgroundColor = "#ccc"; // 기본 회색으로 복귀
}


// 검색
function searchCards(keyword) {
  cardGrid.innerHTML = '';
  const results = [];

  Object.keys(data).forEach(cat => {
    Object.keys(data[cat]).forEach(sub => {
      data[cat][sub].forEach(text => {
        if (text.includes(keyword)) results.push(text);
      });
    });
  });

  if (results.length > 0) {
    results.forEach(text => {
      const card = document.createElement('div');
      card.className = 'card';

      const thumb = document.createElement('div');
      thumb.className = 'thumb';

      if (imageMap[text]) {
        thumb.style.backgroundImage = `url('./images/${imageMap[text]}')`;
        thumb.style.backgroundSize = 'contain';
        thumb.style.backgroundPosition = 'center';
        thumb.style.backgroundRepeat = 'no-repeat';
        thumb.style.backgroundColor = 'white';
      } else {
        thumb.style.background = '#ccc';
      }

      const p = document.createElement('p');
      p.textContent = text;

      card.appendChild(thumb);
      card.appendChild(p);
      card.onclick = () => openModal(text, cardTexts[text] || '해몽 준비중입니다.');
      cardGrid.appendChild(card);
    });
  } else {
    cardGrid.innerHTML = `<p style="font-size:2rem; color:#888;">검색 결과가 없습니다.</p>`;
  }
}


// 방명록 토글
function toggleGuestbook() {
  const isOpen = guestbook.style.display === 'block';
  guestbook.style.display = isOpen ? 'none' : 'block';
  categoryBar.style.display = isOpen ? 'flex' : 'none';
  subcategoryBar.style.display = isOpen ? 'flex' : 'none';
  cardGrid.style.display = isOpen ? 'flex' : 'none';
}

// 이벤트 연결
window.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  loadDreams(); // 🔥 이거도 여기 있어야 방명록 처음 로드됨!

  document.getElementById("searchInput").addEventListener("input", function () {
    searchCards(this.value.trim());
  });

  document.getElementById("guestbookToggle").addEventListener("click", toggleGuestbook);

  document.getElementById("homeButton").addEventListener("click", () => {
    guestbook.style.display = 'none';
    categoryBar.style.display = 'flex';
    subcategoryBar.style.display = 'flex';
    cardGrid.style.display = 'flex';
    renderCategories();
  });

  document.querySelector(".close-btn").addEventListener("click", closeModal);

  // ✅ 이 줄을 꼭 여기로 옮겨!
  document.getElementById('saveDream').addEventListener('click', saveDream);
});

// JS 쪽
async function saveDream() {
  const name = document.getElementById('userName').value;
  const content = document.getElementById('userDream').value;
  const timestamp = new Date();

  if (!name || !content) {
    alert('이름과 꿈 내용을 입력해주세요!');
    return;
  }

  try {
    await addDoc(collection(db, "guestbook"), {
      name,
      content,
      timestamp
    });
    alert("저장되었습니다!");
    document.getElementById('userName').value = "";
    document.getElementById('userDream').value = "";
    loadDreams(); // 저장 후 다시 불러오기
  } catch (error) {
    console.error("저장 오류:", error);
    alert("오류가 발생했습니다. 콘솔을 확인해주세요.");
  }
}

// 방명록 불러오기
async function loadDreams() {
  const list = document.getElementById('dreamList');
  list.innerHTML = "";

  try {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement('div');
      item.innerHTML = `<strong>${data.name}</strong>: ${data.content}`;
      list.appendChild(item);
    });
  } catch (e) {
    console.error("불러오기 실패:", e);
  }
}




