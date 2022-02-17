import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Page } from 'style/components/calendar';

export const Calendar = React.forwardRef((props, ref) => {
  const date = new Date();
  const baseYear = date.getFullYear() - 6;
  const months = Array.from({ length: 3 }, (_, k) => Array.from({ length: 4 }, (_, kk) => k * 4 + kk + 1));
  const week = ['日', '一', '二', '三', '四', '五', '六'];

  let [day, setDay] = useState([]); // 每月的天
  let [years, setYears] = useState(Array.from({ length: 3 }, (_, k) => Array.from({ length: 4 }, (_, kk) => k * 4 + kk + baseYear))); // 年份列表
  let [chooseYear, setChooseYear] = useState(false); // 切换到选择年
  let [showType, setShowType] = useState(1); // 1-按日 默认  2-按月
  let [lineDayOrMonth, setLineDayOrMonth] = useState([[]]); // 收起后显示的行数据
  let [lineAnimation, setLineAnimation] = useState(true); // 收起动画
  let [dayOrMonth, setDayOrMonth] = useState({ // 当前选择的日期
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    full: true
  });
  let lineRef = useRef({ m: 0, d: 0 });
  let timer = useRef();

  // 二十四节气
  function judgeFestival(y, m, d) {
    let solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
    let sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];

    let solarTerms = "";
    // while (solarTerms == "") {
    let sotmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    let sotmp2 = sotmp1.getUTCDate(); //根据世界时返回一个月 (UTC) 中的某一天
    if (sotmp2 === d) {
      solarTerms = solarTerm[m * 2 + 1];
      return solarTerms;
    }
    sotmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    sotmp2 = sotmp1.getUTCDate();
    if (sotmp2 === d) {
      solarTerms = solarTerm[m * 2];
      return solarTerms;
    }
  };

  // 获取传入的当前月共有多少天, 以及1号为周几 （0-周日）
  function getDate(year, month) {
    let d = new Date(year, month + 1, 0);
    let w = new Date(year, month, 1);
    return {
      days: d.getDate(),
      week: w.getDay(),
    };
  };

  /**
   * 写入天 params: 
   * year     年, 
   * month    月, 
   * full     是否 通过上一月/下一月切换 、 返回今日
   */
  const setDate = useCallback((year, month, full = false) => {
    if (!year && !month) return null;

    const date = new Date();
    const monthCH = {
      '1': '正月',
      '2': '二月',
      '3': '三月',
      '4': '四月',
      '5': '五月',
      '6': '六月',
      '7': '七月',
      '8': '八月',
      '9': '九月',
      '10': '十月',
      '11': '冬月',
      '12': '腊月',
      '一': '正月',
      '二': '二月',
      '三': '三月',
      '四': '四月',
      '五': '五月',
      '六': '六月',
      '七': '七月',
      '八': '八月',
      '九': '九月',
      '十': '十月',
      '十一': '冬月',
      '十二': '腊月',
    }
    const dayCH = {
      '1': '初一',
      '2': '初二',
      '3': '初三',
      '4': '初四',
      '5': '初五',
      '6': '初六',
      '7': '初七',
      '8': '初八',
      '9': '初九',
      '10': '初十',
      '11': '十一',
      '12': '十二',
      '13': '十三',
      '14': '十四',
      '15': '十五',
      '16': '十六',
      '17': '十七',
      '18': '十八',
      '19': '十九',
      '20': '二十',
      '21': '廿一',
      '22': '廿二',
      '23': '廿三',
      '24': '廿四',
      '25': '廿五',
      '26': '廿六',
      '27': '廿七',
      '28': '廿八',
      '29': '廿九',
      '30': '三十',
    };

    // 其中对应 的 `dateStyle`, `timeStyle` 值 从长到短分别有 `full`, `long`, `medium`, `short`
    // zh-u-ca-chinese
    const formatDateTime = (time, option = 'zh-u-ca-chinese') => new Intl.DateTimeFormat(
      option,
      { dateStyle: 'medium', timeStyle: 'medium', hour12: false }
    ).formatToParts(time).map(({ type, value }) => {
      switch (type) {
        case 'month':
          return value.indexOf('月') !== -1 ? monthCH[`${value.slice(0, value.length - 1)}`] :
            isNaN(value) ? value + '月' : monthCH[`${parseInt(value)}`];
        case 'day':
          return value;
        default: return '';
      }
    }).reduce((string, part) => string + part);

    const regexp = /([正一二三四五六七八九十冬腊]+)月(\d+)\b/;

    let dw = getDate(year, month);

    let d = [[], [], [], [], [], []];
    let day = 1;
    let nextDay = 1, nextYear = year, nextMonth = month;
    let preDay = 0, preYear = year, preMonth = month;

    for (let i = 0; i < 42; i++) {
      if (dw.week <= i) {
        if (dw.days > 0) {
          // 当前月
          let ch = [], judge;
          try {
            new Date(year, month, day).toLocaleString('i');
          }
          catch {
            ch = regexp.exec(formatDateTime(new Date(year, month, day)))?.slice(1) || [];
            judge = judgeFestival(year, month, day);
          }

          d[Math.floor(i / 7)].push([
            Math.floor(i / 7),
            ch.length === 2 ?
              judge ? judge :
                ch[1] === '1' ? `${ch[0]}月` : dayCH[`${parseInt(ch[1])}`] : null,
            year,
            month + 1,
            day,
          ]);

          if (
            year === date.getFullYear() &&
            month === date.getMonth() &&
            day === date.getDate()
          ) {
            lineRef.current.d = d[Math.floor(i / 7)];
          }

          day++;
          dw.days--;
        } else {
          // 下一月
          if (nextDay === 1) {
            if (nextMonth + 1 >= 12) {
              nextYear++;
            } else {
              nextMonth++;
            }
          }

          let ch = [], judge;
          try {
            new Date(nextYear, nextMonth, nextDay).toLocaleString('i');
          }
          catch {
            ch = regexp.exec(formatDateTime(new Date(nextYear, nextMonth, nextDay)))?.slice(1) || [];
            judge = judgeFestival(nextYear, nextMonth, nextDay);
          }

          d[Math.floor(i / 7)].push([
            Math.floor(i / 7),
            ch.length === 2 ?
              judge ? judge :
                ch[1] === '1' ? `${ch[0]}月` : dayCH[`${parseInt(ch[1])}`] : null,
            nextYear,
            nextMonth + 1,
            nextDay,
            'next',
          ]);

          nextDay++;
        }
      } else {
        // 上一月
        // let pre = dw.week; // 上个月需要显示几天
        if (preDay === 0) {
          if (preMonth === 0) {
            preYear--;
            preMonth = 11;
          } else {
            preMonth--;
          }

          preDay = getDate(preYear, preMonth)?.days - dw.week + 1;
        }

        let ch = [], judge;
        try {
          new Date(preYear, preMonth, preDay).toLocaleString('i');
        }
        catch {
          ch = regexp.exec(formatDateTime(new Date(preYear, preMonth, preDay)))?.slice(1) || [];
          judge = judgeFestival(preYear, preMonth, preDay);
        }

        d[Math.floor(i / 7)].push([
          Math.floor(i / 7),
          ch.length === 2 ?
            judge ? judge :
              ch[1] === '1' ? `${ch[0]}月` : dayCH[`${parseInt(ch[1])}`] : null,
          preYear,
          preMonth + 1,
          preDay,
          'pre',
        ]);

        preDay++;
      }
    }
    setDay(d);

    if (full) {
      setLineAnimation(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setLineDayOrMonth([lineRef.current.d]);
      }, 400);
    }
  }, []);

  // init 点击选择日期
  useEffect(() => {
    setDate(dayOrMonth.year, dayOrMonth.month - 1, dayOrMonth.full);
  }, [dayOrMonth.year, dayOrMonth.month, dayOrMonth.full, setDate]);

  // 更新年列表
  useEffect(() => {
    if (chooseYear || chooseYear === 0) {
      setYears(Array.from({ length: 3 }, (_, k) => Array.from({ length: 4 }, (_, kk) => k * 4 + kk + baseYear - 12 * (chooseYear - 1))))
    }
  }, [chooseYear, baseYear]);

  const showLine = () => {
    if (lineDayOrMonth) {
      if (timer.current) clearTimeout(timer.current);
      setLineDayOrMonth(null);
      setLineAnimation(false);
    } else {
      if (
        dayOrMonth.year === date.getFullYear() &&
        dayOrMonth.month === date.getMonth() + 1 &&
        dayOrMonth.date === date.getDate()
      ) {
        setLineAnimation(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setLineDayOrMonth([lineRef.current.d]);
        }, 400);
      } else {
        setDayOrMonth(Object.assign({}, {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
          full: true
        }))
      }
    }
  };

  // table day
  const dayTR = (v, i) => <tr key={i}>
    {v?.map((val, ii) => <td key={`${i}${ii}`}>
      {val ? <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: date.getDate() === val[4] &&
            date.getMonth() + 1 === val[3] &&
            date.getFullYear() === val[2]
            ? '#66CCFF' : '#ffffff',
        }}
      >
        <span style={{
          color: date.getFullYear() === val[2] &&
            date.getMonth() + 1 === val[3] &&
            date.getDate() === val[4]
            ?
            '#ffffff' :
            dayOrMonth.year === val[2] &&
              dayOrMonth.month === val[3] ?
              '#333333' : '#E5E5E5',
        }}>{val[4]}</span>
        <span className='day_ch' style={{
          color: date.getDate() === val[4] &&
            date.getMonth() + 1 === val[3] &&
            date.getFullYear() === val[2]
            ? '#ffffff' : '#E5E5E5',
        }}>{val[1]}</span>
      </div> : ''}
    </td>)}
  </tr>;

  // table year/month
  const monthTR = (v, i) => <tr key={i} style={{ height: '40px' }}>
    {v?.map((val, ii) => {
      return <td key={`${i}${ii}`}>
        <p className='td12' style={{
          cursor: 'pointer',
          backgroundColor: chooseYear || chooseYear === 0 ?
            (val === date.getFullYear() ? '#66CCFF' : '#ffffff') :
            val === date.getMonth() + 1 && dayOrMonth.year === date.getFullYear() ? '#66CCFF' : '#ffffff',
          color: chooseYear || chooseYear === 0 ?
            (val === date.getFullYear() ? '#ffffff' : '#333333') :
            dayOrMonth.year === date.getFullYear() && dayOrMonth.month === val ?
              '#ffffff' : '#333333',
        }}
          onClick={() => {
            if (chooseYear || chooseYear === 0) {
              setDayOrMonth({
                ...dayOrMonth,
                year: val,
                full: false,
              });
              setChooseYear(false);
            } else {
              setDayOrMonth({
                ...dayOrMonth,
                month: val,
                full: false,
              });
              setShowType(1);
            }
          }}>{val}{chooseYear || chooseYear === 0 ? '' : '月'}</p>
      </td>
    })}
  </tr>;

  return <Page>
    <div className='title'>
      <span onClick={() => {
        setLineDayOrMonth(null);
        setLineAnimation(false);

        let date = dayOrMonth;
        date.date = 1;
        date.full = false;

        // 上一月
        if (showType === 1) {
          if (date.month + '' === '1') {
            date.year--;
            date.month = 12;
          } else {
            date.month--;
          }

          setDayOrMonth(Object.assign({}, date));
        } else {
          // 上一年
          if (chooseYear || chooseYear === 0) {
            setChooseYear(chooseYear + 1);
          } else {
            date.year--;
            setDayOrMonth(Object.assign({}, date));
          }
        }
      }}>
        <svg className='icon' aria-hidden='true' >
          <use href='#icon-zuojiantou'></use>
        </svg>
      </span>
      <div
        style={{ flexGrow: 1, cursor: 'pointer' }}
        onClick={() => {
          if (showType === 1) {
            setLineDayOrMonth(null);
            setLineAnimation(false);
            setShowType(2);
          } else {
            setChooseYear(chooseYear ? false : 1);
          }
        }}>
        {showType === 1 ?
          <>
            <span>{dayOrMonth.year}年</span>
            <span>{dayOrMonth.month}月</span>
          </> :
          (chooseYear || chooseYear === 0 ? <span>
            {`${baseYear - 12 * (chooseYear - 1)}年-${baseYear + 11 - 12 * (chooseYear - 1)}年`}
          </span> :
            <span>{dayOrMonth.year}年</span>)}
      </div>
      <span onClick={() => {
        setLineDayOrMonth(null);
        setLineAnimation(false);

        let d = dayOrMonth;
        d.date = 1;
        d.full = false;

        if (showType === 1) {
          // 下一月
          if (d.month + '' === '12') {
            d.year++;
            d.month = 1;
          } else {
            d.month++;
          }

          setDayOrMonth(Object.assign({}, d));
        } else {
          // 下一年
          if (chooseYear || chooseYear === 0) {
            setChooseYear(chooseYear - 1);
          } else {
            d.year++;
            setDayOrMonth(Object.assign({}, d));
          }
        }
      }}>
        <svg className='icon' aria-hidden='true' >
          <use href='#icon-youjiantou'></use>
        </svg>
      </span>
      <span
        onClick={showType === 1 ? showLine : null}
        style={{ marginLeft: '20px' }}
      >{showType === 1 ? lineDayOrMonth ? '展开' : '收起' : ''}</span>
    </div>
    <div className='s_tab' style={{
      height: showType === 1 ?
        lineAnimation ? '70px' : '260px' :
        lineAnimation ? '40px' : '120px',
    }}>
      <table>
        {showType === 1 ? <thead>
          <tr>{week.map(i => <th key={i}>{i}</th>)}</tr>
        </thead> : null}
        <tbody>
          {
            showType === 1 ?
              (lineDayOrMonth || day).map((v, i) => dayTR(v, i)) :
              (chooseYear || chooseYear === 0 ? years : months).map((v, i) => monthTR(v, i))
          }
        </tbody>
      </table>
    </div>
  </Page>;
});
