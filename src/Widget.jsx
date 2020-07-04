import React from 'react';
import { render } from 'react-dom';
import './widget.css';

(function widgetInt() {

  const api = 'https://codifyinditest.com/script_test/api-test';
  function Widget() {

    return (
      <div className="__call__me__widget__class_name__">
        Hello
      </div>
    )
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  render(<Widget />, container);
})();
