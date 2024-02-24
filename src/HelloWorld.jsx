import { useState } from 'react';

const HelloWorld = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <div>
      <p>Test Me</p>
      <button data-testid="toggle-btn" onClick={() => setIsDark(!isDark)}>
        Toggle Mode
      </button>
      <button data-testid="add-btn">Add Button</button>
      <div className="">{isDark ? <p>Dark</p> : <p>Light</p>}</div>
    </div>
  );
};

export default HelloWorld;
