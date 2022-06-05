
import React from 'react';
import * as aframe from 'aframe';
import Helmet from 'react-helmet';
import SubpageLeft from './../../images/subpage-left.jpg';
import SubpageRight from './../../images/subpage-right.jpg';

export default class FeaturePage extends React.PureComponent {
  constructor (props) {
    super (props);
    this.isVRMode = props.location.search.split('=')[1] || false;
  }
  componentWillMount() {
    const that = this;
    if (!aframe.components['on-click-back'])
    aframe.registerComponent('on-click-back', {
      init: function () {
        const { el } = this;
        el.addEventListener('click', () => {
          that.props.history.push('/home?isVRMode=' + that.isVRMode);
        });
      }
    });
    
  }
  componentDidMount () {
    const that = this;
    if (!aframe.components['scene-handler1'])
    aframe.registerComponent('scene-handler1', {
      init: function () {
        const { el } = this;
        const searchLocation = that.props.location.search;
        if(searchLocation !== '') {
          const isVRMode = searchLocation.split('=')[1];
          if (isVRMode === 'true' && el.enterVR) {
            el.enterVR();
          }
        }
        el.addEventListener('enter-vr', function () {
          that.isVRMode = true;
        });
        el.addEventListener('exit-vr', function () {
          that.isVRMode = false;
        });
      }
    });
  }
  componentWillUnmount() {
    delete aframe.components['on-click-back'];
    delete aframe.components['scene-handler1'];
  }

  render() {
    return (
      <article>
         <Helmet>
          <link rel="prefetch" as="image/jpg" href={SubpageLeft} />
          <link rel="prefetch" as="image/jpg" href={SubpageRight} />
        </Helmet>
      <a-scene cursor="rayOrigin:mouse" scene-handler1>
        <a-assets>
          <img id="left" src={SubpageLeft} alt="" />
          <img id="right" src={SubpageRight} alt="" />
        </a-assets>
        <a-sky src="#left" rotation="0 -90 0"></a-sky>
        <a-sky src="#right" rotation="0 -90 0"></a-sky>
        <a-circle position="-6 1.5 -9.5" color="#f00" radius="0.8" on-click-back></a-circle>
        <a-entity position="0 0 0">
            <a-camera id="player">
              <a-entity cursor="fuse: true; fuseTimeout: 1500;" geometry="primitive: ring" material="color: red;
                shader: flat" position ="0 0 -1" scale="0.04 0.04 0.04"></a-entity>
            </a-camera>
        </a-entity>
      </a-scene>
    </article>
    );
  }
}
