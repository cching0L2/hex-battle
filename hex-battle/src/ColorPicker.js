import React from 'react';
import reactCSS from 'reactcss'
import { CustomPicker } from 'react-color';
import { SketchPicker } from 'react-color';
import { ColorWrap } from 'react-color/lib/components/common';
import { Hue, Saturation, Alpha } from 'react-color/lib/components/common';
import './ColorPicker.css';

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
      <div>
        <div className="saturation">
          <Saturation
            hsl={ this.props.hsl }
            hsv={ this.props.hsv }
            onChange={ this.props.onChange }
          />
        </div>
        <div>
          <div>
            <div className="hue">
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
