import React, { useEffect, useRef, useState } from "react";

import TrustWalletConnect from "../components/TrustWalletConnect"; // Connect Wallet component
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import importance from "/assets/img/bg/uo_bg.png";
import styled from "styled-components";
import "../landingpage-assets/css/bootstrap.min.css";
import "../landingpage-assets/css/fontawesome.css";
import "../landingpage-assets/css/animate.css";
import "../landingpage-assets/css/metisMenu.css";
import "../landingpage-assets/css/magnific-popup.css";
import "../landingpage-assets/css/main.css";
import Web3 from "web3";

const Header = styled.header`
  transition: background-color 0.3s ease; /* Smooth transition for background color */
  background-color: ${(props) =>
    props.isScrolled ? "transparent" : "#0b0e13"};
`;

const Menu = styled.nav`
  display: ${(props) =>
    props.isOpen ? "block" : "none"}; /* Show or hide menu */
  transition: display 0.3s ease; /* Optional: add transition */
  margin-top: 240px;
  margin-right: 240px;
  background-color: gray;
  border-radius: 10px;
`;

const LandingPage4 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0); // Set isScrolled to true if scrolled down
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showMenuMobile = () => {
    console.log("a");
    setIsOpen((prev) => !prev); // Toggle menu visibility
  };

  const [account, setAccount] = useState(null);
  const [isConnected] = useState(
    localStorage.getItem("walletAddress")?.length > 0
  );

  // Hàm kết nối với Trust Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Yêu cầu kết nối tài khoản
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const accountAddress = accounts[0];
        setAccount(accountAddress);
        // Kiểm tra mạng BSC (Binance Smart Chain)
        const chainId = await web3.eth.getChainId();
        if (chainId === BigInt(56)) {
          localStorage.setItem("walletAddress", accountAddress);
          localStorage.setItem("publicKey", accountAddress);
          localStorage.setItem("walletStateInit", accountAddress);
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Lỗi kết nối:", error);
      }
    } else {
      alert("Vui lòng cài đặt Trust Wallet hoặc MetaMask.");
    }
  };

  // Hàm ngắt kết nối ví
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("walletStateInit");
    localStorage.removeItem("is_in_tree");
    localStorage.removeItem("is_lock");
    localStorage.removeItem("access_token");
    localStorage.removeItem("bep20");
    localStorage.removeItem("management");
    window.location.href = "/";
  };

  return (
    <div className="home-blockchain">
      <div id="xb-loadding" className="xb-loader style-2">
        <div className="honeycomb">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="progress-wrap style-2">
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      <div className="body_wrap">
        <Header
          className="site-header blockchain-header"
          isScrolled={isScrolled}
        >
          <div className="header__main-wrap stricky">
            <div className="container-fluid">
              <div className="header__main ul_li_between">
                <div className="header__left ul_li">
                  <div className="header__logo">
                    <a href="/">
                      <img
                        src="assets/img/resources/logo-white.png"
                        width={100}
                        height={30}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div className="main-menu__wrap ul_li navbar navbar-expand-lg">
                  <nav className="main-menu collapse navbar-collapse">
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a className="scrollspy-btn" href="#feature">
                          Feature
                        </a>
                      </li>
                      <li>
                        <a className="scrollspy-btn" href="#team">
                          Team
                        </a>
                      </li>
                      <li>
                        <a className="scrollspy-btn" href="#roadmap">
                          Roadmap
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="header__action ul_li">
                  <div className="d-lg-none">
                    <a
                      className="header__bar hamburger_menu"
                      style={{ cursor: "pointer" }}
                      onClick={showMenuMobile}
                    >
                      <div className="header__bar-icon">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>

                      <Menu className="main-menu " isOpen={isOpen}>
                        <ul>
                          <li>
                            <a href="/">Home</a>
                          </li>
                          <li>
                            <a className="scrollspy-btn" href="#feature">
                              Feature
                            </a>
                          </li>
                          <li>
                            <a className="scrollspy-btn" href="#team">
                              Team
                            </a>
                          </li>
                          <li>
                            <a className="scrollspy-btn" href="#roadmap">
                              Roadmap
                            </a>
                          </li>
                          {isConnected && (
                            <li>
                              <a className="scrollspy-btn" href="/dashboard">
                                Dashboard
                              </a>
                            </li>
                          )}
                          {isConnected && (
                            <li>
                              <a
                                className="scrollspy-btn"
                                onClick={disconnectWallet}
                              >
                                Disconnect
                              </a>
                            </li>
                          )}
                          {!isConnected && (
                            <li>
                              <a
                                className="scrollspy-btn"
                                onClick={connectWallet}
                              >
                                Connect
                              </a>
                            </li>
                          )}
                        </ul>
                      </Menu>
                    </a>
                  </div>
                  <TrustWalletConnect />
                </div>
              </div>
            </div>
          </div>
        </Header>
        <aside className="slide-bar slide-bar-blockchain">
          <div className="close-mobile-menu">
            <a className="tx-close" />
          </div>
          <nav className="side-mobile-menu">
            <a className="header__logo mb-30" href="#!">
              <img
                src="assets/img/resources/logo-white.png"
                width={100}
                height={30}
                alt=""
              />
            </a>
            <ul id="mobile-menu-active">
              <li>
                <a className="scrollspy-btn" href="index.html">
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a className="scrollspy-btn" href="#feature">
                  <span>Feature</span>
                </a>
              </li>
              <li>
                <a className="scrollspy-btn" href="#team">
                  <span>Team</span>
                </a>
              </li>
              <li>
                <a className="scrollspy-btn" href="#roadmap">
                  <span>Roadmap</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="body-overlay" />
        <main>
          <section
            className="hero hero__blockchain pos-rel bg_img"
            data-background="assets/img/bg/blockchain_hero_bg.png"
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="blockchain-hero__content">
                    <h1 className="title text-80 mb-35 -tracking-2/4">
                      KASPOOL <br /> EFFECTIVE COIN MINING POOLS
                    </h1>
                    <p className="mb-50 text-20 leading-30">
                      In our digital world, trust, security, and efficiency are
                      vital. Enter blockchain <br /> technology, the
                      game-changer.
                    </p>
                    <div className="btns">
                      <a className="blc-btn" href="#!">
                        get started
                      </a>
                      <a className="blc-btn blc-btn--white" href="#!">
                        white paper
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="hero__blockchain-icon pos-rel">
                    <div className="icon ul_li icon--1 absolute">
                      <span className="text-white mr-5">Secure &amp; Safe</span>
                      <img src="assets/img/icon/sc.svg" alt="" />
                    </div>
                    <div className="icon ul_li icon--2 absolute">
                      <span className="text-white mr-5">Tested</span>
                      <img src="assets/img/icon/sc.svg" alt="" />
                    </div>
                    <div className="icon ul_li icon--3 absolute">
                      <span className="text-white mr-5">Trustworthy</span>
                      <img src="assets/img/icon/sc.svg" alt="" />
                    </div>
                    <div className="icon ul_li icon--4 absolute">
                      <img src="assets/img/icon/sc.svg" alt="" />
                      <span className="text-white ml-5">Optimized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="user-option pb-110">
            <div className="container">
              <div className="sec-title style2 text-center mb-20">
                <h2 className="sec-title__title text-50 mb-25">Kaspool</h2>
                <p>The Importance of Crypto</p>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="user-option__item">
                    {/* <div class="icon pos-rel ">
                              <img src="assets/img/icon/up_01.svg" alt="">
                          </div>
                          <h3 class="heading">Personal</h3> */}
                    <ul className="user-option__list list-unstyled mt-45">
                      <li>
                        <span>
                          <img src="assets/img/icon/check_badge.svg" alt="" />
                        </span>
                        <h4>Confidentiality</h4>
                        <p>
                          Market Capitalization: Crypto reached $1.17 trillion
                          (2023), with Bitcoin and Ethereum leading the way.
                        </p>
                      </li>
                      <li>
                        <span>
                          <img src="assets/img/icon/check_badge.svg" alt="" />
                        </span>
                        <h4>Security</h4>
                        <p>
                          Trading Volume: Binance processes over $76 billion per
                          day.
                        </p>
                      </li>
                      {/* <li>
                                  <span><img src="assets/img/icon/check_badge.svg" alt=""></span>
                                  <h4>Easy access to personal data</h4>
                                  <p>It's essential to be cautious about sharing.</p>
                              </li>
                              <li>
                                  <span><img src="assets/img/icon/check_badge.svg" alt=""></span>
                                  <h4>Testing and proactive communication</h4>
                                  <p>Testing and proactive communication are essential components of successful projects,</p>
                              </li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="user-option__img text-center">
                    <img src={importance} alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="user-option__item style2">
                    {/* <div class="icon pos-rel">
                              <img src="assets/img/icon/up_02.svg" alt="">
                          </div>
                          <h3 class="heading">Commercial</h3> */}
                    <ul className="user-option__list mt-45 list-unstyled">
                      <li>
                        <span>
                          <img src="assets/img/icon/check_badge.svg" alt="" />
                        </span>
                        <h4>Automation</h4>
                        <p>
                          Users: 420 million people own crypto, with an
                          increasing number of countries legalizing it.
                        </p>
                      </li>
                      <li>
                        <span>
                          <img src="assets/img/icon/check_badge.svg" alt="" />
                        </span>
                        <h4>Compliance with regulations</h4>
                        <p>
                          Blockchain Applications: Over 80% of major banks are
                          investing in this technology.
                        </p>
                      </li>
                      {/* <li>
                                  <span><img src="assets/img/icon/check_badge.svg" alt=""></span>
                                  <h4>Building a new financial network</h4>
                                  <p>Building a new financial network is an ambitious.</p>
                              </li>
                              <li>
                                  <span><img src="assets/img/icon/check_badge.svg" alt=""></span>
                                  <h4>Startups for blockchain</h4>
                                  <p>Startups in the blockchain industry have been flourishing in recent years, leveraging.</p>
                              </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="blc-about pb-80">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="blc-about__img pos-rel text-center wow fadeInLeft">
                    <img src="assets/img/about/about_shape1.png" alt="" />
                    <div className="shape shape--1">
                      <div>
                        <img src="assets/img/about/about_shape2.png" alt="" />
                      </div>
                    </div>
                    <div className="shape shape--2">
                      <div>
                        <img src="assets/img/about/about_shape3.png" alt="" />
                      </div>
                    </div>
                    <div className="icon">
                      <img src="assets/img/icon/syber_icon.svg" alt="" />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div
                    className="blc-about__content wow fadeInRight"
                    data-wow-delay="100ms"
                  >
                    <div className="sec-title style2 mb-40">
                      <h2 className="sec-title__title text-50 mb-25">
                        What is Kaspool ?
                      </h2>
                      <p>
                        Kaspool is a platform for mining digital assets through
                        coin mining pools. With a coin based on Kaspa's DAG
                        technology, it represents a pioneering approach to
                        enhancing performance without sacrificing
                        decentralization. Kaspool is committed to providing
                        opportunities for quick and sustainable profits.
                      </p>
                    </div>
                    <ul className="blc-about__list ul_li mt-none-20">
                      <li>
                        <img src="assets/img/icon/ul_icon.svg" alt="" />
                        Privacy and Security
                      </li>
                      <li>
                        <img src="assets/img/icon/ul_icon.svg" alt="" />
                        Cost and Complexity
                      </li>
                      <li>
                        <img src="assets/img/icon/ul_icon.svg" alt="" />
                        Immutable Data
                      </li>
                      <li>
                        <img src="assets/img/icon/ul_icon.svg" alt="" />
                        Regulatory Compliance
                      </li>
                      <li>
                        <img src="assets/img/icon/ul_icon.svg" alt="" />
                        Interoperability
                      </li>
                      <li>
                        <img src="assets/img/icon/ul_icon.svg" alt="" />
                        Energy Consumption
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="feature"
            className="advantages advantages-bg pb-120"
            data-background="assets/img/bg/advantages_bg.png"
          >
            <div className="container">
              <div className="sec-title style2 text-center mb-60">
                <h2 className="sec-title__title text-50 mb-25">
                  BlockDAG Technology
                </h2>
                <p>
                  Kaspool utilizes the BlockDAG platform and references GhostDAG
                  technology, which minimizes the waste of computational
                  resources and creates parallel blocks. This enables the
                  processing of a large volume of transactions without issues
                  related to network congestion or orphan blocks.
                </p>
              </div>
              <table className="advantages-table table-responsive">
                <thead>
                  <tr>
                    <th>Futures</th>
                    <th>IDV System</th>
                    <th>Creating Apps</th>
                    <th>Confidentiality</th>
                    <th>Without Gadget</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>coindox</td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Civic</td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Vilid.global</td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Hypr</td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_deactive.svg" alt="" />
                    </td>
                    <td>
                      <img src="assets/img/icon/badge_active.svg" alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="solution pt-10 pb-70">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="solution__content wow fadeInLeft">
                    <div className="sec-title style2 mb-60">
                      <h2 className="sec-title__title text-50 mb-25">
                        KASPOOL <br /> MAIN FEATURES
                      </h2>
                      <p>
                        A blockchain solution platform is a comprehensive
                        software or <br /> infrastructure that enables
                        businesses and developers to build,
                      </p>
                    </div>
                    <ul className="solution__list list-unstyled">
                      <li>
                        <div className="icon">
                          <img src="assets/img/icon/s_01.svg" alt="" />
                        </div>
                        <h4>MULTI-SOURCE MINING</h4>
                        <p className="content">
                          KASPOOL will develop a digital asset mining system
                          from various sources, leveraging the power of the
                          community to optimize mining efforts.
                        </p>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="assets/img/icon/s_02.svg" alt="" />
                        </div>
                        <h4>KASPOOL COIN</h4>
                        <p className="content">
                          KASPOOL will incorporate the best technical criteria
                          from Kaspa, including:
                        </p>
                        <p className="content">
                          - The kHeavyHash algorithm, which enhances mining
                          efficiency and reduces energy consumption.
                        </p>
                        <p className="content">
                          - GhostDAG technology, which ensures network integrity
                          and allows for near-instant transaction confirmations.
                        </p>
                        <p className="content">
                          - Complete decentralization, ensuring that everyone
                          can participate in mining and transaction validation
                          without third-party control.
                        </p>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="assets/img/icon/s_03.svg" alt="" />
                        </div>
                        <h4>STABLE AND FAIR INVESTMENT VALUES:</h4>
                        <p className="content">
                          The main goal of Kaspool is to create an investment
                          ecosystem that offers high returns while ensuring
                          stability. Thanks to BlockDAG technology, Kaspool will
                          provide sustainable and long-term investment
                          opportunities for investors.
                        </p>
                        <p className="content">
                          The value of investment returns will be fairly
                          distributed based on contributions made within the
                          mining network.
                        </p>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="assets/img/icon/s_04.svg" alt="" />
                        </div>
                        <h4>SECURITY AND TRANSPARENCY:</h4>
                        <p className="content">
                          Kaspool will implement strict security principles
                          similar to Kaspa, utilizing PoW (Proof-of-Work)
                          technology with the kHeavyHash algorithm, ensuring
                          high security while optimizing energy efficiency.
                        </p>
                        <p className="content">
                          The user management and interaction system will be
                          based on Web3.0, ensuring security and transparency.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="solution__img pos-rel">
                    <img src="assets/img/shape/s_circle_1.png" alt="" />
                    <div className="solution__img-sml">
                      <div className="circle circle--1">
                        <div data-parallax='{"x" : -60}'>
                          <img src="assets/img/shape/s_circle_2.png" alt="" />
                        </div>
                      </div>
                      <div className="circle circle--2">
                        <div data-parallax='{"x" : 60}'>
                          <img src="assets/img/shape/s_circle_3.png" alt="" />
                        </div>
                      </div>
                      <div className="circle circle--3">
                        <div data-parallax='{"y" : -60}'>
                          <img src="assets/img/shape/s_circle_4.png" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="solution__icon">
                      <img src="assets/img/icon/s_icon.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* solution end */}
          {/* token update start */}
          <section className="token-update pb-130">
            <div className="container">
              <div className="sec-title style2 text-center mb-60">
                <h2 className="sec-title__title text-50 mb-25">
                  KASPOOL Ecosystem
                </h2>
                <p>Stay Informed with Live Data and Analysis</p>
              </div>
              <div className="row mt-none-30">
                <div className="col-lg-12 mt-30">
                  <ul className="token-update__data list-unstyled">
                    <li>
                      <img
                        src="assets/img/resources/img1.jpg"
                        width={100}
                        height={100}
                        alt="Description of the image"
                      />
                      <strong>
                        Investment system for joint mining pools at Kaspool.io
                      </strong>
                    </li>
                    <li>
                      <img
                        src="assets/img/resources/img2.jpg"
                        width={100}
                        height={100}
                        alt="Description of the image"
                      />
                      <strong>KasPool Wallet - Multi-platform wallet</strong>
                    </li>
                    <li>
                      <img
                        src="assets/img/resources/img3.jpg"
                        width={100}
                        height={100}
                        alt="Description of the image"
                      />
                      <strong>KasPoolChain - Private blockchain</strong>
                    </li>
                    <li>
                      <img
                        src="assets/img/resources/img3.jpg"
                        width={100}
                        height={100}
                        alt="Description of the image"
                      />
                      <strong>
                        KasExchange - Decentralized exchange for managing and
                        trading digital assets
                      </strong>
                    </li>
                    <li>
                      <img
                        src="assets/img/resources/img5.jpg"
                        width={100}
                        height={100}
                        alt="Description of the image"
                      />
                      <strong>
                        Platform for developing decentralized applications for
                        users
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            id="team"
            className="team team__bg pb-120"
            data-background="assets/img/bg/team_sec_bg.png"
          >
            <div className="container">
              <div className="sec-title style2 text-center mb-60">
                <h2 className="sec-title__title text-50 mb-25">
                  DEVELOPMENT TEAM
                </h2>
                <p>Always ready our team to help you</p>
              </div>
              <div className="row mt-none-30">
                <div className="col-xl-4 col-lg-6 col-md-6 mt-30">
                  <div className="team__single text-center pos-rel">
                    <div className="avatar">
                      <img src="assets/img/resources/cto.jpg" alt="" />
                    </div>
                    <div className="content">
                      <h3>DAVID HARRISON</h3>
                      <span>CTO</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 mt-30">
                  <div className="team__single style2 text-center">
                    <div className="avatar">
                      <img src="assets/img/resources/ceo.jpg" alt="" />
                    </div>
                    <div className="content">
                      <h3>MICHAEL REYNOLDS</h3>
                      <span>CEO</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 mt-30">
                  <div className="team__single text-center">
                    <div className="avatar">
                      <img src="assets/img/resources/coo.jpg" alt="" />
                    </div>
                    <div className="content">
                      <h3>JESSICA CARTER</h3>
                      <span>COO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="roadmap" className="roadmap pb-135">
            <div className="container">
              <div className="sec-title style2 text-center mb-60">
                <h2 className="sec-title__title text-50 mb-25">Roadmap</h2>
                <p>blockchain a Solid Infrastructure for Growth</p>
              </div>
              <div className="roadmap__list pos-rel">
                <div className="roadmap__list-box ">
                  <div className="roadmap__list-inner item-1">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 1 <br /> Q4/2023
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Complete technology tests for mining pools.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-2">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 2 <br /> Q1/2025
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Launch of the multi-platform wallet, KasPool Wallet.{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-3">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 3 <br /> Q2/2025
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Launch of the testNet for the private blockchain system,
                        KasPoolChain.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-4">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 4 <br /> Q3-Q4/2025
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Update the TestNet system and launch the KSP coin on the
                        KasPoolChain network.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-5">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 5 <br /> Q1/2026
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Official launch of KasPoolChain
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-6">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 6 <br /> Q1/2026
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Official launch of KasPoolChain
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-7">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 7 <br /> 2027
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Launch of the digital asset exchange, KasExchange
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="roadmap__list-box">
                  <div className="roadmap__list-inner item-8">
                    <div className="icon">
                      <img src="assets/img/icon/rm_icon.png" alt="" />
                    </div>
                    <h3 className="black-text">
                      Stage 8 <br /> POST 2027
                    </h3>
                    <ul className="list-unstyled">
                      <li className="black-text">
                        Launch of an open decentralized platform, allowing users
                        to access exclusive BlockDAG technologies and create
                        their own applications.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="faq pb-75">
            <div className="container">
              <div className="sec-title style2 text-center mb-40">
                <h2 className="sec-title__title text-50 mb-25">
                  Frequently Asked Questions
                </h2>
                <p>Have questions? We have answers!</p>
              </div>
              <div className="faq__blockchain">
                <ul className="accordion_box clearfix">
                  <li className="accordion block active-block">
                    <div className="acc-btn">
                      What is Blockchain?
                      <span className="arrow">
                        <span />
                      </span>
                    </div>
                    <div className="acc_body current">
                      <div className="content">
                        Blockchain uses consensus mechanisms, such as Proof of
                        Work (PoW) or Proof of Stake (PoS), to validate and
                        agree on the state of the <br /> network. These
                        mechanisms require participants (nodes or validators) to
                        solve complex mathematical puzzles or stake
                        cryptocurrency to <br /> participate in the consensus
                        process.
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      How is Blockchain Secure?
                      <span className="arrow">
                        <span />
                      </span>
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        Blockchain uses consensus mechanisms, such as Proof of
                        Work (PoW) or Proof of Stake (PoS), to validate and
                        agree on the state of the <br /> network. These
                        mechanisms require participants (nodes or validators) to
                        solve complex mathematical puzzles or stake
                        cryptocurrency to <br /> participate in the consensus
                        process.
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      What is the Difference Between Public and Private
                      Blockchains?
                      <span className="arrow">
                        <span />
                      </span>
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        Blockchain uses consensus mechanisms, such as Proof of
                        Work (PoW) or Proof of Stake (PoS), to validate and
                        agree on the state of the <br /> network. These
                        mechanisms require participants (nodes or validators) to
                        solve complex mathematical puzzles or stake
                        cryptocurrency to <br /> participate in the consensus
                        process.
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      How Can I Get Started with Blockchain?
                      <span className="arrow">
                        <span />
                      </span>
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        Blockchain uses consensus mechanisms, such as Proof of
                        Work (PoW) or Proof of Stake (PoS), to validate and
                        agree on the state of the <br /> network. These
                        mechanisms require participants (nodes or validators) to
                        solve complex mathematical puzzles or stake
                        cryptocurrency to <br /> participate in the consensus
                        process.
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      What Are Some Real-World Use Cases of Blockchain?
                      <span className="arrow">
                        <span />
                      </span>
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        Blockchain uses consensus mechanisms, such as Proof of
                        Work (PoW) or Proof of Stake (PoS), to validate and
                        agree on the state of the <br /> network. These
                        mechanisms require participants (nodes or validators) to
                        solve complex mathematical puzzles or stake
                        cryptocurrency to <br /> participate in the consensus
                        process.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <footer
          className="site-footer footer__blockchain pos-rel pt-95 bg_img"
          data-background="assets/img/bg/footer_bg2.jpg"
        >
          <div className="container">
            <div className="footer__copyright-blc ul_li_between">
              <div className="footer__copyright-text mt-15">
                Copyright © 2024 Kaspool. All rights reserved.
              </div>
              <ul className="footer__social ul_li mt-15">
                <li>
                  <a href="https://x.com/kaspoolofficial">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@KASPOOL_OFFICIAL">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
                <li>
                  <a href="https://t.me/kaspool_official">
                    <i className="fab fa-telegram-plane" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage4;