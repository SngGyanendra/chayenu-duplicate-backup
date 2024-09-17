import React from 'react';


const StickyNote = ({ content, url }) => {
  const styles = {
    bottom: 0,
    width: '100%',
    backgroundColor: '#e3f0fa',
    color: '#003652',
    textAlign: 'center',
    FontFamily: 'var(--website-font-family)',
    padding: '15px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.3)',
};

const underline = {
    fontWeight: 700,
  };

  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div style={styles} onClick={handleClick}>
      {content}{' '} - {' '}
      <span style={underline}>Donate Now</span>
    </div>
  );
};

export default StickyNote;
