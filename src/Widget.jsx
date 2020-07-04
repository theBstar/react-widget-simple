import React, { useState, useEffect, useCallback } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import './widget.css';

(function widgetInt() {

  function CallUsCard({ statusClassName, data }) {
    return (
      <section className={`action_card ${statusClassName}`} >
        <div className="header">
          {data ? data.header : 'Loading ..'}
        </div>
        {data
          ? (
            <div className="number">
              <img
                className="call-icon"
                src={data.imageSrc}
                alt=""
              />
              {data.number}
            </div>
          )
          : null}
      </section >
    );
  }

  function CallFAB({ onFabClick, isCardShown }) {

    return (
      <div className="fab-container">
        <button
          className="fab"
          onClick={onFabClick}
          area-description="Contact us"
        >
          {isCardShown
            ? (
              <span>&times;</span>
            )
            : (
              <img
                className="fab-call-icon"
                src="https://img.icons8.com/officel/64/000000/phone.png"
                alt=""
              />
            )}
        </button>
      </div>
    );
  }


  const api = 'https://codifyinditest.com/script_test/api-test';
  const actionCardState = {
    show: {
      className: '',
      isCardShown: true,
      next: 'hide'
    },
    hide: {
      className: 'hide',
      isCardShown: false,
      next: 'show',
    },
  };

  function useCardToggle() {
    const [cardStatus, setCardStatus] = useState(actionCardState.hide);
    const onFabClick = useCallback(
      () => {
        setCardStatus(currentStatus => actionCardState[currentStatus.next]);
      },
      [],
    );
    return [cardStatus, onFabClick];
  }


  function useData() {
    const [data, setData] = useState(null);

    useEffect(
      () => {
        fetch(api)
          .then(res => res.json())
          .then(data => {
            if (data['script test']) {
              const resData = data['script test'];
              setData({
                header: resData.labels,
                number: resData.phone_number,
                imageSrc: `${api}${resData.feature_img}`,
              });
            }
          })
          .catch(() => {
            setData(null);
          });
      },
      [],
    );

    return [data];
  }

  function Widget() {
    const [cardStatus, onFabClick] = useCardToggle();
    const [data] = useData();

    return (
      <div className="__call__me__widget__class_name__">
        <CallUsCard statusClassName={cardStatus.className} data={data} />
        <CallFAB onFabClick={onFabClick} isCardShown={cardStatus.isCardShown} />
      </div>
    )
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  render(<Widget />, container);
})();
