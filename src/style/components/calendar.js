import styled from "styled-components";

export const Page = styled.div`
user-select: none;
background-color: #FAFAFA;

  p {
    margin: 0;
  }
  
  .title {
    margin-bottom: 10px;
    padding: 0 30px;
    display: flex;
    justify-content: center;

    &>div {
      display: flex;
      justify-content: center;
      font-weight: bold;
    }

    &>span {
      cursor: pointer;
    }
  }

  .s_tab {
    height: 70px;
    overflow: hidden;
    transition: height .5s;
  }

  table {
    width: calc(100% - 50px);
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    table-layout: fixed;
  }

  table thead {
    background-color: #66CCFF;
  }

  table td,
  table th {
    color: #666666;
    height: 30px;
  }

  .td12 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    margin: 0 10px;
    border-radius: 10px;
  }

  .footer {
    overflow: visible;
    margin-top: 20px;

    &>div span {
      font-size: 14px;
      font-weight: normal;
      color: #F75D36;
      position: relative;

        ::after {
          content: '';
          position: absolute;
          bottom: -9px;
          left: 15%;
          width: 70%;
          height: 0;
          border-bottom: 2px solid #F75D36;
        }
    }

    &>span {
      color: #61C6F0;
      font-size: 15px;
    }
  }

  .day_ch {
    font-size: 12px;
    font-weight: lighter;
    color: #999999;
  }
`;