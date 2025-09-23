const listBanner = [
  {
    title: "Cam kết mang lại kết quả tối ưu",
    descBanner:
      "Tích hợp chiến lược nhà cung cấp toàn cầu với những hiểu biết địa phương, dịch vụ để đạt được kết quả tối ưu.",
    url: "./asset/images/banner-1.png",
  },
  {
    title: "Mang đến giải pháp tùy chỉnh",
    descBanner:
      "Cung cấp các giải pháp tùy chỉnh để đạt được các mô hình tiết kiệm chi phí cho khách hàng.",
    url: "./asset/images/banner-2.png",
  },
  {
    title: "Tạo dựng môi trường làm việc hiệu quả",
    descBanner:
      "Xây dựng một môi trường làm việc chuyên nghiệp để thu hút nhân tài.",
    url: "./asset/images/banner-3.png",
  },
  {
    title: "Tuân thủ các tiêu chuẩn về môi trường, sức khỏe và an toàn",
    descBanner:
      "Đảm bảo tuân thủ đầy đủ các tiêu chuẩn Môi trường, Sức khỏe, An toàn, và Quy trình áp dụng để đóng góp cho một thế giới tốt đẹp hơn .",
    url: "./asset/images/banner-4.png",
  },
];

// handle
const btnNextBanner = document.querySelector(".btn--prev");
const btnPrevBanner = document.querySelector(".btn--next");

const renderBanner = document.querySelector(".list--banner");
const listImgBanner = document.querySelector(".banner--img");

// render block img banner
function renderImgBanner() {
  const zIndexEl = 999;
  const htmls = listBanner.map((el, index) => {
    return `
   <div style='${
     index === 0
       ? "opacity:1; visibility:visible"
       : "opacity:0; visibility:hidden"
   }; z-index:${zIndexEl - index}' data-active=${
      index === 0 ? 1 : 0
    } class="list--banner__item">
            <div class="banner--img">
              <img src=${el.url} />
            </div>
            <!-- content banner -->
            <div class="container--banner custom--containerContentBanner">
              <div class="content--banner">
                <div>
                  <h2 class="content--banner__top">Tầm nhìn-sứ mệnh</h2>
                  <p class="content--banner__title title--font28">
                    ${el.title}
                  </p>
                  <p class="content--banner__content">
                    ${el.descBanner}
                  </p>
                </div>
                <button class="content--banner__seemore">
                  <span>Khám phá thêm</span>
                  <div class="box--icon">
                    <div class="slide--icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 14L12 7.5L5 1" stroke-linecap="square" />
                      </svg>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 14L12 7.5L5 1" stroke-linecap="square" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
  `;
  });
  renderBanner.innerHTML = htmls.join("");
}

renderImgBanner();

// render list title banner
const listControlBanner = document.querySelector(".list--control");
// render title banner vào thanh điều khiển bên dưới
function renderTitleControlBanner() {
  const htmls = listBanner.map((el, i) => {
    return `
      <li class="list--control__item ${
        i === 0 ? "active" : ""
      }" data-index=${i}>
        ${el.title}
      </li>
      `;
  });
  listControlBanner.innerHTML = htmls.join("");
}
renderTitleControlBanner();

// handle next banner
let i = 0;
let intervalBanner;

btnNextBanner.onclick = () => {
  i = (i + 1) % listBanner.length;
  clearInterval(intervalBanner);
  handlePrevNextBanner(i);
  startInterVal();
};

// handle prev banner
btnPrevBanner.onclick = () => {
  i = (i - 1 + listBanner.length) % listBanner.length;
  clearInterval(intervalBanner);
  handlePrevNextBanner(i);
  startInterVal();
};

// autorun banner
const timeInterval = 3000;

function startInterVal() {
  intervalBanner = setInterval(() => {
    i = (i + 1) % listBanner.length;
    handlePrevNextBanner(i);
  }, timeInterval);
}
startInterVal();

// handle Next and Prev banner
function handlePrevNextBanner(i) {
  const listImgBanner = document.querySelectorAll(".list--banner__item");
  const listControlBanner = document.querySelectorAll(".list--control__item");
  const itemControl = document.querySelector(
    `.list--control__item[data-index='${i}']`
  );
  console.log(itemControl);
  const currentElement = listImgBanner[i];
  // kéo el đang được active về
  const elImgPresent = document.querySelector(
    ".list--banner__item[data-active='1']"
  );

  //   get index el chuẩn bị active
  const zIndexElPrepareActive = currentElement.style.zIndex;

  // hạ img hiện tại if có
  if (elImgPresent) {
    elImgPresent.style.opacity = 0;
    elImgPresent.dataset.active = 0;
    elImgPresent.style.visibility = "hidden";
    elImgPresent.style.zIndex = zIndexElPrepareActive;
  }

  // hiện img mới
  currentElement.style.opacity = 1;
  currentElement.dataset.active = 1;
  currentElement.style.visibility = "visible";
  currentElement.style.zIndex = elImgPresent.style.zIndex;

  //
  listControlBanner.forEach((el) => el.classList.remove("active"));
  // add lại class
  itemControl.classList.add("active");
}

// handle click dot banner

listControlBanner.onclick = (e) => {
  const el = e.target.closest(".list--control__item");
  if (!el) return;
  const indexBanner = el.dataset.index;
  clearInterval(intervalBanner);
  handlePrevNextBanner(indexBanner);
  startInterVal();
};

// const itemsPolygon = document.querySelectorAll(".block--polygon__item");
// const containerWidth = document.querySelector(".block--polygon").offsetWidth;
// const duration = 10;
// console.log(itemsPolygon);

// itemsPolygon.forEach((item, index) => {
//   const itemWidth = item.offsetWidth;
//   const distance = containerWidth + itemWidth;
//   const speed = distance / duration; // px/s
//   const delay = (itemWidth / speed) * index;
//   item.style.animation = `autoRun ${duration}s linear infinite`;
//   item.style.animationDelay = `${delay}s`;
// });
