import React, {useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { useColorContext } from '../../../contexts/colorPickerContext';

const ColorPicker = () => {
  const { selectedColor, setPrimaryColor } = useColorContext();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setPrimaryColor(color.hex);
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${selectedColor}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
       
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
           },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker && (
        <div style={styles.popover} className='left-[20%] sm:left-[30%] md:left-[50%] top-[100%]'>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={selectedColor} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
