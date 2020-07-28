import React from 'react';
import reactCSS from 'reactcss'
import { CustomPicker } from 'react-color';
import { SketchPicker } from 'react-color';
import { ColorWrap } from 'react-color/lib/components/common';
import { Hue, Saturation, Alpha } from 'react-color/lib/components/common';
import './ColorPicker.css';

const styles = reactCSS({
  'default': {
    colorPicker: {
      border: '1px solid grey',
      boxShadow: '1px',
      padding: '18px',
      borderRadius: '4px',
      boxShadow: '0 6px 12px rgba(0,0,0,.20)',
    },
    saturation: {
      width: '400px',
      height: '240px',
      position: 'relative'
    },
    hue: {
      width: '400px',
      height: '15px',
      position: 'relative',
      marginTop: '32px',
    }
  }
});

class Component extends React.Component {

  SliderPointer = () => {
    const styles = reactCSS({
      'default': {
        picker: {
          width: '10px',
          height: '17px',
          borderRadius: '6px',
          transform: 'translate(-7px, -1px)',
          backgroundColor: 'rgb(248, 248, 248)',
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
        },
      },
    })

    return (
      <div style={ styles.picker } />
    )
  }

  render() {
    return (
      <div style={ styles.colorPicker }>
        <div style={ styles.saturation }>
          <Saturation
            hsl={ this.props.hsl }
            hsv={ this.props.hsv }
            onChange={ this.props.onChange }
          />
        </div>
        <div>
          <div>
            <div style={ styles.hue }>
              <Hue
                hsl={ this.props.hsl }
                onChange={ this.props.onChange }
                pointer={this.SliderPointer}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorWrap(Component);
