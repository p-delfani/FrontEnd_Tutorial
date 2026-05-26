import "./Header.css";

function Header() {
  return (
    <header id="header">
      <div id="navbar">
        <a className="nav-item text-green-600" href="#">
          {" "}
          خانه{" "}
        </a>
        <a className="nav-item" href="https://sabzlearn.com">
          {" "}
          دوره های سبزلرن{" "}
        </a>
        <a className="nav-item" href="#">
          {" "}
          اشتراک ویژه{" "}
        </a>
        <a className="nav-item" href="#">
          {" "}
          درباره ما{" "}
        </a>
        <a className="nav-item" href="#">
          {" "}
          تماس با ما{" "}
        </a>
      </div>
      <div>
        <a href="https://sabzlearn.ir">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 left-0 mx-auto md:static h-10 md:h-10 lg:h-10 shrink-0"
            viewBox="0 0 1020 769"
          >
            <polygon
              fill="#006537"
              points="484.8124 560.0603 302.0609 655.3444 238.4124 617.2945 238.4124 462.4662 484.8124 560.0603"
            ></polygon>
            <polygon
              fill="#006869"
              points="972.5712 207.8379 484.6647 462.7753 10.7595 275.1003 498.7369 20.1923 972.5712 207.8379"
            ></polygon>
            <line
              fill="#1a3d3d"
              x1="929.7475"
              y1="307.461"
              x2="929.6513"
              y2="307.6423"
            ></line>
            <polygon
              fill="#006869"
              points="1010.2748 576.281 951.4402 632.8758 896.4012 572.396 934.1612 536.0524 934.0697 227.9393 972.5606 207.8255 972.3776 534.6349 1010.2748 576.281"
            ></polygon>
            <polygon
              fill="#00524c"
              points="972.5669 246.8789 972.5027 335.57 934.0989 357.7689 934.0747 266.9936 972.5669 246.8789"
            ></polygon>
            <polygon
              fill="#004b26"
              points="478.5395 760.6504 238.4571 617.3325 238.4571 604.062 484.6701 560.0356 489.1606 570.333 478.5395 760.6504"
            ></polygon>
            <polygon
              fill="#00524c"
              points="585.898 409.8693 484.472 463.0223 10.7549 275.1038 498.7374 20.1923 585.898 409.8693"
            ></polygon>
            <polygon
              fill="#00322d"
              points="972.5669 207.8394 972.5027 255.9601 934.0989 300.7406 934.0747 227.9542 972.5669 207.8394"
            ></polygon>
            <polygon
              fill="#1eb35b"
              points="816.6519 386.7124 816.6519 527.0091 478.1841 760.5632 302.0575 655.3487 816.6519 386.7124"
            ></polygon>
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;
